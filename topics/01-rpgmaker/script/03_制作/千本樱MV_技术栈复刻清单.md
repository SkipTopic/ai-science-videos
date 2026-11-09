# 复刻「一句话做千本樱 MV」· 技术栈与安装清单

> 目标视频：BV16MJY6yEKq｜Claude Opus 5.5 用 Remotion + Blender MCP 做的 4 分 12 秒 MV
> 你的条件：下一台电脑有 **Qoder + DeepSeek**
> 本文只给清单，不执行任何安装

---

## 一、先看清楚原视频到底用了什么

UP 主在简介里写得很清楚，我原样拆出来：

| 环节 | 工具 | 说明 |
|---|---|---|
| 主控 | Claude Code + Opus 5.5 | 全程主导，一个人格跑完 |
| 画面编排与合成 | **Remotion** | 4:12，7574 帧，全部用代码写 |
| 3D 场景 | **Blender + Blender MCP** | Claude 通过 MCP 操控 Blender 建模、渲染 |
| 角色立绘 | **Anima（ComfyUI）** | 生成初音未来 |
| 抠图 / 修图 | **gpt-image** | 把生成图修成能用的素材 |
| 音源 | 本地歌曲 + 字幕 | 用户提供的起点 |

**核心结论：这条片子的骨架不是 3D，是 Remotion。**

7574 帧全部由 Remotion 编排。Blender 只负责产出几个 3D 镜头，当成素材塞进 Remotion 的时间轴。真正的工作量在"把 4 分钟的每一帧安排明白"。

---

## 二、你的条件和它的差距

| 维度 | 原视频 | 你的 Qoder + DeepSeek | 影响 |
|---|---|---|---|
| 模型 | Claude Opus 5.5 | DeepSeek V3.x / R1 | 长链路任务容易跑偏，需要拆得更细 |
| 上下文 | 200K–1M | 128K | 不能一次塞整份分镜，要分文件 |
| 工具调用 | Claude Code 原生 | Qoder 支持 MCP | 基本对等，Blender MCP 能接 |
| 成本 | 约 168 元（max20x 半周额度） | 按 token 计费，便宜很多 | 你的试错成本更低 |

**差距不在"能不能做"，在"要不要人盯着"。**

原视频那句提示词是"自由发挥，质量尽可能最好"——那是因为 Opus 5.5 能扛住这种开放度。用 DeepSeek 你也这么写，大概率得到一个技术正确、审美平庸的东西。

**给你的做法：不要一句话，要给分镜。**

把 4 分钟拆成 20–30 个镜头，一个镜头一个 Remotion 组件，一个一个让 AI 写。这样 DeepSeek 每次只需要处理 10 秒的信息量，成功率会高得多。

---

## 三、安装清单

### 必需（不装跑不起来）

| 软件 | 版本 | 用途 | 备注 |
|---|---|---|---|
| **Node.js** | 22 LTS | Remotion 运行时 | 官网 msi，一路下一步 |
| **ffmpeg** | 6.x+ | 抽帧、转码、拼接 | 建议用 `winget install ffmpeg` 或 gyan.dev 的 build |
| **Git** | 最新 | 版本管理，AI 改坏了能回滚 | 这条片子的救命绳 |
| **Chrome / Edge** | 最新 | Remotion 渲染用无头浏览器 | Remotion 会自动下 headless shell，但本机有 Chrome 更稳 |

### 必需（Blender 侧）

| 软件 | 版本 | 用途 |
|---|---|---|
| **Blender** | 4.2 LTS | 3D 场景、樱花粒子、镜头运动 |
| **Blender MCP** | 最新 | 让 Qoder 通过 MCP 操控 Blender |

> Blender 4.2 是 LTS，比 4.5/5.x 稳。MCP 插件对 4.2 的兼容性最好。

### 强烈建议（决定成片质感）

| 软件 | 用途 | 为什么重要 |
|---|---|---|
| **DaVinci Resolve**（免费版） | 最终调色、混音、字幕压片 | Remotion 输出的是"素材级"画面，调色和响度归一化要靠 Resolve |
| **字体包** | 字幕与标题 | 见第六节，字体是最便宜的画质提升 |

### 可选（看你有没有显卡）

| 软件 | 用途 | 门槛 |
|---|---|---|
| **ComfyUI + Anima 模型** | 生成角色立绘（原视频用法） | 需要 8GB+ 显存 |
| **rembg / BiRefNet** | 本地抠图，替代 gpt-image | CPU 也能跑，慢 |
| **librosa**（Python） | 节拍检测、音频波形 | 做"画面踩点"必备 |
| **whisperx** | 歌词强制对齐 | 有 LRC 就不需要 |

---

## 四、Remotion 项目的骨架

### 初始化

```bash
npx create-video@latest kimigayo-mv
cd kimigayo-mv
npm i
npx remotion studio        # 本地预览
```

### 目录结构（建议）

```
kimigayo-mv/
├── AGENTS.md                 ← 给 Qoder 看的项目说明书（关键）
├── public/
│   ├── audio/senbonzakura.mp3
│   ├── lyrics/senbonzakura.lrc
│   └── assets/               ← Blender 渲出来的 png 序列 / mp4
├── src/
│   ├── Root.tsx              ← 注册 Composition
│   ├── Video.tsx             ← 总时间轴
│   ├── shots/                ← 一个镜头一个文件
│   │   ├── Shot01_Open.tsx
│   │   ├── Shot02_Petals.tsx
│   │   └── ...
│   └── components/           ← 可复用的：字幕、粒子、转场
├── blender/                  ← .blend 文件
└── out/
```

### 三个必须掌握的概念

```tsx
// 1. 当前帧
const frame = useCurrentFrame();

// 2. 插值（做任何动画的基础）
const opacity = interpolate(frame, [0, 30], [0, 1], {
  extrapolateRight: "clamp",
});

// 3. 弹簧（做"弹一下"的手感）
const scale = spring({ frame, fps, config: { damping: 12 } });
```

> 这三个东西，就是整条 MV 的全部语法。剩下的都是排列组合。

---

## 五、给 Qoder 的 AGENTS.md（直接抄）

Qoder 会读项目根目录的 `AGENTS.md`。没有这个文件，DeepSeek 会按自己的习惯乱建目录。

```markdown
# 项目说明

这是一个用 Remotion 制作的音乐 MV 项目。

## 技术栈
- Remotion 4.x + React 18 + TypeScript
- 3D 素材由 Blender 4.2 预先渲染成 PNG 序列或 MP4，放在 public/assets/
- 不使用 Three.js，不在 Remotion 里做实时 3D

## 目录约定
- src/shots/ 下每个镜头一个文件，命名 ShotNN_名称.tsx
- 所有镜头在 src/Video.tsx 里用 <Sequence> 按时间排列
- 公共组件放 src/components/
- 素材只读 public/，不要 import 图片

## 编码规则
- 只用函数组件 + hooks，不用 class
- 动画一律用 useCurrentFrame + interpolate / spring
- 不要用 CSS animation 或 CSS transition，Remotion 渲染时会丢帧
- 不要用 Math.random()，会导致每帧不一致；需要随机用 random('固定种子')
- 所有时间单位是帧，30fps

## 渲染
- 预览：npx remotion studio
- 出片：npx remotion render src/index.ts Main out/video.mp4

## 禁止
- 不要改 public/ 里的素材
- 不要引入新的动画库（framer-motion / gsap 都不行）
- 不要一次写超过 3 个镜头
```

---

## 六、字体（最便宜的画质提升）

千本樱是日文歌，字幕字体很关键。

| 用途 | 字体 | 授权 |
|---|---|---|
| 日文歌词 | **Noto Sans JP** / **M PLUS 1p** | OFL，免费商用 |
| 中文旁白字幕 | **思源黑体**（Source Han Sans） | OFL |
| 标题/装饰 | **思源宋体 Heavy** / **霞鹜文楷** | OFL |
| 和风装饰字 | **Yuji Syuku** / **Kaisei Decol** | OFL，Google Fonts 有 |

---

## 七、分阶段路径（别一上来做 4 分钟）

### 第一阶段：10 秒（1–2 天）
- 只做：黑屏 → 第一句歌词 → 樱花粒子 → 淡出
- 目标：跑通 `remotion studio` 和 `remotion render`
- 产出：`out/test10s.mp4`，能播，音画同步

### 第二阶段：30 秒副歌（3–5 天）
- 加入：节拍踩点、镜头切换、字幕逐字
- 目标：验证"节奏感"
- 这一步如果不好看，后面 4 分钟也不会好看

### 第三阶段：全曲（1–2 周）
- 按段落拆：前奏 / A 段 / B 段 / 副歌 / 间奏 / 尾声
- 每个段落单独一个 Composition，最后拼
- Blender 镜头在这一阶段插入

> 原视频是"在已有基础环境的情况下一轮出"。注意"已有基础环境"这五个字——他有现成的 Remotion 项目模板、现成的 ComfyUI 工作流、现成的 Blender 场景库。你不是从零到一，你是从零到他那套环境。

---

## 八、成本与时间的现实预期

| 项目 | 原视频 | 你的情况 |
|---|---|---|
| 模型成本 | 约 168 元 | DeepSeek 便宜一个量级，但试错轮次会更多 |
| 时间 | "一轮出"（有基础环境） | 从零搭环境 + 学 Remotion，现实是 2–3 周 |
| 最大风险 | — | **分镜失控**：AI 每个镜头都做得还行，连起来不像一支 MV |

**最后一条最重要。** MV 的灵魂是分镜之间的呼吸，不是单帧好看。所以第一阶段那 10 秒，一定要自己盯着调到满意，再往下走。

---

*清单 v1 · 2026-10-21*
