# -*- coding: utf-8 -*-
"""补抓官方历史年表等页面。"""
import urllib.request, urllib.parse, ssl, os, re, time, json
from html.parser import HTMLParser

BASE = r"D:\作业\我写的小说\rpgmaker解说"
HTML_DIR = os.path.join(BASE, "01_资料库", "_raw_html")
TEXT_DIR = os.path.join(BASE, "01_资料库", "_raw_text")
PROXY = "http://127.0.0.1:7890"
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE


class TE(HTMLParser):
    SKIP = {"script", "style", "noscript", "svg", "nav", "footer", "header", "aside", "form"}
    BREAK = {"p", "div", "br", "li", "tr", "h1", "h2", "h3", "h4", "h5", "h6",
             "section", "article", "blockquote", "pre", "table", "td", "th"}

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.parts, self.skip = [], 0

    def handle_starttag(self, t, a):
        if t in self.SKIP:
            self.skip += 1
        elif t in self.BREAK:
            self.parts.append("\n")

    def handle_endtag(self, t):
        if t in self.SKIP:
            self.skip = max(0, self.skip - 1)
        elif t in self.BREAK:
            self.parts.append("\n")

    def handle_data(self, d):
        if self.skip == 0 and d.strip():
            self.parts.append(d.strip())

    def text(self):
        raw = "".join(p if p == "\n" else (p + " ") for p in self.parts)
        raw = raw.replace("\u00a0", " ")
        lines = [re.sub(r"[ \t]+", " ", x).strip() for x in raw.split("\n")]
        out, blank = [], 0
        for l in lines:
            if not l:
                blank += 1
                if blank > 1:
                    continue
            else:
                blank = 0
            out.append(l)
        return "\n".join(out).strip()


def decode(data, ctype):
    cands = []
    m = re.search(r"charset=([\w\-]+)", ctype or "", re.I)
    if m:
        cands.append(m.group(1))
    m2 = re.search(rb"<meta[^>]+charset=[\"']?([\w\-]+)", data[:6000], re.I)
    if m2:
        cands.append(m2.group(1).decode("ascii", "ignore"))
    cands += ["utf-8", "shift_jis", "euc-jp", "gb18030"]
    for c in cands:
        try:
            return data.decode(c)
        except Exception:
            continue
    return data.decode("utf-8", "replace")


def fetch(url, retries=3):
    opener = urllib.request.build_opener(
        urllib.request.ProxyHandler({"http": PROXY, "https": PROXY}),
        urllib.request.HTTPSHandler(context=CTX))
    opener.addheaders = [
        ("User-Agent", UA),
        ("Accept", "text/html,application/xhtml+xml,*/*;q=0.8"),
        ("Accept-Language", "en-US,en;q=0.9,ja;q=0.8"),
        ("Referer", "https://www.google.com/"),
    ]
    last = None
    for i in range(retries):
        try:
            r = opener.open(url, timeout=50)
            return r.read(), r.headers.get("Content-Type", ""), r.status
        except Exception as e:
            last = e
            time.sleep(2 + i * 4)
    raise last


TARGETS = [
    ("I_official", "I01_history_of_tkool_en", "官方年表 History of Tkool（英文，全版本）", "https://rpgmakerofficial.com/en?p=278"),
    ("I_official", "I02_history_of_tkool_ja", "官方年表 RPGツクールの歴史（日文）", "https://rpgmakerofficial.com/?p=278"),
    ("I_official", "I03_official_home_en", "RPG Maker 官方站首页（英文）", "https://rpgmakerofficial.com/en"),
    ("I_official", "I04_official_home_ja", "RPG Maker 官方站首页（日文）", "https://rpgmakerofficial.com/"),
    ("I_official", "I05_about_series", "官方系列介绍", "https://rpgmakerofficial.com/en?p=277"),
]

results = []
for group, slug, title, url in TARGETS:
    hdir = os.path.join(HTML_DIR, group)
    tdir = os.path.join(TEXT_DIR, group)
    os.makedirs(hdir, exist_ok=True)
    os.makedirs(tdir, exist_ok=True)
    hpath = os.path.join(hdir, slug + ".html")
    tpath = os.path.join(tdir, slug + ".txt")
    if os.path.exists(hpath) and os.path.getsize(hpath) > 5000:
        print("SKIP", slug)
        continue
    try:
        data, ctype, status = fetch(url)
        open(hpath, "wb").write(data)
        html = decode(data, ctype)
        p = TE()
        try:
            p.feed(html)
        except Exception:
            pass
        txt = p.text()
        hdr = (f"SOURCE: {url}\nTITLE: {title}\n"
               f"FETCHED: {time.strftime('%Y-%m-%d %H:%M:%S')}\n{'='*60}\n\n")
        open(tpath, "w", encoding="utf-8").write(hdr + txt)
        results.append((slug, len(data), len(txt), "OK"))
        print(f"OK   {slug:28s} {len(data):>9,d}B {len(txt):>7,d}c")
    except Exception as e:
        results.append((slug, 0, 0, f"FAIL {type(e).__name__}: {str(e)[:90]}"))
        print(f"FAIL {slug:28s} {type(e).__name__}: {str(e)[:80]}")
    time.sleep(1.0)

json.dump(results, open(os.path.join(BASE, "_fetch_log3.json"), "w", encoding="utf-8"),
          ensure_ascii=False, indent=1)
print("done")
