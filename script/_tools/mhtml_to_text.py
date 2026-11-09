# -*- coding: utf-8 -*-
"""mhtml → 纯文本 v2：用日文字符占比挑编码，解决 Shift_JIS 乱码。"""
import os, re, email
from email import policy
from html.parser import HTMLParser

BASE = r"D:\作业\我写的小说\rpgmaker解说"
SRC = os.path.join(BASE, "01_资料库", "我自己手动抓取的")
DST = os.path.join(BASE, "01_资料库", "_raw_text", "Z_archive")
os.makedirs(DST, exist_ok=True)


class TE(HTMLParser):
    SKIP = {"script", "style", "noscript", "svg", "head"}
    BREAK = {"p", "div", "br", "li", "tr", "h1", "h2", "h3", "h4", "h5", "h6",
             "section", "article", "table", "td", "th", "dd", "dt", "hr"}

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.parts, self.skip = [], 0
        self.title, self._t = "", False

    def handle_starttag(self, t, a):
        if t in self.SKIP:
            self.skip += 1
        elif t in self.BREAK:
            self.parts.append("\n")
        if t == "title":
            self._t = True
        if t == "img":
            alt = dict(a).get("alt")
            if alt:
                self.parts.append(f"[IMG:{alt}]")

    def handle_endtag(self, t):
        if t in self.SKIP:
            self.skip = max(0, self.skip - 1)
        elif t in self.BREAK:
            self.parts.append("\n")
        if t == "title":
            self._t = False

    def handle_data(self, d):
        if self._t:
            self.title += d.strip()
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


def jp_ratio(s):
    """只数假名。Shift_JIS 正确解码会得到大量假名，错误解码几乎为零。"""
    if not s:
        return 0.0
    kana = sum(1 for ch in s if "\u3040" <= ch <= "\u30ff")
    bad = sum(1 for ch in s if ch == "\ufffd" or "\ue000" <= ch <= "\uf8ff")
    return (kana - bad * 3) / len(s)


def best_decode(raw):
    best, best_score, best_enc = None, -9, "?"
    for enc in ["utf-8", "cp932", "shift_jis", "euc-jp", "gb18030", "latin-1"]:
        try:
            s = raw.decode(enc)
        except Exception:
            continue
        sc = jp_ratio(s)
        if sc > best_score:
            best, best_score, best_enc = s, sc, enc
    return best, best_enc, best_score


log = []
files = sorted(f for f in os.listdir(SRC) if f.lower().endswith(".mhtml"))
for fn in files:
    path = os.path.join(SRC, fn)
    slug = re.sub(r"[^\w\u4e00-\u9fff]+", "_", os.path.splitext(fn)[0]).strip("_")
    try:
        with open(path, "rb") as f:
            msg = email.message_from_binary_file(f, policy=policy.default)

        best_html, best_enc, best_sc = "", "?", -9
        for part in msg.walk():
            if part.get_content_type() != "text/html":
                continue
            raw = part.get_payload(decode=True)
            if not raw:
                continue
            s, enc, sc = best_decode(raw)
            if s and sc > best_sc:
                best_html, best_enc, best_sc = s, enc, sc

        if not best_html:
            log.append(f"NOHTML {fn}")
            continue

        p = TE()
        try:
            p.feed(best_html)
        except Exception:
            pass
        txt = p.text()

        header = (f"SOURCE: {fn}（本地 mhtml，用户手动从 Wayback Machine 保存）\n"
                  f"TITLE: {p.title}\n"
                  f"ENCODING: {best_enc} (jp_ratio={best_sc:.2f})\n"
                  f"{'=' * 60}\n\n")
        out = os.path.join(DST, f"M_{slug}.txt")
        open(out, "w", encoding="utf-8").write(header + txt)
        log.append(f"OK   {fn} -> {best_enc} ratio={best_sc:.2f} chars={len(txt):,}")
        print(f"OK   {fn}  enc={best_enc} ratio={best_sc:.2f} chars={len(txt):,}")
    except Exception as e:
        log.append(f"FAIL {fn} {type(e).__name__}: {str(e)[:120]}")
        print("FAIL", fn, type(e).__name__)

open(os.path.join(BASE, "_mhtml_log.txt"), "w", encoding="utf-8").write("\n".join(log))
print("done")
