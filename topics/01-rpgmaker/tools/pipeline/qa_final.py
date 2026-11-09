"""Final QA over the rendered v2 segments: duration, streams, frozen windows."""

import json
import os
import subprocess
import sys

import cv2
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
PROJ = os.path.join(HERE, "remotion-studio-v2")
SEG = os.path.join(PROJ, "out", "chapters")
FF = os.path.join(PROJ, "node_modules", "@remotion", "compositor-win32-x64-msvc", "ffmpeg.exe")
DATA = json.load(open(os.path.join(PROJ, "src", "data", "film.json"), encoding="utf-8"))
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


def main():
    ids = ["RPGMaker00"] + [f"Ch{ch['id']}" for ch in DATA["chapters"]]
    want = {"RPGMaker00": 105.0}
    for ch in DATA["chapters"]:
        want[f"Ch{ch['id']}"] = ch["frames"] / DATA["fps"]
    ok = True
    for cid in ids:
        path = os.path.join(SEG, f"{cid}.mp4")
        if not os.path.exists(path):
            print(f"{cid:11s} MISSING")
            ok = False
            continue
        dur, streams, res = probe(path)
        delta = abs((dur or 0) - want[cid])
        runs = frozen_runs(path)
        flag = "OK" if delta < 0.6 and streams == 2 and res == "1920x1080" else "CHECK"
        if flag != "OK":
            ok = False
        print(
            f"{cid:11s} {dur:7.2f}s (want {want[cid]:7.2f}, d={delta:4.2f})  "
            f"streams={streams} {res}  frozen={len(runs)}  {flag}"
        )
        for a, b in runs:
            print(f"              frozen {a:6.1f}-{b:6.1f}s")
    print("ALL_OK" if ok else "ISSUES")


if __name__ == "__main__":
    main()
