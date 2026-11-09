"""用标准库合成 00 章需要的 8-bit 音效与环境声。"""

import math
import os
import random
import struct
import wave

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(
    HERE, "..", "remotion-studio", "public", "audio", "sfx"
)
RATE = 48000
random.seed(19921217)


def write_wav(name, samples, peak=0.9):
    os.makedirs(OUT, exist_ok=True)
    max_abs = max(abs(s) for s in samples) or 1.0
    scale = peak / max_abs
    frames = bytearray()
    for s in samples:
        v = int(max(-1.0, min(1.0, s * scale)) * 32767)
        frames += struct.pack("<h", v)
    path = os.path.join(OUT, name)
    with wave.open(path, "wb") as f:
        f.setnchannels(1)
        f.setsampwidth(2)
        f.setframerate(RATE)
        f.writeframes(bytes(frames))
    print(f"{name:24s} {len(samples) / RATE:6.2f}s  {os.path.getsize(path) / 1024:6.1f} KB")


def env(i, n, attack=0.005, release=0.05, curve=2.0):
    a = int(attack * RATE)
    r = int(release * RATE)
    if i < a:
        return i / max(1, a)
    if i > n - r:
        return max(0.0, (n - i) / max(1, r))
    t = (i - a) / max(1, n - a - r)
    return (1.0 - t) ** curve


def square(t, freq, duty=0.5):
    return 1.0 if (t * freq) % 1.0 < duty else -1.0


def sine(t, freq):
    return math.sin(2 * math.pi * freq * t)


def noise():
    return random.uniform(-1, 1)


def lowpass(samples, cutoff):
    dt = 1.0 / RATE
    rc = 1.0 / (2 * math.pi * cutoff)
    alpha = dt / (rc + dt)
    out = []
    y = 0.0
    for x in samples:
        y += alpha * (x - y)
        out.append(y)
    return out


def make_footstep():
    n = int(0.09 * RATE)
    out = []
    for i in range(n):
        t = i / RATE
        v = square(t, 150 + 60 * math.exp(-t * 40), 0.35) * 0.5
        v += noise() * 0.18 * math.exp(-t * 80)
        out.append(v * env(i, n, 0.002, 0.05, 2.5))
    write_wav("footstep.wav", out, 0.35)


def make_dialog():
    n = int(0.28 * RATE)
    out = []
    for i in range(n):
        t = i / RATE
        v = sine(t, 1046.5) * 0.55 + sine(t, 1568.0) * 0.25
        v += square(t, 2093.0, 0.25) * 0.08
        out.append(v * env(i, n, 0.002, 0.24, 3.0))
    write_wav("dialog.wav", out, 0.5)


def make_slash():
    n = int(0.22 * RATE)
    out = []
    for i in range(n):
        t = i / RATE
        v = noise() * 0.55 + sine(t, 900 - 5200 * t) * 0.18
        v += square(t, 1700 - 8000 * t, 0.2) * 0.12
        out.append(v * env(i, n, 0.001, 0.16, 1.6))
    write_wav("slash.wav", out, 0.45)


def make_damage5():
    n = int(0.12 * RATE)
    out = []
    for i in range(n):
        t = i / RATE
        v = square(t, 1760, 0.3) * 0.4 + sine(t, 3520) * 0.2
        out.append(v * env(i, n, 0.001, 0.1, 2.0))
    write_wav("damage5.wav", out, 0.32)


def make_whoosh():
    n = int(0.5 * RATE)
    out = []
    for i in range(n):
        t = i / RATE
        v = noise() * (0.2 + 0.8 * math.sin(math.pi * min(1, t / 0.5)))
        v = v * env(i, n, 0.02, 0.2, 1.2)
        out.append(v)
    out = lowpass(out, 1200)
    write_wav("whoosh.wav", out, 0.3)


def make_punch():
    n = int(0.85 * RATE)
    out = []
    for i in range(n):
        t = i / RATE
        freq = 78 - 36 * min(1, t / 0.5)
        v = sine(t, freq) * 1.0
        v += sine(t, freq * 2) * 0.25
        v += noise() * 0.45 * math.exp(-t * 18)
        if t < 0.05:
            v += noise() * 0.8
        out.append(v * env(i, n, 0.001, 0.55, 1.8))
    out = lowpass(out, 900)
    write_wav("punch.wav", out, 0.85)


def make_game_over():
    notes = [(392.0, 0.34), (329.63, 0.34), (261.63, 0.34), (196.0, 0.95)]
    n = int((sum(d for _, d in notes) + 0.4) * RATE)
    out = [0.0] * n
    cursor = 0
    for freq, dur in notes:
        count = int(dur * RATE)
        for i in range(count):
            t = i / RATE
            idx = cursor + i
            if idx >= n:
                break
            v = square(t, freq, 0.25) * 0.45
            v += square(t, freq / 2, 0.5) * 0.18
            v += sine(t, freq * 2) * 0.06
            out[idx] += v * env(i, count, 0.006, 0.12, 1.6)
        cursor += count
    out = lowpass(out, 2400)
    write_wav("game_over.wav", out, 0.5)


def make_title_chime():
    n = int(5.2 * RATE)
    out = []
    freqs = [110.0, 164.81, 220.0, 246.94, 329.63, 440.0]
    for i in range(n):
        t = i / RATE
        v = 0.0
        for index, freq in enumerate(freqs):
            detune = 1.0 + 0.0006 * index
            decay = math.exp(-t * (0.55 + 0.08 * index))
            v += sine(t * detune, freq) * (0.32 / (index + 1)) * decay
        v += sine(t, 55.0) * 0.18 * math.exp(-t * 0.28)
        attack = min(1.0, t / 0.35)
        out.append(v * attack)
    # 简易延迟，制造空间感
    delay = int(0.19 * RATE)
    for i in range(delay, n):
        out[i] += out[i - delay] * 0.22
    write_wav("title_chime.wav", out, 0.55)


def make_cursor():
    n = int(0.05 * RATE)
    out = []
    for i in range(n):
        t = i / RATE
        v = square(t, 1400, 0.2) * 0.4
        out.append(v * env(i, n, 0.001, 0.03, 2.0))
    write_wav("cursor.wav", out, 0.18)


def make_floppy():
    n = int(0.7 * RATE)
    out = []
    for i in range(n):
        t = i / RATE
        v = 0.0
        if t < 0.08:
            v += noise() * 0.5 * (1 - t / 0.08)
        else:
            v += sine(t, 92) * 0.18 + noise() * 0.08
            v += square(t, 840, 0.1) * 0.04 * (0.5 + 0.5 * math.sin(t * 90))
        out.append(v * env(i, n, 0.002, 0.2, 1.2))
    write_wav("floppy.wav", out, 0.35)


def make_paper():
    n = int(0.45 * RATE)
    out = []
    for i in range(n):
        t = i / RATE
        v = noise() * (0.4 + 0.6 * math.sin(math.pi * t / 0.45))
        out.append(v * env(i, n, 0.02, 0.2, 1.4))
    out = lowpass(out, 3000)
    write_wav("paper.wav", out, 0.22)


def make_tick():
    n = int(0.09 * RATE)
    out = []
    for i in range(n):
        t = i / RATE
        v = sine(t, 2200) * 0.5 + sine(t, 3300) * 0.2
        out.append(v * env(i, n, 0.001, 0.07, 3.0))
    write_wav("tick.wav", out, 0.16)


def make_wind(duration=105.0):
    n = int(duration * RATE)
    raw = [noise() for _ in range(n)]
    low = lowpass(raw, 420)
    very_low = lowpass(low, 90)
    out = []
    for i in range(n):
        t = i / RATE
        mod = 0.55 + 0.25 * math.sin(2 * math.pi * 0.055 * t)
        mod += 0.12 * math.sin(2 * math.pi * 0.13 * t + 1.2)
        mod += 0.08 * math.sin(2 * math.pi * 0.021 * t + 0.4)
        out.append((low[i] * 0.55 + very_low[i] * 0.9) * mod)
    out = lowpass(out, 700)
    write_wav("wind.wav", out, 0.3)


if __name__ == "__main__":
    make_footstep()
    make_dialog()
    make_slash()
    make_damage5()
    make_whoosh()
    make_punch()
    make_game_over()
    make_title_chime()
    make_cursor()
    make_floppy()
    make_paper()
    make_tick()
    make_wind()
