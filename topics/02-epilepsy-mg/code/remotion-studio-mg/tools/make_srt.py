"""Emit a delivery SRT aligned to the rendered MG chapter files."""
import json
import subprocess
from pathlib import Path

PROJECT = Path(__file__).resolve().parent.parent
FILM = PROJECT / "src" / "data" / "film.json"
RENDER = PROJECT / "out" / "render"
FFPROBE = PROJECT / "node_modules" / "@remotion" / "compositor-win32-x64-msvc" / "ffprobe.exe"
OUT = PROJECT.parent.parent / "输出文件夹" / "癫痫科普_纯MG动画版_字幕.srt"


def actual_duration(chapter_id: str, fallback: float) -> float:
    media = RENDER / f"{chapter_id}.mp4"
    if not (FFPROBE.exists() and media.exists()):
        return fallback
    out = subprocess.run(
        [str(FFPROBE), "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(media)],
        capture_output=True,
        text=True,
    ).stdout.strip()
    return float(out) if out else fallback


def stamp(seconds: float) -> str:
    ms = int(round(seconds * 1000))
    h, ms = divmod(ms, 3600000)
    m, ms = divmod(ms, 60000)
    s, ms = divmod(ms, 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


def wrap(text: str, limit: int = 22) -> str:
    clean = text.replace("\n", "")
    return "\n".join(clean[i : i + limit] for i in range(0, len(clean), limit))


data = json.loads(FILM.read_text(encoding="utf-8"))
entries = []
timeline_start = 0.0
for chapter in data["chapters"]:
    for cue in chapter["cues"]:
        entries.append((timeline_start + cue["start"], timeline_start + cue["end"], cue["text"]))
    timeline_start += actual_duration(f"Ch{chapter['id']}", chapter["duration"])
entries.sort(key=lambda item: item[0])

blocks = []
for index, (start, end, text) in enumerate(entries, start=1):
    blocks.append(f"{index}\n{stamp(start)} --> {stamp(end)}\n{wrap(text)}\n")

OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text("\n".join(blocks), encoding="utf-8")
print(f"{len(entries)} cues -> {OUT}")
