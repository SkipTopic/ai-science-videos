"""一次性把两套音效脚本合成到 v3 工程的 public/audio/sfx。

历史脚本（make_sfx.py / make_film_sfx.py）把输出目录写死成 v1 工程路径，
直接跑会写到不存在的地方。这个包装器只做两件事：改 OUT，再调用。

用法（在仓库根目录）：
    python tools/voice/build_sfx.py            # 写入 code/remotion-studio-v3/public/audio/sfx
    python tools/voice/build_sfx.py --out D:/tmp/sfx   # 写到别处试听

两个脚本都用固定随机种子（19921217 / 20261021），同一台机器上多次运行结果一致。
产物约 11 MB，其中 wind.wav（105 秒环境风）占 10 MB。
"""

import argparse
import importlib.util
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", ".."))
DEFAULT_OUT = os.path.join(
    REPO, "code", "remotion-studio-v3", "public", "audio", "sfx"
)

# make_sfx.py 里的 13 个生成函数（按 __main__ 块的调用顺序）
SEQ_FUNCS = [
    "make_footstep",
    "make_dialog",
    "make_slash",
    "make_damage5",
    "make_whoosh",
    "make_punch",
    "make_game_over",
    "make_title_chime",
    "make_cursor",
    "make_floppy",
    "make_paper",
    "make_tick",
    "make_wind",
]


def load(name):
    path = os.path.join(HERE, name + ".py")
    spec = importlib.util.spec_from_file_location(name, path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=DEFAULT_OUT)
    args = ap.parse_args()
    out = os.path.abspath(args.out)
    os.makedirs(out, exist_ok=True)

    seq = load("make_sfx")
    seq.OUT = out
    for fn in SEQ_FUNCS:
        getattr(seq, fn)()

    film = load("make_film_sfx")
    film.OUT = out
    film.main()

    files = [n for n in os.listdir(out) if n.endswith(".wav")]
    total = sum(os.path.getsize(os.path.join(out, n)) for n in files)
    print(f"\n{len(files)} 个 wav -> {out}")
    print(f"合计 {total / 1048576:.1f} MB")


if __name__ == "__main__":
    main()
