import {interpolate, spring} from 'remotion';

export const W = 1920;
export const H = 1080;
export const FPS = 30;

export const SERIF = '"Noto Serif SC", "Songti SC", serif';
export const SANS = '"Noto Sans SC", "Microsoft YaHei", sans-serif';

export const INK = '#1C2B3A';
export const INK_SOFT = '#495A6E';
export const PAPER = '#FBF6EA';
export const PAPER_DEEP = '#F1E7D2';

export const C = {
  coral: '#F05B41',
  coralDeep: '#C8432C',
  coralSoft: '#F8C6B6',
  mustard: '#F3B23F',
  mustardDeep: '#B87A12',
  mustardSoft: '#F9E2A8',
  teal: '#149C90',
  tealDeep: '#0B7268',
  tealSoft: '#C4E7DF',
  blue: '#3A62C8',
  blueDeep: '#26428C',
  blueSoft: '#D1DCF7',
  lilac: '#9473C9',
  lilacDeep: '#6C4DA0',
  lilacSoft: '#E2D8F2',
  pink: '#EFA1AA',
  pinkSoft: '#FAD7D9',
  green: '#5D9C6B',
  greenSoft: '#D3E6CD',
  skin: '#F2C9A1',
  skinDeep: '#D9A476',
  white: '#FFFDF7',
};

export type ToneName =
  | 'cream'
  | 'mint'
  | 'peach'
  | 'butter'
  | 'sky'
  | 'lilac'
  | 'pink'
  | 'sand';

export type Tone = {
  bg: string;
  soft: string;
  accent: string;
  deep: string;
  on: string;
};

export const TONES: Record<ToneName, Tone> = {
  cream: {bg: '#FBF3E2', soft: '#F6E7CB', accent: C.coral, deep: C.coralDeep, on: INK},
  mint: {bg: '#DEEFE8', soft: '#C4E7DF', accent: C.teal, deep: C.tealDeep, on: INK},
  peach: {bg: '#FBE2D3', soft: '#F8C6B6', accent: C.coral, deep: C.coralDeep, on: INK},
  butter: {bg: '#FBEDC7', soft: '#F9E2A8', accent: C.mustardDeep, deep: C.mustardDeep, on: INK},
  sky: {bg: '#DFE8F8', soft: '#D1DCF7', accent: C.blue, deep: C.blueDeep, on: INK},
  lilac: {bg: '#EAE2F5', soft: '#E2D8F2', accent: C.lilacDeep, deep: C.lilacDeep, on: INK},
  pink: {bg: '#FBE1E0', soft: '#FAD7D9', accent: C.coralDeep, deep: C.coralDeep, on: INK},
  sand: {bg: '#F4EAD5', soft: '#EADDC2', accent: C.mustardDeep, deep: C.mustardDeep, on: INK},
};

export const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

export const sec = (seconds: number) => Math.round(seconds * FPS);

export const easeOut = (t: number) => 1 - Math.pow(1 - Math.max(0, Math.min(1, t)), 3);
export const easeInOut = (t: number) => {
  const x = Math.max(0, Math.min(1, t));
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

export const ramp = (frame: number, start: number, end: number, from = 0, to = 1) =>
  interpolate(frame, [start, end], [from, to], clamp);

export const springIn = (frame: number, delay = 0, stiffness = 140, damping = 16) =>
  spring({
    frame: Math.max(0, frame - delay),
    fps: FPS,
    config: {stiffness, damping, mass: 0.75},
  });

export const pop = (frame: number, delay = 0) => {
  const s = springIn(frame, delay, 170, 13);
  return {opacity: Math.min(1, s * 2.2), transform: `scale(${0.6 + s * 0.4})`};
};

export const rise = (frame: number, delay = 0, distance = 34) => {
  const p = interpolate(frame, [delay, delay + 16], [0, 1], {
    ...clamp,
    easing: easeOut,
  });
  return {opacity: p, transform: `translateY(${(1 - p) * distance}px)`};
};

export const hash = (n: number) => {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
};

export const hash2 = (x: number, y: number) => hash(x * 57 + y * 131 + 7);

export const fitSize = (text: string, base: number, min: number, perChar = 2.2) =>
  Math.max(min, Math.min(base, base - Math.max(0, text.length - 12) * perChar));
