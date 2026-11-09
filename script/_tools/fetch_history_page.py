# -*- coding: utf-8 -*-
"""抓 history 页面源码，并从中提取可能的 JSON/API 线索。"""
import urllib.request, ssl, os, re

BASE = r"D:\作业\我写的小说\rpgmaker解说"
OUT = os.path.join(BASE, "01_资料库", "_raw_html", "I_official", "I30_history_page.html")
PROXY = "http://127.0.0.1:7890"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE

op = urllib.request.build_opener(
    urllib.request.ProxyHandler({"http": PROXY, "https": PROXY}),
    urllib.request.HTTPSHandler(context=CTX))
op.addheaders = [("User-Agent", UA), ("Accept", "text/html,*/*")]

url = "https://rpgmakerofficial.com/contents/history/"
data = op.open(url, timeout=50).read()
open(OUT, "wb").write(data)
html = data.decode("utf-8", "replace")

clues = []
for pat in [r'src="([^"]+\.js[^"]*)"', r'["\']([^"\']*\.json[^"\']*)["\']',
            r'(/wp-json/[^"\'\s]+)', r'(history[^"\'\s]{0,60})']:
    for m in re.findall(pat, html)[:40]:
        if isinstance(m, tuple):
            m = m[0]
        clues.append(m)

lines = [f"URL: {url}", f"BYTES: {len(data)}", "", "=== CLUES ==="]
for c in dict.fromkeys(clues):
    lines.append(c)
lines.append("")
lines.append("=== has keyword? ===")
for kw in ["Dante", "Mamirin", "1988", "1992", "ツクール95", "product"]:
    lines.append(f"{kw}: {html.count(kw)}")

open(os.path.join(BASE, "_history_clues.txt"), "w", encoding="utf-8").write("\n".join(lines))
print("saved", len(data))
