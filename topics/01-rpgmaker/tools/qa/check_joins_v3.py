"""Sample both sides of every chapter join in the v3 film and build a contact sheet."""

import json
import os
import subprocess

from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
PROJ = os.path.join(HERE, "remotion-studio-v3")
FILM = os.path.join(PROJ, "out", "RPGMaker_film_v3.mp4")
FF = os.path.join(PROJ, "node_modules", "@remotion", "compositor-win32-x64-msvc", "ffmpeg.exe")
OUT = os.path.join(HERE, "out", "joins_v3")
PROLOGUE = 105.0
DATA = json.load(open(os.path.join(PROJ, "src", "data", "film.json"), encoding="utf-8"))


def grab(t, path):
    subprocess.run(
        [FF, "-y", "-ss", str(t), "-i", FILM, "-frames:v", "1", "-update", "1", path],
        check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )


def main():
    os.makedirs(OUT, exist_ok=True)
    for old in os.listdir(OUT):
        if old.startswith("join"):
            os.remove(os.path.join(OUT, old))
    joins = [ch["start"] for ch in DATA["chapters"]]
    frames = []
    for i, t in enumerate(joins, start=1):
        a = os.path.join(OUT, f"join{i:02d}_a.png")
        b = os.path.join(OUT, f"join{i:02d}_b.png")
        grab(t - 0.15, a)
        grab(t + 0.15, b)
        frames.append((t, a, b))

    thumb = (320, 180)
    per_row = 3
    rows = (len(frames) + per_row - 1) // per_row
    sh = Image.new("RGB", (per_row * 2 * thumb[0], rows * (thumb[1] + 26)), "black")
    d = ImageDraw.Draw(sh)
    for i, (t, a, b) in enumerate(frames):
        row, col = divmod(i, per_row)
        x0 = col * 2 * thumb[0]
        y0 = row * (thumb[1] + 26)
        for j, p in enumerate((a, b)):
            im = Image.open(p).convert("RGB").resize(thumb)
            sh.paste(im, (x0 + j * thumb[0], y0 + 26))
            d.text((x0 + j * thumb[0] + 6, y0 + 5), f"join {t:.2f}s  -0.15/+0.15", fill="white")
    out = os.path.join(HERE, "_inspect", "v3_joins.png")
    sh.save(out)
    print(out, sh.size)
    for t, _, _ in frames:
        print(f"join at {t:.2f}s")


if __name__ == "__main__":
    main()
