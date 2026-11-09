import React from 'react';
import {MAP_H, MAP_W, hash2} from '../theme';

const FLOOR = '#1e2528';
const FLOOR_A = '#242c2e';
const FLOOR_B = '#20272a';
const WALL = '#3b332b';
const WALL_TOP = '#6b5b49';
const WALL_SIDE = '#55483b';
const WALL_DARK = '#241f1a';

const buildGrid = () => {
  const grid: number[][] = Array.from({length: MAP_H}, () =>
    Array(MAP_W).fill(1),
  );
  const carve = (x0: number, y0: number, x1: number, y1: number) => {
    for (let y = y0; y <= y1; y += 1) {
      for (let x = x0; x <= x1; x += 1) {
        grid[y][x] = 0;
      }
    }
  };
  carve(1, 9, 5, 13);
  carve(2, 6, 2, 9);
  carve(2, 8, 6, 8);
  carve(6, 4, 6, 8);
  carve(6, 4, 15, 4);
  carve(10, 1, 18, 4);

  grid[10][1] = 1;
  grid[12][4] = 1;
  grid[2][12] = 1;
  grid[2][15] = 1;
  grid[3][17] = 1;

  return grid;
};

const GRID = buildGrid();

const PATH = new Set([
  '2,12',
  '2,11',
  '2,10',
  '2,9',
  '2,8',
  '3,8',
  '4,8',
  '5,8',
  '6,8',
  '6,7',
  '6,6',
  '6,5',
  '6,4',
  '7,4',
  '8,4',
  '9,4',
  '10,4',
  '11,4',
  '12,4',
  '13,4',
  '14,4',
  '15,4',
]);

const GRASS = new Set([
  '1,10',
  '3,13',
  '4,11',
  '5,12',
  '11,2',
  '12,3',
  '13,1',
  '17,3',
  '18,1',
  '16,1',
]);

const FLOWER = new Set(['4,13', '12,1', '17,2']);

const TORCHES: Array<[number, number]> = [
  [1, 8],
  [7, 3],
  [10, 5],
  [18, 5],
];

const MazeBase: React.FC = React.memo(() => {
  const tiles: React.ReactNode[] = [];
  for (let y = 0; y < MAP_H; y += 1) {
    for (let x = 0; x < MAP_W; x += 1) {
      const px = x * 16;
      const py = y * 16;
      const key = `${x},${y}`;
      if (GRID[y][x] === 1) {
        const tone = hash2(x, y);
        tiles.push(
          <g key={key}>
            <rect x={px} y={py} width={16} height={16} fill={WALL} />
            <rect x={px} y={py} width={16} height={3} fill={WALL_TOP} />
            <rect x={px} y={py + 3} width={2} height={13} fill={WALL_SIDE} />
            <rect
              x={px}
              y={py + 13}
              width={16}
              height={3}
              fill={WALL_DARK}
            />
            <rect
              x={px + 2}
              y={py + 8}
              width={12}
              height={1}
              fill={tone > 0.5 ? '#2e2721' : '#332b24'}
            />
            {tone > 0.7 ? (
              <rect x={px + 9} y={py + 4} width={2} height={1} fill="#7a6a55" />
            ) : null}
          </g>,
        );
        continue;
      }

      const tone = hash2(x, y);
      const isPath = PATH.has(key);
      const floor = isPath
        ? tone > 0.5
          ? '#2b2e28'
          : '#292c26'
        : tone > 0.62
          ? FLOOR_A
          : tone > 0.3
            ? FLOOR_B
            : FLOOR;
      tiles.push(
        <g key={key}>
          <rect x={px} y={py} width={16} height={16} fill={floor} />
          <rect x={px} y={py + 15} width={16} height={1} fill="#171c1e" />
          <rect x={px + 15} y={py} width={1} height={16} fill="#171c1e" />
          {tone > 0.84 ? (
            <rect
              x={px + 3}
              y={py + 6}
              width={5}
              height={1}
              fill="#151a1c"
            />
          ) : null}
          {tone < 0.08 ? (
            <rect x={px + 11} y={py + 11} width={2} height={2} fill="#2f3a32" />
          ) : null}
          {GRASS.has(key) ? (
            <g fill="#3e6b46">
              <rect x={px + 3} y={py + 9} width={1} height={4} />
              <rect x={px + 2} y={py + 7} width={1} height={2} />
              <rect x={px + 5} y={py + 8} width={1} height={5} />
              <rect x={px + 10} y={py + 10} width={1} height={3} />
              <rect x={px + 11} y={py + 8} width={1} height={2} />
              <rect x={px + 9} y={py + 9} width={1} height={1} />
            </g>
          ) : null}
          {FLOWER.has(key) ? (
            <g>
              <rect x={px + 7} y={py + 9} width={1} height={4} fill="#3e6b46" />
              <rect x={px + 6} y={py + 8} width={3} height={2} fill="#c7b06a" />
              <rect x={px + 7} y={py + 8} width={1} height={1} fill="#f0dda0" />
            </g>
          ) : null}
        </g>,
      );
    }
  }
  return <g>{tiles}</g>;
});

const Torches: React.FC<{frame: number}> = ({frame}) => {
  return (
    <g>
      {TORCHES.map(([x, y], index) => {
        const cx = x * 16 + 8;
        const cy = y * 16 + 13;
        const flicker =
          0.82 + 0.18 * Math.sin(frame * 0.37 + index * 1.7);
        const sway = Math.sin(frame * 0.19 + index * 2.3) * 1.2;
        return (
          <g key={`torch-${x}-${y}`}>
            <circle
              cx={cx}
              cy={cy}
              r={22}
              fill="url(#torch-glow)"
              opacity={0.5}
            />
            <rect x={cx - 1} y={cy} width={2} height={6} fill="#3a2414" />
            <rect x={cx - 1} y={cy} width={1} height={6} fill="#5c3a1f" />
            <ellipse
              cx={cx + sway * 0.4}
              cy={cy - 5}
              rx={3.2}
              ry={5 * flicker}
              fill="#e08a32"
            />
            <ellipse
              cx={cx + sway * 0.3}
              cy={cy - 6}
              rx={1.6}
              ry={3.2 * flicker}
              fill="#ffd37a"
            />
            <rect
              x={cx - 1}
              y={cy - 9}
              width={2}
              height={2}
              fill="#fff0b8"
              opacity={0.85}
            />
          </g>
        );
      })}
    </g>
  );
};

export const MazeMap: React.FC<{frame: number}> = ({frame}) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 320 240"
      shapeRendering="crispEdges"
      style={{display: 'block'}}
    >
      <defs>
        <radialGradient id="torch-glow">
          <stop offset="0%" stopColor="#ff9c3f" stopOpacity={0.55} />
          <stop offset="45%" stopColor="#ff7a26" stopOpacity={0.18} />
          <stop offset="100%" stopColor="#ff7a26" stopOpacity={0} />
        </radialGradient>
        <radialGradient id="map-vignette" cx="50%" cy="48%" r="72%">
          <stop offset="0%" stopColor="#000000" stopOpacity={0} />
          <stop offset="62%" stopColor="#000000" stopOpacity={0.08} />
          <stop offset="100%" stopColor="#000000" stopOpacity={0.62} />
        </radialGradient>
        <linearGradient id="map-fog" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5b7a86" stopOpacity={0.09} />
          <stop offset="55%" stopColor="#5b7a86" stopOpacity={0.02} />
          <stop offset="100%" stopColor="#000000" stopOpacity={0.16} />
        </linearGradient>
      </defs>
      <rect x={0} y={0} width={320} height={240} fill="#101416" />
      <MazeBase />
      <Torches frame={frame} />
      <rect x={0} y={0} width={320} height={240} fill="url(#map-fog)" />
      <rect x={0} y={0} width={320} height={240} fill="url(#map-vignette)" />
    </svg>
  );
};
