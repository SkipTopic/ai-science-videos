import React from 'react';

type Grid = Array<Array<string | null>>;

export type WhaleExpression = 'normal' | 'tilt' | 'smug' | 'hurt' | 'blink';

const W = 64;
const H = 50;

const C = {
  outline: '#0a2238',
  body: '#3f80c2',
  bodyLight: '#64a9e2',
  bodyShadow: '#2e639c',
  belly: '#c9eaf8',
  bellyShadow: '#a3d4ec',
  eye: '#07111c',
  white: '#ffffff',
  blush: '#ef9aa8',
  spout: '#b6efff',
};

const empty = (): Grid =>
  Array.from({length: H}, () => Array<string | null>(W).fill(null));

const set = (grid: Grid, x: number, y: number, color: string) => {
  if (x >= 0 && x < W && y >= 0 && y < H) {
    grid[y][x] = color;
  }
};

const inEllipse = (
  x: number,
  y: number,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
) => ((x - cx) * (x - cx)) / (rx * rx) + ((y - cy) * (y - cy)) / (ry * ry) <= 1;

const fillEllipse = (
  grid: Grid,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  color: string,
) => {
  for (let y = 0; y < H; y += 1) {
    for (let x = 0; x < W; x += 1) {
      if (inEllipse(x + 0.5, y + 0.5, cx, cy, rx, ry)) {
        set(grid, x, y, color);
      }
    }
  }
};

const sign = (px: number, py: number, ax: number, ay: number, bx: number, by: number) =>
  (px - bx) * (ay - by) - (ax - bx) * (py - by);

const inTriangle = (
  x: number,
  y: number,
  ax: number,
  ay: number,
  bx: number,
  by: number,
  cx: number,
  cy: number,
) => {
  const d1 = sign(x, y, ax, ay, bx, by);
  const d2 = sign(x, y, bx, by, cx, cy);
  const d3 = sign(x, y, cx, cy, ax, ay);
  const hasNeg = d1 < 0 || d2 < 0 || d3 < 0;
  const hasPos = d1 > 0 || d2 > 0 || d3 > 0;
  return !(hasNeg && hasPos);
};

const fillTriangle = (
  grid: Grid,
  ax: number,
  ay: number,
  bx: number,
  by: number,
  cx: number,
  cy: number,
  color: string,
) => {
  const minX = Math.max(0, Math.floor(Math.min(ax, bx, cx)));
  const maxX = Math.min(W - 1, Math.ceil(Math.max(ax, bx, cx)));
  const minY = Math.max(0, Math.floor(Math.min(ay, by, cy)));
  const maxY = Math.min(H - 1, Math.ceil(Math.max(ay, by, cy)));
  for (let y = minY; y <= maxY; y += 1) {
    for (let x = minX; x <= maxX; x += 1) {
      if (inTriangle(x + 0.5, y + 0.5, ax, ay, bx, by, cx, cy)) {
        set(grid, x, y, color);
      }
    }
  }
};

const fillRotatedEllipse = (
  grid: Grid,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  angle: number,
  color: string,
) => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  for (let y = 0; y < H; y += 1) {
    for (let x = 0; x < W; x += 1) {
      const dx = x + 0.5 - cx;
      const dy = y + 0.5 - cy;
      const ux = dx * cos + dy * sin;
      const uy = -dx * sin + dy * cos;
      if ((ux * ux) / (rx * rx) + (uy * uy) / (ry * ry) <= 1) {
        set(grid, x, y, color);
      }
    }
  }
};

const drawEye = (grid: Grid, expression: WhaleExpression) => {
  if (expression === 'blink') {
    for (let x = 18; x <= 24; x += 1) {
      set(grid, x, 22, C.eye);
    }
    set(grid, 18, 23, C.eye);
    set(grid, 24, 23, C.eye);
    return;
  }
  if (expression === 'smug') {
    fillEllipse(grid, 21.5, 22.5, 3.4, 4.3, C.eye);
    fillEllipse(grid, 21.5, 19.4, 4.6, 2.8, C.body);
    for (let x = 18; x <= 25; x += 1) {
      set(grid, x, 18, C.eye);
    }
    set(grid, 20, 24, C.white);
    set(grid, 21, 24, C.white);
    set(grid, 20, 25, C.white);
    set(grid, 21, 25, C.white);
    return;
  }
  if (expression === 'hurt') {
    for (let x = 18; x <= 23; x += 1) {
      set(grid, x, 23, C.eye);
    }
    set(grid, 19, 22, C.eye);
    set(grid, 20, 22, C.eye);
    set(grid, 21, 24, C.eye);
    set(grid, 22, 24, C.eye);
    return;
  }

  fillEllipse(grid, 21.5, 22.5, 3.4, 4.3, C.eye);
  fillEllipse(grid, 20.6, 21.4, 1.4, 1.7, C.white);
  set(grid, 24, 25, C.bodyLight);
  if (expression === 'tilt') {
    set(grid, 21, 19, C.eye);
    set(grid, 22, 19, C.eye);
  }
};

const drawMouth = (grid: Grid, expression: WhaleExpression) => {
  if (expression === 'tilt') {
    for (let x = 16; x <= 18; x += 1) {
      set(grid, x, 31, C.eye);
      set(grid, x, 33, C.eye);
    }
    set(grid, 16, 32, C.eye);
    set(grid, 18, 32, C.eye);
    set(grid, 17, 32, C.bodyShadow);
    return;
  }
  if (expression === 'smug') {
    set(grid, 15, 32, C.eye);
    set(grid, 16, 32, C.eye);
    set(grid, 17, 32, C.eye);
    set(grid, 18, 32, C.eye);
    set(grid, 19, 31, C.eye);
    set(grid, 20, 31, C.eye);
    set(grid, 21, 30, C.eye);
    return;
  }
  if (expression === 'hurt') {
    const pixels: Array<[number, number]> = [
      [16, 32],
      [17, 33],
      [18, 32],
      [19, 33],
      [20, 32],
    ];
    pixels.forEach(([x, y]) => set(grid, x, y, C.eye));
    return;
  }
  const smile: Array<[number, number]> = [
    [15, 31],
    [16, 31],
    [17, 32],
    [18, 32],
    [19, 32],
    [20, 31],
    [21, 31],
  ];
  smile.forEach(([x, y]) => set(grid, x, y, C.eye));
};

const build = (expression: WhaleExpression): Grid => {
  const grid = empty();

  // 尾巴（在身体后面）
  fillTriangle(grid, 48, 23, 63, 14, 60, 25, C.outline);
  fillTriangle(grid, 50, 30, 63, 40, 59, 29, C.outline);
  fillTriangle(grid, 50, 24, 60, 18, 58, 25, C.body);
  fillTriangle(grid, 51, 31, 60, 37, 58, 29, C.body);

  // 身体
  fillEllipse(grid, 34, 27, 22.5, 17.5, C.outline);
  fillEllipse(grid, 34, 27, 20.6, 15.7, C.body);

  // 肚皮
  fillEllipse(grid, 33, 33.5, 19.2, 10.2, C.belly);
  fillEllipse(grid, 31, 31, 12, 5.2, C.bellyShadow);
  fillEllipse(grid, 31, 32, 10, 3.8, C.belly);

  // 背上的高光
  fillEllipse(grid, 27, 17.5, 10, 5.6, C.bodyLight);
  fillEllipse(grid, 29, 18.5, 7, 3.2, C.body);

  // 侧鳍
  fillRotatedEllipse(grid, 34, 38, 9.2, 4.4, -0.28, C.outline);
  fillRotatedEllipse(grid, 34, 38, 7.5, 3.1, -0.28, C.body);
  fillRotatedEllipse(grid, 33, 37.4, 5.5, 1.4, -0.28, C.bodyLight);

  // 眼睛、嘴、腮红
  drawEye(grid, expression);
  drawMouth(grid, expression);
  fillEllipse(grid, 14.5, 28.5, 2.2, 1.3, C.blush);
  fillEllipse(grid, 25, 29.5, 1.6, 1.1, C.blush);

  return grid;
};

const GRIDS: Record<WhaleExpression, Grid> = {
  normal: build('normal'),
  tilt: build('tilt'),
  smug: build('smug'),
  hurt: build('hurt'),
  blink: build('blink'),
};

const gridToPaths = (grid: Grid) => {
  const byColor = new Map<string, string[]>();
  for (let y = 0; y < H; y += 1) {
    let x = 0;
    while (x < W) {
      const color = grid[y][x];
      if (!color) {
        x += 1;
        continue;
      }
      let run = 1;
      while (x + run < W && grid[y][x + run] === color) {
        run += 1;
      }
      const list = byColor.get(color) ?? [];
      list.push(`M${x} ${y}h${run}v1h-${run}z`);
      byColor.set(color, list);
      x += run;
    }
  }
  return Array.from(byColor.entries()).map(([color, commands]) => ({
    color,
    d: commands.join(''),
  }));
};

const PATHS: Record<WhaleExpression, Array<{color: string; d: string}>> = {
  normal: gridToPaths(GRIDS.normal),
  tilt: gridToPaths(GRIDS.tilt),
  smug: gridToPaths(GRIDS.smug),
  hurt: gridToPaths(GRIDS.hurt),
  blink: gridToPaths(GRIDS.blink),
};

export const WhalePortrait: React.FC<{
  expression: WhaleExpression;
  frame: number;
  scale?: number;
}> = ({expression, scale = 3}) => {
  return (
    <svg
      width={W * scale}
      height={H * scale}
      viewBox={`0 0 ${W} ${H}`}
      shapeRendering="crispEdges"
      style={{display: 'block', overflow: 'visible'}}
    >
      {PATHS[expression].map((path) => (
        <path key={path.color} d={path.d} fill={path.color} />
      ))}
    </svg>
  );
};

// 地图上的小鲸鱼 NPC
const NPC_W = 16;
const NPC_H = 16;
const NPC_PATHS = (() => {
  const grid: Grid = Array.from({length: NPC_H}, () =>
    Array<string | null>(NPC_W).fill(null),
  );
  const put = (x: number, y: number, color: string) => {
    if (x >= 0 && x < NPC_W && y >= 0 && y < NPC_H) {
      grid[y][x] = color;
    }
  };
  for (let y = 0; y < NPC_H; y += 1) {
    for (let x = 0; x < NPC_W; x += 1) {
      const dx = x + 0.5 - 7.5;
      const dy = y + 0.5 - 9;
      if ((dx * dx) / (6.6 * 6.6) + (dy * dy) / (5.4 * 5.4) <= 1) {
        put(x, y, C.outline);
      }
      if ((dx * dx) / (5.4 * 5.4) + (dy * dy) / (4.2 * 4.2) <= 1) {
        put(x, y, C.body);
      }
      if (y >= 9 && (dx * dx) / (4.4 * 4.4) + (dy * dy) / (2.6 * 2.6) <= 1) {
        put(x, y, C.belly);
      }
    }
  }
  put(13, 6, C.outline);
  put(14, 4, C.outline);
  put(15, 6, C.outline);
  put(13, 7, C.body);
  put(14, 6, C.body);
  put(4, 7, C.eye);
  put(5, 7, C.eye);
  put(4, 8, C.belly);
  put(4, 8, C.eye);
  put(6, 10, C.eye);
  put(7, 10, C.eye);

  const byColor = new Map<string, string[]>();
  for (let y = 0; y < NPC_H; y += 1) {
    for (let x = 0; x < NPC_W; x += 1) {
      const color = grid[y][x];
      if (!color) {
        continue;
      }
      const list = byColor.get(color) ?? [];
      list.push(`M${x} ${y}h1v1h-1z`);
      byColor.set(color, list);
    }
  }
  return Array.from(byColor.entries()).map(([color, commands]) => ({
    color,
    d: commands.join(''),
  }));
})();

export const WhaleNpc: React.FC<{frame: number}> = ({frame}) => {
  const bob = Math.round(Math.sin(frame * 0.12) * 0.7);
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      style={{display: 'block', transform: `translateY(${bob}px)`}}
    >
      {NPC_PATHS.map((path) => (
        <path key={path.color} d={path.d} fill={path.color} />
      ))}
    </svg>
  );
};
