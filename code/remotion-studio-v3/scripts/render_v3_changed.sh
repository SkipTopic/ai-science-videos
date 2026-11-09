#!/usr/bin/env bash
# v3 only re-renders the two changed segments; the other 8 come from v2.
set -uo pipefail
ROOT="/c/Users/admin/Desktop/ai生成科普视频/RPG Maker科普/工作区域文件夹"
PROJ="$ROOT/v3/remotion-studio-v3"
SEG="$PROJ/out/chapters"
BAK="$ROOT/_备份/chapters_v3"
LOG="$SEG/render_v3_log.txt"
mkdir -p "$SEG" "$BAK"
cd "$PROJ"

for id in RPGMaker00 Ch09; do
  echo "$(date '+%H:%M:%S') START $id" >> "$LOG"
  t0=$(date +%s)
  rm -f "$SEG/_tmp_$id.mp4"
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
echo "$(date '+%H:%M:%S') V3_CHANGED_SEGMENTS_COMPLETE" >> "$LOG"
