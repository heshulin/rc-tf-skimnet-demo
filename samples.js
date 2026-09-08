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
      },
      "metrics": {
        "kind": "no_reference",
        "quality_scores_available": false,
        "clipped_samples": {
          "mixture": 0,
          "output": 0
        }
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
      },
      "metrics": {
        "kind": "no_reference",
        "quality_scores_available": false,
        "clipped_samples": {
          "mixture": 0,
          "output": 0
        }
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
        "mixture": "assets/simulated/one-interferer/1266bdb2a692/mixture.wav",
        "output": "assets/simulated/one-interferer/1266bdb2a692/output.wav",
        "reference": "assets/simulated/one-interferer/1266bdb2a692/reference.wav"
      },
      "metrics": {
        "valid": true,
        "metric_errors": [],
        "duration_seconds": 6.0,
        "clipped_samples": {
          "mixture": 0,
          "output": 0,
          "reference": 0
        },
        "suppression_db": 1.5721018827653188,
        "input_rms_dbfs": -22.730471275788528,
        "output_rms_dbfs": -24.30257315855385,
        "listening_input_rms_dbfs": -22.73031640069528,
        "input_active_fraction": 0.6477462437395659,
        "kind": "active",
        "input_si_sdr_db": 4.262655067418384,
        "output_si_sdr_db": 19.388604881131428,
        "target_gain_db": -0.2588458468525,
        "scale_sensitive_snr_db": 19.31528200843523,
        "si_sdri_db": 15.125949813713044,
        "reference_active_fraction": 0.37061769616026713,
        "dropout_fraction": 0.0,
        "input_pesq_wb": 1.9624348878860474,
        "input_estoi": 0.9305858786487021,
        "pesq_wb": 3.8822851181030273,
        "estoi": 0.9812461890378219
      },
      "screened": true,
      "spectrograms": {
        "mixture": "assets/simulated/one-interferer/1266bdb2a692/mixture-spectrum.png",
        "output": "assets/simulated/one-interferer/1266bdb2a692/output-spectrum.png",
        "reference": "assets/simulated/one-interferer/1266bdb2a692/reference-spectrum.png"
      }
    },
    {
      "id": "simulated-target-only",
      "title": "Target speech only",
      "radius": "2",
      "detail": "The desired speaker is inside the region, with no competing speech.",
      "durationLabel": "6 s",
      "tracks": {
        "mixture": "assets/simulated/target-only/3c5970d9818f/mixture.wav",
        "output": "assets/simulated/target-only/3c5970d9818f/output.wav",
        "reference": "assets/simulated/target-only/3c5970d9818f/reference.wav"
      },
      "metrics": {
        "valid": true,
        "metric_errors": [],
        "duration_seconds": 6.0,
        "clipped_samples": {
          "mixture": 0,
          "output": 0,
          "reference": 0
        },
        "suppression_db": 0.1327453151189815,
        "input_rms_dbfs": -17.529108551677048,
        "output_rms_dbfs": -17.661853866796026,
        "listening_input_rms_dbfs": -17.528953676583797,
        "input_active_fraction": 0.7245409015025042,
        "kind": "target_only",
        "input_si_sdr_db": 20.09073821394983,
        "output_si_sdr_db": 25.376330877054713,
        "target_gain_db": -0.04356244615475244,
        "scale_sensitive_snr_db": 25.38219638094027,
        "si_sdri_db": 5.285592663104882,
        "reference_active_fraction": 0.7111853088480802,
        "dropout_fraction": 0.0,
        "input_pesq_wb": 3.051086187362671,
        "input_estoi": 0.9784912039269071,
        "pesq_wb": 4.306739807128906,
        "estoi": 0.9898635046423249
      },
      "screened": true,
      "spectrograms": {
        "mixture": "assets/simulated/target-only/3c5970d9818f/mixture-spectrum.png",
        "output": "assets/simulated/target-only/3c5970d9818f/output-spectrum.png",
        "reference": "assets/simulated/target-only/3c5970d9818f/reference-spectrum.png"
      }
    },
    {
      "id": "simulated-no-target",
      "title": "No speaker inside",
      "radius": "1.5",
      "detail": "Only outside speech or noise is present. A quiet enhanced output is expected.",
      "durationLabel": "6 s",
      "tracks": {
        "mixture": "assets/simulated/no-target/717b5db60fe4/mixture.wav",
        "output": "assets/simulated/no-target/717b5db60fe4/output.wav",
        "reference": "assets/simulated/no-target/717b5db60fe4/reference.wav"
      },
      "metrics": {
        "valid": true,
        "metric_errors": [],
        "duration_seconds": 6.0,
        "clipped_samples": {
          "mixture": 0,
          "output": 0,
          "reference": 0
        },
        "suppression_db": 80.02838659390878,
        "input_rms_dbfs": -14.566921073367713,
        "output_rms_dbfs": -94.5953076672765,
        "listening_input_rms_dbfs": -14.566766198274463,
        "input_active_fraction": 0.7295492487479132,
        "kind": "no_target"
      },
      "screened": true,
      "spectrograms": {
        "mixture": "assets/simulated/no-target/717b5db60fe4/mixture-spectrum.png",
        "output": "assets/simulated/no-target/717b5db60fe4/output-spectrum.png",
        "reference": "assets/simulated/no-target/717b5db60fe4/reference-spectrum.png"
      }
    },
    {
      "id": "simulated-noise",
      "title": "Speech with noise",
      "radius": "1",
      "detail": "One desired speaker with added background noise.",
      "durationLabel": "6 s",
      "tracks": {
        "mixture": "assets/simulated/noise/888586dfebd6/mixture.wav",
        "output": "assets/simulated/noise/888586dfebd6/output.wav",
        "reference": "assets/simulated/noise/888586dfebd6/reference.wav"
      },
      "metrics": {
        "valid": true,
        "metric_errors": [],
        "duration_seconds": 6.0,
        "clipped_samples": {
          "mixture": 0,
          "output": 0,
          "reference": 0
        },
        "suppression_db": 5.243830638165844,
        "input_rms_dbfs": -17.151745697999807,
        "output_rms_dbfs": -22.39557633616565,
        "listening_input_rms_dbfs": -17.15159082290656,
        "input_active_fraction": 0.6978297161936561,
        "kind": "active",
        "input_si_sdr_db": -3.326242521198515,
        "output_si_sdr_db": 18.59069745321011,
        "target_gain_db": -1.5600500587059378,
        "scale_sensitive_snr_db": 14.354902011839384,
        "si_sdri_db": 21.916939974408628,
        "reference_active_fraction": 0.2854757929883139,
        "dropout_fraction": 0.0,
        "input_pesq_wb": 2.3136119842529297,
        "input_estoi": 0.9161927519195395,
        "pesq_wb": 3.822812557220459,
        "estoi": 0.9668370585055307
      },
      "screened": true,
      "spectrograms": {
        "mixture": "assets/simulated/noise/888586dfebd6/mixture-spectrum.png",
        "output": "assets/simulated/noise/888586dfebd6/output-spectrum.png",
        "reference": "assets/simulated/noise/888586dfebd6/reference-spectrum.png"
      }
    },
    {
      "id": "simulated-speech-and-noise",
      "title": "Outside speech and noise",
      "radius": "1.5",
      "detail": "One desired speaker, one outside speech interferer, and added noise.",
      "durationLabel": "6 s",
      "tracks": {
        "mixture": "assets/simulated/speech-and-noise/69be7869417d/mixture.wav",
        "output": "assets/simulated/speech-and-noise/69be7869417d/output.wav",
        "reference": "assets/simulated/speech-and-noise/69be7869417d/reference.wav"
      },
      "metrics": {
        "valid": true,
        "metric_errors": [],
        "duration_seconds": 6.0,
        "clipped_samples": {
          "mixture": 0,
          "output": 0,
          "reference": 0
        },
        "suppression_db": 1.0908292416184446,
        "input_rms_dbfs": -20.06158298378562,
        "output_rms_dbfs": -21.152412225404063,
        "listening_input_rms_dbfs": -20.061428108692372,
        "input_active_fraction": 0.8614357262103506,
        "kind": "active",
        "input_si_sdr_db": 6.369597545335251,
        "output_si_sdr_db": 25.506059785818906,
        "target_gain_db": -0.14774198862589694,
        "scale_sensitive_snr_db": 25.22189233491978,
        "si_sdri_db": 19.136462240483652,
        "reference_active_fraction": 0.328881469115192,
        "dropout_fraction": 0.0,
        "input_pesq_wb": 1.813002347946167,
        "input_estoi": 0.9119366542617096,
        "pesq_wb": 3.7660939693450928,
        "estoi": 0.9777796521771814
      },
      "screened": true,
      "spectrograms": {
        "mixture": "assets/simulated/speech-and-noise/69be7869417d/mixture-spectrum.png",
        "output": "assets/simulated/speech-and-noise/69be7869417d/output-spectrum.png",
        "reference": "assets/simulated/speech-and-noise/69be7869417d/reference-spectrum.png"
      }
    },
    {
      "id": "simulated-two-interferers",
      "title": "Two outside speakers",
      "radius": "2",
      "detail": "One desired speaker and two outside speech interferers.",
      "durationLabel": "6 s",
      "tracks": {
        "mixture": "assets/simulated/two-interferers/e3f3d90e6500/mixture.wav",
        "output": "assets/simulated/two-interferers/e3f3d90e6500/output.wav",
        "reference": "assets/simulated/two-interferers/e3f3d90e6500/reference.wav"
      },
      "metrics": {
        "valid": true,
        "metric_errors": [],
        "duration_seconds": 6.0,
        "clipped_samples": {
          "mixture": 0,
          "output": 0,
          "reference": 0
        },
        "suppression_db": 0.9566099251908191,
        "input_rms_dbfs": -19.721217871306045,
        "output_rms_dbfs": -20.677827796496864,
        "listening_input_rms_dbfs": -19.721062996212797,
        "input_active_fraction": 0.9148580968280468,
        "kind": "active",
        "input_si_sdr_db": 7.264714865801139,
        "output_si_sdr_db": 17.894395186766427,
        "target_gain_db": 0.18794937749635698,
        "scale_sensitive_snr_db": 17.585597645375614,
        "si_sdri_db": 10.629680320965289,
        "reference_active_fraction": 0.7228714524207012,
        "dropout_fraction": 0.0,
        "input_pesq_wb": 1.8340916633605957,
        "input_estoi": 0.7378825996066856,
        "pesq_wb": 3.6695194244384766,
        "estoi": 0.9385881031216178
      },
      "screened": true,
      "spectrograms": {
        "mixture": "assets/simulated/two-interferers/e3f3d90e6500/mixture-spectrum.png",
        "output": "assets/simulated/two-interferers/e3f3d90e6500/output-spectrum.png",
        "reference": "assets/simulated/two-interferers/e3f3d90e6500/reference-spectrum.png"
      }
    }
  ],
  "recorded": [
    {
      "id": "recorded-target-only",
      "title": "Target speech only",
      "radius": "1.5",
      "detail": "The desired speaker is inside the region, with no competing speech.",
      "durationLabel": "10 s",
      "tracks": {
        "mixture": "assets/recorded/target-only/54ce210cffff/mixture.wav",
        "output": "assets/recorded/target-only/54ce210cffff/output.wav",
        "reference": "assets/recorded/target-only/54ce210cffff/reference.wav"
      },
      "metrics": {
        "valid": true,
        "metric_errors": [],
        "duration_seconds": 10.0,
        "clipped_samples": {
          "mixture": 0,
          "output": 0,
          "reference": 0
        },
        "suppression_db": 0.764479671852668,
        "input_rms_dbfs": -19.11592719248632,
        "output_rms_dbfs": -19.880406864338987,
        "listening_input_rms_dbfs": -19.115772317393073,
        "input_active_fraction": 0.958958958958959,
        "kind": "target_only",
        "input_si_sdr_db": 10.497528203426915,
        "output_si_sdr_db": 13.187971689207973,
        "target_gain_db": 1.3628153629085338,
        "scale_sensitive_snr_db": 10.243547285500672,
        "si_sdri_db": 2.690443485781058,
        "reference_active_fraction": 0.8308308308308309,
        "dropout_fraction": 0.0,
        "input_pesq_wb": 2.3322579860687256,
        "input_estoi": 0.9344825698010799,
        "pesq_wb": 3.6822304725646973,
        "estoi": 0.9758267275984086
      },
      "screened": true,
      "spectrograms": {
        "mixture": "assets/recorded/target-only/54ce210cffff/mixture-spectrum.png",
        "output": "assets/recorded/target-only/54ce210cffff/output-spectrum.png",
        "reference": "assets/recorded/target-only/54ce210cffff/reference-spectrum.png"
      }
    },
    {
      "id": "recorded-no-target",
      "title": "No speaker inside",
      "radius": "1.5",
      "detail": "One outside speaker and background noise are both present.",
      "durationLabel": "10 s",
      "tracks": {
        "mixture": "assets/recorded/no-target/eb5098a05220/mixture.wav",
        "output": "assets/recorded/no-target/eb5098a05220/output.wav",
        "reference": "assets/recorded/no-target/eb5098a05220/reference.wav"
      },
      "metrics": {
        "valid": true,
        "metric_errors": [],
        "duration_seconds": 10.0,
        "clipped_samples": {
          "mixture": 0,
          "output": 0,
          "reference": 0
        },
        "suppression_db": 72.36900578319384,
        "input_rms_dbfs": -14.32840659790221,
        "output_rms_dbfs": -86.69741238109606,
        "listening_input_rms_dbfs": -14.328251722808963,
        "input_active_fraction": 1.0,
        "kind": "no_target"
      },
      "screened": true,
      "spectrograms": {
        "mixture": "assets/recorded/no-target/eb5098a05220/mixture-spectrum.png",
        "output": "assets/recorded/no-target/eb5098a05220/output-spectrum.png",
        "reference": "assets/recorded/no-target/eb5098a05220/reference-spectrum.png"
      }
    },
    {
      "id": "recorded-noise",
      "title": "Speech with noise",
      "radius": "1.5",
      "detail": "One desired speaker with added background noise. Selected 6 s excerpt.",
      "durationLabel": "6 s",
      "tracks": {
        "mixture": "assets/recorded/noise/4fdf04adf3d9/mixture.wav",
        "output": "assets/recorded/noise/4fdf04adf3d9/output.wav",
        "reference": "assets/recorded/noise/4fdf04adf3d9/reference.wav"
      },
      "excerpt_seconds": [
        3,
        9
      ],
      "metrics": {
        "valid": true,
        "metric_errors": [],
        "duration_seconds": 6.0,
        "clipped_samples": {
          "mixture": 0,
          "output": 0,
          "reference": 0
        },
        "suppression_db": 1.3426788539716044,
        "input_rms_dbfs": -18.04137600907142,
        "output_rms_dbfs": -19.384054863043023,
        "listening_input_rms_dbfs": -18.041221133978173,
        "input_active_fraction": 1.0,
        "kind": "active",
        "input_si_sdr_db": 5.805940162480948,
        "output_si_sdr_db": 12.461766049518982,
        "target_gain_db": 2.239430746639944,
        "scale_sensitive_snr_db": 7.410978347667725,
        "si_sdri_db": 6.655825887038033,
        "reference_active_fraction": 0.7946577629382304,
        "dropout_fraction": 0.0021008403361344537,
        "input_pesq_wb": 1.2521870136260986,
        "input_estoi": 0.631537321820623,
        "pesq_wb": 2.762225389480591,
        "estoi": 0.8529147648602313
      },
      "screened": true,
      "spectrograms": {
        "mixture": "assets/recorded/noise/4fdf04adf3d9/mixture-spectrum.png",
        "output": "assets/recorded/noise/4fdf04adf3d9/output-spectrum.png",
        "reference": "assets/recorded/noise/4fdf04adf3d9/reference-spectrum.png"
      }
    },
    {
      "id": "recorded-speech-and-noise",
      "title": "Outside speech and noise",
      "radius": "1.5",
      "detail": "One desired speaker, one outside speech interferer, and added noise. Selected 6 s excerpt.",
      "durationLabel": "6 s",
      "tracks": {
        "mixture": "assets/recorded/speech-and-noise/9ebfe6b95a9c/mixture.wav",
        "output": "assets/recorded/speech-and-noise/9ebfe6b95a9c/output.wav",
        "reference": "assets/recorded/speech-and-noise/9ebfe6b95a9c/reference.wav"
      },
      "excerpt_seconds": [
        1,
        7
      ],
      "metrics": {
        "valid": true,
        "metric_errors": [],
        "duration_seconds": 6.0,
        "clipped_samples": {
          "mixture": 0,
          "output": 0,
          "reference": 0
        },
        "suppression_db": 1.0887607637975452,
        "input_rms_dbfs": -19.01358187102848,
        "output_rms_dbfs": -20.102342634826023,
        "listening_input_rms_dbfs": -19.013426995935234,
        "input_active_fraction": 1.0,
        "kind": "active",
        "input_si_sdr_db": 7.235070589703483,
        "output_si_sdr_db": 14.721789759872399,
        "target_gain_db": 1.7924639164621312,
        "scale_sensitive_snr_db": 9.851667896710186,
        "si_sdri_db": 7.486719170168916,
        "reference_active_fraction": 0.7195325542570952,
        "dropout_fraction": 0.0,
        "input_pesq_wb": 1.3933656215667725,
        "input_estoi": 0.6992939038802949,
        "pesq_wb": 2.5533463954925537,
        "estoi": 0.8373926897500398
      },
      "screened": true,
      "spectrograms": {
        "mixture": "assets/recorded/speech-and-noise/9ebfe6b95a9c/mixture-spectrum.png",
        "output": "assets/recorded/speech-and-noise/9ebfe6b95a9c/output-spectrum.png",
        "reference": "assets/recorded/speech-and-noise/9ebfe6b95a9c/reference-spectrum.png"
      }
    },
    {
      "id": "recorded-two-interferers",
      "title": "Two outside speakers",
      "radius": "1.5",
      "detail": "One desired speaker and two outside speech interferers. Selected 6 s excerpt.",
      "durationLabel": "6 s",
      "tracks": {
        "mixture": "assets/recorded/two-interferers/9bcea7ddb77b/mixture.wav",
        "output": "assets/recorded/two-interferers/9bcea7ddb77b/output.wav",
        "reference": "assets/recorded/two-interferers/9bcea7ddb77b/reference.wav"
      },
      "excerpt_seconds": [
        0,
        6
      ],
      "metrics": {
        "valid": true,
        "metric_errors": [],
        "duration_seconds": 6.0,
        "clipped_samples": {
          "mixture": 0,
          "output": 0,
          "reference": 0
        },
        "suppression_db": 1.7001986451763649,
        "input_rms_dbfs": -28.868634399655903,
        "output_rms_dbfs": -30.568833044832267,
        "listening_input_rms_dbfs": -28.86847952456265,
        "input_active_fraction": 0.9031719532554258,
        "kind": "active",
        "input_si_sdr_db": 5.727433869833999,
        "output_si_sdr_db": 12.174027660735137,
        "target_gain_db": 0.9531274273810006,
        "scale_sensitive_snr_db": 10.508789056171711,
        "si_sdri_db": 6.4465937909011375,
        "reference_active_fraction": 0.6961602671118531,
        "dropout_fraction": 0.002398081534772182,
        "input_pesq_wb": 1.8087267875671387,
        "input_estoi": 0.8931271565447847,
        "pesq_wb": 2.801928758621216,
        "estoi": 0.9704213810536375
      },
      "screened": true,
      "spectrograms": {
        "mixture": "assets/recorded/two-interferers/9bcea7ddb77b/mixture-spectrum.png",
        "output": "assets/recorded/two-interferers/9bcea7ddb77b/output-spectrum.png",
        "reference": "assets/recorded/two-interferers/9bcea7ddb77b/reference-spectrum.png"
      }
    }
  ]
};
