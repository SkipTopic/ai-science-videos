# 工具脚本

> 这些脚本是**制作过程的一部分**，不是通用库。多数用 `HERE = os.path.dirname(os.path.abspath(__file__))` 推路径，但输出目录仍按原工程结构写死（例如 `../remotion-studio/public/audio/sfx`）。第一次跑之前看一眼文件头。

## voice/ — 配音与时间轴（v1 主线，v3 的音频沿用）

| 文件 | 作用 |
|---|---|
| `parse_script.py` | 把 `script/02_文案/解说文案_全片_v5.md` 解析成章节 / 段落 / 逐句旁白 |
| `tts_build.py` | 序章（`rpg00`）逐句 TTS：edge-tts + WordBoundary 时间戳 + 去首尾静音 |
| `tts_film.py` | 01–09 章逐句 TTS，可断点续跑、幂等 |
| `build_timeline.py` | 把序章旁白排成时间轴，并切句内字幕 |
| `build_film_timeline.py` | 01–09 章时间轴 + 字幕 cues（输出 `src/data/film.json`） |
| `make_sfx.py` | 用标准库合成序章的 8-bit 音效与环境声（固定随机种子） |
| `make_film_sfx.py` | 合成 01–09 章音效，写入 `public/audio/sfx` |
| `build_sfx.py` | **包装器（新增）**：把上面两个脚本的输出改到 v3 工程，一条命令生成全部 22 个 wav |
| `film/script.json` | 解析后的逐句脚本（含每句 start/end） |
| `film/narration.json` | 逐句旁白的词边界时间戳原始数据 |
| `film/schedule.txt` | 排期结果（人可读） |
| `film/tts.log` | 合成日志 |
| `patch/07-28.mp3` | v2 重配的那一句（Ch07「零个五星评价」改为有据可查的说法，6.768 秒） |

## pipeline/ — v2 的节拍重排（v3 的时间轴就是它产出的）

| 文件 | 作用 |
|---|---|
| `build_timeline.py` | **节拍感知排期器**：`beat = 0.55s 段前 + 语音 + 0.34s 句间 + 0.45s 段尾`，最短节拍 1.6s，任何节拍最多 2 倍速 |
| `retime_chapters.py` | 把新时间轴按位置写回 9 个章节的 `<Beat>` 和音效点（`--write` 才落盘） |
| `tts_patch.py` | 只重配文本改动过的句子，写回 `v2/audio/` 与工程 `public/audio/film/` |
| `fetch_screenshots.py` | 从 Steam 商店 API 抓 6 张实机截图（梦日记用 appid 650700） |
| `qa_final.py` | v2 交付前的整片 QA |
| `check_static.py` | 静止画面检测（OpenCV：每 0.5s 采样、缩到 320×180、灰度差 <0.35 记一次） |

## qa/ — v3 验收

| 文件 | 作用 |
|---|---|
| `qa_v3.py` | 全片 QA：时长、流数量/编码、接缝、静止窗口、音频静音、MD5 |
| `check_static.py` | 单段静止检测（可传多个 mp4） |
| `check_joins_v3.py` | 9 个章节接缝逐帧抽图对照 |

## blender/ — 两个 3D 镜头

| 路径 | 作用 |
|---|---|
| `scenes/crt_desk.py` / `crt_desk.blend` | Ch09 尾声：CRT 屏幕里的鲸鱼战斗 → GAME OVER → 卧室全景拉远 |
| `scenes/mecha_dino.py` / `mecha_dino.blend` | Ch01：1986 东京街景 + 机械恐龙 |
| `make_screen_textures.py` | 把游戏画面烘成屏幕贴图（battle / gameover） |
| `textures/` | 上述屏幕贴图 |
| `refs/` | 参考帧（楼群、构图） |
| `models/` | Kenney City Kit Commercial 2.1 + Furniture Kit（CC0），含原始 zip 与 FBX/GLB/OBJ |

Blender 用法（本机只能 Cycles CPU）：

```bash
"D:/blender/blender.exe" -b tools/blender/scenes/crt_desk.py
# 渲染 720p/8 采样 PNG 序列 → ffmpeg 编码 24fps → lanczos 上采样到 1080p
```

## 一个提醒

`qa_final.py`、`check_static.py`（pipeline 那份）是 v2 的版本；v3 用 `qa/` 下那三份。同名文件不要混用。
