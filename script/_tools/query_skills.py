# -*- coding: utf-8 -*-
import urllib.request, urllib.parse, json, os, time

OUT = r"D:\作业\我写的小说\rpgmaker解说\_skills_search.txt"
QUERIES = ["video animation", "remotion", "manim", "视频制作", "blender", "motion graphics", "subtitle"]
lines = []

for q in QUERIES:
    url = "https://lightmake.site/api/v1/search?q=" + urllib.parse.quote(q) + "&limit=8"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        data = urllib.request.urlopen(req, timeout=25).read()
        obj = json.loads(data.decode("utf-8", "replace"))
        res = obj.get("results") or obj.get("data") or []
        lines.append(f"\n===== {q} ===== ({len(res)} hits)")
        for r in res[:8]:
            name = r.get("displayName") or r.get("name") or r.get("slug")
            slug = r.get("slug", "")
            score = r.get("score", 0)
            desc = r.get("description_zh") or r.get("description") or ""
            dl = r.get("downloads", 0)
            lines.append(f"- {name}  [{slug}]  score={score:.2f}  dl={dl}")
            lines.append(f"    {desc[:130]}")
    except Exception as e:
        lines.append(f"\n===== {q} ===== FAIL {type(e).__name__}: {str(e)[:100]}")
    time.sleep(0.5)

open(OUT, "w", encoding="utf-8").write("\n".join(lines))
print("done")
