"""把逐句旁白排成 00 章时间轴，并切出句内字幕。"""

import json
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "rpg00", "narration.json")
DST = os.path.join(
    HERE,
    "..",
    "remotion-studio",
    "src",
    "data",
    "rpg00.json",
)

STARTS = {
    "00-01": 1.2,
    "00-02": 4.0,
    "00-03": 10.2,
    "00-04": 13.9,
    "00-05": 17.8,
    "00-06": 22.6,
    "00-07": 26.8,
    "00-08": 29.2,
    "00-09": 44.5,
    "00-10": 50.0,
    "00-11": 56.0,
    "00-12": 59.0,
    "00-13": 67.0,
    "00-14": 71.5,
    "00-15": 75.0,
    "00-16": 78.0,
    "00-17": 82.5,
}

FPS = 30
DURATION = 3150
PUNCT = "，。！？；、——"
PUNCT_RE = re.compile(f"[{PUNCT}]")
PHRASE_RE = re.compile(f"([^{PUNCT}]+[{PUNCT}]?)")


def normalize(text: str) -> str:
    return re.sub(r"[\s" + PUNCT + r"]", "", text)


def phrase_text(raw: str) -> str:
    return raw.strip().rstrip(PUNCT).strip()


def word_char_ranges(words):
    """返回 [(start_char, end_char, word)]，按 normalized 字符计。"""
    ranges = []
    cursor = 0
    for word in words:
        n = len(normalize(word["text"]))
        ranges.append((cursor, cursor + n, word))
        cursor += n
    return ranges


def time_for_char(ranges, index, use_end=False):
    for start, end, word in ranges:
        if start <= index < end:
            if use_end:
                return word["start"] + word["duration"]
            return word["start"]
    return ranges[-1][2]["start"] + ranges[-1][2]["duration"]


def split_phrase(raw: str, max_chars: int = 18):
    """按标点和长度切短语，尽量不切断 ASCII 词。"""
    parts = []
    for sentence in PHRASE_RE.findall(raw):
        if not sentence.strip():
            continue
        body = sentence.rstrip(PUNCT)
        suffix = sentence[len(body) :]
        while len(normalize(body)) > max_chars:
            cut = max_chars
            # 不要把一个英文字母/数字从中间切开
            while cut > 0 and body[cut - 1].isascii() and body[cut - 1].isalnum():
                cut -= 1
            if cut <= 0:
                cut = max_chars
            parts.append(body[:cut])
            body = body[cut:]
        if body.strip():
            parts.append(body + suffix)
    return parts


def main() -> None:
    data = json.load(open(SRC, encoding="utf-8"))
    lines = []
    cues = []
    for line in data["lines"]:
        start = STARTS[line["id"]]
        original = line["text"]
        raw_phrases = [original] if line["id"] == "00-10" else split_phrase(original)
        ranges = word_char_ranges(line["words"])
        cursor = 0
        line_cues = []
        for raw in raw_phrases:
            display = phrase_text(raw)
            if not display:
                continue
            normalized = normalize(raw)
            # 找到该短语在整行中的字符位置
            offset = normalize(original).find(normalized, cursor)
            if offset < 0:
                offset = cursor
            cursor = offset + len(normalized)
            first_char = offset
            last_char = offset + len(normalized) - 1
            cue_start = start + time_for_char(ranges, first_char)
            cue_end = start + time_for_char(ranges, last_char, use_end=True) + 0.18
            line_cues.append(
                {
                    "lineId": line["id"],
                    "text": display,
                    "start": round(max(start, cue_start), 3),
                    "end": round(min(start + line["duration"], cue_end), 3),
                }
            )
        for index, cue in enumerate(line_cues):
            if index + 1 < len(line_cues):
                cue["end"] = min(cue["end"], line_cues[index + 1]["start"] - 0.04)
        cues.extend(line_cues)
        lines.append(
            {
                "id": line["id"],
                "text": original,
                "file": line["file"],
                "start": start,
                "duration": line["duration"],
                "words": line["words"],
            }
        )

    payload = {
        "fps": FPS,
        "durationInFrames": DURATION,
        "voice": data["voice"],
        "lines": lines,
        "cues": cues,
    }
    os.makedirs(os.path.dirname(DST), exist_ok=True)
    with open(DST, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)
    print(f"{len(lines)} lines, {len(cues)} cues -> {DST}")
    for cue in cues:
        print(f"  {cue['start']:6.2f}-{cue['end']:6.2f}  {cue['text']}")


if __name__ == "__main__":
    main()
