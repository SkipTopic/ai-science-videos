"""Build the 01-09 chapter timeline, trim silence and emit subtitle cues."""

import json
import math
import os
import re
import subprocess

HERE = os.path.dirname(os.path.abspath(__file__))
SCRIPT = os.path.join(HERE, "film", "script.json")
NARRATION = os.path.join(HERE, "film", "narration.json")
AUDIO = os.path.join(HERE, "film", "audio")
CACHE = os.path.join(HERE, "film", "silence.json")
DST = os.path.join(
    HERE, "..", "v1", "remotion-studio-v1", "src", "data", "film.json"
)
REPORT = os.path.join(HERE, "film", "schedule.txt")
FFMPEG = os.path.join(
    HERE,
    "..",
    "v1",
    "remotion-studio-v1",
    "node_modules",
    "@remotion",
    "compositor-win32-x64-msvc",
    "ffmpeg.exe",
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

FPS = 30
PUNCT = "，。！？；、——"
PUNCT_RE = re.compile(f"[{PUNCT}]")
PHRASE_RE = re.compile(f"([^{PUNCT}]+[{PUNCT}]?)")
SILENCE_RE = re.compile(r"silence_(start|end): ([0-9.]+)")


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


def detect_silence(path: str, duration: float) -> dict:
    proc = subprocess.run(
        [
            FFMPEG,
            "-hide_banner",
            "-nostats",
            "-i",
            path,
            "-vn",
            "-af",
            "silencedetect=noise=-42dB:d=0.10",
            "-f",
            "null",
            "-",
        ],
        capture_output=True,
        text=True,
        errors="replace",
    )
    starts = []
    ends = []
    for kind, value in SILENCE_RE.findall(proc.stderr):
        if kind == "start":
            starts.append(float(value))
        else:
            ends.append(float(value))
    lead = 0.0
    tail = 0.0
    if starts and starts[0] <= 0.06 and ends:
        lead = ends[0]
    if ends and duration - ends[-1] <= 0.06 and starts:
        tail = duration - starts[-1]
    lead = max(0.0, lead - 0.06)
    tail = max(0.0, tail - 0.10)
    if lead > 1.0:
        lead = 0.0
    if tail > 1.5:
        tail = 0.0
    return {
        "duration": duration,
        "lead": round(lead, 3),
        "tail": round(tail, 3),
        "trimStart": round(lead, 3),
        "trimEnd": round(max(lead + 0.2, duration - tail), 3),
    }


def normalize(text: str) -> str:
    return re.sub(r"[\s" + PUNCT + r"]", "", text)


def phrase_text(raw: str) -> str:
    return raw.strip().rstrip(PUNCT).strip()


def word_char_ranges(words):
    ranges = []
    cursor = 0
    for word in words:
        count = len(normalize(word["text"]))
        ranges.append((cursor, cursor + count, word))
        cursor += count
    return ranges


def time_for_char(ranges, index, use_end=False):
    for start, end, word in ranges:
        if start <= index < end:
            if use_end:
                return word["start"] + word["duration"]
            return word["start"]
    if ranges:
        return ranges[-1][2]["start"] + ranges[-1][2]["duration"]
    return 0.0


def split_phrase(raw: str, max_chars: int = 20):
    parts = []
    for sentence in PHRASE_RE.findall(raw):
        if not sentence.strip():
            continue
        body = sentence.rstrip(PUNCT)
        suffix = sentence[len(body):]
        while len(normalize(body)) > max_chars:
            cut = max_chars
            while cut > 0 and body[cut - 1].isascii() and body[cut - 1].isalnum():
                cut -= 1
            if cut <= 0:
                cut = max_chars
            parts.append(body[:cut])
            body = body[cut:]
        if body.strip():
            parts.append(body + suffix)
    return parts


def build_cues(line: dict) -> list:
    trim_start = line["trimStart"]
    speech = line["trimEnd"] - trim_start
    ranges = word_char_ranges(line["words"])
    original = line["text"]
    pieces = split_phrase(original)
    cues = []
    cursor = 0
    for raw in pieces:
        display = phrase_text(raw)
        if not display:
            continue
        normalized = normalize(raw)
        offset = normalize(original).find(normalized, cursor)
        if offset < 0:
            offset = cursor
        cursor = offset + len(normalized)
        if ranges:
            cue_start = max(0.0, time_for_char(ranges, offset) - trim_start)
            cue_end = min(
                speech,
                max(
                    cue_start + 0.35,
                    time_for_char(ranges, offset + len(normalized) - 1, True)
                    - trim_start
                    + 0.18,
                ),
            )
        else:
            total = len(normalize(original)) or 1
            cue_start = speech * offset / total
            cue_end = min(speech, speech * (offset + len(normalized)) / total)
        cues.append(
            {
                "text": display,
                "relStart": round(cue_start, 3),
                "relEnd": round(cue_end, 3),
            }
        )
    # merge very short cues into their neighbour
    merged = []
    for cue in cues:
        if (
            merged
            and cue["relEnd"] - cue["relStart"] < 0.55
            and len(merged[-1]["text"]) + len(cue["text"]) <= 28
        ):
            merged[-1]["text"] += " " + cue["text"]
            merged[-1]["relEnd"] = cue["relEnd"]
        else:
            merged.append(cue)
    # timings estimated from word ranges can overlap; subtitles must not
    for i in range(len(merged) - 1):
        if merged[i]["relEnd"] > merged[i + 1]["relStart"]:
            merged[i]["relEnd"] = merged[i + 1]["relStart"]
    return merged


def schedule_chapter(chapter: dict, narration: dict) -> dict:
    duration = chapter["end"] - chapter["start"]
    lines_by_id = {item["id"]: item for item in narration["lines"]}
    line_entries = []
    for line in chapter["lines"]:
        audio = lines_by_id[line["id"]]
        info = detect_silence(
            os.path.join(AUDIO, f"{line['id']}.mp3"), audio["duration"]
        )
        speech = info["trimEnd"] - info["trimStart"]
        line_entries.append(
            {
                "id": line["id"],
                "text": line["text"],
                "file": f"film/{line['id']}.mp3",
                "duration": audio["duration"],
                "words": audio["words"],
                "block": line["block"],
                "blockTarget": line["blockStart"] - chapter["start"],
                "trimStart": info["trimStart"],
                "trimEnd": info["trimEnd"],
                "speech": speech,
            }
        )

    forced_starts = {}
    gap = 0.45
    shift = 0.0
    prev_end = 0.0
    for _ in range(8):
        prev_end = 0.0
        for index, line in enumerate(line_entries):
            target = max(0.0, line["blockTarget"] - shift) + 0.32
            start = max(target, prev_end + (0.8 if index == 0 else gap))
            if line["id"] in forced_starts:
                start = max(start, forced_starts[line["id"]])
            line["start"] = round(start, 3)
            line["end"] = round(start + line["speech"], 3)
            prev_end = line["end"]
        overflow = prev_end - (duration - 0.7)
        if overflow <= 0.05:
            break
        shift += overflow * 0.9 + 0.1

    # never cut narration: let the chapter grow instead of squeezing gaps
    duration = max(duration, round(prev_end + 1.0, 3))

    # build blocks and cues
    blocks = []
    for block in chapter["blocks"]:
        lines = [line for line in line_entries if line["block"] == block["index"]]
        if lines:
            start = max(0.0, lines[0]["start"] - 0.55)
            end = min(duration, lines[-1]["end"] + 0.9)
        else:
            start = block["start"] - chapter["start"]
            end = block["end"] - chapter["start"]
        blocks.append(
            {
                "index": block["index"],
                "start": round(start, 3),
                "end": round(end, 3),
                "lineIds": [line["id"] for line in lines],
            }
        )
    if blocks:
        blocks[0]["start"] = 0.0
        for index in range(len(blocks) - 1):
            blocks[index]["end"] = blocks[index + 1]["start"]
        blocks[-1]["end"] = duration

    cues = []
    for index, line in enumerate(line_entries):
        next_start = (
            line_entries[index + 1]["start"] if index + 1 < len(line_entries) else duration
        )
        line_cues = build_cues(line)
        for cue in line_cues:
            start = max(line["start"], line["start"] + cue["relStart"])
            end = min(
                next_start - 0.05,
                line["start"] + cue["relEnd"],
                line["end"] + 0.25,
            )
            if end <= start + 0.12:
                end = start + 0.12
            cues.append(
                {
                    "lineId": line["id"],
                    "text": cue["text"],
                    "start": round(start, 3),
                    "end": round(end, 3),
                }
            )

    return {
        "id": chapter["id"],
        "title": chapter["title"],
        "start": chapter["start"],
        "duration": duration,
        "frames": int(math.ceil(duration * FPS)),
        "lines": [
            {
                "id": line["id"],
                "text": line["text"],
                "file": line["file"],
                "start": line["start"],
                "duration": line["duration"],
                "trimStart": line["trimStart"],
                "trimEnd": line["trimEnd"],
                "block": line["block"],
                "end": line["end"],
            }
            for line in line_entries
        ],
        "blocks": blocks,
        "cues": cues,
        "_meta": {
            "audioEnd": round(prev_end, 3),
            "overflow": round(max(0.0, prev_end - (duration - 0.7)), 3),
            "gap": round(gap, 3),
        },
    }


def main() -> None:
    script = json.load(open(SCRIPT, encoding="utf-8"))
    narration = json.load(open(NARRATION, encoding="utf-8"))
    chapters = []
    report = []
    cursor = 0.0
    for chapter in script["chapters"]:
        result = schedule_chapter(chapter, narration)
        result["start"] = round(cursor, 3)
        cursor += result["duration"]
        chapters.append(result)
        meta = result.pop("_meta")
        report.append(
            f"{result['id']} {result['title']}  "
            f"{result['duration']}s  audioEnd={meta['audioEnd']}s  "
            f"gap={meta['gap']}s  overflow={meta['overflow']}s  "
            f"{len(result['cues'])} cues"
        )
        print(report[-1])

    payload = {"fps": FPS, "chapters": chapters}
    with open(DST, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)
    with open(REPORT, "w", encoding="utf-8") as f:
        f.write("\n".join(report) + "\n")
        for chapter in chapters:
            f.write(f"\n## {chapter['id']} {chapter['title']}\n")
            for cue in chapter["cues"]:
                f.write(
                    f"{cue['start']:7.2f}-{cue['end']:7.2f}  {cue['text']}\n"
                )
    print(f"-> {DST}")


if __name__ == "__main__":
    main()
