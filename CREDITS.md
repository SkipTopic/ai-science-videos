# 素材来源与版权

本片是科普解说作品。片中出现的游戏画面、商标、字体与 3D 模型均属于各自权利人，**仅用于评论、解说与教学演示**。

---

## 1. 游戏实机截图（6 张）

全部取自各游戏 Steam 商店页的公开宣传截图，存放在 `code/remotion-studio-v3/public/images/v2/`，逐条 URL 记录在 `docs/v3工程文档/image_credits.md`。

| 游戏 | Steam App ID | 文件 |
|---|---|---|
| Ib | 1901370 | `ib.jpg` |
| 魔女之家 MV / The Witch's House MV | 885810 | `witchhouse.jpg` |
| 去月球 / To the Moon | 206440 | `tothemoon.jpg` |
| OMORI | 1150690 | `omori.jpg` |
| 尸体派对 / Corpse Party | 465360 | `corpseparty.jpg` |
| 梦日记 / Yume Nikki | 650700 | `yumenikki.jpg` |

截图版权归各游戏开发者 / 发行商所有；本片对画面不做修改性使用（仅缩放、裁切、叠加字幕与暗角）。

> 注：抓取时梦日记必须用 App ID `650700`（旧的 `114700` 在中国大陆返回 `success:false`）。

## 2. 片中提到的游戏与公司

RPG Maker 系列、Enterbrain / 角川、ASCII、MSX、以及各章节提到的独立游戏，其名称与商标归各自权利人所有。本片为评论性引用，不代表权利人立场。

## 3. 字体（SIL Open Font License 1.1）

| 字体 | 用途 | 来源 |
|---|---|---|
| Noto Sans SC 400 / 700 | 正文、界面 | `@fontsource/noto-sans-sc@5.3.1` |
| Noto Serif SC 900 | 标题、年份 | `@fontsource/noto-serif-sc@5.3.1` |
| Press Start 2P 400 | 像素标签、游戏内文字 | `@fontsource/press-start-2p@5.3.0` |

字体文件**不随仓库分发**（`public/fonts/` 为空），由 `code/remotion-studio-v3/scripts/prepare_fonts.py` 从上述 npm 包中提取并生成 `fonts.css`。OFL 允许随作品嵌入与再分发；如要单独分发字体文件，请一并附上 OFL 许可文本。

## 4. 3D 模型

| 包 | 作者 | 许可 | 用途 |
|---|---|---|---|
| City Kit Commercial 2.1 | [Kenney](https://www.kenney.nl) | CC0 1.0 | 1986 东京街景楼群（Ch01 机械恐龙镜头） |
| Furniture Kit | [Kenney](https://www.kenney.nl) | CC0 1.0 | CRT 卧室家具（Ch09 尾声镜头） |

原始 zip 与解包后的 FBX/GLB/OBJ 均在 `tools/blender/models/`，许可文本见 `models/city.zip` 内的 `License.txt`。CC0 不要求署名，此处仍按作者意愿标注。

## 5. 软件与代码库

| 组件 | 许可 |
|---|---|
| Remotion 4.0.537 | Remotion License（个人与小团队免费，商用需看其条款） |
| React 19 / TypeScript 5.7 | MIT / Apache-2.0 |
| Blender 5.2.2 LTS | GPL（仅作为渲染工具使用，不随仓库分发） |
| edge-tts | MIT（调用微软 Edge 在线语音合成） |
| Kenney 模型、Noto 字体 | 见上 |

## 6. 考据资料

`script/01_资料库/` 收录 2026-10-21 抓取的 64 条公开网页（原始 HTML + 提取正文），每条正文开头三行标注 `SOURCE / TITLE / FETCHED`。这些内容版权归原网站所有，此处仅作事实核查的留档，不再分发其图片资源。

## 7. 本仓库自有内容

文案（`script/02_文案/`）、分镜与代码（`code/`）、脚本（`tools/`）、文档（`docs/`）由项目作者创作。仓库暂未附加开源协议；如需他人复用，请作者自行添加 `LICENSE`（例如代码 MIT、文字 CC BY-NC 4.0）。
