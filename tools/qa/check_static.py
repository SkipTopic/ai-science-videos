"""Flag any >=0.5 s stretch of a rendered segment that is visually frozen.

Uses OpenCV to decode; samples one frame every 0.5 s and reports consecutive
pairs whose mean absolute difference is below the threshold.

Usage: python check_static.py out/chapters/Ch01.mp4 [threshold]
"""

import sys

import cv2
import numpy as np

STEP = 15  # 30 fps -> one sample every 0.5 s
SIZE = (320, 180)


def main():
    path = sys.argv[1]
    threshold = float(sys.argv[2]) if len(sys.argv) > 2 else 0.35
    cap = cv2.VideoCapture(path)
    fps = cap.get(cv2.CAP_PROP_FPS) or 30
    samples = []
    i = 0
    while True:
        ok, frame = cap.read()
        if not ok:
            break
        if i % STEP == 0:
            gray = cv2.resize(cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY), SIZE).astype(np.float32)
            samples.append((i / fps, gray))
        i += 1
    cap.release()
    if len(samples) < 2:
        print(f"{path}: too short")
        return
    frozen = []
    for j in range(1, len(samples)):
        t0, a = samples[j - 1]
        t1, b = samples[j]
        diff = float(np.abs(a - b).mean())
        if diff < threshold:
            frozen.append((t0, t1, diff))
    total = samples[-1][0]
    if not frozen:
        print(f"{path}: OK  {len(samples)} samples over {total:.0f}s, no frozen 0.5 s window")
        return
    runs = []
    for t0, t1, d in frozen:
        if runs and abs(runs[-1][1] - t0) < 0.01:
            runs[-1][1] = t1
            runs[-1][2] = min(runs[-1][2], d)
        else:
            runs.append([t0, t1, d])
    print(f"{path}: {len(runs)} frozen run(s) over {total:.0f}s (threshold {threshold})")
    for a, b, d in runs:
        print(f"  {a:7.1f}s - {b:7.1f}s   ({b - a:.1f}s, min diff {d:.2f})")


if __name__ == "__main__":
    main()
