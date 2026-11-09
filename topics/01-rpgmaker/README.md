# RPG Maker：梦想与世界 · AI 生成科普视频全流程工程

一支 15 分 52 秒的科普解说片，从文案、事实核查、配音、时间轴、2D 画面、Blender 3D 到拼接、QA、交付，全部由 AI 分工协作完成。

本仓库是「AI 科普视频」系列的第 1 个主题，收录**最终版（v3）的完整工程 + 全过程的开发记录**：源码、素材、脚本、逐版进度文档、考据资料、验收数据都在这里。目标不是"放个成片"，而是任何人（或任何 AI）拿到这个仓库，都能看懂"它怎么被做出来的"，并且能重新渲染。

> **许可**：作者原创内容 **CC0 1.0**——可复制、可修改、可商用，无需授权也无需署名；仓库内夹带的第三方素材（游戏截图、字体、模型、引文）版权归原权利人，不在 CC0 范围内，清权由使用方自负。详见 [第 8 节](#8-版权与使用许可) 与 [`CREDITS.md`](CREDITS.md)。

---

## ▶ 在线观看

[![在 B 站观看《RPG Maker 的历史》](preview/bilibili_cover.jpg)](https://www.bilibili.com/video/BV1HvHN6gEZU)

**B 站**：[DS生成]RpgMaker的历史 · 11:51 · UP 主「跳过话题」

> 点封面直接跳转 B 站播放。GitHub 只支持图片，不支持内嵌播放器，所以这里放的是可点击的封面。

### 为什么 B 站版只有 11:51，仓库里却是 15:52

说实话，B 站那一版是我自己在剪辑软件里又过了一遍，主要做了三件事：

1. **剪掉 TTS 莫名其妙的停顿。** AI 合成的旁白会突然停一下，短的半秒，长的两三秒，而且没什么规律；这些空白在原片里加起来有好几分钟。剪掉之后观感不受影响，节奏立刻正常了。
2. **整体小幅提速。** 原始配音的语速非常慢，听着发闷；稍微调快一点点，语气才像正常人说话。
3. **顺手修了几处画面和节奏上的小毛病。**

还有一点得老实承认：**这台电脑的配置确实不行**——2 核 CPU、没有独显、可用内存只有 2 GB 出头，本地根本跑不动像样的语音模型，只能用微软的默认语音（edge-tts 的 `zh-CN-YunyangNeural`）。它发音是清楚的，但停顿位置、语气起伏就是它的天花板，这也是为什么必须靠后期手动剪。如果机器好一点，能本地跑更好的 TTS，这一块本来可以做得更好。

所以：仓库里 15:52 的是**流水线直出的完整版**，B 站 11:51 的是**人工修过的发布版**。内容一样，差的是停顿、语速和那些零碎修补。

---

## 1. 成片

| 项 | 值 |
|---|---|
| 片名 | 《RPG Maker：梦想与世界》 |
| 时长 | 15:52.21（952.21 秒 / 28,566 帧 / 30fps） |
| 规格 | 1920×1080 / 30fps / H.264 High + AAC 192k 48kHz 立体声 |
| 大小 | 516,351,141 B（约 492 MiB） |
| MD5 | `c225235575d6d8c682d3624e6040a3f8` |
| 字幕 | 烧录（数据在 `code/remotion-studio-v3/src/data/film.json` 的 `cues`） |
| 样片 | `preview/20261021_RPGMaker_序章.mp4`（序章 1:45，24 MB，可直接在 GitHub 预览） |
| **全片下载** | **[Releases · film-v3](https://github.com/SkipTopic/ai-science-videos/releases/tag/film-v3)** · [直接下载 mp4](https://github.com/SkipTopic/ai-science-videos/releases/download/film-v3/RPGMaker_Dreams_and_Worlds_v3_1080p.mp4)（516 MB，不用登录） |

> 全片 492 MiB 超过 git 单文件 100 MB 的硬限制，所以没进代码历史，而是作为 **Release 附件**单独发布：不拖慢 `git clone`，下载也比仓库内文件稳。

---

## 2. 结构

```
.
├─ README.md                  ← 你在这里
├─ CREDITS.md                 ← 素材来源与版权
├─ docs/                      ← 开发过程：交接报告 + v1/v2/v3 逐版进度 + 快照时间线 + 链接与依赖
│  └─ v3工程文档/             ← 时间轴数据（beats/narration）、重定时报告、截图来源
├─ script/                    ← 上游资料：解说文案 v1–v5、考据资料库（64 条原始网页+正文）、技术栈要求
├─ code/
│  └─ remotion-studio-v3/     ← 最终版 Remotion 工程（src / scripts / public / 配置）
├─ tools/
│  ├─ voice/                  ← edge-tts 配音、时间轴排期、音效合成脚本 + 时间轴 JSON
│  ├─ pipeline/               ← v2 的节拍重排、重定时写回、截图抓取、QA 脚本
│  ├─ qa/                     ← v3 的全片 QA / 静止检测 / 接缝抽帧
│  └─ blender/                ← 两个 3D 镜头的 .blend + 生成脚本 + 贴图 + Kenney CC0 模型
└─ preview/                   ← 序章样片 + B 站封面（README 顶部的可点击视频卡片）
```

`LICENSE` 与 `NOTICE.md` 在仓库根目录，对整个系列生效。

各目录的作用、每个脚本原来在本地工程的哪个位置，见 [`docs/链接与依赖说明.md`](docs/链接与依赖说明.md)。

---

## 3. 片子怎么搭的

10 个章节，一段一个 Composition，最后按顺序拼接：

| # | Composition | 章节 | 时长(s) | 整片起点(s) |
|---|---|---|---:|---:|
| 0 | `RPGMaker00` | 序章 | 105.00 | 0.000 |
| 1 | `Ch01` | 01 出生 | 133.61 | 105.000 |
| 2 | `Ch02` | 02 附录 | 164.08 | 238.606 |
| 3 | `Ch03` | 03 工具 | 93.80 | 402.662 |
| 4 | `Ch04` | 04 口音 | 32.58 | 496.453 |
| 5 | `Ch05` | 05 溢出 | 181.21 | 529.032 |
| 6 | `Ch06` | 06 中国 | 49.84 | 710.231 |
| 7 | `Ch07` | 07 转手 | 121.94 | 760.051 |
| 8 | `Ch08` | 08 未来 | 34.07 | 881.988 |
| 9 | `Ch09` | 09 尾声·小鲸鱼 | 36.08 | 916.062 |
| | | **合计** | **952.21** | |

流水线（每一环都有对应脚本）：

```
文案 v5 ── 事实核查 ── edge-tts 逐句配音 + 词边界时间戳
                          │
                    build_timeline.py（按语音实际长度排节拍）
                          │
                    retime_chapters.py（把时间写回 10 个章节的 <Beat>）
                          │
      Remotion 渲染（Drift 全局运镜 + 场景时钟 + 烧录字幕）
                          │
        Blender Cycles 3D 两镜（CRT 卧室 / 1986 机械恐龙）
                          │
              分段 concat（-c:v copy + AAC 重编码）
                          │
                  QA（时长/流/接缝/静止/静音/MD5）
```

---

## 4. 三版迭代（v3 是怎么来的）

| 版本 | 时长 | 改了什么 |
|---|---|---|
| v1 | 19:25 | 全流程第一次跑通。问题：旁白之间空转 330 秒（占 31%），画面常像按了暂停 |
| v2 | 15:52 | ① 按语音实际长度重排时间轴，任何场景最多 2 倍速；② 全局极慢运镜（`drift.tsx`）；③ 加两处 Blender 3D；④ 插 6 张 Steam 官方实机截图；⑤ 把一句查无实据的文案换掉并重新配音 |
| **v3** | **15:52** | 只动两处画面：序章**完全回到 v1**（含用户点名保留的 2.5 秒 GAME OVER 黑场）；3D 从序章挪到 Ch09 尾声，拉伸到 8.7 秒。其余 8 段直接复用 v2 成片 |

**本仓库只放 v3。** v1 / v2 的工程与成片仍完整保存在原作者本地，未上传；它们的改动细节写在 `docs/00_渲染进度_先读我.md`、`docs/00_第二版进度_先读我.md` 里。

已知取舍（不是 bug，别"顺手修"）也写在 `docs/00_第三版进度_先读我.md` 第 0.0 节：序章 28.5–32.7 秒的黑场是故意保留的；若干 1 秒级"缓漂"是 Drift 过正弦拐点造成的。

---

## 5. 怎么重新渲染

### 5.1 环境

| 依赖 | 版本 / 说明 |
|---|---|
| Node.js | 24.x（工程用 24.21.0 验证） |
| npm | 随 Node；`package-lock.json` 已锁版本 |
| Remotion | 4.0.537（`remotion` + `@remotion/cli`） |
| React / TS | React 19 / TypeScript 5.7 |
| ffmpeg | **不用系统 ffmpeg**，用 Remotion 自带的 `node_modules/@remotion/compositor-*/ffmpeg.exe`（精简版，缺 `setpts`/`fps`/`tile`/`freezedetect`/`volumedetect`，坑见 docs） |
| Python | 3.12（只 `tools/` 里的脚本需要：edge-tts、numpy、opencv-python、Pillow） |
| Blender | 5.2.2 LTS，**只能 Cycles CPU**（EEVEE/Workbench 在无 GPU 机器上直接崩）；720p 渲完 lanczos 上采样 |
| 硬件参考 | 2 核 4 线程 / 无独显：一章 3–25 分钟，全片 1.5–2 小时；Cycles 720p/8 采样 ≈ 16.8 秒/帧 |

### 5.2 步骤

```bash
cd code/remotion-studio-v3

# 1) 装依赖（约 560 MB，只需一次）
npm ci

# 2) 字体：仓库里 public/fonts 是空的，必须先生成（脚本从 3 个 npm 包里抽 woff2 + 生成 fonts.css）
npm pack @fontsource/noto-sans-sc@5.3.1
npm pack @fontsource/noto-serif-sc@5.3.1
npm pack @fontsource/press-start-2p@5.3.0
mkdir -p out && mv fontsource-*.tgz out/
python scripts/prepare_fonts.py          # 产出 public/fonts/fonts.css + 约 13 MB woff2

# 3) 音效：仓库里已带（public/audio/sfx，22 个 wav / 11.6 MB）
#    如需重新合成（固定随机种子，结果一致）：
#    python ../../tools/voice/build_sfx.py

# 4) 类型检查 / 抽单帧目检
node_modules/.bin/tsc --noEmit
npx remotion still Ch09 out/check/ch09.png --frame=180 --log=error

# 5) 渲染单章（--concurrency=1，2 核机器上并发只会更慢）
npx remotion render Ch05 out/chapters/Ch05.mp4 --concurrency=1

# 6) 拼接（参数不能省，裸 -c copy 每个接缝都会报 Non-monotonic DTS）
#    脚本里的 ROOT / 输出目录改好后再跑：
bash scripts/concat_film_v3.sh
```

> `scripts/*.sh` 里的 `ROOT` 是原作者机器的绝对路径（`/c/Users/admin/Desktop/...`），
> 换机器必须先改脚本顶部那一行；`out/`、`输出文件夹/` 也要自己建。清单见 `docs/链接与依赖说明.md`。

### 5.3 工程里有什么

- `src/film/drift.tsx` — 全局极慢推拉/漂移，治"画面冻住"
- `src/film/sceneClock.tsx` — 节拍级场景时钟，压缩时间不丢镜头编排
- `src/film/ChapterBase.tsx` — `Beat` / `ChapterFrame` / 烧录字幕 / 音轨装配
- `src/film/realShots.tsx` — 全屏实机截图与 3D 视频插镜
- `src/film/chapters/Ch0*.tsx` — 10 个章节的镜头编排
- `src/data/film.json` — 全片时间轴 + 字幕 cues（由 `tools/pipeline/build_timeline.py` 生成）
- `public/audio/film/` — 257 条逐句旁白 mp3（edge-tts，`zh-CN-YunyangNeural`）
- `public/audio/rpg00/` — 序章另外 17 条旁白
- `public/images/v2/` — 6 张 Steam 商店截图（来源见 `CREDITS.md`）
- `public/video/` — 3 段 3D 成片（CRT 拉远 v2/v3、机械恐龙）

---

## 6. 验收数据（v3，2026-10-22 16:10）

- 10 段时长与 `film.json` 全部吻合，最大误差 0.01 秒；全片 952.21 秒。
- 9 个章节接缝逐帧抽查：全部落在正确画面上；Ch08→Ch09 准确切到鲸鱼 CRT。
- 静止检测：Ch09 0 个冻帧；序章只有预期的 v1 黑场（29.5–32.0 秒，约 2.5 秒）与标题卡 94–95 秒 1 秒缓漂；其余章节的 1 秒级缓漂与 v2 相同。
- 音频：全片 952.21 秒，最长静音 9 秒（<10 秒）。
- 交付件 MD5 与工程原件一致。

QA 脚本：`tools/qa/qa_v3.py`（全片）、`tools/qa/check_static.py`（单段静止）、`tools/qa/check_joins_v3.py`（接缝抽帧）。

---

## 7. 这个仓库里没有的东西

| 没放 | 原因 |
|---|---|
| `node_modules/`（约 782 MB） | `npm ci` 可完整重建，已锁版本 |
| `out/` 渲染中间产物（约 1.6 GB） | 分段 mp4 / 抽帧，可重渲 |
| `_备份/*.tar.gz`（21 个快照，1.57 GB） | 开发快照，时间线已整理成 `docs/快照时间线.md` |
| v1 / v2 工程 | 按要求只放最新版 v3；改动记录在 docs 里 |
| 全片 v1 / v2（190 / 518 MB） | 只发布最新版；v3 在 [Releases](https://github.com/SkipTopic/ai-science-videos/releases/tag/film-v3) 里 |

原始本地工程**一个文件都没删、没移动**，本目录是纯复制出来的发布副本。

---

## 8. 版权与使用许可

**作者原创的部分：完全开放，随便用。**

本仓库里由项目作者创作的内容——文案（`script/02_文案/`）、Remotion 源码与镜头编排（`code/`）、工具脚本（`tools/`）、文档（`docs/`、本 README）——以 **CC0 1.0（公有领域贡献）** 释出（法律文本见仓库根目录 [`LICENSE`](../../LICENSE)，范围与例外见 [`NOTICE.md`](../../NOTICE.md)）：

- 可以复制、修改、二次创作、商用、再发布，**不需要经过作者同意，也不需要署名**；
- 没有使用范围、期限、地域的限制；
- 唯一的要求：别拿作者的名义给你改过的东西背书。

**但仓库里混着别人的东西，这部分不归作者管。**

片中的游戏截图、字体、3D 模型、引用的网页正文与商标，版权属于各自权利人，**不适用上面的 CC0**：

| 类型 | 权利归属 | 位置 | 说明 |
|---|---|---|---|
| 6 张游戏截图 | 各游戏开发商 / 发行商 | `code/remotion-studio-v3/public/images/v2/` | Steam 商店宣传图，本片按评论、解说引用 |
| 字体 | Noto Sans/Serif SC、Press Start 2P（SIL OFL 1.1） | 仓库不含字体文件，由脚本从 npm 包提取 | OFL 允许随作品嵌入；单独分发字体文件需附许可 |
| 3D 模型 | Kenney（CC0 1.0） | `tools/blender/models/` | 可商用、无需署名 |
| 网页原文 | 原网站 | `script/01_资料库/` | 仅作事实核查留档，版权归原站 |
| "RPG Maker" 等名称 | 角川 / 原权利人 | 文案与画面 | 商标与作品名，评论性引用 |

逐条来源见 [`CREDITS.md`](CREDITS.md)。

**免责声明（请认真读）**

- 你如果把本仓库的内容用于公开发布、商用或二次创作，**第三方素材的清权由你自己负责**：该替换的替换、该取得授权的取得授权。
- 如果因为仓库里夹带的第三方内容（游戏截图、字体、引文、商标等）被权利人投诉、被平台下架、或被索赔，**由使用方自行承担全部后果，作者不承担任何责任**，也不承担任何连带损失。
- 作者已尽力在 `CREDITS.md` 标明来源，但**不保证**清单完整，也不保证每一项都适合你的使用场景（不同平台对游戏截图、二创有各自的规定）。

一句话：**我的部分，拿走随便用；别人的部分，你自己搞定。**

---

## 9. 相关文档

- [`docs/00_交接报告_先读我.md`](docs/00_交接报告_先读我.md) — 三版总览、本机踩坑、常用命令（**最该先读的一份**）
- [`docs/00_第三版进度_先读我.md`](docs/00_第三版进度_先读我.md) — v3 逐条改动、QA、回滚方法
- [`docs/00_科普视频交接文档_先读我.md`](docs/00_科普视频交接文档_先读我.md) — 换一个科普主题怎么复用这套流水线
- [`docs/链接与依赖说明.md`](docs/链接与依赖说明.md) — 目录联接、绝对路径、外部依赖、缺文件怎么办
- [`docs/快照时间线.md`](docs/快照时间线.md) — 21 个开发快照对应的时间线
