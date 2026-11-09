# -*- coding: utf-8 -*-
"""慢速抓取 Wayback Machine 页面。429 限流时退避重试。"""
import urllib.request, ssl, os, time, re, json
from html.parser import HTMLParser

BASE = r"D:\作业\我写的小说\rpgmaker解说"
HTML_DIR = os.path.join(BASE, "01_资料库", "_raw_html", "Z_archive")
TEXT_DIR = os.path.join(BASE, "01_资料库", "_raw_text", "Z_archive")
LOG = os.path.join(BASE, "_archive_log.txt")
os.makedirs(HTML_DIR, exist_ok=True)
os.makedirs(TEXT_DIR, exist_ok=True)

PROXY = "http://127.0.0.1:7890"
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE


class TE(HTMLParser):
    SKIP = {"script", "style", "noscript", "svg"}
    BREAK = {"p", "div", "br", "li", "tr", "h1", "h2", "h3", "h4", "h5", "h6",
             "section", "article", "blockquote", "pre", "table", "td"}

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
    m2 = re.search(rb"<meta[^>]+charset=[\"']?([\w\-]+)", data[:8000], re.I)
    if m2:
        cands.append(m2.group(1).decode("ascii", "ignore"))
    cands += ["utf-8", "shift_jis", "euc-jp", "gb18030"]
    for c in cands:
        try:
            return data.decode(c)
        except Exception:
            continue
    return data.decode("utf-8", "replace")


def fetch(url, timeout=60):
    opener = urllib.request.build_opener(
        urllib.request.ProxyHandler({"http": PROXY, "https": PROXY}),
        urllib.request.HTTPSHandler(context=CTX))
    opener.addheaders = [
        ("User-Agent", UA),
        ("Accept", "text/html,application/xhtml+xml,*/*;q=0.8"),
        ("Accept-Language", "ja,en;q=0.8,zh;q=0.7"),
    ]
    r = opener.open(url, timeout=timeout)
    return r.read(), r.headers.get("Content-Type", ""), r.status


TARGETS = [
    ("Z01_ascii_2000", "ASCII 官网（2000 年）", "http://www.ascii.co.jp/"),
    ("Z02_enterbrain_tkool_2003", "enterbrain RPG Maker 官方站（2003 年）", "http://www.enterbrain.co.jp/tkool/"),
    ("Z03_tkool_jp_2000", "tkool.jp 早期（2000 年）", "http://www.tkool.jp/"),
    ("Z04_rpgmakerweb_2005", "RPG Maker 英文官网（2005 年）", "http://www.rpgmakerweb.com/"),
    ("Z05_ascii_1997", "ASCII 官网（1997 年）", "http://www.ascii.co.jp/"),
    ("Z06_enterbrain_2001", "enterbrain 官网（2001 年）", "http://www.enterbrain.co.jp/"),
]

YEAR = {
    "Z01_ascii_2000": "20000601",
    "Z02_enterbrain_tkool_2003": "20030601",
    "Z03_tkool_jp_2000": "20000601",
    "Z04_rpgmakerweb_2005": "20050601",
    "Z05_ascii_1997": "19970601",
    "Z06_enterbrain_2001": "20010601",
}

log = []
for slug, title, orig in TARGETS:
    hpath = os.path.join(HTML_DIR, slug + ".html")
    tpath = os.path.join(TEXT_DIR, slug + ".txt")
    if os.path.exists(hpath) and os.path.getsize(hpath) > 3000:
        log.append(f"SKIP {slug}")
        continue

    ts = YEAR[slug]
    tried = [
        f"https://web.archive.org/web/{ts}if_/{orig}",
        f"https://web.archive.org/web/{ts}/{orig}",
    ]
    got = False
    for attempt, u in enumerate(tried):
        for rnd in range(3):
            try:
                data, ctype, status = fetch(u)
                if len(data) < 800:
                    raise ValueError(f"too small {len(data)}")
                with open(hpath, "wb") as f:
                    f.write(data)
                html = decode(data, ctype)
                p = TE()
                try:
                    p.feed(html)
                except Exception:
                    pass
                txt = p.text()
                hdr = (f"SOURCE: {u}\nORIGINAL: {orig}\nTITLE: {title}\n"
                       f"FETCHED: {time.strftime('%Y-%m-%d %H:%M:%S')}\n{'='*60}\n\n")
                open(tpath, "w", encoding="utf-8").write(hdr + txt)
                log.append(f"OK   {slug} {len(data)}B {len(txt)}c  <- {u}")
                got = True
                break
            except Exception as e:
                msg = f"{type(e).__name__}: {str(e)[:90]}"
                log.append(f"  try{rnd+1} {slug} {msg}")
                if "429" in str(e):
                    time.sleep(75)
                else:
                    time.sleep(15)
        if got:
            break
    if not got:
        log.append(f"FAIL {slug}")
    time.sleep(45)

open(LOG, "w", encoding="utf-8").write("\n".join(log))
print("done")
