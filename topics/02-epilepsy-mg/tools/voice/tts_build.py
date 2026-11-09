"""逐句合成 00 章旁白，导出 MP3 + 词边界 + 时长清单。"""

import asyncio
import json
import os
import subprocess

import edge_tts

VOICE = "zh-CN-YunyangNeural"
RATE = "+0%"
HERE = os.path.dirname(os.path.abspath(__file__))
OUT_DIR = os.path.join(HERE, "rpg00")
FFPROBE = os.path.join(
    HERE,
    "..",
    "remotion-studio",
    "node_modules",
    "@remotion",
    "compositor-win32-x64-msvc",
    "ffprobe.exe",
)

LINES = [
    ("00-01", "我在迷宫走着。"),
    ("00-02", "遇到了小鲸鱼。"),
    ("00-03", "我对小鲸鱼使用了攻击。"),
    ("00-04", "小鲸鱼受到了 5 点伤害。"),
    ("00-05", "小鲸鱼对我使用了拳击。"),
    ("00-06", "我受到了 999 点伤害。"),
    ("00-07", "我死了。"),
    ("00-08", "小鲸鱼太厉害了。"),
    ("00-09", "刚刚你看到的，是我用 RPG Maker 做的游戏。"),
    ("00-10", "全程，没有写一行代码。"),
    ("00-11", "这不是奇迹。"),
    (
        "00-12",
        "这是一个 1977 年成立的公司，在 1988 年的一本杂志附录里，塞进去的一个小程序。",
    ),
    ("00-13", "它花了三十八年，长成今天这个样子。"),
    ("00-14", "全世界有几百万个这样的游戏。"),
    ("00-15", "它们大多没有做完。"),
    ("00-16", "但它们都从同一件事开始——"),
    ("00-17", "一个人，想让另一个世界存在。"),
]


def probe_duration(path: str) -> float:
    out = subprocess.check_output(
        [
            FFPROBE,
            "-v",
            "error",
            "-show_entries",
            "format=duration",
            "-of",
            "default=noprint_wrappers=1:nokey=1",
            path,
        ],
        text=True,
    ).strip()
    return round(float(out), 3)


async def synth(line_id: str, text: str) -> dict:
    mp3_path = os.path.join(OUT_DIR, f"{line_id}.mp3")
    communicate = edge_tts.Communicate(text, VOICE, rate=RATE, boundary="WordBoundary")
    words = []
    with open(mp3_path, "wb") as f:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                f.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                words.append(
                    {
                        "text": chunk["text"],
                        "start": round(chunk["offset"] / 10_000_000, 3),
                        "duration": round(chunk["duration"] / 10_000_000, 3),
                    }
                )
    duration = probe_duration(mp3_path)
    print(f"{line_id}  {duration:6.2f}s  {len(words):2d} words  {text[:24]}")
    return {
        "id": line_id,
        "text": text,
        "file": f"rpg00/{line_id}.mp3",
        "duration": duration,
        "words": words,
    }


async def main() -> None:
    os.makedirs(OUT_DIR, exist_ok=True)
    result = []
    for line_id, text in LINES:
        result.append(await synth(line_id, text))
    total = sum(item["duration"] for item in result)
    payload = {
        "voice": VOICE,
        "rate": RATE,
        "total_duration": round(total, 3),
        "lines": result,
    }
    with open(os.path.join(OUT_DIR, "narration.json"), "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)
    print(f"TOTAL {total:.2f}s -> {os.path.join(OUT_DIR, 'narration.json')}")


if __name__ == "__main__":
    asyncio.run(main())
