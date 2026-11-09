"""从 fontsource 包中提取本地字体，生成 public/fonts/fonts.css。"""

import os
import re
import tarfile

HERE = os.path.dirname(os.path.abspath(__file__))
PROJECT = os.path.dirname(HERE)
OUT = os.path.join(PROJECT, "out")
PUBLIC = os.path.join(PROJECT, "public", "fonts")

PACKAGES = [
    {
        "tgz": "fontsource-noto-sans-sc-5.3.1.tgz",
        "dir": "noto-sans-sc",
        "prefix": "noto-sans-sc",
        "weights": ["400", "700"],
    },
    {
        "tgz": "fontsource-noto-serif-sc-5.3.1.tgz",
        "dir": "noto-serif-sc",
        "prefix": "noto-serif-sc",
        "weights": ["900"],
    },
]

BLOCK_RE = re.compile(r"@font-face\s*\{(.*?)\}", re.S)


def family_name(css_block: str) -> str:
    match = re.search(r"font-family:\s*'([^']+)'", css_block)
    return match.group(1) if match else ""


def clean_block(block: str, font_dir: str) -> str:
    block = block.replace("font-display: swap;", "font-display: block;")
    woff2 = re.search(r"url\(\./files/([^)]+\.woff2)\)", block)
    if not woff2:
        return ""
    filename = woff2.group(1)
    block = re.sub(
        r"src:.*?;",
        f"src: url('{font_dir}/{filename}') format('woff2');",
        block,
        flags=re.S,
    )
    return "@font-face {" + block + "}"


def main() -> None:
    os.makedirs(PUBLIC, exist_ok=True)
    combined = ["/* 本地字体，勿用 Google Fonts */"]

    for pkg in PACKAGES:
        tgz_path = os.path.join(OUT, pkg["tgz"])
        dest = os.path.join(PUBLIC, pkg["dir"])
        os.makedirs(dest, exist_ok=True)
        with tarfile.open(tgz_path, "r:gz") as tar:
            members = {m.name: m for m in tar.getmembers()}
            for weight in pkg["weights"]:
                css_name = f"package/{weight}.css"
                css_file = tar.extractfile(members[css_name])
                css_text = css_file.read().decode("utf-8")
                font_files = [
                    name
                    for name in members
                    if f"/{pkg['prefix']}-" in name
                    and f"-{weight}-normal.woff2" in name
                    and name.startswith("package/files/")
                ]
                for name in font_files:
                    source = tar.extractfile(members[name])
                    target = os.path.join(dest, os.path.basename(name))
                    with open(target, "wb") as f:
                        f.write(source.read())
                for block in BLOCK_RE.findall(css_text):
                    cleaned = clean_block(block, pkg["dir"])
                    if cleaned:
                        combined.append(cleaned)
                print(f"{pkg['dir']} {weight}: {len(font_files)} subsets")

    tgz_path = os.path.join(OUT, "fontsource-press-start-2p-5.3.0.tgz")
    dest = os.path.join(PUBLIC, "press-start-2p")
    os.makedirs(dest, exist_ok=True)
    with tarfile.open(tgz_path, "r:gz") as tar:
        members = {m.name: m for m in tar.getmembers()}
        css_file = tar.extractfile(members["package/latin-400.css"])
        css_text = css_file.read().decode("utf-8")
        for name in members:
            if (
                name.startswith("package/files/")
                and "latin-400-normal.woff2" in name
            ):
                source = tar.extractfile(members[name])
                with open(os.path.join(dest, os.path.basename(name)), "wb") as f:
                    f.write(source.read())
        for block in BLOCK_RE.findall(css_text):
            cleaned = clean_block(block, "press-start-2p")
            if cleaned:
                combined.append(cleaned)
    print("press-start-2p latin: 1 subset")

    with open(os.path.join(PUBLIC, "fonts.css"), "w", encoding="utf-8") as f:
        f.write("\n\n".join(combined) + "\n")
    total = sum(
        os.path.getsize(os.path.join(root, name))
        for root, _, names in os.walk(PUBLIC)
        for name in names
    )
    print(f"fonts.css written, total {total / 1048576:.1f} MB")


if __name__ == "__main__":
    main()
