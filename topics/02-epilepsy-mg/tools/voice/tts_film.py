"""Synthesize narration for chapters 01-09 with resumable, idempotent output."""

import argparse
import asyncio
import json
import os
import shutil
import subprocess
import time

import edge_tts

VOICE = "zh-CN-YunyangNeural"
HERE = os.path.dirname(os.path.abspath(__file__))
SCRIPT = os.path.join(HERE, "film", "script.json")
OUT_DIR = os.path.join(HERE, "film", "audio")
NARRATION = os.path.join(HERE, "film", "narration.json")
PUBLIC_DIR = os.path.join(
    HERE, "..", "v1", "remotion-studio-v1", "public", "audio", "film"
)
FFPROBE = os.path.join(
    HERE,
    "..",
    "v1",
    "remotion-studio-v1",
    "node_modules",
    "@remotion",
    "compositor-win32-x64-msvc",
    "ffprobe.exe",
)


def probe_duration(path: str) -> float:
    out = subprocess.check_output(
        [
            FFPROBE,
            "-v",
            "error",
            "-show_entries",
            "format=duration",
            "-of",
            "default=noprint_wrappers=1:nokey=1",
            path,
        ],
        text=True,
    ).strip()
    return round(float(out), 3)


async def synth(line_id: str, text: str, rate: str) -> dict:
    mp3_path = os.path.join(OUT_DIR, f"{line_id}.mp3")
    last_error = None
    for attempt in range(4):
        try:
            communicate = edge_tts.Communicate(
                text, VOICE, rate=rate, boundary="WordBoundary"
            )
            words = []
            tmp_path = mp3_path + ".part"
            with open(tmp_path, "wb") as f:
                async for chunk in communicate.stream():
                    if chunk["type"] == "audio":
                        f.write(chunk["data"])
                    elif chunk["type"] == "WordBoundary":
                        words.append(
                            {
                                "text": chunk["text"],
                                "start": round(chunk["offset"] / 10_000_000, 3),
                                "duration": round(
                                    chunk["duration"] / 10_000_000, 3
                                ),
                            }
                        )
            os.replace(tmp_path, mp3_path)
            duration = probe_duration(mp3_path)
            print(f"  {line_id}  {duration:6.2f}s  {len(words):2d} words  {text[:28]}")
            return {
                "id": line_id,
                "text": text,
                "file": f"film/{line_id}.mp3",
                "duration": duration,
                "words": words,
            }
        except Exception as error:  # network hiccups are expected
            last_error = error
            print(f"  {line_id} attempt {attempt + 1} failed: {error}")
            await asyncio.sleep(1.5 + attempt * 2)
    raise RuntimeError(f"{line_id} failed after retries: {last_error}")


async def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--rate", default="+0%")
    parser.add_argument("--chapters", default="00,01,02,03,04,05,06,07,08,09")
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()

    os.makedirs(OUT_DIR, exist_ok=True)
    os.makedirs(PUBLIC_DIR, exist_ok=True)
    script = json.load(open(SCRIPT, encoding="utf-8"))
    selected = set(args.chapters.split(","))
    existing = {}
    if os.path.exists(NARRATION):
        old = json.load(open(NARRATION, encoding="utf-8"))
        existing = {item["id"]: item for item in old.get("lines", [])}

    lines = []
    for chapter in script["chapters"]:
        if chapter["id"] not in selected:
            continue
        print(f"[{chapter['id']}] {chapter['title']}")
        for line in chapter["lines"]:
            mp3_path = os.path.join(OUT_DIR, f"{line['id']}.mp3")
            cached = existing.get(line["id"])
            if (
                not args.force
                and os.path.exists(mp3_path)
                and cached
                and cached.get("text") == line["text"]
                and cached.get("words")
            ):
                duration = probe_duration(mp3_path)
                if abs(duration - cached["duration"]) < 0.03:
                    print(f"  {line['id']}  cached  {duration:6.2f}s")
                    lines.append(cached)
                    continue
            lines.append(await synth(line["id"], line["text"], args.rate))

    # keep unselected chapters if they already exist, so partial re-runs stay safe
    selected_ids = {chapter["id"] for chapter in script["chapters"] if chapter["id"] in selected}
    for line in existing.values():
        if line["id"].split("-")[0] not in selected_ids:
            lines.append(line)

    lines.sort(key=lambda item: item["id"])
    total = sum(item["duration"] for item in lines)
    payload = {
        "voice": VOICE,
        "rate": args.rate,
        "total_duration": round(total, 3),
        "lines": lines,
    }
    with open(NARRATION, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)
    for line in lines:
        shutil.copy2(
            os.path.join(OUT_DIR, f"{line['id']}.mp3"),
            os.path.join(PUBLIC_DIR, f"{line['id']}.mp3"),
        )
    print(f"TOTAL 00-09 {total:.2f}s, {len(lines)} lines -> {NARRATION}")


if __name__ == "__main__":
    asyncio.run(main())
