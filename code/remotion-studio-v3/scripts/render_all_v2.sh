#!/usr/bin/env bash
# Render every v2 chapter, one CLI call per chapter, resumable.
set -uo pipefail
ROOT="/c/Users/admin/Desktop/ai生成科普视频/RPG Maker科普/工作区域文件夹"
PROJ="$ROOT/v2/remotion-studio-v2"
SEG="$PROJ/out/chapters"
BAK="$ROOT/_备份/chapters_v2"
LOG="$SEG/render_log.txt"
mkdir -p "$SEG" "$BAK"
cd "$PROJ"

IDS="RPGMaker00 Ch01 Ch02 Ch03 Ch04 Ch05 Ch06 Ch07 Ch08 Ch09"
for id in $IDS; do
  if [ -f "$SEG/$id.mp4" ]; then
    echo "$(date '+%H:%M:%S') SKIP $id" >> "$LOG"
    continue
  fi
  echo "$(date '+%H:%M:%S') START $id" >> "$LOG"
  t0=$(date +%s)
  npx remotion render "$id" "$SEG/_tmp_$id.mp4" --concurrency=1 --log=error >> "$LOG" 2>&1
  rc=$?
  t1=$(date +%s)
  if [ $rc -eq 0 ] && [ -f "$SEG/_tmp_$id.mp4" ]; then
    mv -f "$SEG/_tmp_$id.mp4" "$SEG/$id.mp4"
    cp -f "$SEG/$id.mp4" "$BAK/$id.mp4"
    echo "$(date '+%H:%M:%S') DONE  $id  $((t1-t0))s  $(du -h "$SEG/$id.mp4" | cut -f1)" >> "$LOG"
  else
    echo "$(date '+%H:%M:%S') FAIL  $id  rc=$rc  $((t1-t0))s" >> "$LOG"
    rm -f "$SEG/_tmp_$id.mp4"
    exit 1
  fi
done
echo "$(date '+%H:%M:%S') ALL_SEGMENTS_COMPLETE" >> "$LOG"
