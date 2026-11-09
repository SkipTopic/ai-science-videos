"""Download in-game screenshots for the games referenced in chapters 02/05/06.

Source: Steam store API (public). One image per game, 1920x1080 when available.
"""

import json
import os
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "remotion-studio-v2", "public", "images", "v2")
CREDITS = os.path.join(HERE, "docs", "image_credits.md")

GAMES = {
    "yumenikki": (114700, "梦日记 / Yume Nikki"),
    "ib": (1901370, "Ib"),
    "witchhouse": (885810, "魔女之家 MV / The Witch's House MV"),
    "tothemoon": (206440, "去月球 / To the Moon"),
    "omori": (1150690, "OMORI"),
    "corpseparty": (465360, "尸体派对 / Corpse Party"),
}


def fetch(url, path):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=40) as r:
        data = r.read()
    open(path, "wb").write(data)
    return len(data)


def main():
    os.makedirs(OUT, exist_ok=True)
    os.makedirs(os.path.dirname(CREDITS), exist_ok=True)
    lines = ["# 实机截图来源\n", "全部取自各游戏 Steam 商店页（公开宣传截图），用于评论/解说引用。\n"]
    for key, (appid, name) in GAMES.items():
        api = f"https://store.steampowered.com/api/appdetails?appids={appid}&l=schinese"
        try:
            payload = json.loads(urllib.request.urlopen(
                urllib.request.Request(api, headers={"User-Agent": "Mozilla/5.0"}),
                timeout=30).read().decode("utf-8"))
            data = payload[str(appid)]["data"]
            shots = data.get("screenshots") or []
            if not shots:
                print("NO SHOTS", key)
                continue
            shot = shots[0]
            url = shot.get("path_full") or shot.get("path_thumbnail")
            path = os.path.join(OUT, f"{key}.jpg")
            size = fetch(url, path)
            print(f"{key:12s} {size/1024:8.0f} KB  {url}")
            lines.append
            lines.append(f"- **{name}**（Steam App {appid}）— `{url}`")
        except Exception as e:
            print("FAIL", key, e)
    open(CREDITS, "w", encoding="utf-8").write("\n".join(lines) + "\n")


if __name__ == "__main__":
    main()
