#!/usr/bin/env bash
# Join the v2 chapter segments and deliver. v1 files are never touched.
set -uo pipefail
ROOT="/c/Users/admin/Desktop/ai生成科普视频/RPG Maker科普"
PROJ="$ROOT/工作区域文件夹/v2/remotion-studio-v2"
SEG="$PROJ/out/chapters"
FF="$PROJ/node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe"
DELIVERY="$ROOT/输出文件夹/20261022_RPGMaker_梦想与世界_v2.mp4"
cd "$PROJ"

IDS="RPGMaker00 Ch01 Ch02 Ch03 Ch04 Ch05 Ch06 Ch07 Ch08 Ch09"
LIST="$SEG/concat_list.txt"
: > "$LIST"
for id in $IDS; do
  if [ ! -f "$SEG/$id.mp4" ]; then echo "MISSING SEGMENT: $id.mp4"; exit 1; fi
  WIN="$(cygpath -w "$SEG/$id.mp4")"
  printf "file '%s'\n" "${WIN//\\//}" >> "$LIST"
done
echo "--- segments ---"; cat "$LIST"

OUT="out/RPGMaker_film_v2.mp4"
"$FF" -y -f concat -safe 0 -i "$LIST" \
  -c:v copy -c:a aac -b:a 192k -ar 48000 -ac 2 -movflags +faststart "$OUT" -loglevel warning
rc=$?
[ $rc -ne 0 ] && { echo "CONCAT FAILED rc=$rc"; exit $rc; }
ls -la "$OUT"
"$FF" -i "$OUT" 2>&1 | grep -E "Duration|Stream"
mkdir -p "$ROOT/工作区域文件夹/_备份"
cp -f "$OUT" "$ROOT/工作区域文件夹/_备份/RPGMaker_film_v2_$(date +%Y%m%d-%H%M%S).mp4"
cp -f "$OUT" "$DELIVERY"
echo "DELIVERED -> $DELIVERY"
