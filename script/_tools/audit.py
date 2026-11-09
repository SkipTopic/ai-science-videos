# -*- coding: utf-8 -*-
"""体检：列出所有已抓文本的字数、内容指纹、首行标题，找出重复与空壳。"""
import os, hashlib, re, json

BASE = r"D:\作业\我写的小说\rpgmaker解说\01_资料库\_raw_text"
rows = []

for root, dirs, files in os.walk(BASE):
    for fn in sorted(files):
        if not fn.endswith(".txt"):
            continue
        p = os.path.join(root, fn)
        group = os.path.basename(root)
        raw = open(p, "r", encoding="utf-8", errors="replace").read()
        body = raw.split("=" * 60, 1)[-1].strip()
        # 取正文前 40 个词做指纹，避开页头
        fp = hashlib.md5(re.sub(r"\s+", "", body[:3000]).encode("utf-8")).hexdigest()[:8]
        # 猜标题：正文第一个 <=80 字的非空行
        first = ""
        for ln in body.split("\n")[:40]:
            ln = ln.strip()
            if 2 < len(ln) <= 80:
                first = ln
                break
        rows.append({
            "group": group,
            "file": fn,
            "chars": len(body),
            "fp": fp,
            "head": first[:70],
        })

# 找重复
by_fp = {}
for r in rows:
    by_fp.setdefault(r["fp"], []).append(r["file"])

out = []
out.append(f"共 {len(rows)} 个文本文件\n")
out.append("=== 按字数排序 ===")
for r in sorted(rows, key=lambda x: -x["chars"]):
    out.append(f"{r['chars']:>8,d}  {r['group']:<14} {r['file']:<34} {r['head']}")

out.append("\n=== 重复组（内容指纹相同） ===")
dup = {k: v for k, v in by_fp.items() if len(v) > 1}
if not dup:
    out.append("无")
for k, v in dup.items():
    out.append(f"[{k}] " + " | ".join(v))

out.append("\n=== 疑似空壳（<1500 字） ===")
for r in rows:
    if r["chars"] < 1500:
        out.append(f"{r['chars']:>6,d}  {r['group']:<14} {r['file']:<34} {r['head']}")

open(r"D:\作业\我写的小说\rpgmaker解说\_audit.txt", "w", encoding="utf-8").write("\n".join(out))
print("done", len(rows))
