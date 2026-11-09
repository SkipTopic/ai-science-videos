const path = require('path');
const fs = require('fs');
const {bundle} = require('@remotion/bundler');
const {renderStill, selectComposition} = require('@remotion/renderer');

const root = path.resolve(__dirname, '..');
const entry = path.resolve(root, 'src/index.ts');
const outDir = path.resolve(root, 'out/qa');

const shots = process.argv.slice(2).map((arg) => {
  const [id, frame, name] = arg.split(':');
  return {id, frame: Number(frame), name: name || `${id}_${frame}`};
});

(async () => {
  fs.mkdirSync(outDir, {recursive: true});
  const serveUrl = await bundle({entryPoint: entry});
  for (const shot of shots) {
    const composition = await selectComposition({serveUrl, id: shot.id});
    const output = path.resolve(outDir, `${shot.name}.png`);
    await renderStill({composition, serveUrl, output, frame: shot.frame});
    console.log(`wrote ${output}`);
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
