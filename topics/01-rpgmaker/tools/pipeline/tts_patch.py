"""Re-synthesize only the narration lines whose text changed in v2.

Writes: v2/audio/<id>.mp3, v2/docs/narration_v2.json,
        v2/remotion-studio-v2/public/audio/film/<id>.mp3
"""

import asyncio
import json
import os
import shutil
import subprocess

import edge_tts

HERE = os.path.dirname(os.path.abspath(__file__))
WORK = os.path.dirname(HERE)
V1_VOICE = os.path.join(WORK, "voice")
SCRIPT = os.path.join(V1_VOICE, "film", "script.json")
NARRATION = os.path.join(V1_VOICE, "film", "narration.json")
OUT_AUDIO = os.path.join(HERE, "audio")
OUT_NARRATION = os.path.join(HERE, "docs", "narration_v2.json")
PUBLIC = os.path.join(HERE, "remotion-studio-v2", "public", "audio", "film")
FFPROBE = os.path.join(
    WORK, "remotion-studio", "node_modules", "@remotion",
    "compositor-win32-x64-msvc", "ffprobe.exe",
)
FFMPEG = os.path.join(
    WORK, "remotion-studio", "node_modules", "@remotion",
    "compositor-win32-x64-msvc", "ffmpeg.exe",
)
SILENCE_RE = __import__("re").compile(r"silence_(start|end): ([0-9.]+)")


def detect_trim(path, duration):
    proc = subprocess.run(
        [FFMPEG, "-hide_banner", "-nostats", "-i", path, "-vn",
         "-af", "silencedetect=noise=-42dB:d=0.10", "-f", "null", "-"],
        capture_output=True, text=True, errors="replace",
    )
    starts, ends = [], []
    for kind, value in SILENCE_RE.findall(proc.stderr):
        (starts if kind == "start" else ends).append(float(value))
    lead = ends[0] if starts and starts[0] <= 0.06 and ends else 0.0
    tail = duration - starts[-1] if ends and starts and duration - ends[-1] <= 0.06 else 0.0
    lead = max(0.0, lead - 0.06)
    tail = max(0.0, tail - 0.10)
    if lead > 1.0:
        lead = 0.0
    if tail > 1.5:
        tail = 0.0
    return round(lead, 3), round(max(lead + 0.2, duration - tail), 3)

VOICE = "zh-CN-YunyangNeural"
PATCH = {"07-28": "上架之后，玩家骂它又卡又难用。到了年底，Steam 版还被 Valve 拒了。"}


def duration_of(path):
    out = subprocess.check_output(
        [FFPROBE, "-v", "error", "-show_entries", "format=duration",
         "-of", "default=noprint_wrappers=1:nokey=1", path],
        text=True,
    ).strip()
    return round(float(out), 3)


async def synth(line_id, text):
    os.makedirs(OUT_AUDIO, exist_ok=True)
    path = os.path.join(OUT_AUDIO, f"{line_id}.mp3")
    words = []
    communicate = edge_tts.Communicate(text, VOICE, rate="+0%", boundary="WordBoundary")
    with open(path + ".part", "wb") as f:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                f.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                words.append({
                    "text": chunk["text"],
                    "start": round(chunk["offset"] / 10_000_000, 3),
                    "duration": round(chunk["duration"] / 10_000_000, 3),
                })
    os.replace(path + ".part", path)
    duration = duration_of(path)
    trim_start, trim_end = detect_trim(path, duration)
    return {
        "id": line_id,
        "text": text,
        "file": f"film/{line_id}.mp3",
        "duration": duration,
        "trimStart": trim_start,
        "trimEnd": trim_end,
        "words": words,
    }


async def main():
    script = json.load(open(SCRIPT, encoding="utf-8"))
    texts = {}
    for chapter in script["chapters"]:
        for line in chapter["lines"]:
            texts[line["id"]] = line["text"]
    base = json.load(open(NARRATION, encoding="utf-8"))
    entries = {item["id"]: item for item in base["lines"]}

    os.makedirs(PUBLIC, exist_ok=True)
    for line_id, text in PATCH.items():
        existing = entries.get(line_id, {})
        mp3 = os.path.join(OUT_AUDIO, f"{line_id}.mp3")
        if existing.get("text") == text and os.path.exists(mp3) and existing.get("trimEnd"):
            print(f"{line_id}  cached {existing['duration']}s")
        else:
            entries[line_id] = await synth(line_id, text)
        shutil.copy2(
            os.path.join(OUT_AUDIO, f"{line_id}.mp3"),
            os.path.join(PUBLIC, f"{line_id}.mp3"),
        )
        print(f"{line_id}  {entries[line_id]['duration']}s  {text}")

    payload = {
        "voice": base.get("voice", VOICE),
        "rate": base.get("rate", "+0%"),
        "lines": [entries[k] for k in sorted(entries)],
    }
    payload["total_duration"] = round(
        sum(x["duration"] for x in payload["lines"] if not x["id"].startswith("00-")), 3
    )
    json.dump(payload, open(OUT_NARRATION, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    print(f"-> {OUT_NARRATION}  total {payload['total_duration']}s")


if __name__ == "__main__":
    asyncio.run(main())
