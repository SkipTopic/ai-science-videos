"""Build labelled contact sheets from a rendered chapter (this ffmpeg build has no fps/tile filters)."""

import argparse
import math
import os
import subprocess
import sys

from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
PROJ = os.path.dirname(HERE)
FF = os.path.join(
    PROJ, "node_modules", "@remotion", "compositor-win32-x64-msvc", "ffmpeg.exe"
)
TW, TH, PAD, LABEL = 620, 349, 10, 26


def grab(video, at, dst):
    subprocess.run(
        [FF, "-y", "-ss", str(at), "-i", video, "-frames:v", "1", dst,
         "-loglevel", "error"],
        check=True,
    )


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("video")
    ap.add_argument("--duration", type=float, required=True)
    ap.add_argument("--count", type=int, default=8)
    ap.add_argument("--out", required=True)
    args = ap.parse_args()

    tmp = os.path.join(PROJ, "out", "sheets", "_frames")
    os.makedirs(tmp, exist_ok=True)
    stamps = [round(args.duration * (i + 0.5) / args.count, 1) for i in range(args.count)]
    paths = []
    for at in stamps:
        p = os.path.join(tmp, f"{os.path.basename(args.video).replace('.mp4','')}_{at}.png")
        try:
            grab(args.video, at, p)
            paths.append((at, p))
        except subprocess.CalledProcessError:
            print("grab failed at", at, file=sys.stderr)

    cols = 2
    rows = math.ceil(len(paths) / cols)
    sheet = Image.new("RGB", (cols * TW + (cols + 1) * PAD,
                             rows * (TH + LABEL) + (rows + 1) * PAD), (12, 12, 14))
    draw = ImageDraw.Draw(sheet)
    for i, (at, p) in enumerate(paths):
        r, c = divmod(i, cols)
        x = PAD + c * (TW + PAD)
        y = PAD + r * (TH + LABEL + PAD)
        img = Image.open(p).resize((TW, TH))
        sheet.paste(img, (x, y))
        draw.text((x + 4, y + TH + 4), f"{int(at // 60)}:{at % 60:04.1f}", fill=(220, 220, 220))
    sheet.save(args.out)
    print(f"{os.path.basename(args.out)}  {sheet.size[0]}x{sheet.size[1]}  {len(paths)} frames")


if __name__ == "__main__":
    main()
