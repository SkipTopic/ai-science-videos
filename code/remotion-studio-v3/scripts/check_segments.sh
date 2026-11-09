#!/usr/bin/env bash
# Check every rendered segment: exact duration, streams, and one probe frame each.
set -uo pipefail
PROJ="/c/Users/admin/Desktop/ai生成科普视频/RPG Maker科普/工作区域文件夹/remotion-studio"
FF="$PROJ/node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe"
cd "$PROJ"
mkdir -p out/qa_final
EXPECT="RPGMaker00:105 Ch01:185 Ch02:180 Ch03:160 Ch04:40 Ch05:200 Ch06:75 Ch07:125 Ch08:45 Ch09:50"
total=0
for pair in $EXPECT; do
  id="${pair%%:*}"; want="${pair##*:}"; file="out/chapters/$id.mp4"
  if [ ! -f "$file" ]; then echo "$id  PENDING"; continue; fi
  dur=$("$FF" -i "$file" 2>&1 | grep -oE "Duration: [0-9:.]+" | head -1 | cut -d' ' -f2)
  sec=$(echo "$dur" | awk -F: '{printf "%.1f", ($1*3600)+($2*60)+$3}')
  size=$(du -h "$file" | cut -f1)
  ok="OK"; [ "$(printf '%.0f' "$sec")" != "$want" ] && ok="DURATION-MISMATCH(want $want)"
  probe=$(awk -v w="$want" 'BEGIN{printf "%d", w/2}')
  "$FF" -y -ss "$probe" -i "$file" -frames:v 1 "out/qa_final/${id}_mid.png" -loglevel error
  streams=$("$FF" -i "$file" 2>&1 | grep -cE "Stream #")
  [ "$streams" != "2" ] && ok="$ok STREAMS=$streams"
  printf '%-11s %-10s %6s  %s\n' "$id" "$dur" "$size" "$ok"
  total=$(awk -v t="$total" -v s="$sec" 'BEGIN{printf "%.1f", t+s}')
done
awk -v t="$total" 'BEGIN{printf "---- rendered so far: %.1f min of 19.4 min ----\n", t/60}'
