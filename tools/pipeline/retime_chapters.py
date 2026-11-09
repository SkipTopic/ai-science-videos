"""Rewrite chapter timing from docs/beats_v2.json.

Beats are rewritten positionally (they are contiguous and in document order);
every sound cue is remapped through the beat that contains it, using the same
speed factor as that beat's scene clock.
"""

import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
BEATS = os.path.join(HERE, "docs", "beats_v2.json")
SRC = os.path.join(HERE, "remotion-studio-v2", "src", "film", "chapters")
REPORT = os.path.join(HERE, "docs", "retime_report.md")

BEAT_RE = re.compile(r"<Beat from=\{([0-9.]+)\} to=\{([0-9.]+)\}(?: scale=\{[0-9.]+\})?")
SFX_RE = re.compile(r"at: ([0-9.]+), file:")


def main():
    write = "--write" in sys.argv
    beats = json.load(open(BEATS, encoding="utf-8"))
    report = ["# 章节节拍重写报告\n"]
    for cid in sorted(beats):
        layout = beats[cid]
        path = os.path.join(SRC, f"Ch{cid}.tsx")
        text = open(path, encoding="utf-8").read()

        counter = {"i": 0}

        def beat_sub(m):
            i = counter["i"]
            counter["i"] += 1
            if i >= len(layout):
                return m.group(0)
            b = layout[i]
            prop = f" scale={{{b['scale']:.4f}}}" if abs(b["scale"] - 1) > 0.015 else ""
            return f"<Beat from={{{b['start']:.2f}}} to={{{b['end']:.2f}}}{prop}"

        text = BEAT_RE.sub(beat_sub, text)

        def sfx_sub(m):
            t = float(m.group(1))
            for b in layout:
                if b["old"][0] - 0.01 <= t < b["old"][1] or (
                    b is layout[-1] and t >= b["old"][0]
                ):
                    nt = b["start"] + (t - b["old"][0]) / (b["scale"] or 1.0)
                    return f"at: {nt:.2f}, file:"
            return m.group(0)

        text = SFX_RE.sub(sfx_sub, text)
        if write:
            open(path, "w", encoding="utf-8").write(text)
        report.append(
            f"## {cid}\n\n节拍 {len(layout)} 个，重写 {counter['i']} 个\n"
            + "\n".join(
                f"- beat {b['index']}: {b['old'][0]:.2f}-{b['old'][1]:.2f} -> "
                f"{b['start']:.2f}-{b['end']:.2f}  x{b['scale']:.2f}"
                for b in layout
            )
            + "\n"
        )
        print(f"{cid}: beats {len(layout)} rewritten {counter['i']}")
    open(REPORT, "w", encoding="utf-8").write("\n".join(report))


if __name__ == "__main__":
    main()
