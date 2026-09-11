'use strict';
const status = document.getElementById('player-status');
const mediaElements = new Set(document.querySelectorAll('video'));
const playerStates = new Map();
let playbackSerial = 0;

function registerMedia(element) {
  mediaElements.add(element);
  element.addEventListener('play', () => {
    playbackSerial += 1;
    mediaElements.forEach(other => { if (other !== element) other.pause(); });
  });
}
mediaElements.forEach(registerMedia);

function makeComparison(host, sample) {
  const labels = {mixture: 'Mixture', output: 'Enhanced', reference: 'Reference'};
  const trackNames = Object.keys(sample.tracks);
  let active = trackNames[0];
  let revision = 0;
  const buttons = document.createElement('div');
  buttons.className = 'source-buttons';
  buttons.setAttribute('role', 'group');
  buttons.setAttribute('aria-label', `Choose audio for ${sample.title}`);
  const audio = document.createElement('audio');
  audio.controls = true;
  audio.preload = 'metadata';
  audio.src = sample.tracks[active];
  audio.setAttribute('aria-label', `${sample.title}: ${labels[active]}`);
  const figure = document.createElement('figure');
  figure.className = 'spectrogram';
  const spectrumLink = document.createElement('a');
  spectrumLink.target = '_blank';
  spectrumLink.rel = 'noopener';
  const spectrum = document.createElement('img');
  spectrum.loading = 'lazy';
  spectrum.width = 1092;
  spectrum.height = 318;
  const spectrumCaption = document.createElement('figcaption');
  spectrumLink.append(spectrum);
  figure.append(spectrumLink, spectrumCaption);
  const caption = document.createElement('div');
  caption.className = 'player-caption';
  const currentLabel = document.createElement('span');
  const download = document.createElement('a');
  download.className = 'download-link';
  download.textContent = 'Download WAV';
  download.setAttribute('download', '');
  caption.append(currentLabel, download);
  const update = () => {
    for (const button of buttons.children) button.setAttribute('aria-pressed', String(button.dataset.track === active));
    currentLabel.textContent = `${labels[active]} · ${sample.durationLabel}`;
    download.href = sample.tracks[active];
    download.setAttribute('aria-label', `Download ${labels[active].toLowerCase()} for ${sample.title}`);
    audio.setAttribute('aria-label', `${sample.title}: ${labels[active]}`);
    const spectrumSource = sample.spectrograms[active];
    spectrum.src = spectrumSource;
    spectrum.alt = `${sample.title}: ${labels[active]} log-magnitude spectrogram, time in seconds and frequency from 0 to 8 kHz`;
    spectrumLink.href = spectrumSource;
    spectrumLink.setAttribute('aria-label', `Open the ${labels[active].toLowerCase()} spectrogram for ${sample.title} at full size`);
    spectrumCaption.textContent = `${labels[active]} · log magnitude (dB)`;
  };
  for (const name of trackNames) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'source-button';
    button.dataset.track = name;
    button.textContent = labels[name];
    button.addEventListener('click', () => {
      if (name === active) return;
      const position = audio.currentTime || 0;
      const wasPlaying = !audio.paused;
      const volume = audio.volume;
      const ticket = ++revision;
      const intent = playbackSerial;
      active = name;
      audio.pause();
      audio.src = sample.tracks[name];
      update();
      const restore = () => {
        if (ticket !== revision) return;
        audio.currentTime = Math.min(position, Math.max(0, audio.duration - 0.01));
        audio.volume = volume;
        if (wasPlaying && intent === playbackSerial) audio.play().catch(() => { status.textContent = 'Press play to continue listening.'; });
      };
      audio.addEventListener('loadedmetadata', restore, {once: true});
      audio.load();
      status.textContent = `${sample.title}: ${labels[name]}`;
    });
    buttons.append(button);
  }
  audio.addEventListener('error', () => { status.textContent = `Could not load ${labels[active].toLowerCase()} for ${sample.title}. You can use the download link.`; });
  host.append(buttons, figure, audio, caption);
  registerMedia(audio);
  playerStates.set(sample.id, {audio, buttons});
  update();
}

function metricList(sample) {
  const m = sample.metrics;
  if (!m || m.kind === 'no_reference') return null;
  const fields = m.kind === 'no_target'
    ? [['Suppression', m.suppression_db, ' dB']]
    : [
        [m.kind === 'target_only' ? 'Target gain' : 'SI-SDRi', m.kind === 'target_only' ? m.target_gain_db : m.si_sdri_db, ' dB'],
        ['Output SI-SDR', m.output_si_sdr_db, ' dB'],
        ['PESQ (WB)', m.pesq_wb, ''],
        ['eSTOI', m.estoi, '']
      ];
  const list = document.createElement('dl');
  list.className = 'sample-metrics';
  list.setAttribute('aria-label', `Measured scores for ${sample.title}`);
  for (const [name, value, unit] of fields) {
    const item = document.createElement('div');
    const term = document.createElement('dt');
    const score = document.createElement('dd');
    term.textContent = name;
    score.textContent = Number.isFinite(value) ? (Math.abs(value) < 0.005 ? 0 : value).toFixed(2) + unit : 'N/A';
    item.append(term, score);
    list.append(item);
  }
  return list;
}

function addSample(container, sample) {
  const row = document.createElement('article');
  row.className = 'sample-row';
  row.id = sample.id;
  const description = document.createElement('div');
  const title = document.createElement('h3');
  title.textContent = sample.title;
  const meta = document.createElement('p');
  meta.className = 'sample-meta';
  meta.textContent = `Radius ${sample.radius} m · ${sample.durationLabel} · 16 kHz`;
  const detail = document.createElement('p');
  detail.className = 'sample-detail';
  detail.textContent = sample.detail;
  description.append(title, meta, detail);
  const metrics = metricList(sample);
  if (metrics) description.append(metrics);
  const comparison = document.createElement('div');
  comparison.className = 'audio-comparison';
  row.append(description, comparison);
  container.append(row);
  makeComparison(comparison, sample);
}

for (const host of document.querySelectorAll('[data-case]')) {
  const sample = window.DEMO_SAMPLES.device.find(item => item.id === host.dataset.case);
  if (sample) makeComparison(host, sample);
}
for (const domain of ['simulated', 'recorded']) {
  const container = document.getElementById(`${domain}-samples`);
  for (const sample of window.DEMO_SAMPLES[domain]) addSample(container, sample);
}

function revealLinkedSettings() {
  const target = document.getElementById(window.location.hash.slice(1));
  if (target && target.matches('details.settings-detail')) {
    target.open = true;
    requestAnimationFrame(() => target.scrollIntoView({block: 'start'}));
  }
}
window.addEventListener('hashchange', revealLinkedSettings);
revealLinkedSettings();
