import path from 'node:path';
import fs from 'node:fs';
import {bundle} from '@remotion/bundler';
import {openBrowser, renderStill, selectComposition} from '@remotion/renderer';

const root = process.cwd();
const id = process.env.TEST_ID || 'MGStyleTest';
const frames = (process.env.TEST_FRAMES || '60,300,540,780').split(',').map(Number);
const scale = Number(process.env.TEST_SCALE || 1);
const outDir = path.join(root, 'out', 'stills');
fs.mkdirSync(outDir, {recursive: true});

const serveUrl = await bundle({
  entryPoint: path.join(root, 'src', 'index.ts'),
  onProgress: (p) => {
    if (p % 25 === 0) process.stdout.write(`bundle ${p}%\n`);
  },
});
const browser = await openBrowser('chrome');
const composition = await selectComposition({serveUrl, id, browser});
for (const frame of frames) {
  const output = path.join(outDir, `${id}_${String(frame).padStart(5, '0')}.png`);
  await renderStill({composition, serveUrl, output, frame, scale, browser});
  console.log(`still ${id} frame=${frame} -> ${path.basename(output)}`);
}
await browser.close({silent: true});
console.log('done');
