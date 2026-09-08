#!/usr/bin/env python3
"""Render the log-magnitude spectra of the audio tracks in samples.js."""
from pathlib import Path
import argparse
import json
import wave

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np


def read_audio(path):
    with wave.open(str(path), 'rb') as wav:
        if wav.getsampwidth() != 2 or wav.getnchannels() != 1:
            raise ValueError(f'Expected 16-bit mono WAV: {path}')
        sr = wav.getframerate()
        data = np.frombuffer(wav.readframes(wav.getnframes()), dtype='<i2').astype(np.float64) / 32768
    if sr != 16000 or not np.all(np.isfinite(data)) or not len(data):
        raise ValueError(f'Invalid audio: {path}')
    return data, sr


def magnitude(signal, sr):
    window_samples = round(0.020 * sr)
    hop_samples = round(0.010 * sr)
    window = np.sqrt(0.5 - 0.5 * np.cos(2 * np.pi * np.arange(window_samples) / window_samples))
    padded = np.pad(signal, (window_samples // 2, window_samples // 2))
    frames = np.lib.stride_tricks.sliding_window_view(padded, window_samples)[::hop_samples]
    return np.abs(np.fft.rfft(frames * window, axis=1)).T


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=Path(__file__).resolve().parents[1])
    args = parser.parse_args()
    root = args.root.resolve()
    source = root / 'samples.js'
    data = json.loads(source.read_text().split('=', 1)[1].strip().rstrip(';'))
    plt.rcParams.update({'font.family': 'DejaVu Sans', 'font.size': 10, 'axes.labelsize': 10,
                         'xtick.labelsize': 9, 'ytick.labelsize': 9, 'axes.linewidth': 0.6,
                         'text.color': '#29404b', 'axes.labelcolor': '#29404b',
                         'xtick.color': '#425962', 'ytick.color': '#425962'})
    count = 0
    for cases in data.values():
        for case in cases:
            spectra = {}
            for kind, relative in case['tracks'].items():
                signal, sr = read_audio(root / relative)
                spectra[kind] = (magnitude(signal, sr), len(signal) / sr)
            common_reference = max(float(np.max(mag)) for mag, _ in spectra.values())
            if common_reference <= 0:
                raise ValueError(f'All tracks are silent: {case["id"]}')
            case['spectrograms'] = {}
            for kind, (mag, duration) in spectra.items():
                db = 20 * np.log10(np.maximum(mag / common_reference, 1e-4))
                fig, ax = plt.subplots(figsize=(8.4, 2.45), dpi=130)
                fig.subplots_adjust(left=0.072, right=0.922, bottom=0.235, top=0.915)
                im = ax.imshow(db, origin='lower', aspect='auto', extent=(0, duration, 0, sr / 2000),
                               vmin=-80, vmax=0, cmap='magma', interpolation='nearest', rasterized=True)
                ax.set_xlim(0, duration)
                ax.set_ylim(0, sr / 2000)
                ax.set_xlabel('Time (s)', labelpad=2)
                ax.set_ylabel('Frequency (kHz)', labelpad=3)
                ax.set_yticks([0, 2, 4, 6, 8])
                ticks = np.linspace(0, duration, 5)
                ax.set_xticks(ticks, [f'{x:.1f}'.rstrip('0').rstrip('.') for x in ticks])
                for spine in ax.spines.values():
                    spine.set_color('#b8c8c7')
                cbax = fig.add_axes([0.940, 0.235, 0.014, 0.68])
                cb = fig.colorbar(im, cax=cbax, ticks=[-80, -40, 0])
                cb.ax.tick_params(labelsize=8, length=2, pad=2)
                cb.ax.set_title('dB', fontsize=9, pad=5)
                cb.outline.set_linewidth(0.4)
                audio_path = Path(case['tracks'][kind])
                output = audio_path.with_name(audio_path.stem + '-spectrum.png')
                fig.savefig(root / output, facecolor='white', metadata={'Software': 'RC-TF-SkiMNet demo spectrogram renderer'})
                plt.close(fig)
                case['spectrograms'][kind] = output.as_posix()
                count += 1
    source.write_text('window.DEMO_SAMPLES = ' + json.dumps(data, ensure_ascii=False, indent=2) + ';\n')
    print(f'Rendered {count} spectra for {sum(map(len, data.values()))} audio comparisons.')


if __name__ == '__main__':
    main()
