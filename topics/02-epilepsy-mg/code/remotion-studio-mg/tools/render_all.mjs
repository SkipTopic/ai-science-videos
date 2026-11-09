import path from 'node:path';
import fs from 'node:fs';
import {bundle} from '@remotion/bundler';
import {openBrowser, renderMedia, selectComposition} from '@remotion/renderer';

const root = process.cwd();
const outDir = path.join(root, 'out', 'render');
fs.mkdirSync(outDir, {recursive: true});

const only = process.env.RENDER_CHAPTERS?.split(',').map((s) => s.trim()).filter(Boolean);
const concurrency = Number(process.env.RENDER_CONCURRENCY || 4);

const serveUrl = await bundle({
  entryPoint: path.join(root, 'src', 'index.ts'),
  onProgress: (p) => {
    if (p % 25 === 0) console.log(`bundle ${p}%`);
  },
});

const browser = await openBrowser('chrome');
const ids = Array.from({length: 10}, (_, i) => `Ch${String(i).padStart(2, '0')}`);

for (const id of ids) {
  if (only && !only.includes(id)) continue;
  const outputLocation = path.join(outDir, `${id}.mp4`);
  if (fs.existsSync(outputLocation) && process.env.RENDER_RESUME === '1') {
    console.log(`skip ${id} (exists)`);
    continue;
  }
  const composition = await selectComposition({serveUrl, id, browser});
  const started = Date.now();
  console.log(`render ${id} ${composition.durationInFrames}f start`);
  await renderMedia({
    composition,
    serveUrl,
    browser,
    codec: 'h264',
    outputLocation,
    concurrency,
    crf: 18,
    imageFormat: 'jpeg',
    audioBitrate: '192k',
    pixelFormat: 'yuv420p',
    onProgress: ({renderedFrames, encodedFrames}) => {
      if (renderedFrames % 300 === 0) {
        console.log(
          `  ${id} frames=${renderedFrames}/${composition.durationInFrames} encoded=${encodedFrames}`,
        );
      }
    },
  });
  const secs = ((Date.now() - started) / 1000).toFixed(0);
  console.log(`done ${id} in ${secs}s`);
}

await browser.close({silent: true});
console.log('all done');
