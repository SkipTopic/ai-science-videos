# 渲染脚本

> ⚠️ 所有 `.sh` 顶部都把原作者机器的根目录写死了（`/c/Users/admin/Desktop/...`）。
> 换机器先改 `ROOT` / `PROJ` 两行，再跑。逐条说明见 [`../../../docs/链接与依赖说明.md`](../../../docs/链接与依赖说明.md) 第 3 节。

| 脚本 | 归属 | 作用 | 在本仓库可直接跑 |
|---|---|---|---|
| `prepare_fonts.py` | 通用 | 从 `out/*.tgz`（@fontsource 包）提取 woff2，生成 `public/fonts/fonts.css` | ✅ 需先 `npm pack` 三个字体包 |
| `render_v3_changed.sh` | v3 | 只重渲序章 + Ch09 两段（可断点，日志 `out/chapters/render_v3_log.txt`） | ❌ 需改 ROOT |
| `concat_film_v3.sh` | v3 | 拼接 10 段 + 备份 + 交付到 `输出文件夹/`（`-c:v copy -c:a aac -b:a 192k -ar 48000 -ac 2`） | ❌ 需改 ROOT、建输出目录 |
| `contact_sheet.py` | 通用 | 从成片抽帧拼"带标签的九宫格"（这个 ffmpeg 精简版没有 `tile` 滤镜，用 PIL 拼） | ✅ 相对路径 |
| `qa_stills.js` | 通用 | 批量抽指定帧：`node scripts/qa_stills.js Ch09:180 Ch05:900` | ✅ |
| `render_all.sh` | v1 | v1 全片分段渲染 | ❌ v1 未收录，仅历史留存 |
| `render_all_v2.sh` | v2 | v2 全片分段渲染 | ❌ v2 未收录 |
| `concat_film.sh` | v1 | v1 拼接交付 | ❌ 同上 |
| `concat_film_v2.sh` | v2 | v2 拼接交付 | ❌ 同上 |
| `check_segments.sh` | v1 | v1 分段完整性检查 | ❌ 同上 |

## 常用命令（在本仓库里跑 v3）

```bash
cd code/remotion-studio-v3
npm ci
node_modules/.bin/tsc --noEmit

# 抽单帧目检（比渲整段快 100 倍）
npx remotion still Ch09 out/check/ch09_180.png --frame=180 --log=error

# 渲一段（2 核机器务必 --concurrency=1）
npx remotion render Ch05 out/chapters/Ch05.mp4 --concurrency=1

# 只渲 1 秒调试（30 帧，约 40 秒，别拿整段试错）
npx remotion render Ch05 out/test/sec.mp4 --frames=0-29 --concurrency=1
```

## 两个必踩的坑

1. **不要用 `npx tsc`**：在某些 cwd 下会去网上装一个假的 `tsc@2.0.4`，一律用 `node_modules/.bin/tsc`，且 cwd 必须是工程根。
2. **不要用裸 `-c copy` 拼接**：每个接缝都会报 `Non-monotonic DTS`，必须 `-c:v copy -c:a aac -b:a 192k -ar 48000 -ac 2`。
