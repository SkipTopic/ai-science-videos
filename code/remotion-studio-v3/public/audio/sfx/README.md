# 音效（已随仓库附带）

本目录 22 个 `.wav`（11.6 MB）是电影里用到的全部音效，**已包含在仓库中**，`npm ci` + 字体生成后即可直接渲染。

| 来源 | 文件 | 说明 |
|---|---|---|
| `tools/voice/make_sfx.py` | `wind.wav`、`dialog.wav`、`whoosh.wav`、`punch.wav`、`cursor.wav`、`floppy.wav`、`paper.wav`、`tick.wav`、`title_chime.wav`、`game_over.wav`、`footstep.wav`、`slash.wav`、`damage5.wav` | 序章用；其中 `wind.wav` 是 105 秒循环环境风（10 MB，占体积大头） |
| `tools/voice/make_film_sfx.py` | `click.wav`、`type.wav`、`key.wav`、`switch.wav`、`door.wav`、`flash.wav`、`modem.wav`、`erase.wav`、`disc.wav` | 01–09 章用 |

两个脚本都用 Python 标准库合成（`wave` / `struct` / `math` / `random`），固定随机种子（`19921217` / `20261021`），同一机器上结果一致。

## 重新生成

```bash
# 在仓库根目录
python tools/voice/build_sfx.py
```

包装器会把输出目录指向本目录（原脚本写死的是 v1 工程路径）。想先试听可以指到别处：

```bash
python tools/voice/build_sfx.py --out D:/tmp/sfx
```

WAV 为 48 kHz / 16-bit / 单声道，和 `film.json` 里的音效 cue 一一对应。
