# Remotion 规范摘录 v1（给癫痫科普新章节）

> **来源**：`remotion-dev/skills`（★5,548，最后 push 2026-10-22）。实读：
> `skills/remotion-best-practices/SKILL.md`、`skills/remotion-markup/SKILL.md`、
> `skills/remotion-markup/timing.md`、`skills/remotion-markup/voiceover.md`。
>
> **适配**：本项目 Remotion **4.0.537** + React 19。官方 skill 标注 4.0.538，但核心 API 在本版本可用：
> 已查 `interpolate.d.ts` 支持 `Easing.spring`、`output: 'perceptual-scale'`、`posterize`。
>
> **结论**：现有引擎 `drift.tsx` / `ChapterBase.tsx` / `components.tsx` / `realShots.tsx` **没有发现功能性违规**；
> 有一处可选的规范性偏差：现有代码用 `theme.FPS`（固定 30）而不是 `useVideoConfig().fps`，在当前固定 30fps 下无影响，暂不重构。
> 下面的规则用于**新章节**，不要为了“更规范”去重构已经工作的引擎。

---

## 1. 十条硬规则

1. **动画必须由帧驱动**：`useCurrentFrame()` + `interpolate()`；禁止 CSS `transition` / `animation` / Tailwind 动画类。
2. **`useCurrentFrame()` 放在最小组件**：只让真正需要帧的组件订阅；字幕条、音量、标题各自独立，不要把整个章节变成帧消费者。
3. **秒换帧用 `useVideoConfig().fps`**：新代码写 `0.5 * fps`，不要写死 `15`。现有引擎固定 30fps，用 `theme.FPS` 可以接受，但新组件优先 `useVideoConfig()`。
4. **`interpolate` 一律夹紧**：`extrapolateLeft: 'clamp'`、`extrapolateRight: 'clamp'`，避免透明度/位移越界。
5. **缓动用 `Easing`**：`Easing.bezier(0.16, 1, 0.3, 1)` 或 `Easing.spring({damping: 200})`；不要用线性动画硬怼。
6. **缩放用 `output: 'perceptual-scale'`**：视觉上更均匀，避免“越大越快”。
7. **优先独立 transform 属性**：`scale` / `translate` / `rotate` 分开写，优于 `transform: 'translate(...) scale(...)'`；Studio 更容易编辑。
8. **素材只用 `staticFile()`**：图片、音频、视频都放 `public/`；最终渲染不要依赖远程 URL。
9. **音频走 `<Sequence>` + `<Audio>`**：旁白由 `ChapterAudio` 统一装配；音效优先用 `ChapterFrame` 的 `sfx` cues，不要手写一堆裸 `<Audio>`。
10. **确定性**：禁止 `Math.random()`、`Date.now()`、`new Date()`；随机纹理用 `theme.ts` 里的 `hash()`，保证每次渲染一致。

---

## 2. 本项目可直接照抄的写法

### 2.1 淡入 + 缓动

```tsx
import {useCurrentFrame, useVideoConfig, interpolate, Easing} from 'remotion';

const frame = useCurrentFrame();
const {fps} = useVideoConfig();

const opacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
  easing: Easing.bezier(0.16, 1, 0.3, 1),
});
```

### 2.2 缩放（视觉均匀）

```tsx
const scale = interpolate(frame, [0, 0.6 * fps], [0.96, 1], {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
  easing: Easing.spring({damping: 200}),
  output: 'perceptual-scale',
});

<div style={{opacity, scale}} />
```

### 2.3 新章节骨架（套现有引擎）

```tsx
import {AbsoluteFill} from 'remotion';
import {Beat, ChapterFrame} from '../ChapterBase';
import type {FilmChapter, SfxCue} from '../data';

export const ChXX: React.FC<{
  chapter: FilmChapter;
  sfx?: SfxCue[];
}> = ({chapter, sfx}) => (
  <ChapterFrame chapter={chapter} mood="night" sfx={sfx}>
    <Beat from={0.4} to={4.8}>
      <AbsoluteFill>{/* 场景内容 */}</AbsoluteFill>
    </Beat>
  </ChapterFrame>
);
```

- `ChapterFrame` 已经负责：字体加载、`Drift`、`Grain`、`Vignette`、字幕、旁白/环境音/音效。
- `Beat` 的 `from` / `to` 是**秒**，内部会转成帧，并套 `SceneClock`；不要在 `Beat` 里再手写一层 `Sequence`，除非你要独立控制音效。

### 2.4 音效（优先 cues）

```tsx
<ChapterFrame
  chapter={chapter}
  mood="night"
  sfx={[
    {at: 1.2, file: 'click.wav', volume: 0.35},
    {at: 3.6, file: 'switch.wav', volume: 0.3},
  ]}
>
  {/* ... */}
</ChapterFrame>
```

### 2.5 字幕

- 字幕由 `ChapterFrame` 内部的 `<Subtitles chapter={chapter} />` 烧录，数据来自 `chapter.cues`。
- **不要**再叠一层 SRT/字幕条；否则会出现双字幕。
- 如果要改字幕样式，改 `ChapterBase.tsx` 里的 `Subtitles`，不要在每个章节里各写一套。

---

## 3. 本版本（4.0.537）不要照搬的地方

官方 skill 是 4.0.538 的写法，以下内容**不要直接抄进我们工程**：

| 官方写法 | 我们的写法 | 原因 |
|---|---|---|
| `import {Audio, Video} from '@remotion/media'` | `import {Audio} from 'remotion'`、`OffthreadVideo` | `@remotion/media` 已随 Remotion 安装（ESM-only，`require.resolve` 会失败），但现有引擎统一用 `remotion` 的媒体组件；新章节不要混用两套 |
| `CanvasImage` / `AnimatedImage` 新组件 | `Img` / 现有组件 | 4.0.537 里有部分新组件，但本项目已封装 `Img`/`OffthreadVideo`；不要为了新 API 重写，先做静帧测试 |
| ElevenLabs TTS + `calculateMetadata` | edge-tts + `script.json` + 固定章节帧 | 我们的中文配音和时间轴已经跑通，不要换管线 |
| Studio 交互式 `Interactive.Div` | 普通 `div` + `interpolate` | 我们不做 Studio 内交互编辑，不需要 |
| CSS `scale`/`translate` 新语法 | 可用；若 TS 类型报错就退回 `transform` | 渲染效果一致，Studio 编辑性略差 |

---

## 4. 现有代码审计（2026-10-23）

| 文件 | 检查项 | 结果 |
|---|---|---|
| `src/film/drift.tsx` | 帧驱动、无 CSS 动画、确定性 | ✅ 通过；使用 `theme.FPS`（固定 30fps）——可选偏差，不影响当前渲染 |
| `src/film/ChapterBase.tsx` | `Sequence` / `Audio` / `staticFile` / `delayRender` / 字幕 cues | ✅ 通过 |
| `src/film/components.tsx` | 颗粒用 `hash()`，`frame` 由外部传入 | ✅ 通过；无 `Math.random()` |
| `src/film/realShots.tsx` | `Img` / `OffthreadVideo` / `staticFile` | ✅ 通过 |
| `src/SetupCheck.tsx` | 字体 `delayRender` / `continueRender` | ✅ 通过 |
| 全工程 grep | `Math.random` / `Date.now` / `new Date` / CSS `animation:` / `transition:` | **0 命中** |

**可选改进（不是必须）**：新组件用 `useVideoConfig().fps` 取帧率；现有 `theme.FPS` 在固定 30fps 下没问题，暂时不动，避免影响已通过的渲染。

---

## 5. 新章节自检清单

- [ ] 用 `ChapterFrame` 包住整章，用 `Beat` 切节拍；没有裸 `Sequence` 乱飞。
- [ ] 所有动画都从 `useCurrentFrame()` 出发，`interpolate` 带 `clamp`。
- [ ] 没有 CSS `transition` / `animation`。
- [ ] 秒换帧用 `fps` 变量，不写死数字。
- [ ] 素材全部 `staticFile()`，文件在 `public/` 下。
- [ ] 音效走 `sfx` cues；旁白走 `ChapterAudio`；没有重复音轨。
- [ ] 字幕只由 `ChapterFrame` 烧一次；没有第二层字幕。
- [ ] 没有 `Math.random` / `Date.now`；随机纹理用 `hash()`。
- [ ] 新组件没有引入新依赖；没有在癫痫工程跑 `npm install`。
- [ ] 先渲 5–10 秒 still/短段检查，再整章渲染。

---

## 6. 来源

- 仓库：[remotion-dev/skills](https://github.com/remotion-dev/skills)（★5,548，最后 push 2026-10-22）
- 路由/总则：`skills/remotion-best-practices/SKILL.md`
- 标记/动画/音频：`skills/remotion-markup/SKILL.md`
- 时间与缓动：`skills/remotion-markup/timing.md`
- 配音：`skills/remotion-markup/voiceover.md`
- 本机 API 校验：`node_modules/remotion/dist/cjs/interpolate.d.ts`、`easing.d.ts`

> 本次只读官方 skill，**没有安装任何 skill / MCP / 依赖，也没有改动现有代码**。
