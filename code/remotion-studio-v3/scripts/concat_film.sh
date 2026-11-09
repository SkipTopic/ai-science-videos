#!/usr/bin/env bash
# Join the rendered chapter segments into the finished film, then deliver.
#   bash scripts/concat_film.sh            -> out/RPGMaker_film.mp4 + copy to 输出文件夹
#   bash scripts/concat_film.sh reencode   -> force a re-encoded join (slower, safest)
set -uo pipefail
ROOT="/c/Users/admin/Desktop/ai生成科普视频/RPG Maker科普"
PROJ="$ROOT/工作区域文件夹/remotion-studio"
SEG="$PROJ/out/chapters"
FF="$PROJ/node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe"
DELIVERY="$ROOT/输出文件夹/20261021_RPGMaker_梦想与世界.mp4"
cd "$PROJ"

IDS="RPGMaker00 Ch01 Ch02 Ch03 Ch04 Ch05 Ch06 Ch07 Ch08 Ch09"
LIST="$SEG/concat_list.txt"
: > "$LIST"
for id in $IDS; do
  if [ ! -f "$SEG/$id.mp4" ]; then echo "MISSING SEGMENT: $id.mp4"; exit 1; fi
  WIN="$(cygpath -w "$SEG/$id.mp4")"
  printf "file '%s'\n" "${WIN//\\//}" >> "$LIST"
done
echo "--- segments ---"
cat "$LIST"

OUT="out/RPGMaker_film.mp4"
if [ "${1:-copy}" = "reencode" ]; then
  "$FF" -y -f concat -safe 0 -i "$LIST" \
    -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p \
    -c:a aac -b:a 192k -ar 48000 -ac 2 -movflags +faststart "$OUT" -loglevel warning
elif [ "${1:-copy}" = "video-only" ]; then
  "$FF" -y -f concat -safe 0 -i "$LIST" -c copy -movflags +faststart "$OUT" -loglevel warning
else
  # Default: keep the video bit-exact, rebuild one continuous audio track.
  # A pure -c copy join emits "Non-monotonic DTS" at every seam because each
  # segment's AAC priming overlaps the previous tail by a few hundred samples.
  "$FF" -y -f concat -safe 0 -i "$LIST" \
    -c:v copy -c:a aac -b:a 192k -ar 48000 -ac 2 -movflags +faststart "$OUT" -loglevel warning
fi
rc=$?
[ $rc -ne 0 ] && { echo "CONCAT FAILED rc=$rc"; exit $rc; }
ls -la "$OUT"
"$FF" -i "$OUT" 2>&1 | grep -E "Duration|Stream"
mkdir -p "$ROOT/工作区域文件夹/_备份"
cp -f "$OUT" "$ROOT/工作区域文件夹/_备份/RPGMaker_film_$(date +%Y%m%d-%H%M%S).mp4"
cp -f "$OUT" "$DELIVERY"
echo "DELIVERED -> $DELIVERY"
