# -*- coding: utf-8 -*-
"""扫描 _raw_text / _raw_html，生成给后续 AI 阅读的资料索引。"""
import os, re, json

BASE = r"D:\作业\我写的小说\rpgmaker解说\01_资料库"
TEXT = os.path.join(BASE, "_raw_text")
HTML = os.path.join(BASE, "_raw_html")
OUT = os.path.join(BASE, "00_资料索引.md")

GROUP_CN = {
    "A_company": "A · 公司史",
    "B_rpgmaker": "B · RPG Maker 本体",
    "C_games": "C · 作品",
    "D_articles": "D · 文章与中文资料",
    "E_context": "E · 时代背景",
    "F_more": "F · 公司沿革补充",
    "H_china": "H · 中文圈",
    "Z_archive": "Z · 互联网档案馆",
}

# slug -> 一句话说明（这份材料能回答什么）
NOTES = {
    "A01_ascii_corp_en": "ASCII 公司全史：1977 创立、1979 ASCII Microsoft、1989 上市、1997 CSK、2002 MediaLeaves。**公司史第一信源**",
    "A02_ascii_corp_ja": "同上日文版，日期更细（1982.12 改名、1991 AstroArts 等）",
    "A03_nishi_kazuhiko_en": "西和彦完整生平：1956 生、早稻田辍学、1978 见盖茨、1986 决裂、1991 分家、2023 破产",
    "A04_nishi_kazuhiko_ja": "西和彦日文版，含 MSX 与孙正义的竞争",
    "A05_enterbrain_en": "Enterbrain：2000.4.1 从 ASCII 独立，2004 角川收购，2013 并入 KADOKAWA",
    "A06_enterbrain_ja": "Enterbrain 日文沿革：1987 ASCII 映画 → 1997 ASCII Visual → 2000 enterbrain",
    "A07_kadokawa_ja": "KADOKAWA 集团沿革，用于说明 2004/2013 两次归属变化",
    "A08_msx_ja": "MSX 标准全史（1983），西和彦主导，ASCII 与微软共同开发",
    "A09_msx_en": "MSX 英文版，含市场数据与各厂商机型",
    "A10_ascii_microsoft": "ASCII Microsoft：微软第一家海外销售办公室（1979）",
    "B01_rpgmaker_en": "RPG Maker 系列主条目：全版本时间线、平台、引擎语言。**版本核对第一信源**",
    "B02_rpgmaker_ja": "RPGツクール 日文版，含日本本土发售细节",
    "B03_rpgmaker_fandom": "Fandom 版，版本参数与社区术语（RTP / Alex 等），正文较短",
    "B04_dante98_fandom": "Dante 98 专页：1992.12.17、PC-9801、320×240、LOGIN Sofcom 投稿制度",
    "B05_official_en": "RPG Maker 官方英文站（当前产品线）",
    "B06_official_ja": "RPG Maker 官方日文站（JS 渲染，正文极短，基本无用）",
    "B07_unite": "RPG Maker Unite 官网（2023 失败作）",
    "B08_ggg": "Gotcha Gotcha Games 官网（2020 设立，现版权方）",
    "C01_yume_nikki": "《梦日记》：2004.6.26、RPG Maker 2003、24 个效果、Nexus、Kikiyama 匿名",
    "C02_ib": "《Ib》：2012.2.27、RPG Maker 2000、kouri、7 个结局、2022 MV 重制",
    "C03_witch_house": "《魔女之家》：2012.10.3、RPG Maker VX、Fummy、4 个结局",
    "C04_ao_oni": "《青鬼》：noprops、RPG Maker XP、版本迭代至 2011（首发年有争议）",
    "C05_to_the_moon": "《去月球》：2011.11.1、RPG Maker XP、高瞰、无战斗系统",
    "C06_omori": "《OMORI》：2020.12.25、RPG Maker MV、2022.12 破 100 万份、情绪战斗系统",
    "C07_corpse_party": "《尸体派对》：1996 年 Dante 98 起源、祁答院慎、跨媒体",
    "C08_lisa": "《Lisa: The Painful》：RPG Maker VX Ace、荒诞暴力",
    "C09_oneshot": "《OneShot》：RPG Maker XP、元游戏代表作",
    "C10_off": "《OFF》：RPG Maker 2003、Mortis Ghost、超现实",
    "D01_pcgamer_secret_history": "PC Gamer 长文：Don Miguel 盗版史、RPG Advocate、Steam Greenlight 时代的坏名声。**争议章第一信源**",
    "D02_otherstrangeness_donmiguel": "Don Miguel 如何把 RM2000 带到西方（2024 回顾）",
    "D03_gematsu_ggg_interview": "Gematsu 采访 GGG 制作人森野祐介：2020 设立背景、4000+ 插件、300+ 官方素材",
    "D04_gamersky_history": "游民星空简史（中文二手，正文提取不全，仅作参考）",
    "D08_sina_heian": "《黑暗圣剑传说》2005 年发布页，含柳柳自述",
    "D09_square_enix_dq": "Square Enix 官方 DQ 指南（JS 渲染，正文为空，仅存链接）",
    "E01_pc9801_ja": "PC-9801 全史：日本本土电脑标准，Dante 98 的运行平台",
    "E02_pc8801_ja": "PC-8800 系列：Mamirin 的运行平台",
    "E03_famicom_ja": "红白机日文条目：1983.7.15、14800 日元、日本 1935 万台",
    "E04_famicom_en": "NES/FC 英文条目：全球 6191 万台、硬件规格",
    "E05_dq1_ja": "《勇者斗恶龙》初代：1986.5.27、堀井雄二/鸟山明/椙山浩一",
    "E06_dq3_ja": "《勇者斗恶龙 III》：1988.2.10 社会现象、380 万套、发售日改周末",
    "E07_dq_en": "Dragon Quest 英文条目：系列累计销量与西方发行史",
    "E09_sfc_ja": "超级任天堂：1990 发售，Super Dante（1995）的平台",
    "E10_wizardry_en": "Wizardry 消歧义页（内容极少，可忽略）",
    "F01_ascii_media_works_en": "ASCII Media Works：2008 年 ASCII 与 MediaWorks 合并",
    "F02_kadokawa_en": "Kadokawa Corporation 英文条目，集团结构",
    "F04_agetec_en": "Agetec：1998 从 ASCII 美国分公司拆出",
    "F05_microsoft_japan_en": "Microsoft Japan：1986 年微软与 ASCII 决裂后自设分部",
    "F06_impress_en": "Impress Holdings：1991 年郡司明郎、塚本慶一郎出走创办",
    "F07_bill_gates_en": "Bill Gates 条目，1978 会面的时代背景",
    "H01_66rpg": "66RPG 百度百科（正文短）",
    "H04_rpgmaker_cn": "RPG 制作大师中文维基，中文圈译名与传播",
    "I01_history_of_tkool_en": "官方年表页（JS 空壳，无正文，仅存链接）",
    "I02_history_of_tkool_ja": "官方年表页日文（JS 空壳）",
    "I03_official_home_en": "官方站首页英文版，当前产品线",
    "I04_official_home_ja": "官方站首页日文版（JS 渲染，正文少）",
    "I05_about_series": "官方系列介绍页（JS 空壳）",
    "I10_wp_page_278_en": "WP API 单页导出（内容极少）",
    "I11_wp_page_278_ja": "WP API 单页导出（与 I10 相同）",
    "I12_wp_pages_en": "**官方站 42 个页面全量导出，16 万字**。含「Maker 系列の歩み」年表页、FAQ、产品线，是官方口径的第一手材料",
    "I13_wp_pages_ja": "与 I12 内容相同（重复），可忽略",
    "I20_wp_news": "官方新闻 34 条，含近年产品与活动动态",
    "I20_wp_product": "官方在售产品 10 条",
    "I20_wp_popular_title": "官方热门内容 5 条",
    "I20_wp_case_studies": "官方案例研究 1 条",
}


def main():
    rows = []
    for group in sorted(os.listdir(TEXT)):
        gdir = os.path.join(TEXT, group)
        if not os.path.isdir(gdir):
            continue
        for fn in sorted(os.listdir(gdir)):
            if not fn.endswith(".txt"):
                continue
            slug = fn[:-4]
            p = os.path.join(gdir, fn)
            raw = open(p, "r", encoding="utf-8", errors="replace").read()
            m_src = re.search(r"^SOURCE:\s*(.+)$", raw, re.M)
            m_ttl = re.search(r"^TITLE:\s*(.+)$", raw, re.M)
            body = raw.split("=" * 60, 1)[-1]
            hpath = os.path.join(HTML, group, slug + ".html")
            hsize = os.path.getsize(hpath) if os.path.exists(hpath) else 0
            rows.append({
                "group": group,
                "slug": slug,
                "title": (m_ttl.group(1).strip() if m_ttl else slug),
                "url": (m_src.group(1).strip() if m_src else ""),
                "chars": len(body.strip()),
                "hsize": hsize,
                "note": NOTES.get(slug, ""),
            })

    total_html = sum(r["hsize"] for r in rows) + sum(
        os.path.getsize(os.path.join(dp, f))
        for dp, _, fs in os.walk(HTML) for f in fs if f.endswith(".html"))
    total_chars = sum(r["chars"] for r in rows)
    usable = sum(1 for r in rows if r["chars"] >= 2000)
    shells = [r for r in rows if r["chars"] < 1500]

    L = []
    L.append("# RPG Maker 资料索引")
    L.append("")
    L.append("> 这份索引是给**不能上外网**的后续 AI 看的。原始网页已全部落盘，")
    L.append("> 每个条目都有：本地 HTML、提取后的纯文本、原始 URL。")
    L.append("")
    L.append(f"- 抓取日期：2026-10-21")
    L.append(f"- 条目数：**{len(rows)}**（其中正文 ≥2000 字的可用条目 **{usable}** 条）")
    L.append(f"- 正文合计：**{total_chars:,} 字**")
    L.append(f"- 原始 HTML 合计：**{total_html/1024/1024:.1f} MB**")
    L.append("")
    L.append("## 怎么用")
    L.append("")
    L.append("1. **要查事实** → 先看下表「说明」列，直接打开对应 `_raw_text/<组>/<slug>.txt`")
    L.append("2. **要引用原话/核对格式** → 打开 `_raw_html/<组>/<slug>.html`（原始页面，未改动）")
    L.append("3. **要看出处** → 每个 txt 开头三行就是 SOURCE / TITLE / FETCHED")
    L.append("4. **本资料库之外的事实，一律标注「未核实」**，不要补写")
    L.append("")
    L.append("## 目录结构")
    L.append("")
    L.append("```")
    L.append("01_资料库/")
    L.append("├── 00_资料索引.md          ← 本文件")
    L.append("├── RPGMaker_考据资料库.md   ← 人工整理的结论稿（含主观判断）")
    L.append("├── _raw_html/<组>/<slug>.html   ← 原始网页，逐字节保存")
    L.append("├── _raw_text/<组>/<slug>.txt    ← 提取的正文，供 AI 阅读")
    L.append("└── _redundant/                  ← 重定向产生的重复文件，不要读")
    L.append("```")
    L.append("")
    L.append("## 阅读优先级")
    L.append("")
    L.append("如果要写「公司的一生」，按这个顺序读：")
    L.append("")
    L.append("```")
    L.append("A02_ascii_corp_ja  →  A04_nishi_kazuhiko_ja  →  A06_enterbrain_ja")
    L.append("      ↓")
    L.append("B02_rpgmaker_ja    →  B04_dante98_fandom")
    L.append("      ↓")
    L.append("F06_impress_en（1991 分家）  →  D03_gematsu_ggg_interview（2020 现状）")
    L.append("```")
    L.append("")

    for g in sorted(set(r["group"] for r in rows)):
        cn = GROUP_CN.get(g, g)
        grp = [r for r in rows if r["group"] == g]
        L.append(f"## {cn}")
        L.append("")
        L.append("| 文件 | 字数 | 说明 | 原始 URL |")
        L.append("|---|---:|---|---|")
        for r in sorted(grp, key=lambda x: x["slug"]):
            note = r["note"] or "—"
            url = r["url"]
            url_cell = f"[原页]({url})" if url else "—"
            L.append(f"| `{r['slug']}.txt` | {r['chars']:,} | {note} | {url_cell} |")
        L.append("")

    L.append("## 已知缺口")
    L.append("")
    L.append("| 缺口 | 原因 |")
    L.append("|---|---|")
    L.append("| 百度百科、萌娘百科 | 403 反爬，抓不到 |")
    L.append("| tkool.jp / Square Enix 官网 | 纯客户端渲染，HTML 里没有正文 |")
    L.append("| Fandom 正文 | 只有约 3–4 千字，JS 渲染不全 |")
    L.append("| 《月刊 ASCII》创刊号封面 | 需档案馆图片，未抓 |")
    L.append("| ASCII 成立时的办公室 / 员工数 | 现有公开资料未记载 |")
    L.append("| 档案馆 7 个页面 | 429 限流，留给用户手动抓（见 `档案馆_手动抓取清单.md`） |")
    L.append("")
    if shells:
        L.append("### 正文残缺、不要当独立资料用的文件")
        L.append("")
        for r in sorted(shells, key=lambda x: x["chars"]):
            L.append(f"- `{r['group']}/{r['slug']}.txt` —— 仅 {r['chars']:,} 字")
        L.append("")
    L.append("## 不要再做的事")
    L.append("")
    L.append("- 不要试图联网补资料（环境无外网）")
    L.append("- 不要把 `_redundant/` 里的内容当独立资料（那是重定向重复）")
    L.append("- 不要相信 `B06_official_ja`、`D09_square_enix_dq`、`E10_wizardry_en` 的内容量（空壳）")

    open(OUT, "w", encoding="utf-8").write("\n".join(L))
    print("index written:", OUT, len(rows), "entries")


if __name__ == "__main__":
    main()
