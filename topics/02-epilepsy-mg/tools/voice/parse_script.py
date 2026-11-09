"""Parse the epilepsy director script into chapters, blocks and narration lines."""

import json
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(
    HERE,
    "..",
    "..",
    "交接文档",
    "癫痫解说",
    "02_文案",
    "解说文案_全片_v2.md",
)
OUT_DIR = os.path.join(HERE, "film")
DST = os.path.join(OUT_DIR, "script.json")

CHAPTER_RE = re.compile(r"^##\s+(\d{2})｜(.+?)（(\d+):(\d+)[–-](\d+):(\d+)）")
BLOCK_RE = re.compile(r"^###\s+(\d+):(\d+)[–-](\d+):(\d+)")
LINE_RE = re.compile(r"^【旁白】(.*)$")
DIRECTION_RE = re.compile(r"^（[^）]*）")


def to_seconds(minutes: str, seconds: str) -> int:
    return int(minutes) * 60 + int(seconds)


def clean_text(raw: str) -> str:
    text = raw.strip()
    text = DIRECTION_RE.sub("", text).strip()
    text = text.replace("**", "").replace("`", "")
    return text


def main() -> None:
    chapters = []
    chapter = None
    block = None
    block_index = 0
    with open(SRC, encoding="utf-8") as f:
        for raw_line in f:
            line = raw_line.rstrip("\n")
            if line.startswith("## 附"):
                break
            chapter_match = CHAPTER_RE.match(line)
            if chapter_match:
                if chapter:
                    if block:
                        chapter["blocks"].append(block)
                    chapters.append(chapter)
                chapter = {
                    "id": chapter_match.group(1),
                    "title": chapter_match.group(2).strip(),
                    "start": to_seconds(chapter_match.group(3), chapter_match.group(4)),
                    "end": to_seconds(chapter_match.group(5), chapter_match.group(6)),
                    "blocks": [],
                    "lines": [],
                }
                block = None
                block_index = 0
                continue
            if not chapter:
                continue
            block_match = BLOCK_RE.match(line)
            if block_match:
                if block:
                    chapter["blocks"].append(block)
                block = {
                    "index": block_index,
                    "start": to_seconds(block_match.group(1), block_match.group(2)),
                    "end": to_seconds(block_match.group(3), block_match.group(4)),
                    "narration": [],
                }
                block_index += 1
                continue
            narration_match = LINE_RE.match(line)
            if narration_match and block is not None:
                text = clean_text(narration_match.group(1))
                if not text:
                    continue
                line_id = f"{chapter['id']}-{len(chapter['lines']) + 1:02d}"
                entry = {
                    "id": line_id,
                    "text": text,
                    "block": block["index"],
                    "blockStart": block["start"],
                    "blockEnd": block["end"],
                }
                chapter["lines"].append(entry)
                block["narration"].append(line_id)
        if block:
            chapter["blocks"].append(block)
        if chapter:
            chapters.append(chapter)

    os.makedirs(OUT_DIR, exist_ok=True)
    payload = {
        "source": os.path.relpath(SRC, HERE),
        "chapters": chapters,
    }
    with open(DST, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)

    charset = 0
    for chapter in chapters:
        chars = sum(len(line["text"]) for line in chapter["lines"])
        charset += chars
        print(
            f"{chapter['id']} {chapter['start']:>4}-{chapter['end']:<4} "
            f"{chapter['end'] - chapter['start']:>3}s  "
            f"{len(chapter['blocks']):>2} blocks  {len(chapter['lines']):>2} lines  "
            f"{chars:>4} chars  {chapter['title']}"
        )
    print(f"TOTAL {len(chapters)} chapters, {charset} chars -> {DST}")


if __name__ == "__main__":
    main()
