"""Final QA for v3: segment duration/streams, frozen windows, film duration, audio, MD5."""

import hashlib
import json
import os
import subprocess
import wave

import cv2
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
PROJ = os.path.join(HERE, "remotion-studio-v3")
SEG = os.path.join(PROJ, "out", "chapters")
FF = os.path.join(PROJ, "node_modules", "@remotion", "compositor-win32-x64-msvc", "ffmpeg.exe")
DATA = json.load(open(os.path.join(PROJ, "src", "data", "film.json"), encoding="utf-8"))
DELIVERY = r"C:\Users\admin\Desktop\ai生成科普视频/RPG Maker科普\输出文件夹\20261022_RPGMaker_梦想与世界_v3.mp4"
STEP = 15
SIZE = (320, 180)


def probe(path):
    out = subprocess.run([FF, "-i", path], capture_output=True, text=True, errors="replace").stderr
    dur = None
    for line in out.splitlines():
        if "Duration:" in line:
            hms = line.split("Duration:")[1].split(",")[0].strip()
            h, m, s = hms.split(":")
            dur = int(h) * 3600 + int(m) * 60 + float(s)
    streams = sum(1 for line in out.splitlines() if "Stream #" in line)
    res = "1920x1080" if "1920x1080" in out else "?"
    return dur, streams, res


def frozen_runs(path, threshold=0.35):
    cap = cv2.VideoCapture(path)
    fps = cap.get(cv2.CAP_PROP_FPS) or 30
    samples, i = [], 0
    while True:
        ok, frame = cap.read()
        if not ok:
            break
        if i % STEP == 0:
            gray = cv2.resize(cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY), SIZE).astype(np.float32)
            samples.append(gray)
        i += 1
    cap.release()
    runs, cur = [], None
    for j in range(1, len(samples)):
        diff = float(np.abs(samples[j] - samples[j - 1]).mean())
        if diff < threshold:
            if cur is None:
                cur = [j - 1, j]
            else:
                cur[1] = j
        elif cur:
            runs.append(cur)
            cur = None
    if cur:
        runs.append(cur)
    return [(a * 0.5, (b + 1) * 0.5) for a, b in runs]


def audio_gap(film):
    wav = os.path.join(HERE, "out", "qa_v3_audio.wav")
    os.makedirs(os.path.dirname(wav), exist_ok=True)
    subprocess.run(
        [FF, "-y", "-i", film, "-vn", "-ac", "1", "-ar", "16000", "-c:a", "pcm_s16le", wav],
        check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )
    with wave.open(wav, "rb") as f:
        rate = f.getframerate()
        raw = f.readframes(f.getnframes())
    x = np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768.0
    win = rate
    rms = np.array([np.sqrt(np.mean(x[i:i + win] ** 2) + 1e-12) for i in range(0, len(x) - win + 1, win)])
    quiet = rms < 10 ** (-55 / 20)
    best, cur = 0, 0
    for q in quiet:
        cur = cur + 1 if q else 0
        best = max(best, cur)
    return len(x) / rate, float(best)


def md5(path):
    h = hashlib.md5()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def main():
    ids = ["RPGMaker00"] + [f"Ch{ch['id']}" for ch in DATA["chapters"]]
    want = {"RPGMaker00": 105.0}
    for ch in DATA["chapters"]:
        want[f"Ch{ch['id']}"] = ch["frames"] / DATA["fps"]
    ok = True
    total = 0.0
    for cid in ids:
        path = os.path.join(SEG, f"{cid}.mp4")
        if not os.path.exists(path):
            print(f"{cid:11s} MISSING")
            ok = False
            continue
        dur, streams, res = probe(path)
        delta = abs((dur or 0) - want[cid])
        total += dur or 0
        runs = frozen_runs(path)
        flag = "OK" if delta < 0.6 and streams == 2 and res == "1920x1080" else "CHECK"
        if flag != "OK":
            ok = False
        print(
            f"{cid:11s} {dur:7.2f}s (want {want[cid]:7.2f}, d={delta:4.2f})  "
            f"streams={streams} {res}  frozen={len(runs)}  {flag}"
        )
        for a, b in runs:
            note = ""
            if cid == "RPGMaker00" and a < 32 and b > 29:
                note = "  <- v1 black transition, intentional"
            print(f"              frozen {a:6.1f}-{b:6.1f}s{note}")

    film = os.path.join(PROJ, "out", "RPGMaker_film_v3.mp4")
    print(f"\nsegments total {total:.2f}s")
    if os.path.exists(film):
        dur, streams, res = probe(film)
        delta = abs((dur or 0) - total)
        adur, gap = audio_gap(film)
        print(f"film       {dur:7.2f}s (segments {total:7.2f}, d={delta:4.2f})  streams={streams} {res}")
        print(f"audio      {adur:7.2f}s  longest quiet run {gap:.0f}s (want <10s)")
        if delta > 0.8 or streams != 2 or res != "1920x1080" or gap >= 10:
            ok = False
        if os.path.exists(DELIVERY):
            same = md5(film) == md5(DELIVERY)
            print(f"delivery   md5 {'MATCH' if same else 'DIFF'}  {DELIVERY}")
            if not same:
                ok = False
        else:
            print("delivery   MISSING")
            ok = False
    else:
        print("film       MISSING (concat not run yet)")
        ok = False
    print("ALL_OK" if ok else "ISSUES")


if __name__ == "__main__":
    main()
