# 这个目录是空的，字体由脚本生成

`public/fonts/` 不在仓库里附带字体文件（体积 + 授权分发考虑），渲染前必须先生成，否则中文和像素字会回退到系统字体，版式全崩。

```bash
cd code/remotion-studio-v3
npm pack @fontsource/noto-sans-sc@5.3.1
npm pack @fontsource/noto-serif-sc@5.3.1
npm pack @fontsource/press-start-2p@5.3.0
mkdir -p out && mv fontsource-*.tgz out/
python scripts/prepare_fonts.py
```

产物：

```
public/fonts/
├─ fonts.css            ← 由脚本生成，@font-face 指向下面三个目录
├─ noto-sans-sc/        ← 400 / 700，多 subset woff2
├─ noto-serif-sc/       ← 900
└─ press-start-2p/      ← latin 400
```

约 13 MB。字体许可见仓库根目录 `CREDITS.md`（三者均为 SIL OFL 1.1）。

> 国内下载慢的话先设镜像：`npm config set registry https://registry.npmmirror.com`。
