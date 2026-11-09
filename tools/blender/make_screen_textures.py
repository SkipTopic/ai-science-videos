"""Prepare the CRT screen textures: battle still + GAME OVER card, with scanlines."""

import os

from PIL import Image, ImageDraw, ImageFilter, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
REFS = os.path.join(HERE, "refs")
OUT = os.path.join(HERE, "textures")
FONT = os.path.join(
    HERE, "..", "..", "remotion-studio-v2", "public", "fonts", "press-start-2p",
)
W, H = 1280, 960


def find_font():
    for root, _, files in os.walk(FONT):
        for f in files:
            if f.lower().endswith((".ttf", ".otf")):
                return os.path.join(root, f)
    return None


def crt(img, scan=4, strength=0.28):
    img = img.convert("RGB").resize((W, H), Image.LANCZOS)
    px = img.load()
    for y in range(H):
        if y % scan == 0:
            for x in range(W):
                r, g, b = px[x, y]
                k = 1 - strength
                px[x, y] = (int(r * k), int(g * k), int(b * k))
    # soft screen glow / curvature vignette
    vig = Image.new("L", (W, H), 0)
    d = ImageDraw.Draw(vig)
    d.ellipse((-W * 0.18, -H * 0.18, W * 1.18, H * 1.18), fill=255)
    vig = vig.filter(ImageFilter.GaussianBlur(70))
    dark = Image.new("RGB", (W, H), (2, 3, 4))
    return Image.composite(img, dark, vig)


def main():
    os.makedirs(OUT, exist_ok=True)
    battle = crt(Image.open(os.path.join(REFS, "p26.png")))
    battle.save(os.path.join(OUT, "battle.png"))

    # draw big, then pixelate 4x with NEAREST so it reads as era-correct sprite text
    big = Image.new("RGB", (W, H), (4, 5, 8))
    d = ImageDraw.Draw(big)
    f_big = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 190)
    f_small = ImageFont.truetype("C:/Windows/Fonts/Deng.ttf", 46)
    d.text((W // 2, H // 2 - 130), "GAME", font=f_big, fill=(196, 52, 44), anchor="mm")
    d.text((W // 2, H // 2 + 40), "OVER", font=f_big, fill=(196, 52, 44), anchor="mm")
    d.text((W // 2, H // 2 + 210), "小鲸鱼太厉害了", font=f_small, fill=(214, 208, 192), anchor="mm")
    small = big.resize((W // 4, H // 4), Image.LANCZOS)
    card = small.resize((W, H), Image.NEAREST)
    card = crt(card, scan=4, strength=0.22)
    card.save(os.path.join(OUT, "gameover.png"))
    print("textures ->", OUT)


if __name__ == "__main__":
    main()
