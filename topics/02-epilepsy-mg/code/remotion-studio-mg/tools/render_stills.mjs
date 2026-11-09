import path from 'node:path';
import fs from 'node:fs';
import {bundle} from '@remotion/bundler';
import {
  openBrowser,
  renderStill,
  selectComposition,
} from '@remotion/renderer';

const root = process.cwd();
const outDir = path.join(root, 'out', 'stills');
fs.mkdirSync(outDir, {recursive: true});

const scale = Number(process.env.STILL_SCALE || 0.5);
const only = process.env.STILL_CHAPTERS?.split(',').map((s) => s.trim()).filter(Boolean);
const customPlan = process.env.STILL_PLAN ? JSON.parse(process.env.STILL_PLAN) : null;

const serveUrl = await bundle({
  entryPoint: path.join(root, 'src', 'index.ts'),
  onProgress: (p) => {
    if (p % 20 === 0) process.stdout.write(`bundle ${p}%\n`);
  },
});

const browser = await openBrowser('chrome');
const ids = Array.from({length: 10}, (_, i) => `Ch${String(i).padStart(2, '0')}`);

for (const id of ids) {
  if (only && !only.includes(id)) continue;
  const composition = await selectComposition({serveUrl, id, browser});
  const plan = customPlan
    ? customPlan[id] ?? []
    : [
        Math.round(composition.durationInFrames * 0.18),
        Math.round(composition.durationInFrames * 0.48),
        Math.round(composition.durationInFrames * 0.78),
      ];
  for (const frame of plan) {
    if (frame >= composition.durationInFrames) continue;
    const output = path.join(outDir, `${id}_${String(frame).padStart(5, '0')}.png`);
    await renderStill({composition, serveUrl, output, frame, scale, browser});
    console.log(`still ${id} frame=${frame} -> ${path.basename(output)}`);
  }
}

await browser.close({silent: true});
console.log('done');
