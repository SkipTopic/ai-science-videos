# -*- coding: utf-8 -*-
"""按行精确替换 v3 的小节时间码，避免连锁替换。"""
import io

PATH = r"D:\作业\我写的小说\rpgmaker解说\02_文案\解说文案_全片_v3.md"

MAP = {
    "### 10:15–11:05（全片情感最高点，给足 50 秒）": "### 11:10–12:00（全片情感最高点，给足 50 秒）",
    "### 11:05–11:30": "### 12:00–12:25",
    "### 11:30–11:50": "### 12:25–12:45",
    "### 11:50–12:10": "### 12:45–13:05",
    "### 12:10–12:30": "### 13:05–13:25",
    "### 12:30–12:50": "### 13:25–13:45",
    "### 12:50–13:15": "### 13:45–14:10",
    "### 13:15–13:35": "### 14:10–14:30",
    "### 13:35–13:50": "### 14:30–14:45",
    "### 13:50–14:05": "### 14:45–15:00",
}

with io.open(PATH, "r", encoding="utf-8") as f:
    lines = f.read().split("\n")

changed = 0
for i, ln in enumerate(lines):
    key = ln.strip()
    if key in MAP:
        lines[i] = MAP[key]
        changed += 1

with io.open(PATH, "w", encoding="utf-8", newline="\n") as f:
    f.write("\n".join(lines))

print("changed", changed, "of", len(MAP))
