# -*- coding: utf-8 -*-
"""尝试通过 WordPress REST API 取官方年表正文。"""
import urllib.request, ssl, json, os, re, time
from html.parser import HTMLParser

BASE = r"D:\作业\我写的小说\rpgmaker解说"
OUTDIR = os.path.join(BASE, "01_资料库", "_raw_html", "I_official")
TEXTDIR = os.path.join(BASE, "01_资料库", "_raw_text", "I_official")
PROXY = "http://127.0.0.1:7890"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE


class TE(HTMLParser):
    SKIP = {"script", "style", "noscript", "svg"}
    BREAK = {"p", "div", "br", "li", "tr", "h1", "h2", "h3", "h4", "h5", "h6",
             "section", "article", "table", "td", "th", "dd", "dt"}

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


def get(url):
    op = urllib.request.build_opener(
        urllib.request.ProxyHandler({"http": PROXY, "https": PROXY}),
        urllib.request.HTTPSHandler(context=CTX))
    op.addheaders = [("User-Agent", UA), ("Accept", "application/json,*/*")]
    r = op.open(url, timeout=50)
    return r.read(), r.status, r.headers.get("Content-Type", "")


CANDIDATES = [
    ("I10_wp_page_278_en", "https://rpgmakerofficial.com/en/wp-json/wp/v2/pages/278"),
    ("I11_wp_page_278_ja", "https://rpgmakerofficial.com/wp-json/wp/v2/pages/278"),
    ("I12_wp_pages_en", "https://rpgmakerofficial.com/en/wp-json/wp/v2/pages?per_page=100"),
    ("I13_wp_pages_ja", "https://rpgmakerofficial.com/wp-json/wp/v2/pages?per_page=100"),
]

os.makedirs(OUTDIR, exist_ok=True)
os.makedirs(TEXTDIR, exist_ok=True)
log = []

for slug, url in CANDIDATES:
    try:
        data, status, ctype = get(url)
        txt = data.decode("utf-8", "replace")
        if not txt.strip().startswith(("[", "{")):
            log.append(f"NOTJSON {slug} {status} {txt[:120]}")
            print("NOTJSON", slug)
            continue
        obj = json.loads(txt)
        items = obj if isinstance(obj, list) else [obj]
        log.append(f"OK {slug} status={status} items={len(items)} bytes={len(data)}")

        # 保存原始 json
        open(os.path.join(OUTDIR, slug + ".json"), "w", encoding="utf-8").write(
            json.dumps(obj, ensure_ascii=False, indent=1))

        chunks = []
        for it in items:
            title = ""
            if isinstance(it, dict):
                t = it.get("title")
                if isinstance(t, dict):
                    title = t.get("rendered", "")
                elif isinstance(t, str):
                    title = t
                link = it.get("link", "")
                content = ""
                c = it.get("content")
                if isinstance(c, dict):
                    content = c.get("rendered", "")
                elif isinstance(c, str):
                    content = c
                if content:
                    p = TE()
                    try:
                        p.feed(content)
                    except Exception:
                        pass
                    chunks.append(f"\n\n## {title}\nURL: {link}\n\n{p.text()}")
        if chunks:
            open(os.path.join(TEXTDIR, slug + ".txt"), "w", encoding="utf-8").write(
                f"SOURCE: {url}\nTITLE: WordPress REST API dump\n{'='*60}\n" + "".join(chunks))
            print(f"OK   {slug} items={len(items)} text={sum(len(c) for c in chunks):,}")
        else:
            print(f"OK   {slug} items={len(items)} but no content field")
    except Exception as e:
        log.append(f"FAIL {slug} {type(e).__name__}: {str(e)[:120]}")
        print("FAIL", slug, type(e).__name__, str(e)[:80])
    time.sleep(1)

open(os.path.join(BASE, "_wp_log.txt"), "w", encoding="utf-8").write("\n".join(log))
print("done")
