"""Synthesize the extra sound effects used by chapters 01-09."""

import math
import os
import random
import struct
import wave

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "remotion-studio", "public", "audio", "sfx")
RATE = 48000
random.seed(20261021)


def write_wav(name, samples, peak=0.8):
    os.makedirs(OUT, exist_ok=True)
    max_abs = max((abs(value) for value in samples), default=1.0) or 1.0
    frames = bytearray()
    for sample in samples:
        value = int(max(-1.0, min(1.0, sample / max_abs * peak)) * 32767)
        frames += struct.pack("<h", value)
    with wave.open(os.path.join(OUT, name), "wb") as handle:
        handle.setnchannels(1)
        handle.setsampwidth(2)
        handle.setframerate(RATE)
        handle.writeframes(bytes(frames))
    print(f"{name:18s} {len(samples) / RATE:5.2f}s")


def fade(i, total, attack=0.005, release=0.05):
    a = int(attack * RATE)
    r = int(release * RATE)
    if i < a:
        return i / max(1, a)
    if i > total - r:
        return max(0.0, (total - i) / max(1, r))
    return 1.0


def sine(t, frequency):
    return math.sin(2 * math.pi * frequency * t)


def lowpass(samples, cutoff):
    alpha = (1.0 / RATE) / (1.0 / (2 * math.pi * cutoff) + 1.0 / RATE)
    result = []
    value = 0.0
    for sample in samples:
        value += alpha * (sample - value)
        result.append(value)
    return result


def make_click():
    total = int(0.06 * RATE)
    out = []
    for i in range(total):
        t = i / RATE
        value = 1.0 if (t * 1500) % 1 < 0.3 else -1.0
        value += random.uniform(-1, 1) * 0.5
        out.append(value * math.exp(-t * 90))
    write_wav("click.wav", out, 0.35)


def make_type():
    total = int(0.045 * RATE)
    out = []
    for i in range(total):
        t = i / RATE
        value = random.uniform(-1, 1) * 0.6 + sine(t, 2400) * 0.35
        out.append(value * math.exp(-t * 120))
    write_wav("type.wav", out, 0.25)


def make_key():
    total = int(0.75 * RATE)
    out = []
    for i in range(total):
        t = i / RATE
        value = (
            sine(t, 2200) * 0.45 * math.exp(-t * 7)
            + sine(t, 3310) * 0.25 * math.exp(-t * 10)
            + sine(t, 4700) * 0.12 * math.exp(-t * 14)
        )
        if t < 0.05:
            value += random.uniform(-1, 1) * 0.5 * (1 - t / 0.05)
        out.append(value * fade(i, total, 0.001, 0.4))
    write_wav("key.wav", out, 0.55)


def make_switch():
    total = int(0.32 * RATE)
    out = []
    for i in range(total):
        t = i / RATE
        value = 0.0
        if t < 0.04:
            value += random.uniform(-1, 1) * 0.6
        value += sine(t, 660) * 0.35 * math.exp(-t * 14)
        value += sine(t, 990) * 0.18 * math.exp(-t * 18)
        out.append(value * fade(i, total, 0.001, 0.12))
    write_wav("switch.wav", out, 0.45)


def make_door():
    total = int(1.1 * RATE)
    raw = []
    for i in range(total):
        t = i / RATE
        frequency = 95 + 55 * math.sin(math.pi * min(1, t / 0.8)) - 20 * t
        value = sine(t, frequency) * 0.22
        value += random.uniform(-1, 1) * 0.12 * math.exp(-((t - 0.5) ** 2) / 0.06)
        if 0.78 < t < 0.9:
            value += random.uniform(-1, 1) * 0.55
        raw.append(value * fade(i, total, 0.02, 0.25))
    write_wav("door.wav", lowpass(raw, 1000), 0.55)


def make_flash():
    total = int(0.4 * RATE)
    out = []
    for i in range(total):
        t = i / RATE
        value = random.uniform(-1, 1) * 0.65 * math.exp(-t * 22)
        value += sine(t, 1400) * 0.25 * math.exp(-t * 8)
        if t < 0.02:
            value += 0.5
        out.append(value)
    write_wav("flash.wav", out, 0.45)


def make_modem():
    total = int(6.2 * RATE)
    out = [0.0] * total
    tones = [
        (0.0, 0.7, 350),
        (0.7, 0.5, 440),
        (1.2, 0.4, 1100),
        (1.7, 0.3, 2100),
        (2.1, 0.7, 1200),
        (3.0, 0.4, 2250),
        (3.6, 0.5, 980),
        (4.3, 0.4, 1650),
    ]
    for start, duration, frequency in tones:
        begin = int(start * RATE)
        count = int(duration * RATE)
        for i in range(count):
            index = begin + i
            if index >= total:
                break
            t = i / RATE
            out[index] += sine(t, frequency) * 0.22 * fade(i, count, 0.005, 0.04)
    for i in range(int(4.8 * RATE), total):
        t = i / RATE
        out[i] += random.uniform(-1, 1) * 0.08 * (0.5 + 0.5 * math.sin(t * 37))
    write_wav("modem.wav", lowpass(out, 2600), 0.4)


def make_erase():
    total = int(0.8 * RATE)
    out = []
    for i in range(total):
        t = i / RATE
        value = random.uniform(-1, 1) * (0.4 + 0.6 * math.sin(math.pi * t / 0.8))
        value *= 0.6 + 0.4 * math.sin(t * 40)
        out.append(value * fade(i, total, 0.02, 0.25))
    write_wav("erase.wav", lowpass(out, 2400), 0.35)


def make_disc():
    total = int(0.75 * RATE)
    out = []
    for i in range(total):
        t = i / RATE
        value = 0.0
        if t < 0.1:
            value += random.uniform(-1, 1) * 0.3
        value += sine(t, 72) * 0.12
        value += sine(t, 1440) * 0.04 * (0.5 + 0.5 * math.sin(t * 90))
        out.append(value * fade(i, total, 0.005, 0.3))
    write_wav("disc.wav", out, 0.3)


def main():
    make_click()
    make_type()
    make_key()
    make_switch()
    make_door()
    make_flash()
    make_modem()
    make_erase()
    make_disc()


if __name__ == "__main__":
    main()
