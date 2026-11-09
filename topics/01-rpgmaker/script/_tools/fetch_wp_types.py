# -*- coding: utf-8 -*-
"""探测 WordPress REST 的自定义 post type，抓取官方产品年表。"""
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
    return r.read(), r.status


log = []
try:
    data, st = get("https://rpgmakerofficial.com/wp-json/wp/v2/types")
    types = json.loads(data.decode("utf-8", "replace"))
    log.append("TYPES: " + ", ".join(f"{k}({v.get('rest_base')})" for k, v in types.items()))
    print("TYPES:", ", ".join(types.keys()))
except Exception as e:
    log.append(f"TYPES FAIL {type(e).__name__}: {e}")
    print("TYPES FAIL", e)
    types = {}

candidates = []
for k, v in types.items():
    rb = v.get("rest_base") or k
    if rb in ("pages", "posts", "media", "users", "comments", "categories", "tags",
              "settings", "types", "statuses", "taxonomies", "themes", "menus",
              "menu-items", "menu-locations", "blocks", "block-types", "templates",
              "template-parts", "global-styles", "navigation", "font-families"):
        continue
    candidates.append(rb)

# 兜底：常见的名称也试一遍
for extra in ["history", "product", "maker", "item", "archive"]:
    if extra not in candidates:
        candidates.append(extra)

log.append("CANDIDATES: " + ", ".join(candidates))

os.makedirs(OUTDIR, exist_ok=True)
os.makedirs(TEXTDIR, exist_ok=True)

for rb in candidates:
    url = f"https://rpgmakerofficial.com/wp-json/wp/v2/{rb}?per_page=100"
    try:
        data, st = get(url)
        obj = json.loads(data.decode("utf-8", "replace"))
        if not isinstance(obj, list) or not obj:
            log.append(f"EMPTY {rb}")
            continue
        n = len(obj)
        chunks = []
        for it in obj:
            if not isinstance(it, dict):
                continue
            t = it.get("title", {})
            title = t.get("rendered", "") if isinstance(t, dict) else str(t)
            c = it.get("content", {})
            content = c.get("rendered", "") if isinstance(c, dict) else str(c)
            meta = it.get("meta", {})
            link = it.get("link", "")
            p = TE()
            try:
                p.feed(content)
            except Exception:
                pass
            body = p.text()
            chunks.append(
                f"\n\n## {title}\nLINK: {link}\nMETA: {json.dumps(meta, ensure_ascii=False)[:600]}\n\n{body}")
        txt = "".join(chunks)
        if len(txt) < 400:
            log.append(f"THIN {rb} n={n} chars={len(txt)}")
            continue
        open(os.path.join(TEXTDIR, f"I20_wp_{rb}.txt"), "w", encoding="utf-8").write(
            f"SOURCE: https://rpgmakerofficial.com/wp-json/wp/v2/{rb}\n"
            f"TITLE: WordPress custom post type '{rb}' ({n} items)\n{'='*60}\n" + txt)
        open(os.path.join(OUTDIR, f"I20_wp_{rb}.json"), "w", encoding="utf-8").write(
            json.dumps(obj, ensure_ascii=False, indent=1))
        log.append(f"OK {rb} items={n} chars={len(txt)}")
        print(f"OK   {rb:20s} items={n:<4d} chars={len(txt):,}")
    except Exception as e:
        log.append(f"FAIL {rb} {type(e).__name__}: {str(e)[:100]}")
    time.sleep(0.7)

open(os.path.join(BASE, "_wp_types_log.txt"), "w", encoding="utf-8").write("\n".join(log))
print("done")
