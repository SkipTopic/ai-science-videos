"""Build the v2 timeline, paced by scene beats instead of planned block timecodes.

v1 sat each line at the *planned* block timecode from the v5 script, which left
330 s of dead air once TTS came in faster than planned. v2 lays beats end to end:

  beat = 0.55 s lead + line speech + 0.34 s between lines + 0.45 s tail,
  but never shorter than old_beat_duration / MAX_SPEED, so a designed visual
  beat cannot be squeezed into a flash.

Reads (read-only): v1 film.json, v1 chapter TSX (for beat boundaries),
                   voice/film/narration.json
Writes: v2 film.json, v2/docs/beats_v2.json, v2/docs/timing_map.md
"""

import json
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
WORK = os.path.dirname(HERE)
V1_FILM = os.path.join(WORK, "remotion-studio", "src", "data", "film.json")
V1_CH = os.path.join(WORK, "remotion-studio", "src", "film", "chapters")
NARRATION = os.path.join(WORK, "voice", "film", "narration.json")
NARRATION_V2 = os.path.join(HERE, "docs", "narration_v2.json")
OUT_FILM = os.path.join(HERE, "remotion-studio-v2", "src", "data", "film.json")
OUT_BEATS = os.path.join(HERE, "docs", "beats_v2.json")
MAP = os.path.join(HERE, "docs", "timing_map.md")

FPS = 30
LEAD = 0.55
INTRA = 0.34
TAIL = 0.45
MIN_BEAT = 1.6
MAX_SPEED = 2.0

LINE_PATCH = {
    "07-28": "上架之后，玩家骂它又卡又难用。到了年底，Steam 版还被 Valve 拒了。",
}

BEAT_RE = re.compile(r"<Beat from=\{([0-9.]+)\} to=\{([0-9.]+)\}")


def parse_beats(cid, duration):
    text = open(os.path.join(V1_CH, f"Ch{cid}.tsx"), encoding="utf-8").read()
    beats = [[float(a), float(b)] for a, b in BEAT_RE.findall(text)]
    if not beats:
        return [[0.0, duration]]
    beats[0][0] = 0.0
    beats[-1][1] = duration
    return beats


def main() -> None:
    v1 = json.load(open(V1_FILM, encoding="utf-8"))
    narration = json.load(open(NARRATION, encoding="utf-8"))
    audio = {item["id"]: item for item in narration["lines"]}
    trims = {}
    if os.path.exists(NARRATION_V2):
        for item in json.load(open(NARRATION_V2, encoding="utf-8"))["lines"]:
            if item.get("trimStart") is not None:
                trims[item["id"]] = (item["trimStart"], item["trimEnd"])
        audio.update({item["id"]: item for item in json.load(open(NARRATION_V2, encoding="utf-8"))["lines"]})

    chapters, beats_out, report = [], {}, ["# v2 时间轴（按场景节拍排）\n"]
    t_global = 105.0
    total = 0.0

    for ch in v1["chapters"]:
        cid = ch["id"]
        old_beats = parse_beats(cid, ch["duration"])
        lines = sorted(ch["lines"], key=lambda l: l["start"])

        buckets = [[] for _ in old_beats]
        for line in lines:
            idx = len(old_beats) - 1
            for i, (b0, b1) in enumerate(old_beats):
                if b0 - 0.01 <= line["start"] < b1:
                    idx = i
                    break
            buckets[idx].append(line)

        new_beats, cursor, new_lines = [], 0.0, []
        for i, ((b0, b1), members) in enumerate(zip(old_beats, buckets)):
            old_len = b1 - b0
            speech = sum(
                (trims.get(m["id"], (m["trimStart"], m["trimEnd"]))[1]
                 - trims.get(m["id"], (m["trimStart"], m["trimEnd"]))[0])
                for m in members
            )
            content = LEAD + speech + INTRA * max(0, len(members) - 1) + TAIL
            dur = round(max(content, min(MIN_BEAT, old_len), old_len / MAX_SPEED), 3)
            scale = round(old_len / dur, 4)

            t = cursor + LEAD
            for m in members:
                text = LINE_PATCH.get(m["id"], m["text"])
                ts, te = trims.get(m["id"], (m["trimStart"], m["trimEnd"]))
                sp = te - ts
                start = round(t, 3)
                end = round(start + sp, 3)
                new_lines.append(
                    {
                        "id": m["id"],
                        "text": text,
                        "file": m["file"],
                        "start": start,
                        "duration": audio[m["id"]]["duration"],
                        "trimStart": ts,
                        "trimEnd": te,
                        "block": m["block"],
                        "end": end,
                    }
                )
                t = end + INTRA
            new_beats.append(
                {
                    "index": i,
                    "old": [b0, b1],
                    "start": cursor,
                    "end": round(cursor + dur, 3),
                    "scale": scale,
                    "lines": [m["id"] for m in members],
                }
            )
            cursor = round(cursor + dur, 3)

        duration = round(cursor, 3)
        frames = int(round(duration * FPS))

        blocks = []
        for block in ch["blocks"]:
            members = [l for l in new_lines if l["block"] == block["index"]]
            if members:
                bs = round(max(0.0, members[0]["start"] - LEAD), 3)
                be = round(min(duration, members[-1]["end"] + TAIL), 3)
            else:
                bs, be = 0.0, duration
            blocks.append(
                {
                    "index": block["index"],
                    "start": bs,
                    "end": be,
                    "lineIds": [l["id"] for l in members],
                }
            )
        if blocks:
            blocks[0]["start"] = 0.0
            for i in range(len(blocks) - 1):
                blocks[i]["end"] = blocks[i + 1]["start"]
            blocks[-1]["end"] = duration

        cues = []
        old_by_id = {l["id"]: l for l in lines}
        for idx, line in enumerate(new_lines):
            old_line = old_by_id[line["id"]]
            nxt = new_lines[idx + 1]["start"] if idx + 1 < len(new_lines) else duration
            for cue in ch["cues"]:
                if cue["lineId"] != line["id"]:
                    continue
                start = max(line["start"], line["start"] + cue["start"] - old_line["start"])
                end = min(
                    nxt - 0.05,
                    line["start"] + cue["end"] - old_line["start"],
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

        chapters.append(
            {
                "id": cid,
                "title": ch["title"],
                "start": round(t_global, 3),
                "duration": duration,
                "frames": frames,
                "lines": new_lines,
                "blocks": blocks,
                "cues": cues,
            }
        )
        beats_out[cid] = new_beats
        report.append(
            f"## {cid} {ch['title']}  {ch['duration']:.1f}s -> {duration:.1f}s\n\n"
            "| beat | v1 | v2 | 速度 | 句数 |\n|---|---|---|---|---|\n"
            + "\n".join(
                f"| {b['index']} | {b['old'][0]:.2f}–{b['old'][1]:.2f} | {b['start']:.2f}–{b['end']:.2f} "
                f"| x{b['scale']:.2f} | {len(b['lines'])} |"
                for b in new_beats
            )
            + "\n"
        )
        t_global += duration
        total += duration

    payload = {"fps": FPS, "chapters": chapters}
    json.dump(payload, open(OUT_FILM, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    json.dump(beats_out, open(OUT_BEATS, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    report.append(
        f"\n---\n\n全片 {105 + total:.1f}s = {int((105 + total) // 60)}:{int((105 + total) % 60):02d}\n"
    )
    open(MAP, "w", encoding="utf-8").write("\n".join(report))

    for c in chapters:
        print(f"{c['id']}  {c['duration']:6.1f}s  frames {c['frames']:5d}")
    print(
        f"TOTAL {total:.1f}s + 105 = {105 + total:.1f}s = "
        f"{int((105 + total) // 60)}:{int((105 + total) % 60):02d}"
    )


if __name__ == "__main__":
    main()
