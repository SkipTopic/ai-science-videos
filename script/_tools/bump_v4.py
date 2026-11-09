# -*- coding: utf-8 -*-
"""v4：把 03 章小节及之后的所有标题时间码统一 +35 秒。"""
import io, re

PATH = r"D:\作业\我写的小说\rpgmaker解说\02_文案\解说文案_全片_v4.md"
DELTA = 35

with io.open(PATH, "r", encoding="utf-8") as f:
    lines = f.read().split("\n")

start = end = None
for i, ln in enumerate(lines):
    if ln.startswith("## 03｜") and start is None:
        start = i
    if start is not None and ln.startswith("## 附"):
        end = i
        break
if end is None:
    end = len(lines)

if start is None:
    print("ABORT: 找不到 03 章")
    raise SystemExit(1)


def bump(m):
    total = int(m.group(1)) * 60 + int(m.group(2)) + DELTA
    return f"{total // 60}:{total % 60:02d}"


n = 0
for i in range(start + 1, end):
    ln = lines[i]
    if not ln.startswith("#"):
        continue
    new = re.sub(r"(\d{1,2}):(\d{2})", bump, ln)
    if new != ln:
        lines[i] = new
        n += 1

with io.open(PATH, "w", encoding="utf-8", newline="\n") as f:
    f.write("\n".join(lines))

print(f"OK 调整 {n} 行（范围 {start+1}-{end}）")
