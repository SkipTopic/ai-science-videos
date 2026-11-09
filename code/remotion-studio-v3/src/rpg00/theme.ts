import {interpolate} from 'remotion';

export const W = 1920;
export const H = 1080;
export const FPS = 30;
export const DURATION = 3150;

export const GAME_W = 320;
export const GAME_H = 240;
export const PIXEL = 4;
export const GAME_PX_W = GAME_W * PIXEL;
export const GAME_PX_H = GAME_H * PIXEL;
export const GAME_X = (W - GAME_PX_W) / 2;
export const GAME_Y = (H - GAME_PX_H) / 2;
export const TILE = 16;
export const TILE_PX = TILE * PIXEL;

export const MAP_W = 20;
export const MAP_H = 15;

export const COLORS = {
  bg: '#07080a',
  ink: '#ece7da',
  dim: '#8d887c',
  paper: '#ded5c2',
  paperDark: '#b8ae99',
  blue: '#1b2a6b',
  blueLight: '#3f5bb5',
  blueDark: '#0c1436',
  gold: '#d9b25f',
  red: '#c8423c',
  green: '#4b8f5c',
  editorBg: '#1b1e24',
  panel: '#c9c5b8',
  panelDark: '#a8a395',
  panelLight: '#e4e0d4',
  winBlue: '#163b8f',
};

export const sec = (seconds: number) => Math.round(seconds * FPS);

export const T = {
  line1: 1.2,
  walkStart: 2.2,
  walkStep: 0.34,
  line2: 4.0,
  whalePop: 9.8,
  line3: 10.2,
  slash: 13.4,
  damage5: 13.7,
  line4: 13.9,
  whaleTilt: 17.2,
  line5: 17.8,
  fist: 21.0,
  slam: 22.2,
  damage999: 22.4,
  line6: 22.6,
  hpDrain: 26.0,
  gameOver: 26.4,
  line7: 26.8,
  black: 28.5,
  line8: 29.2,
  zoomStart: 32.0,
  editorReveal: 39.5,
  zoomEnd: 44.0,
  line9: 44.5,
  line10: 50.0,
  tokyo: 54.5,
  line11: 56.0,
  line12: 59.0,
  magazine: 61.8,
  floppyIn: 63.4,
  timeline: 66.6,
  montage: 71.0,
  line14: 71.5,
  line15: 75.0,
  line16: 78.0,
  line17: 82.5,
  title: 90.0,
  end: 105.0,
};

export const WALK_PATH: Array<[number, number]> = [
  [2, 12],
  [2, 11],
  [2, 10],
  [2, 9],
  [2, 8],
  [3, 8],
  [4, 8],
  [5, 8],
  [6, 8],
  [6, 7],
  [6, 6],
  [6, 5],
  [6, 4],
  [7, 4],
  [8, 4],
  [9, 4],
  [10, 4],
  [11, 4],
  [12, 4],
  [13, 4],
  [14, 4],
  [15, 4],
];

export const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

export const fade = (frame: number, start: number, end: number) =>
  interpolate(frame, [sec(start), sec(end)], [0, 1], clamp);

export const fadeOut = (frame: number, start: number, end: number) =>
  interpolate(frame, [sec(start), sec(end)], [1, 0], clamp);

export const easeInOut = (t: number) => {
  const x = Math.max(0, Math.min(1, t));
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

export const hash = (n: number) => {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
};

export const hash2 = (x: number, y: number) => hash(x * 57 + y * 131 + 7);
