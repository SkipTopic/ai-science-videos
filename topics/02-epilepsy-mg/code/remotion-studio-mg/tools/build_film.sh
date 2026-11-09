#!/usr/bin/env bash
set -euo pipefail
ROOT="/c/Users/admin/Desktop/ai生成科普视频/癫痫科普/纯MG动画方案/remotion-studio-mg"
FFMPEG="$ROOT/node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe"
PY="C:/tools/Python312/python.exe"
OUT="$ROOT/out"
DELIVER="/c/Users/admin/Desktop/ai生成科普视频/癫痫科普/输出文件夹"
cd "$ROOT"

for i in 00 01 02 03 04 05 06 07 08 09; do
  test -f "out/render/Ch${i}.mp4" || { echo "missing Ch${i}"; exit 1; }
done

: > out/render/concat_list.txt
for f in out/render/Ch*.mp4; do
  printf "file '%s'\n" "$(basename "$f")" >> out/render/concat_list.txt
done

"$FFMPEG" -y -f concat -safe 0 -i out/render/concat_list.txt \
  -c:v copy -c:a aac -b:a 192k -ar 48000 -ac 2 -movflags +faststart \
  out/癫痫科普_纯MG动画版_concat.mp4

"$FFMPEG" -y -i out/癫痫科普_纯MG动画版_concat.mp4 -vn -acodec pcm_s16le -ar 48000 -ac 2 out/master_input.wav

MASTER_THRESHOLD=0.04 MASTER_RATIO=6 "$PY" tools/audio_master.py out/master_input.wav out/master_output.wav src/data/film.json

"$FFMPEG" -y -i out/癫痫科普_纯MG动画版_concat.mp4 -i out/master_output.wav \
  -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -b:a 192k -ar 48000 -ac 2 -shortest \
  -movflags +faststart out/癫痫科普_纯MG动画版_final.mp4

cp out/癫痫科普_纯MG动画版_final.mp4 "$DELIVER/20261023_癫痫科普_纯MG动画版.mp4"
"$PY" tools/make_srt.py
echo "delivered: $DELIVER/20261023_癫痫科普_纯MG动画版.mp4"
