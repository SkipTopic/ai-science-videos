# GitHub · Remotion / Opus 5.5 生视频 资源调研

> **调研日期**：2026-10-23 15:07（UTC+8）
> **关键词**：remotion prompts / remotion skills / remotion mcp / opus5.5 生视频
> **数据来源**：GitHub REST API（仓库元数据 + README 实读）
> **口径**：★ = `stargazers_count`；最后更新 = `pushed_at`（UTC 日期，最后一次 push，不等于 release）。数字会继续变化，以下是拉取时快照。
> **状态**：只调研，**没有安装任何外部 skill / MCP / 依赖**。

---

## 0. 结论先行（给我们这部片）

| 优先级 | 资源 | 为什么 |
|---|---|---|
| **最值得读** | [`remotion-dev/skills`](https://github.com/remotion-dev/skills)（★5,548，2026-10-22） | Remotion 官方 Agent Skills，12 个 skill 覆盖 best practices、markup、render、captions、multimedia 等；不装也能先读规则 |
| **最值得小样试** | [`Remocn/remocn`](https://github.com/Remocn/remocn)（★1,629，2026-10-11，MIT） | 给 Remotion 用的 copy-paste 组件库：动画、转场、背景、场景；走 shadcn registry，代码进项目而不是加依赖 |
| **最值得读架构** | [`remotion-dev/template-prompt-to-video`](https://github.com/remotion-dev/template-prompt-to-video)（★160，2026-10-16） | “提示词 → 故事脚本 → 图 → 配音 → 时间轴”的官方模板；但它用 OpenAI + ElevenLabs，我们已有 edge-tts/自建时间轴，只借结构不接依赖 |
| **Opus 5.5 提示词库** | [`yihui-dev/awesome-opus5-5-videos`](https://github.com/yihui-dev/awesome-opus5-5-videos)（★9,408，2026-10-13，MIT） | 703 条 Opus 5.5 生视频提示词，含 explainers / 3D / motion graphics；产物是 HTML/Canvas/SVG/Three.js 单页，不是 Remotion 代码 |
| **Opus 5.5 风格库** | [`lemomo-ai/lemo-opuscar`](https://github.com/lemomo-ai/lemo-opuscar)（★5,810，2026-10-22，MIT） | 59 种纯代码影片风格，含 “Evidence Films（每个数字都有出处）”；最适合医学科普的视觉参考，但不是 Remotion |
| **选型地图** | [`zhuyansen/awesome-claude-video-skills`](https://github.com/zhuyansen/awesome-claude-video-skills)（★827，2026-10-22） | 收录 333 个视频 skill 仓库，实测 16 个；其中明确推荐用 `remotion-dev/skills` 自建设计 |
| **MCP 候选** | [`mcp-use/remotion-mcp-app`](https://github.com/mcp-use/remotion-mcp-app)（★58，2026-10-09） | 带实时预览/编辑的 Remotion MCP App；星少，先审代码再考虑 |

**一句话**：官方 skills 先读；Remocn 选 1–2 个组件做小样；Opus 5.5 的两个库只借“视觉语言/提示词结构”，不要把它们的 HTML/Canvas 产物硬塞进 Remotion。

---

## 1. Remotion 直接相关

| 仓库 | 类型 | ★ | 最后 push | License | 能用来做什么 | 建议 |
|---|---|---:|---|---|---|---|
| [`remotion-dev/remotion`](https://github.com/remotion-dev/remotion) | 官方框架 | 66,479 | 2026-10-23 | NOASSERTION（Remotion 自有许可） | React 编程视频的基础 | 已在用，不重复引入 |
| [`remotion-dev/skills`](https://github.com/remotion-dev/skills) | 官方 Agent Skills | 5,548 | 2026-10-22 | 未检测到 SPDX | 12 个 skill：best-practices / create / markup / studio / render / maps / captions / saas / interactivity / docs / upgrade / multimedia | **首选**：先读；如要装，项目内小范围试，别全局装 |
| [`remotion-dev/claude-code-plugin`](https://github.com/remotion-dev/claude-code-plugin) | 官方 Claude Code 插件 | 59 | 2026-10-22 | 未检测到 | 官方插件封装 | README 写明 internal package、无文档；优先用 `skills` |
| [`remotion-dev/codex-plugin`](https://github.com/remotion-dev/codex-plugin) | 官方 Codex 插件 | 26 | 2026-10-22 | 未检测到 | Codex 侧插件 | 同上，暂不优先 |
| [`remotion-dev/template-prompt-to-video`](https://github.com/remotion-dev/template-prompt-to-video) | 官方模板 | 160 | 2026-10-16 | 未检测到 | 提示词 → 故事脚本/图/配音/时间轴；用 OpenAI + ElevenLabs | **读架构**；不直接接（我们已有 TTS/时间轴） |
| [`remotion-dev/template-prompt-to-motion-graphics-saas`](https://github.com/remotion-dev/template-prompt-to-motion-graphics-saas) | 官方模板 | 281 | 2026-10-16 | 未检测到 | 提示词 → 动效图形 SaaS 模板 | 参考，不必接 |
| [`Remocn/remocn`](https://github.com/Remocn/remocn) | Remotion 组件库 / skill | 1,629 | 2026-10-11 | **MIT** | 动画、转场、背景、场景；`npx shadcn@latest add @remocn/...`；代码复制进项目 | **小样试 1–2 个**；注意 React 19 / Remotion 4.0.537 兼容性 |
| [`haidrrrry/claude-remotion-skill`](https://github.com/haidrrrry/claude-remotion-skill) | Claude Agent Skill | 589 | 2026-08-12 | **MIT** | 教 Claude 做 motion graphics；模型无关 | 备选；官方 `skills` 更新更勤，优先官方 |
| [`vercel-labs/skill-remotion-geist`](https://github.com/vercel-labs/skill-remotion-geist) | Vercel 设计 skill | 23 | 2026-01-29 | 未检测到 | Geist 设计系统的 Remotion 模板 | 需要 Geist 风格再看；半年未更新 |
| [`remotion-dev/template-tiktok`](https://github.com/remotion-dev/template-tiktok) | 官方模板 | 291 | 2026-10-16 | 未检测到 | Whisper.cpp 生成 TikTok 字幕 | 我们已有字幕链，跳过 |
| [`remotion-dev/template-audiogram`](https://github.com/remotion-dev/template-audiogram) | 官方模板 | 274 | 2026-10-22 | 未检测到 | 播客音频 + 波形短视频 | 不适用，跳过 |
| [`remotion-dev/template-code-hike`](https://github.com/remotion-dev/template-code-hike) | 官方模板 | 220 | 2026-10-16 | 未检测到 | 代码片段动画 | 不适用，跳过 |
| [`remotion-dev/template-three`](https://github.com/remotion-dev/template-three) | 官方模板 | 116 | 2026-10-22 | 未检测到 | Remotion + React Three Fiber | 本机无 GPU，暂不 |
| [`remotion-dev/template-overlay`](https://github.com/remotion-dev/template-overlay) | 官方模板 | 19 | 2026-10-16 | 未检测到 | 传统剪辑软件叠加层 | 不适用，跳过 |

**官方 skills 的 12 个入口**（README 实读）：`/remotion-best-practices`、`/remotion-create`、`/remotion-markup`、`/remotion-studio`、`/remotion-render`、`/remotion-maps`、`/remotion-captions`、`/remotion-saas`、`/remotion-interactivity`、`/remotion-docs`、`/remotion-upgrade`、`/remotion-multimedia`。
安装命令（**未执行**）：`npx skills add remotion-dev/skills`。

---

## 2. Opus 5.5 生视频 / 提示词生态（不是 Remotion）

| 仓库 | ★ | 最后 push | License | 它是什么 | 能不能直接用 |
|---|---:|---|---|---|---|
| [`yihui-dev/awesome-opus5-5-videos`](https://github.com/yihui-dev/awesome-opus5-5-videos) | 9,408 | 2026-10-13 | MIT | 703 条 Opus 5.5 生视频提示词；motion graphics / explainers / 3D / games；每条附原作者与 prompt | **不能直接贴进 Remotion**。产物是单页 HTML/Canvas/SVG/Three.js；适合借“分镜/视觉语言/提示词写法” |
| [`lemomo-ai/lemo-opuscar`](https://github.com/lemomo-ai/lemo-opuscar) | 5,810 | 2026-10-22 | MIT | 59 种纯代码影片风格；2026-10-22 新增 Edit & Documentary、Evidence Films（每个数字有出处） | **最适合医学科普参考**，但为 Claude Opus 5.5 调优，不是 Remotion；不要直接接 |
| [`alchaincyf/huashu-motion`](https://github.com/alchaincyf/huashu-motion) | 1,482 | 2026-10-22 | MIT | Agent skill：商业发布片、自动作曲、指着画面改；README/topics 显示 GSAP，不是 Remotion | 参考“指哪改哪 / 先写谱再拍片”的工作流；不直接接 |
| [`zhuyansen/awesome-claude-video-skills`](https://github.com/zhuyansen/awesome-claude-video-skills) | 827 | 2026-10-22 | NOASSERTION | 333 个视频 skill 仓库索引；实测 16 个；明确推荐 `remotion-dev/skills` 自建设计 | **选型地图**，不是代码库 |
| [`whaleyxbt/claude-motion`](https://github.com/whaleyxbt/claude-motion) | 618 | 2026-10-09 | 未查 | 面向 coding agent 的 motion design 工具箱 | 邻近，不是 Remotion；暂不接 |
| [`charlie947/motion-graphics-skills`](https://github.com/charlie947/motion-graphics-skills) | 371 | 2026-10-11 | 未查 | 13 个 Claude Code skills，做发布级 motion graphics | 邻近，不是 Remotion；参考 |
| [`jnMetaCode/ai-shortfilm-prompts`](https://github.com/jnMetaCode/ai-shortfilm-prompts) | 484 | 2026-10-19 | 未查 | AI 短片/漫剧提示词方法论 + skill | 邻近；我们剧本已定，暂不需要 |
| [`browser-use/video-use`](https://github.com/browser-use/video-use) | 29,564 | 2026-10-08 | 未查 | 用 coding agent 剪视频（剪辑向） | 邻近；我们已有 ffmpeg/Remotion 链，暂不接 |
| [`maxazure/video-editing-skill`](https://github.com/maxazure/video-editing-skill) | 205 | 2026-10-18 | 未查 | 口播/ vlog 自动剪辑；含 `REMOTION_VOICEOVER.md` 与模板清单 | 参考 voiceover/字幕部分；不替代现有 TTS |

**重要判断**：

- 这些“Opus 5.5 生视频”案例的底层大多是 **HTML / Canvas / SVG / Three.js 单页动画**，不是 Remotion 的 Composition。
- 可以借：镜头语言、节奏、颜色、转场、提示词结构、解释性动画的构图。
- 不能借：直接把 prompt 丢给 Remotion 就出片；要把“画面意图”重写成 `<AbsoluteFill>` / `<Sequence>` / `useCurrentFrame()` 的组件。
- 医学内容仍要遵守本片规范：AI 图标注、医学影像标“示意”、不用真实患者视频、避免高频闪烁。

---

## 3. Remotion MCP 候选

| 仓库 | ★ | 最后 push | 说明 | 建议 |
|---|---:|---|---|---|
| [`mcp-use/remotion-mcp-app`](https://github.com/mcp-use/remotion-mcp-app) | 58 | 2026-10-09 | MCP App：创建 Remotion 动画 Composition，带实时播放器/编辑 | 星少；先读代码与权限，再考虑沙盒试 |
| [`stephengpope/remotion-media-mcp`](https://github.com/stephengpope/remotion-media-mcp) | 34 | 2026-02-25 | 为 Remotion 生成图片/视频/音乐/音效/语音/字幕的 MCP server | 较旧；媒体生成不是我们当前瓶颈 |
| [`dev-arctik/remotion-video-mcp`](https://github.com/dev-arctik/remotion-video-mcp) | 2 | 2026-04-23 | 自然语言 → Remotion | 星太少，不建议 |
| [`aunysillyme-dev/remotion-mcp`](https://github.com/aunysillyme-dev/remotion-mcp) | 1 | 2026-09-20 | 已归档（Archived），被其他项目取代 | 不用 |

> 说明：搜索里还出现“Remotion 官方 MCP 是文档读取型”的说法，但没有找到独立官方仓库；官方入口目前以 `remotion-dev/skills` 和 `claude-code-plugin` 为准。

---

## 4. 不建议 / 停维护

| 仓库 | ★ | 最后 push | 原因 |
|---|---:|---|---|
| [`vibe-motion/skills`](https://github.com/vibe-motion/skills) | 1,393 | 2026-10-05 | README 明确写“此项目不再维护，请移步 motionface.cc” |
| [`vibe-motion/remotion-starter`](https://github.com/vibe-motion/remotion-starter) | 7 | 2026-07-05 | 星少、7 月后无更新；同作者 skills 已停维护 |
| [`chenyuxiaojin/cyxj-remotion-starter`](https://github.com/chenyuxiaojin/cyxj-remotion-starter) | 8 | 2026-09-26 | 与上者同源，重复 |
| [`dust-tools/skills`](https://github.com/dust-tools/skills) | 0 | 2026-02-23 | 0 星、无描述、无法判断质量 |
| 多个 0–2★ 的 `remotion-mcp` | 0–2 | 2026 年 | 星太少、无维护证据；不要装 |

---

## 5. 对我们这部片的具体建议

### 5.1 现在就能做（不装任何东西）

1. **读官方 skills 的 3 个入口**：`remotion-best-practices`、`remotion-markup`、`remotion-captions`。其中与 `ChapterBase` / `Drift` / `SceneClock` 不冲突的规则已摘进 [`Remotion规范摘录_v1.md`](./Remotion规范摘录_v1.md)。
2. **用 Opus 5.5 提示词库找“解释型动画”的构图**：`awesome-opus5-5-videos` 的 Explainers 分类、`lemo-opuscar` 的 Evidence Films 分类。只借镜头/版式，产出仍是 Remotion 组件或 AI 图。
3. **把 `huashu-motion` 的“先写谱再拍片 / 指哪改哪”记进分镜流程**：它不适合直接接，但“音乐节拍先定、画面按拍切”很适合我们这种旁白驱动的片子。

### 5.2 需要老板点头才做

1. **Remocn 小样**：在 v1 工程里只加 1 个组件（如 `blur-reveal` 或 kinetic title），用现有 `node_modules` 试；如果 shadcn 要加新依赖，先在独立 sandbox 工程试，**绝不在癫痫工程里 `npm install`**（`node_modules` 是 junction，会污染 RPG Maker 共享目录）。
2. **官方 skills 项目内安装**：`npx skills add remotion-dev/skills` 会写 agent 配置/项目文件；建议先在项目副本试，确认不改变现有渲染行为。
3. **MCP**：`mcp-use/remotion-mcp-app` 只有 58★，先审代码和权限；不要直接给工作区写权限。

### 5.3 不建议

- 不要为了“用上 Opus 5.5”把现有 Remotion 工程换成 HTML/Canvas 单页流程；我们已经有一整套可断点、可重渲、可 QA 的 Remotion 管线。
- 不要把 `template-prompt-to-video` 的 OpenAI/ElevenLabs 依赖接进来；我们的 edge-tts + 逐句时间轴更适合中文科普。
- 不要安装 0–2★ 的 MCP/skill；也不要用已停维护的 `vibe-motion/skills`。

---

## 6. 风险与注意事项

1. **Star ≠ 质量**：`awesome-opus5-5-videos`（2026-09-27 建仓）、`lemo-opuscar`（2026-09-26 建仓）、`huashu-motion`（2026-10-18 建仓）都是几周内冲起来的，代码/安全性还没经过时间验证。
2. **License 要逐个看**：
   - `Remocn`、`haidrrrry`、`huashu-motion`、`lemo-opuscar`、`awesome-opus5-5-videos`：MIT（可商用/修改，但仍需保留版权声明）。
   - `remotion-dev/skills`、`template-prompt-to-video`、`vercel-labs/skill-remotion-geist`：未检测到 SPDX license；**不要直接搬进商业交付**，先看仓库 LICENSE/Remotion 条款。
   - `awesome-claude-video-skills`：NOASSERTION；只当索引，不复制内容。
3. **`pushed_at` 不是 release**：可能是 README 小改；真正采用前看 commit、issue、release。
4. **供应链**：`npx skills add` / `npx shadcn add` 会执行第三方代码；先读脚本、限定项目目录、不要在全局装。
5. **兼容性**：我们锁定 Remotion 4.0.537 + React 19；这些新仓库可能面向更新版本。任何组件先做 10 秒静帧/短视频测试，再进正式时间轴。
6. **医学内容**：AI 生成图/视频一律标“AI 生成/示意”；不要用真实患者发作视频；不要用高频闪烁素材。

---

## 7. 下次可以继续查的方向

- [ ] `remotion-dev/skills` 的 `best-practices` 全文，摘成我们自己的 `Remotion规范摘录_v1.md`
- [ ] `Remocn` 组件目录里挑 2 个适合科普片的（转场/标题/背景），做 5 秒小样
- [ ] `awesome-opus5-5-videos` 的 Explainers 分类里挑 3 条，改写成癫痫科普的 AI 图提示词
- [ ] `lemo-opuscar` 的 Evidence Films 风格，研究“每个数字都有出处”的版式
- [ ] 如果老板想用 Opus 5.5 直接生视频：先确认它输出的是 HTML/Canvas 单页，还是能导出 MP4；不要假设

---

## 8. 数据快照（原始数字）

> 拉取时间：2026-10-23 15:07（UTC+8）；star/pushed_at 以 GitHub API 当时返回为准。

```text
remotion-dev/remotion                            66479  pushed 2026-10-23
remotion-dev/skills                               5548  pushed 2026-10-22
remotion-dev/claude-code-plugin                     59  pushed 2026-10-22
remotion-dev/codex-plugin                           26  pushed 2026-10-22
remotion-dev/template-prompt-to-video              160  pushed 2026-10-16
remotion-dev/template-prompt-to-motion-graphics-saas 281 pushed 2026-10-16
remotion-dev/template-tiktok                       291  pushed 2026-10-16
remotion-dev/template-audiogram                    274  pushed 2026-10-22
remotion-dev/template-code-hike                    220  pushed 2026-10-16
remotion-dev/template-three                        116  pushed 2026-10-22
remotion-dev/template-overlay                       19  pushed 2026-10-16
Remocn/remocn                                     1629  pushed 2026-10-11  MIT
haidrrrry/claude-remotion-skill                    589  pushed 2026-08-12  MIT
vercel-labs/skill-remotion-geist                    23  pushed 2026-01-29
yihui-dev/awesome-opus5-5-videos                  9408  pushed 2026-10-13  MIT
lemomo-ai/lemo-opuscar                            5810  pushed 2026-10-22  MIT
alchaincyf/huashu-motion                          1482  pushed 2026-10-22  MIT
zhuyansen/awesome-claude-video-skills              827  pushed 2026-10-22
vibe-motion/skills                                1393  pushed 2026-10-05  (已停维护)
browser-use/video-use                            29564  pushed 2026-10-08
mcp-use/remotion-mcp-app                            58  pushed 2026-10-09
stephengpope/remotion-media-mcp                     34  pushed 2026-02-25
```
