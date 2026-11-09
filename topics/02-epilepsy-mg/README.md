# 癫痫：大脑里的一场「电风暴」· 纯 MG 动画版

一支 13 分 34 秒的医学科普短片，从文案、事实核查、配音、时间轴到逐章绘制画面、拼接母带、字幕，全部由 AI 分工协作完成。

这一版是**纯 MG（Motion Graphics）**：暖白纸面 + 大色块 + 矢量插画 + 信息图动效，没有实拍、没有 3D、没有任何真实患者发作影像。所有人物、病房、地铁、脑网络都是代码画的示意图。

> **许可**：作者原创内容 **CC0 1.0**（可复制、修改、商用，无需授权与署名）。片中引用的第三方资料、字体、作品中出现的名称仍归原权利人，不在 CC0 范围内，清权由使用方自负。法律文本见 [`../../LICENSE`](../../LICENSE)，范围与免责见 [`../../NOTICE.md`](../../NOTICE.md)。

[![在 B 站观看《癫痫科普视频》](preview/bilibili_cover.jpg)](https://www.bilibili.com/video/BV1VqHM6iES4)

**B 站**：[DeepSeek生成] 癫痫科普视频 · 10:16 · UP 主「跳过话题」

> 点封面直接跳转 B 站播放。GitHub 只支持图片，不支持内嵌播放器。
> B 站上传版是 10:16，仓库里是 13:34 的完整版——上传前在剪辑软件里剪掉了 TTS 的停顿并小幅提速，具体处理与主题一相同。

---

## 1. 成片

| 项 | 值 |
|---|---|
| 片名 | 《癫痫：大脑里的一场"电风暴"》 |
| 时长 | 13:34.77（814.773 秒，30fps） |
| 规格 | 1920×1080 / H.264 High + AAC 192k 48kHz 立体声 |
| 大小 | 62,970,719 B（约 60 MiB） |
| MD5 | `1418d57a507e7907e48ee23052f6d973` |
| 字幕 | 外挂 SRT，435 条：`preview/癫痫科普_纯MG动画版_字幕.srt` · [Release 附件](https://github.com/SkipTopic/ai-science-videos/releases/download/epilepsy-mg/Epilepsy_MG_Animation_zh.srt) |
| 配乐 | 无。只有云扬（`zh-CN-YunyangNeural`）旁白与留白 |
| 下载 | **[Releases · epilepsy-mg](https://github.com/SkipTopic/ai-science-videos/releases/tag/epilepsy-mg)** · [直接下载 mp4](https://github.com/SkipTopic/ai-science-videos/releases/download/epilepsy-mg/Epilepsy_MG_Animation_1080p.mp4)（60 MiB，不用登录） |

> 60 MiB 其实没到 GitHub 单文件 100 MB 的硬上限，但仍然放进 Release 而不是 git 历史：视频是二进制、改一版就多存一份，放在 Release 里克隆才不会被拖慢。

---

## 2. 十章结构

| # | Composition | 章节 | 时长(s) |
|---|---|---|---:|
| 0 | `Ch00` | 序章 · 白屏 | 80.32 |
| 1 | `Ch01` | 大脑里的一场"电风暴" | 65.00 |
| 2 | `Ch02` | 癫痫不是一种病，而是一组病 | 70.30 |
| 3 | `Ch03` | 为什么会得癫痫 | 70.28 |
| 4 | `Ch04` | 发作的那一刻 | 75.25 |
| 5 | `Ch05` | 怎么确诊 | 80.23 |
| 6 | `Ch06` | 能治吗 | 112.94 |
| 7 | `Ch07` | 发作时，旁人该做什么 | 90.23 |
| 8 | `Ch08` | 与癫痫一起生活 | 110.00 |
| 9 | `Ch09` | 尾声 · 重新开机 | 60.00 |
| | | **合计（章节表）** | **814.55** |

成片 814.773 秒，比章节表多出的 0.22 秒来自拼接时的音频对齐。全片 177 句旁白。

---

## 3. 结构

```
02-epilepsy-mg/
├─ README.md
├─ CREDITS.md                 ← 医学资料来源、字体、小说改编说明
├─ docs/
│  ├─ 00_交接报告_先读我.md     ← 项目总览（含目录地图、文案 v2、纪律）
│  ├─ 00_纯MG方案_先读我.md     ← 这一版的设计规范、十章分镜、交付记录
│  ├─ 链接与依赖说明.md         ← 绝对路径、字体、缺文件怎么办
│  └─ qa/                     ← 分章联系表、成片抽样、接缝、章节边界
├─ script/
│  ├─ 01_资料库/参考资料与来源_v1.md   ← 23 条说法的逐条出处 + 禁写清单
│  ├─ 02_文案/解说文案_全片_v1.md、v2.md
│  └─ 03_制作/                ← 3D 方案对比、Remotion 规范、GitHub 调研
├─ code/remotion-studio-mg/
│  ├─ src/film/mg/            ← 视觉系统（theme/mgKit/MGFrame）+ 10 章分镜
│  ├─ src/data/film.json      ← 时间轴与 177 句旁白
│  ├─ public/audio/film/      ← 177 条 mp3（4.7 MB）
│  └─ tools/                  ← 分章渲染、音频母带、SRT 生成
├─ tools/voice/               ← edge-tts 配音、时间轴排期脚本 + 时间轴 JSON
└─ preview/                   ← B 站封面、备用静帧、外挂字幕
```

---

## 4. 流水线

```
文案 v2（10 章 / 177 句）── 事实核查（23 条说法逐条对 WHO/ILAE/CDC/NHS）
        │
  edge-tts 逐句配音 + 词边界时间戳（云扬，rate +0%）
        │
  build_film_timeline.py → src/data/film.json（按语音实际长度排）
        │
  Remotion 逐章绘制：theme.ts 色板 + mgKit 组件 + Ch00–Ch09 分镜
        │
  node tools/render_all.mjs（10 章 → out/render/ChXX.mp4）
        │
  tools/build_film.sh：拼接 → 音频母带 → 交付 → 生成 SRT
```

- 画面全部是代码：没有一张位图素材，`public/` 里只有旁白音频。
- 色彩：十章各一个主色（沙、薄荷、蜜桃、黄油、天蓝、淡紫），唯一的深色场景是 Ch08 癫痫猝死的夜间卧室（navy，不是全黑）。
- 动效：弹性入场、擦除、数字滚动、线条绘制、慢速漂浮；**禁止 3 Hz 以上闪烁**，光敏段用静态扫描条示意。

---

## 5. 重新渲染

### 5.1 环境

| 依赖 | 版本 / 说明 |
|---|---|
| Node.js | 24.x |
| Remotion | 4.0.537（`remotion` + `@remotion/cli`） |
| React / TS | React 19 / TypeScript 5.7 |
| ffmpeg | 用 Remotion 自带的 `node_modules/@remotion/compositor-*/ffmpeg.exe`，不用系统 ffmpeg |
| Python | 3.12（只 `tools/audio_master.py`、`tools/make_srt.py` 需要，标准库 + numpy） |
| 渲染耗时 | 10 章合计约 34 分钟（1080p，concurrency 4） |

### 5.2 步骤

```bash
cd code/remotion-studio-mg
npm ci

node_modules/.bin/tsc --noEmit

# 单帧自审（先看再渲）
TEST_ID=Ch06 TEST_FRAMES=300,900,1800 node tools/render_test_stills.mjs

# 分章渲染（10 章 → out/render/Ch00.mp4 …）
node tools/render_all.mjs
# 只渲某几章：RENDER_CHAPTERS=Ch06,Ch07 node tools/render_all.mjs

# 拼接 + 音频母带 + 交付 + SRT
bash tools/build_film.sh
```

> `tools/build_film.sh` 里写死了原作者机器的 `ROOT`、`FFMPEG`、`PY`、`DELIVER` 四个路径，换机器先改这四行；`DELIVER` 目录不存在会直接失败。逐条说明见 `docs/链接与依赖说明.md`。

### 5.3 字体（重要）

工程里**不含字体文件**。`src/film/mg/MGFrame.tsx` 会尝试加载 `public/fonts/fonts.css`，但这个文件在原工程里就不存在（原本是指向另一个工程的目录联接，目标目录是空的），所以**交付成片实际用的是系统回退字体**：

- `"Noto Sans SC"` → 找不到 → 回退 **Microsoft YaHei**
- `"Noto Serif SC"` → 找不到 → 回退系统衬线（Windows 上通常是 **SimSun**）

也就是说：这支片子的字形是 Windows 默认中文字体，不是 Noto。要在别的机器上 1:1 复现，装一套 **Noto Sans SC / Noto Serif SC** 并把 `public/fonts/fonts.css` 补上即可；不补也能跑，只是字形不同、版式会有细微位移。

---

## 6. 医学与内容边界（别改）

这部分是审稿底线，写在 `docs/00_纯MG方案_先读我.md` 和 `script/01_资料库/参考资料与来源_v1.md` 里，改文案前必读：

- 左乙拉西坦段只写"常用、广谱、总体耐受性较好、对认知影响相对小、孕期相对更安全的选择之一"，**必须保留**"医生指导 / 不能自行加量减量停药 / 相对安全不等于没有风险"。
- 不写"影响最小"，不写"孕妇都能吃"。
- 全片没有真实患者发作影像；人物、病房、地铁、办公室、脑网络、电影屏幕都是矢量示意，画面标注"示意"。
- 光敏段落不做真实闪烁，片头标注"本片无高频闪光"。
- 癫痫猝死段落用平静夜间场景，强调"规范治疗、控制发作是最重要的预防"，不渲染恐惧。
- 序章故事改编自作者自己的小说（《宇宙快递员》查理前史），**不是真实赛事或真实病例**。

---

## 7. 验收记录（2026-10-23）

- 成片 814.773 秒 / 1920×1080 / 30fps / H.264 + AAC 48 kHz 立体声；交付件 MD5 `1418d57a…`。
- 十章逐章渲染，合计约 34 分钟（concurrency 4）。
- 每章至少 3 张关键静帧，共检查约 50 张，逐章修过标题压字、人物裁切/无脸、卡片遮挡、手机录像画面、城市图、病房、侧卧体位、孕前计划重叠、难治性标题叠字等问题。
- 接触表 `docs/qa/分章联系表_mg_contact.jpg`；成片抽样 `docs/qa/final_samples.jpg`；章节接缝 `docs/qa/joins.jpg`；边界时间 `docs/qa/boundaries.txt`。
- 音频母带：threshold 0.04 / ratio 6，全局 RMS 0.0559，峰值 0.95，无削波；38 个抽样 cue 窗口全部有语音。

---

## 8. 已知取舍（不是 bug）

1. **没有配乐**，只有旁白和留白。要加音乐必须重做母带并重新拼接。
2. **字体是系统回退**（见 5.3），不是设计稿里的 Noto。字形偏"办公文档感"，这是这一版最明显的短板。
3. 章节开头的空镜是设计上的入场动画，不是漏帧。
4. 旧版（暗色影像风，438 MB）仍在原作者本地 `工作区域文件夹/v1/`，未上传；本仓库只收纯 MG 版。
5. 字幕是外挂 SRT，画面里没有烧录字幕条（MG 版的文字本身就是分镜的一部分）。

---

## 9. 版权与资料来源

- 作者原创部分（文案、代码、分镜、文档）：**CC0 1.0**，见 [`../../LICENSE`](../../LICENSE)。
- 医学说法逐条出处：`script/01_资料库/参考资料与来源_v1.md`，主要来自 **WHO、ILAE、CDC、NHS、中国抗癫痫协会/中华医学会指南**。这些资料版权归原机构，本仓库只做引用与摘录。
- 第三方素材与改编说明：见 [`CREDITS.md`](CREDITS.md)。
- 免责：本片是科普内容，**不构成医疗建议**；具体诊断与用药请找专科医生。

---

## 10. 文档

- [`docs/00_交接报告_先读我.md`](docs/00_交接报告_先读我.md) — 项目总览、目录地图、文案 v2、纪律
- [`docs/00_纯MG方案_先读我.md`](docs/00_纯MG方案_先读我.md) — 设计规范、十章分镜、交付与自审记录
- [`docs/链接与依赖说明.md`](docs/链接与依赖说明.md) — 绝对路径、字体、缺文件怎么办
- [`script/01_资料库/参考资料与来源_v1.md`](script/01_资料库/参考资料与来源_v1.md) — 23 条医学说法的出处与禁写清单

---

## ⚠️ 严重警告

**本仓库中的所有视频都是 AI 生成的演示作品，不是可靠的信息来源。**

- AI 会"一本正经地胡说"：数字、年份、人名、引文、医学结论都可能出错，而且错得很自然、很像真的。
- **医疗、健康、用药相关内容尤其不能信。** 癫痫的诊断、急救、用药、孕期管理，只能听专科医生的；本片不构成任何医疗建议。
- 片中提到的研究、指南、数据，请回到原始文献或权威机构核实，不要因为讲得顺就当真。
- 这个项目的唯一目的是**演示一条 AI 视频生产流水线能做到什么程度**——它不是科普出版，不是知识产品，也不是任何形式的专业意见。
- 任何人依据本仓库内容做出的判断、决定或行为，后果自负；作者不承担任何责任。

**看它可以，信它不行。要真知识，去问真人和原始资料。**
