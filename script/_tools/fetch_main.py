# -*- coding: utf-8 -*-
"""批量抓取资料网页，保存原始 HTML + 提取正文纯文本 + 生成索引。"""
import urllib.request, urllib.parse, ssl, os, re, time, json, sys
from html.parser import HTMLParser
from html import unescape

BASE = r"D:\作业\我写的小说\rpgmaker解说"
HTML_DIR = os.path.join(BASE, "01_资料库", "_raw_html")
TEXT_DIR = os.path.join(BASE, "01_资料库", "_raw_text")
PROXY = "http://127.0.0.1:7890"

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")

CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE


class TextExtractor(HTMLParser):
    SKIP = {"script", "style", "noscript", "svg", "nav", "footer", "header", "aside", "form"}
    BREAK = {"p", "div", "br", "li", "tr", "h1", "h2", "h3", "h4", "h5", "h6",
             "section", "article", "blockquote", "pre", "table"}

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.parts = []
        self.skip = 0

    def handle_starttag(self, tag, attrs):
        if tag in self.SKIP:
            self.skip += 1
        elif tag in self.BREAK:
            self.parts.append("\n")

    def handle_endtag(self, tag):
        if tag in self.SKIP:
            self.skip = max(0, self.skip - 1)
        elif tag in self.BREAK:
            self.parts.append("\n")

    def handle_data(self, data):
        if self.skip == 0:
            t = data.strip()
            if t:
                self.parts.append(t)

    def text(self):
        raw = "".join(
            p if p == "\n" else (p + " ") for p in self.parts
        )
        raw = raw.replace("\u00a0", " ")
        lines = [re.sub(r"[ \t]+", " ", ln).strip() for ln in raw.split("\n")]
        out, blank = [], 0
        for ln in lines:
            if not ln:
                blank += 1
                if blank > 1:
                    continue
            else:
                blank = 0
            out.append(ln)
        return "\n".join(out).strip()


def decode(data, ctype):
    cands = []
    m = re.search(r"charset=([\w\-]+)", ctype or "", re.I)
    if m:
        cands.append(m.group(1))
    m2 = re.search(rb"<meta[^>]+charset=[\"']?([\w\-]+)", data[:6000], re.I)
    if m2:
        cands.append(m2.group(1).decode("ascii", "ignore"))
    cands += ["utf-8", "gb18030", "shift_jis", "euc-jp", "big5"]
    for c in cands:
        try:
            return data.decode(c)
        except Exception:
            continue
    return data.decode("utf-8", "replace")


def norm_url(u):
    if any(ord(ch) > 127 for ch in u):
        return urllib.parse.quote(u, safe=":/?&=#%+")
    return u


def fetch(url, retries=3):
    opener = urllib.request.build_opener(
        urllib.request.ProxyHandler({"http": PROXY, "https": PROXY}),
        urllib.request.HTTPSHandler(context=CTX))
    opener.addheaders = [
        ("User-Agent", UA),
        ("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"),
        ("Accept-Language", "zh-CN,zh;q=0.9,ja;q=0.8,en;q=0.7"),
    ]
    last = None
    for i in range(retries):
        try:
            r = opener.open(norm_url(url), timeout=40)
            return r.read(), r.headers.get("Content-Type", ""), r.status
        except Exception as e:
            last = e
            time.sleep(2 + i * 4)
    raise last


TARGETS = [
    # ---- A 公司史 ----
    ("A_company", "A01_ascii_corp_en", "ASCII Corporation 公司（英文维基）", "https://en.wikipedia.org/wiki/ASCII_Corporation"),
    ("A_company", "A02_ascii_corp_ja", "アスキー 公司（日文维基）", "https://ja.wikipedia.org/wiki/アスキー_(企業)"),
    ("A_company", "A03_nishi_kazuhiko_en", "西和彦 生平（英文维基）", "https://en.wikipedia.org/wiki/Kazuhiko_Nishi"),
    ("A_company", "A04_nishi_kazuhiko_ja", "西和彦 生平（日文维基）", "https://ja.wikipedia.org/wiki/西和彦"),
    ("A_company", "A05_enterbrain_en", "Enterbrain（英文维基）", "https://en.wikipedia.org/wiki/Enterbrain"),
    ("A_company", "A06_enterbrain_ja", "エンターブレイン（日文维基）", "https://ja.wikipedia.org/wiki/エンターブレイン"),
    ("A_company", "A07_kadokawa_ja", "KADOKAWA 沿革（日文维基）", "https://ja.wikipedia.org/wiki/KADOKAWA"),
    ("A_company", "A08_msx_ja", "MSX 标准（日文维基）", "https://ja.wikipedia.org/wiki/MSX"),
    ("A_company", "A09_msx_en", "MSX 标准（英文维基）", "https://en.wikipedia.org/wiki/MSX"),
    ("A_company", "A10_ascii_microsoft", "ASCII Microsoft（英文维基）", "https://en.wikipedia.org/wiki/ASCII_Microsoft"),

    # ---- B RPG Maker 本体 ----
    ("B_rpgmaker", "B01_rpgmaker_en", "RPG Maker 系列（英文维基）", "https://en.wikipedia.org/wiki/RPG_Maker"),
    ("B_rpgmaker", "B02_rpgmaker_ja", "RPGツクール（日文维基）", "https://ja.wikipedia.org/wiki/RPGツクール"),
    ("B_rpgmaker", "B03_rpgmaker_fandom", "RPG Maker Wiki（Fandom）", "https://rpgmaker.fandom.com/wiki/RPG_Maker"),
    ("B_rpgmaker", "B04_dante98_fandom", "Dante 98 专页（Fandom）", "https://rpgm.fandom.com/wiki/RPG_Tsuk%C5%ABru_Dante_98"),
    ("B_rpgmaker", "B05_official_en", "RPG Maker 官方站（全球）", "https://www.rpgmakerweb.com/"),
    ("B_rpgmaker", "B06_official_ja", "RPG Maker 官方站（日本）", "https://tkool.jp/"),
    ("B_rpgmaker", "B07_unite", "RPG Maker Unite 官网", "https://rpgmakerunite.com/"),
    ("B_rpgmaker", "B08_ggg", "Gotcha Gotcha Games 官网", "https://www.gotchagotcha.jp/"),

    # ---- C 作品 ----
    ("C_games", "C01_yume_nikki", "梦日记 Yume Nikki（英文维基）", "https://en.wikipedia.org/wiki/Yume_Nikki"),
    ("C_games", "C02_ib", "Ib（英文维基）", "https://en.wikipedia.org/wiki/Ib_(video_game)"),
    ("C_games", "C03_witch_house", "魔女之家（英文维基）", "https://en.wikipedia.org/wiki/The_Witch%27s_House"),
    ("C_games", "C04_ao_oni", "青鬼 Ao Oni（英文维基）", "https://en.wikipedia.org/wiki/Ao_Oni"),
    ("C_games", "C05_to_the_moon", "去月球 To the Moon（英文维基）", "https://en.wikipedia.org/wiki/To_the_Moon_(video_game)"),
    ("C_games", "C06_omori", "OMORI（英文维基）", "https://en.wikipedia.org/wiki/Omori_(video_game)"),
    ("C_games", "C07_corpse_party", "尸体派对（英文维基）", "https://en.wikipedia.org/wiki/Corpse_Party"),
    ("C_games", "C08_lisa", "Lisa: The Painful（英文维基）", "https://en.wikipedia.org/wiki/Lisa:_The_Painful"),
    ("C_games", "C09_oneshot", "OneShot（英文维基）", "https://en.wikipedia.org/wiki/OneShot"),
    ("C_games", "C10_off", "OFF（英文维基）", "https://en.wikipedia.org/wiki/Off_(video_game)"),

    # ---- D 文章与中文资料 ----
    ("D_articles", "D01_pcgamer_secret_history", "PC Gamer：RPG Maker 秘史", "https://www.pcgamer.com/the-secret-history-of-underdog-game-engine-rpg-maker-and-how-it-got-its-bad-reputation/"),
    ("D_articles", "D02_otherstrangeness_donmiguel", "Other Strangeness：Don Miguel 与西方传播", "https://www.otherstrangeness.com/2024/07/09/rpgmaker-2000"),
    ("D_articles", "D03_gematsu_ggg_interview", "Gematsu：Gotcha Gotcha Games 采访", "https://www.gematsu.com/2021/07/gotcha-gotcha-games-interview-with-producer-yusuke-morino"),
    ("D_articles", "D04_gamersky_history", "游民星空：RPG 制作大师简史", "https://wap.gamersky.com/gl/Content-1315926.html"),
    ("D_articles", "D05_baidu_nishi", "百度百科：西和彦", "https://baike.baidu.com/item/西和彦/6517770"),
    ("D_articles", "D06_baidu_heian", "百度百科：黑暗圣剑传说", "https://baike.baidu.com/item/黑暗圣剑传说/8680629"),
    ("D_articles", "D07_baidu_rpgmaker", "百度百科：RPG Maker 版本参数", "https://baike.baidu.com/view/513945.htm"),
    ("D_articles", "D08_sina_heian", "新浪游戏：黑暗圣剑传说发布页（2005）", "https://games.sina.com.cn/downgames/demo/pcgames/2005-09-29/113293752.shtml"),
    ("D_articles", "D09_square_enix_dq", "Square Enix：勇者斗恶龙系列指南", "https://www.square-enix.com/asia/dragonquest-series-guide/zh-CHT_tw/"),
    ("D_articles", "D10_moegirl_enterbrain", "萌娘百科：Enterbrain 沿革", "https://zh.moegirl.org.cn/zh/Enterbrain"),
]


def main():
    results = []
    for group, slug, title, url in TARGETS:
        hdir = os.path.join(HTML_DIR, group)
        tdir = os.path.join(TEXT_DIR, group)
        os.makedirs(hdir, exist_ok=True)
        os.makedirs(tdir, exist_ok=True)
        hpath = os.path.join(hdir, slug + ".html")
        tpath = os.path.join(tdir, slug + ".txt")

        if os.path.exists(hpath) and os.path.getsize(hpath) > 5000:
            results.append({"group": group, "slug": slug, "title": title, "url": url,
                            "status": "SKIP(已存在)", "bytes": os.path.getsize(hpath), "chars": 0})
            print("SKIP", slug)
            continue

        t0 = time.time()
        try:
            data, ctype, status = fetch(url)
            with open(hpath, "wb") as f:
                f.write(data)
            html = decode(data, ctype)
            p = TextExtractor()
            try:
                p.feed(html)
            except Exception:
                pass
            txt = p.text()
            header = f"SOURCE: {url}\nTITLE: {title}\nFETCHED: {time.strftime('%Y-%m-%d %H:%M:%S')}\n{'='*60}\n\n"
            with open(tpath, "w", encoding="utf-8") as f:
                f.write(header + txt)
            results.append({"group": group, "slug": slug, "title": title, "url": url,
                            "status": f"OK {status}", "bytes": len(data), "chars": len(txt)})
            print(f"OK   {slug:32s} {len(data):>9,d}B  {len(txt):>8,d}chars  {time.time()-t0:.1f}s")
        except Exception as e:
            results.append({"group": group, "slug": slug, "title": title, "url": url,
                            "status": f"FAIL {type(e).__name__}: {str(e)[:120]}",
                            "bytes": 0, "chars": 0})
            print(f"FAIL {slug:32s} {type(e).__name__}: {str(e)[:100]}")
        time.sleep(0.8)

    with open(os.path.join(BASE, "_fetch_log.json"), "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=1)

    ok = sum(1 for r in results if r["status"].startswith("OK"))
    skip = sum(1 for r in results if r["status"].startswith("SKIP"))
    fail = len(results) - ok - skip
    print(f"\n=== OK {ok} / SKIP {skip} / FAIL {fail} ===")


if __name__ == "__main__":
    main()
