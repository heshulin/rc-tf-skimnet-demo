#!/usr/bin/env python3
"""Measure the published WAV files using reference-based speech metrics."""
import argparse
import json
from pathlib import Path
import warnings
import wave

import numpy as np


def read_wav(path):
    with wave.open(str(path), 'rb') as wav:
        if wav.getsampwidth() != 2:
            raise ValueError(f'Expected PCM16 WAV: {path}')
        sr, channels = wav.getframerate(), wav.getnchannels()
        audio = np.frombuffer(wav.readframes(wav.getnframes()), dtype='<i2').astype(np.float64)
    audio = audio.reshape(-1, channels)[:, 0] / 32768
    if sr != 16000 or not len(audio) or not np.all(np.isfinite(audio)):
        raise ValueError(f'Invalid audio: {path}')
    return audio


def power(x):
    return float(np.mean(x * x))


def db_ratio(numerator, denominator):
    if numerator <= 0 or denominator <= 0:
        return None
    return float(10 * np.log10(numerator / denominator))


def si_sdr(estimate, reference):
    estimate = estimate - estimate.mean()
    reference = reference - reference.mean()
    energy = float(np.dot(reference, reference))
    if energy <= 1e-16:
        return None
    target = (float(np.dot(estimate, reference)) / energy) * reference
    error = estimate - target
    return db_ratio(float(np.dot(target, target)), float(np.dot(error, error)))


def frame_power(x, window=320, hop=160):
    if len(x) < window:
        x = np.pad(x, (0, window - len(x)))
    frames = np.lib.stride_tricks.sliding_window_view(x, window)[::hop]
    return np.mean(frames * frames, axis=1)


def measure(mixture, output, reference=None, condition='', full=True):
    if len(mixture) != len(output) or (reference is not None and len(mixture) != len(reference)):
        raise ValueError('Mixture, output and reference lengths must match')
    arrays = {'mixture': mixture, 'output': output}
    if reference is not None:
        arrays['reference'] = reference
    if not all(np.all(np.isfinite(x)) for x in arrays.values()):
        raise ValueError('Non-finite audio samples')
    result = {'valid': True, 'metric_errors': [], 'duration_seconds': len(mixture) / 16000,
              'clipped_samples': {k: int(np.count_nonzero(np.abs(x) >= 32767/32768)) for k, x in arrays.items()},
              'suppression_db': db_ratio(power(mixture), power(output)),
              'input_rms_dbfs': db_ratio(power(mixture), 1.0),
              'output_rms_dbfs': db_ratio(power(output), 1.0)}
    # Normalized level is only a screening check; no waveform is changed here.
    peak = max(float(np.max(np.abs(x))) for x in arrays.values())
    result['listening_input_rms_dbfs'] = db_ratio(power(mixture) * (0.89/peak)**2, 1) if peak else None
    mf = frame_power(mixture)
    result['input_active_fraction'] = float(np.mean(mf > max(float(mf.max()) * 1e-3, 1e-12)))
    if reference is None:
        result['kind'] = 'no_reference'
        return result
    if power(reference) <= 1e-16:
        result['kind'] = 'no_target'
        if condition and condition != 'no-target':
            result['valid'] = False
            result['metric_errors'].append('Silent reference in a target-present condition')
        return result
    result['kind'] = 'target_only' if condition == 'target-only' else 'active'
    if condition == 'no-target':
        result['valid'] = False
        result['metric_errors'].append('Non-silent reference in a no-target condition')
    y = reference-reference.mean()
    e = output-output.mean()
    gain = float(np.dot(e, y) / np.dot(y, y))
    result.update({'input_si_sdr_db': si_sdr(mixture, reference),
                   'output_si_sdr_db': si_sdr(output, reference),
                   'target_gain_db': float(20*np.log10(abs(gain))) if gain else None,
                   'scale_sensitive_snr_db': db_ratio(float(np.dot(y,y)),float(np.dot(e-y,e-y)))})
    before, after = result['input_si_sdr_db'], result['output_si_sdr_db']
    result['si_sdri_db'] = after-before if before is not None and after is not None else None
    rf, ef = frame_power(reference), frame_power(output)
    active = rf > max(float(rf.max()) * 1e-3, 1e-12)
    result['reference_active_fraction'] = float(active.mean())
    result['dropout_fraction'] = float(np.mean(ef[active] < rf[active]*0.01)) if active.any() else 1.0
    if full:
        from pesq import pesq
        from pystoi import stoi
        for label, signal in [('input',mixture),('output',output)]:
            for metric, fn in [('pesq_wb',lambda:float(pesq(16000,reference,signal,'wb'))),
                               ('estoi',lambda:float(stoi(reference,signal,16000,extended=True)))]:
                key = metric if label == 'output' else 'input_'+metric
                try:
                    with warnings.catch_warnings(record=True) as notices:
                        warnings.simplefilter('always')
                        value = fn()
                    if not np.isfinite(value):
                        raise ValueError('Non-finite score')
                    if any('not enough' in str(n.message).lower() for n in notices):
                        raise ValueError('Insufficient speech for this metric')
                    result[key] = value
                except Exception as error:
                    result[key] = None
                    result['valid'] = False
                    result['metric_errors'].append(key+': '+str(error))
    return result


def gate(metrics, full=True):
    """Screen demonstration clips; these gates are not dataset-level results."""
    reasons = []
    def at_least(key, threshold):
        value = metrics.get(key)
        if value is None or value < threshold:
            reasons.append(f'{key} < {threshold}')
    if not metrics.get('valid'):
        reasons.append('Invalid reference or metric')
    if any(n > max(1,int(metrics['duration_seconds']*16000*1e-4)) for n in metrics['clipped_samples'].values()):
        reasons.append('Clipping')
    kind = metrics['kind']
    if kind == 'no_reference':
        return False, ['No isolated reference for objective extraction-quality screening']
    if kind == 'no_target':
        at_least('suppression_db',30)
        at_least('listening_input_rms_dbfs',-40)
        at_least('input_active_fraction',0.25)
        return not reasons,reasons
    at_least('output_si_sdr_db',12 if kind=='target_only' else 10)
    at_least('scale_sensitive_snr_db',10 if kind=='target_only' else 7)
    if kind != 'target_only':
        at_least('si_sdri_db',6)
    gain = metrics.get('target_gain_db')
    if gain is None or not -3 <= gain <= 3:
        reasons.append('Target gain outside -3 to 3 dB')
    if metrics.get('dropout_fraction',1) > 0.01:
        reasons.append('Target frame dropouts > 1%')
    at_least('reference_active_fraction',0.20)
    if full:
        at_least('pesq_wb',3.0 if kind=='target_only' else 2.5)
        at_least('estoi',0.90 if kind=='target_only' else 0.80)
        if metrics.get('pesq_wb') is not None and metrics.get('input_pesq_wb') is not None and metrics['pesq_wb'] < metrics['input_pesq_wb']-0.05:
            reasons.append('PESQ deterioration')
        if metrics.get('estoi') is not None and metrics.get('input_estoi') is not None and metrics['estoi'] < metrics['input_estoi']-0.01:
            reasons.append('eSTOI deterioration')
    return not reasons,reasons


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root',type=Path,default=Path(__file__).resolve().parents[1])
    parser.add_argument('--output',type=Path,default=Path('build/audio_metrics.json'))
    parser.add_argument('--write-samples',action='store_true')
    args = parser.parse_args()
    root = args.root.resolve()
    data = json.loads((root/'samples.js').read_text().split('=',1)[1].strip().rstrip(';'))
    rows=[]
    for domain,cases in data.items():
        for case in cases:
            tracks={k:read_wav(root/v) for k,v in case['tracks'].items()}
            condition=Path(case['tracks']['mixture']).parent.name
            if case['id'].endswith('target-only'):condition='target-only'
            if case['id'].endswith('no-target'):condition='no-target'
            values=measure(tracks['mixture'],tracks['output'],tracks.get('reference'),condition=condition)
            passed,reasons=gate(values)
            rows.append({'id':case['id'],'domain':domain,'metrics':values,'passes_demo_gate':passed,'reasons':reasons})
            if args.write_samples:
                if domain == 'device':
                    case['metrics'] = {'kind': 'no_reference', 'quality_scores_available': False,
                                       'clipped_samples': values['clipped_samples']}
                    case.pop('screened', None)
                else:
                    case['metrics'] = values
                    case['screened'] = passed
            print(case['id'], 'PASS' if passed else 'UNSCORED' if domain=='device' else 'REVIEW',
                  'SI-SDRi',None if values.get('si_sdri_db') is None else round(values['si_sdri_db'],2),
                  'out',None if values.get('output_si_sdr_db') is None else round(values['output_si_sdr_db'],2),
                  'PESQ',None if values.get('pesq_wb') is None else round(values['pesq_wb'],2),
                  'eSTOI',None if values.get('estoi') is None else round(values['estoi'],2),
                  'Supp',None if values['suppression_db'] is None else round(values['suppression_db'],2),flush=True)
    args.output.parent.mkdir(parents=True,exist_ok=True)
    args.output.write_text(json.dumps(rows,indent=2,allow_nan=False)+'\n')
    if args.write_samples:
        (root/'samples.js').write_text('window.DEMO_SAMPLES = '+json.dumps(data,indent=2,allow_nan=False)+';\n')


if __name__=='__main__':
    main()
