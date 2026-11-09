"""Master the film audio: gentle compression + makeup gain + peak limiter (numpy, no ffmpeg filters)."""
import json
import os
import sys
import wave
from pathlib import Path

import numpy as np

src, dst, film_json = sys.argv[1], sys.argv[2], sys.argv[3]
TARGET_SPEECH_RMS = float(os.environ.get('MASTER_TARGET', 0.085))
THRESHOLD = float(os.environ.get('MASTER_THRESHOLD', 0.05))
RATIO = float(os.environ.get('MASTER_RATIO', 4.0))
CEILING = 0.95

w = wave.open(src, 'rb')
sr = w.getframerate()
channels = w.getnchannels()
frames = w.getnframes()
raw = np.frombuffer(w.readframes(frames), dtype='<i2')
w.close()
audio = raw.reshape(-1, channels).astype(np.float64) / 32768.0
if channels == 1:
    audio = np.repeat(audio, 2, axis=1)

mono = audio.mean(axis=1)
win = max(1, int(sr * 0.01))
padded = np.concatenate([mono ** 2, np.zeros(win)])
csum = np.cumsum(padded)
power = (csum[win:] - csum[:-win]) / win
env = np.sqrt(power)[: len(mono)]
env = np.maximum(env, 1e-6)

n_blocks = len(env) // win
block_env = env[: n_blocks * win].reshape(n_blocks, win).mean(axis=1)
over_db = 20 * np.log10(np.maximum(block_env, 1e-9) / THRESHOLD)
reduction_db = np.where(over_db > 0, -over_db * (1 - 1 / RATIO), 0.0)

# smooth gain movement: fast attack, slow release
attack, release = 0.35, 0.08
smooth = np.empty_like(reduction_db)
current = reduction_db[0]
for i, value in enumerate(reduction_db):
    coefficient = attack if value < current else release
    current = current + coefficient * (value - current)
    smooth[i] = current

gain_blocks = np.power(10.0, smooth / 20.0)
gain = np.repeat(gain_blocks, win)
gain = np.concatenate([gain, np.full(len(mono) - len(gain), gain_blocks[-1])])
audio *= gain[:, None]

mono_after = audio.mean(axis=1)
block_rms = np.sqrt(
    (mono_after[: n_blocks * win] ** 2).reshape(n_blocks, win).mean(axis=1)
)
speech = json.loads(Path(film_json).read_text(encoding='utf-8'))
cue_blocks = []
for chapter in speech['chapters']:
    for cue in chapter['cues']:
        cue_blocks.append(
            range(
                int((chapter['start'] + cue['start']) * 100),
                int((chapter['start'] + cue['end']) * 100),
            )
        )
cue_levels = sorted(
    float(block_rms[i]) for rng in cue_blocks for i in rng if i < len(block_rms)
)
speech_rms = cue_levels[int(len(cue_levels) * 0.75)]
peak = np.abs(audio).max()
makeup = min(TARGET_SPEECH_RMS / max(speech_rms, 1e-9), CEILING / peak)
audio *= makeup
peak = np.abs(audio).max()
if peak > CEILING:
    audio *= CEILING / peak

out = np.clip(audio * 32767.0, -32768, 32767).astype('<i2')
writer = wave.open(dst, 'wb')
writer.setnchannels(2)
writer.setsampwidth(2)
writer.setframerate(sr)
writer.writeframes(out.tobytes())
writer.close()
print(
    f'mastered -> {dst}  speech_rms={speech_rms:.4f} makeup={makeup:.3f} '
    f'peak={np.abs(audio).max():.3f}'
)
