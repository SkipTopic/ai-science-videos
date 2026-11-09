# -*- coding: utf-8 -*-
"""重试失败项（国内站直连 / Fandom 换头），并补充抓取更多条目。"""
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
CN_HOSTS = ("baidu.com", "gamersky.com", "sina.com.cn", "moegirl.org.cn",
            "bilibili.com", "qq.com", "163.com", "sohu.com", "zhihu.com")


class TextExtractor(HTMLParser):
    SKIP = {"script", "style", "noscript", "svg", "nav", "footer", "header", "aside", "form"}
    BREAK = {"p", "div", "br", "li", "tr", "h1", "h2", "h3", "h4", "h5", "h6",
             "section", "article", "blockquote", "pre", "table"}

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.parts, self.skip = [], 0

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
        raw = "".join(p if p == "\n" else (p + " ") for p in self.parts)
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
    return urllib.parse.quote(u, safe=":/?&=#%+") if any(ord(c) > 127 for c in u) else u


def fetch(url, retries=3):
    host = urllib.parse.urlparse(url).netloc
    handlers = [urllib.request.HTTPSHandler(context=CTX)]
    if any(h in host for h in CN_HOSTS):
        handlers.append(urllib.request.ProxyHandler({}))
        mode = "直连"
    else:
        handlers.append(urllib.request.ProxyHandler({"http": PROXY, "https": PROXY}))
        mode = "代理"
    opener = urllib.request.build_opener(*handlers)
    opener.addheaders = [
        ("User-Agent", UA),
        ("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"),
        ("Accept-Language", "zh-CN,zh;q=0.9,ja;q=0.8,en;q=0.7"),
        ("Referer", "https://www.google.com/"),
        ("Upgrade-Insecure-Requests", "1"),
        ("Sec-Fetch-Dest", "document"),
        ("Sec-Fetch-Mode", "navigate"),
        ("Sec-Fetch-Site", "cross-site"),
    ]
    last = None
    for i in range(retries):
        try:
            r = opener.open(norm_url(url), timeout=45)
            return r.read(), r.headers.get("Content-Type", ""), r.status, mode
        except Exception as e:
            last = e
            time.sleep(2 + i * 3)
    raise last


TARGETS = [
    # 重试
    ("B_rpgmaker", "B03_rpgmaker_fandom", "RPG Maker Wiki（Fandom）", "https://rpgmaker.fandom.com/wiki/RPG_Maker"),
    ("B_rpgmaker", "B04_dante98_fandom", "Dante 98 专页（Fandom）", "https://rpgm.fandom.com/wiki/RPG_Tsuk%C5%ABru_Dante_98"),
    ("D_articles", "D04_gamersky_history", "游民星空：RPG 制作大师简史", "https://wap.gamersky.com/gl/Content-1315926.html"),
    ("D_articles", "D05_baidu_nishi", "百度百科：西和彦", "https://baike.baidu.com/item/%E8%A5%BF%E5%92%8C%E5%BD%A6/6517770"),
    ("D_articles", "D06_baidu_heian", "百度百科：黑暗圣剑传说", "https://baike.baidu.com/item/%E9%BB%91%E6%9A%97%E5%9C%A3%E5%89%91%E4%BC%A0%E8%AF%B4/8680629"),
    ("D_articles", "D07_baidu_rpgmaker", "百度百科：RPG Maker 版本参数", "https://baike.baidu.com/view/513945.htm"),
    ("D_articles", "D08_sina_heian", "新浪游戏：黑暗圣剑传说发布页（2005）", "https://games.sina.com.cn/downgames/demo/pcgames/2005-09-29/113293752.shtml"),
    ("D_articles", "D10_moegirl_enterbrain", "萌娘百科：Enterbrain 沿革", "https://zh.moegirl.org.cn/zh/Enterbrain"),

    # 补充：日本电脑史与行业背景
    ("E_context", "E01_pc9801_ja", "PC-9801（日文维基）", "https://ja.wikipedia.org/wiki/PC-9801"),
    ("E_context", "E02_pc8801_ja", "PC-8801（日文维基）", "https://ja.wikipedia.org/wiki/PC-8801"),
    ("E_context", "E03_famicom_ja", "ファミリーコンピュータ 红白机（日文维基）", "https://ja.wikipedia.org/wiki/ファミリーコンピュータ"),
    ("E_context", "E04_famicom_en", "Family Computer / NES（英文维基）", "https://en.wikipedia.org/wiki/Nintendo_Entertainment_System"),
    ("E_context", "E05_dq1_ja", "ドラゴンクエスト（日文维基）", "https://ja.wikipedia.org/wiki/ドラゴンクエスト"),
    ("E_context", "E06_dq3_ja", "ドラゴンクエストIII（日文维基）", "https://ja.wikipedia.org/wiki/ドラゴンクエストIII_そして伝説へ…"),
    ("E_context", "E07_dq_en", "Dragon Quest（英文维基）", "https://en.wikipedia.org/wiki/Dragon_Quest"),
    ("E_context", "E08_login_ja", "LOGIN 杂志（日文维基）", "https://ja.wikipedia.org/wiki/LOGIN_(雑誌)"),
    ("E_context", "E09_sfc_ja", "スーパーファミコン（日文维基）", "https://ja.wikipedia.org/wiki/スーパーファミコン"),
    ("E_context", "E10_wizardry_en", "Wizardry（英文维基）", "https://en.wikipedia.org/wiki/Wizardry"),

    # 补充：公司沿革细节
    ("F_more", "F01_ascii_media_works_en", "ASCII Media Works（英文维基）", "https://en.wikipedia.org/wiki/ASCII_Media_Works"),
    ("F_more", "F02_kadokawa_en", "Kadokawa Corporation（英文维基）", "https://en.wikipedia.org/wiki/Kadokawa_Corporation"),
    ("F_more", "F03_degica_en", "Degica（英文维基，RM 西方发行商）", "https://en.wikipedia.org/wiki/Degica"),
    ("F_more", "F04_agetec_en", "Agetec（英文维基）", "https://en.wikipedia.org/wiki/Agetec"),
    ("F_more", "F05_microsoft_japan_en", "Microsoft Japan（英文维基）", "https://en.wikipedia.org/wiki/Microsoft_Japan"),
    ("F_more", "F06_impress_en", "Impress Corporation（英文维基）", "https://en.wikipedia.org/wiki/Impress_Corporation"),
    ("F_more", "F07_bill_gates_en", "Bill Gates（英文维基，1978 会面背景）", "https://en.wikipedia.org/wiki/Bill_Gates"),

    # 补充：各代 RPG Maker 细节
    ("G_versions", "G01_rm2000", "RPG Maker 2000（英文维基）", "https://en.wikipedia.org/wiki/RPG_Maker_2000"),
    ("G_versions", "G02_rm2003", "RPG Maker 2003（英文维基）", "https://en.wikipedia.org/wiki/RPG_Maker_2003"),
    ("G_versions", "G03_rmxp", "RPG Maker XP（英文维基）", "https://en.wikipedia.org/wiki/RPG_Maker_XP"),
    ("G_versions", "G04_rmvx", "RPG Maker VX（英文维基）", "https://en.wikipedia.org/wiki/RPG_Maker_VX"),
    ("G_versions", "G05_rmvxace", "RPG Maker VX Ace（英文维基）", "https://en.wikipedia.org/wiki/RPG_Maker_VX_Ace"),
    ("G_versions", "G06_rmmv", "RPG Maker MV（英文维基）", "https://en.wikipedia.org/wiki/RPG_Maker_MV"),
    ("G_versions", "G07_rmmz", "RPG Maker MZ（英文维基）", "https://en.wikipedia.org/wiki/RPG_Maker_MZ"),
    ("G_versions", "G08_unite_wiki", "RPG Maker Unite（英文维基）", "https://en.wikipedia.org/wiki/RPG_Maker_Unite"),

    # 补充：中文圈
    ("H_china", "H01_66rpg", "66RPG 百度百科", "https://baike.baidu.com/item/66RPG"),
    ("H_china", "H02_liuliu", "柳柳（柳晓宇）百度百科", "https://baike.baidu.com/item/%E6%9F%B3%E6%9F%B3/19664"),
    ("H_china", "H03_yuxue", "雨血 Rainblood 百度百科", "https://baike.baidu.com/item/%E9%9B%A8%E8%A1%80"),
    ("H_china", "H04_rpgmaker_cn", "RPG制作大师 中文百科", "https://zh.wikipedia.org/wiki/RPG%E5%88%B6%E4%BD%9C%E5%A4%A7%E5%B8%88"),
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
            print("SKIP", slug)
            continue

        t0 = time.time()
        try:
            data, ctype, status, mode = fetch(url)
            with open(hpath, "wb") as f:
                f.write(data)
            html = decode(data, ctype)
            p = TextExtractor()
            try:
                p.feed(html)
            except Exception:
                pass
            txt = p.text()
            header = (f"SOURCE: {url}\nTITLE: {title}\n"
                      f"FETCHED: {time.strftime('%Y-%m-%d %H:%M:%S')}\n{'='*60}\n\n")
            with open(tpath, "w", encoding="utf-8") as f:
                f.write(header + txt)
            results.append({"group": group, "slug": slug, "title": title, "url": url,
                            "status": f"OK {status} {mode}", "bytes": len(data), "chars": len(txt)})
            print(f"OK   {slug:32s} {len(data):>9,d}B  {len(txt):>7,d}c  {mode}  {time.time()-t0:.1f}s")
        except Exception as e:
            results.append({"group": group, "slug": slug, "title": title, "url": url,
                            "status": f"FAIL {type(e).__name__}: {str(e)[:110]}",
                            "bytes": 0, "chars": 0})
            print(f"FAIL {slug:32s} {type(e).__name__}: {str(e)[:90]}")
        time.sleep(0.7)

    with open(os.path.join(BASE, "_fetch_log2.json"), "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=1)

    ok = sum(1 for r in results if r["status"].startswith("OK"))
    print(f"\n=== OK {ok} / FAIL {len(results)-ok} ===")


if __name__ == "__main__":
    main()
