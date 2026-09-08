window.DEMO_SAMPLES = {
  "device": [
    {
      "id": "device-switch",
      "title": "Radius switching from 2 m to 1 m",
      "durationLabel": "29.68 s",
      "tracks": {
        "mixture": "assets/device/radius-switching-mixture.wav",
        "output": "assets/device/radius-switching-output.wav"
      },
      "spectrograms": {
        "mixture": "assets/device/radius-switching-mixture-spectrum.png",
        "output": "assets/device/radius-switching-output-spectrum.png"
      }
    },
    {
      "id": "device-hold",
      "title": "Outside-speech suppression at 1 m",
      "durationLabel": "14 s",
      "tracks": {
        "mixture": "assets/device/outside-suppression-mixture.wav",
        "output": "assets/device/outside-suppression-output.wav"
      },
      "spectrograms": {
        "mixture": "assets/device/outside-suppression-mixture-spectrum.png",
        "output": "assets/device/outside-suppression-output-spectrum.png"
      }
    }
  ],
  "simulated": [
    {
      "id": "simulated-one-interferer",
      "title": "One outside speaker",
      "radius": "1.5",
      "detail": "One desired speaker and one outside speech interferer.",
      "durationLabel": "6 s",
      "tracks": {
        "mixture": "assets/simulated/one-interferer/mixture.wav",
        "output": "assets/simulated/one-interferer/output.wav",
        "reference": "assets/simulated/one-interferer/reference.wav"
      },
      "spectrograms": {
        "mixture": "assets/simulated/one-interferer/mixture-spectrum.png",
        "output": "assets/simulated/one-interferer/output-spectrum.png",
        "reference": "assets/simulated/one-interferer/reference-spectrum.png"
      }
    },
    {
      "id": "simulated-target-only",
      "title": "Target speech only",
      "radius": "2",
      "detail": "The desired speaker is inside the region, with no competing speech.",
      "durationLabel": "6 s",
      "tracks": {
        "mixture": "assets/simulated/target-only/mixture.wav",
        "output": "assets/simulated/target-only/output.wav",
        "reference": "assets/simulated/target-only/reference.wav"
      },
      "spectrograms": {
        "mixture": "assets/simulated/target-only/mixture-spectrum.png",
        "output": "assets/simulated/target-only/output-spectrum.png",
        "reference": "assets/simulated/target-only/reference-spectrum.png"
      }
    },
    {
      "id": "simulated-no-target",
      "title": "No speaker inside",
      "radius": "1.5",
      "detail": "Only outside speech or noise is present. A quiet enhanced output is expected.",
      "durationLabel": "6 s",
      "tracks": {
        "mixture": "assets/simulated/no-target/mixture.wav",
        "output": "assets/simulated/no-target/output.wav",
        "reference": "assets/simulated/no-target/reference.wav"
      },
      "spectrograms": {
        "mixture": "assets/simulated/no-target/mixture-spectrum.png",
        "output": "assets/simulated/no-target/output-spectrum.png",
        "reference": "assets/simulated/no-target/reference-spectrum.png"
      }
    },
    {
      "id": "simulated-noise",
      "title": "Speech with noise",
      "radius": "1",
      "detail": "One desired speaker with added background noise.",
      "durationLabel": "6 s",
      "tracks": {
        "mixture": "assets/simulated/noise/mixture.wav",
        "output": "assets/simulated/noise/output.wav",
        "reference": "assets/simulated/noise/reference.wav"
      },
      "spectrograms": {
        "mixture": "assets/simulated/noise/mixture-spectrum.png",
        "output": "assets/simulated/noise/output-spectrum.png",
        "reference": "assets/simulated/noise/reference-spectrum.png"
      }
    },
    {
      "id": "simulated-speech-and-noise",
      "title": "Outside speech and noise",
      "radius": "1.5",
      "detail": "One desired speaker, one outside speech interferer, and added noise.",
      "durationLabel": "6 s",
      "tracks": {
        "mixture": "assets/simulated/speech-and-noise/mixture.wav",
        "output": "assets/simulated/speech-and-noise/output.wav",
        "reference": "assets/simulated/speech-and-noise/reference.wav"
      },
      "spectrograms": {
        "mixture": "assets/simulated/speech-and-noise/mixture-spectrum.png",
        "output": "assets/simulated/speech-and-noise/output-spectrum.png",
        "reference": "assets/simulated/speech-and-noise/reference-spectrum.png"
      }
    },
    {
      "id": "simulated-two-interferers",
      "title": "Two outside speakers",
      "radius": "2",
      "detail": "One desired speaker and two outside speech interferers.",
      "durationLabel": "6 s",
      "tracks": {
        "mixture": "assets/simulated/two-interferers/mixture.wav",
        "output": "assets/simulated/two-interferers/output.wav",
        "reference": "assets/simulated/two-interferers/reference.wav"
      },
      "spectrograms": {
        "mixture": "assets/simulated/two-interferers/mixture-spectrum.png",
        "output": "assets/simulated/two-interferers/output-spectrum.png",
        "reference": "assets/simulated/two-interferers/reference-spectrum.png"
      }
    }
  ],
  "recorded": [
    {
      "id": "recorded-one-interferer",
      "title": "One outside speaker",
      "radius": "1.5",
      "detail": "One desired speaker and one outside speech interferer.",
      "durationLabel": "10 s",
      "tracks": {
        "mixture": "assets/recorded/one-interferer/mixture.wav",
        "output": "assets/recorded/one-interferer/output.wav",
        "reference": "assets/recorded/one-interferer/reference.wav"
      },
      "spectrograms": {
        "mixture": "assets/recorded/one-interferer/mixture-spectrum.png",
        "output": "assets/recorded/one-interferer/output-spectrum.png",
        "reference": "assets/recorded/one-interferer/reference-spectrum.png"
      }
    },
    {
      "id": "recorded-target-only",
      "title": "Target speech only",
      "radius": "1.5",
      "detail": "The desired speaker is inside the region, with no competing speech.",
      "durationLabel": "10 s",
      "tracks": {
        "mixture": "assets/recorded/target-only/mixture.wav",
        "output": "assets/recorded/target-only/output.wav",
        "reference": "assets/recorded/target-only/reference.wav"
      },
      "spectrograms": {
        "mixture": "assets/recorded/target-only/mixture-spectrum.png",
        "output": "assets/recorded/target-only/output-spectrum.png",
        "reference": "assets/recorded/target-only/reference-spectrum.png"
      }
    },
    {
      "id": "recorded-no-target",
      "title": "No speaker inside",
      "radius": "1.5",
      "detail": "Only outside speech or noise is present. A quiet enhanced output is expected.",
      "durationLabel": "10 s",
      "tracks": {
        "mixture": "assets/recorded/no-target/mixture.wav",
        "output": "assets/recorded/no-target/output.wav",
        "reference": "assets/recorded/no-target/reference.wav"
      },
      "spectrograms": {
        "mixture": "assets/recorded/no-target/mixture-spectrum.png",
        "output": "assets/recorded/no-target/output-spectrum.png",
        "reference": "assets/recorded/no-target/reference-spectrum.png"
      }
    },
    {
      "id": "recorded-noise",
      "title": "Speech with noise",
      "radius": "1.5",
      "detail": "One desired speaker with added background noise.",
      "durationLabel": "10 s",
      "tracks": {
        "mixture": "assets/recorded/noise/mixture.wav",
        "output": "assets/recorded/noise/output.wav",
        "reference": "assets/recorded/noise/reference.wav"
      },
      "spectrograms": {
        "mixture": "assets/recorded/noise/mixture-spectrum.png",
        "output": "assets/recorded/noise/output-spectrum.png",
        "reference": "assets/recorded/noise/reference-spectrum.png"
      }
    },
    {
      "id": "recorded-speech-and-noise",
      "title": "Outside speech and noise",
      "radius": "1.5",
      "detail": "One desired speaker, one outside speech interferer, and added noise.",
      "durationLabel": "10 s",
      "tracks": {
        "mixture": "assets/recorded/speech-and-noise/mixture.wav",
        "output": "assets/recorded/speech-and-noise/output.wav",
        "reference": "assets/recorded/speech-and-noise/reference.wav"
      },
      "spectrograms": {
        "mixture": "assets/recorded/speech-and-noise/mixture-spectrum.png",
        "output": "assets/recorded/speech-and-noise/output-spectrum.png",
        "reference": "assets/recorded/speech-and-noise/reference-spectrum.png"
      }
    },
    {
      "id": "recorded-two-interferers",
      "title": "Two outside speakers",
      "radius": "1.5",
      "detail": "One desired speaker and two outside speech interferers.",
      "durationLabel": "10 s",
      "tracks": {
        "mixture": "assets/recorded/two-interferers/mixture.wav",
        "output": "assets/recorded/two-interferers/output.wav",
        "reference": "assets/recorded/two-interferers/reference.wav"
      },
      "spectrograms": {
        "mixture": "assets/recorded/two-interferers/mixture-spectrum.png",
        "output": "assets/recorded/two-interferers/output-spectrum.png",
        "reference": "assets/recorded/two-interferers/reference-spectrum.png"
      }
    }
  ]
};
