import {interpolate} from 'remotion';

export const W = 1920;
export const H = 1080;
export const FPS = 30;

export const SERIF = '"Noto Serif SC", "Songti SC", serif';
export const SANS = '"Noto Sans SC", "Microsoft YaHei", sans-serif';
export const PIXEL = '"Press Start 2P", monospace';

export const C = {
  night: '#07080a',
  nightSoft: '#0d1014',
  cream: '#ece7da',
  dim: '#8d887c',
  paper: '#e7ddc8',
  paperDeep: '#d8cbb0',
  ink: '#1c1a16',
  inkSoft: '#4a4439',
  red: '#b33a2f',
  redBright: '#d4483a',
  gold: '#d9b25f',
  blue: '#4a6fa5',
  blueDeep: '#1b2a6b',
  green: '#5f8d68',
  white: '#ffffff',
};

export const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

export const sec = (seconds: number) => Math.round(seconds * FPS);

export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
export const easeInOut = (t: number) => {
  const x = Math.max(0, Math.min(1, t));
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

export const hash = (n: number) => {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
};

export const hash2 = (x: number, y: number) => hash(x * 57 + y * 131 + 7);

export const ramp = (
  frame: number,
  start: number,
  end: number,
  from = 0,
  to = 1,
) => interpolate(frame, [start, end], [from, to], clamp);

export const localOpacity = (
  frame: number,
  duration: number,
  fadeIn = 0.55,
  fadeOut = 0.55,
) => {
  const inFrames = Math.max(1, fadeIn * FPS);
  const outFrames = Math.max(1, fadeOut * FPS);
  return Math.min(
    interpolate(frame, [0, inFrames], [0, 1], clamp),
    interpolate(frame, [duration - outFrames, duration], [1, 0], clamp),
  );
};

export const paperBackground = [
  'radial-gradient(ellipse at 18% 12%, rgba(255,248,230,0.75) 0%, rgba(255,248,230,0) 55%)',
  'radial-gradient(ellipse at 82% 88%, rgba(110,84,40,0.13) 0%, rgba(110,84,40,0) 60%)',
  'repeating-linear-gradient(90deg, rgba(90,70,38,0.035) 0px, rgba(90,70,38,0.035) 1px, transparent 1px, transparent 4px)',
  'repeating-linear-gradient(0deg, rgba(90,70,38,0.022) 0px, rgba(90,70,38,0.022) 1px, transparent 1px, transparent 7px)',
  'linear-gradient(135deg, #eee4cf 0%, #e4d7bc 48%, #d9caac 100%)',
].join(', ');

export const formatYear = (year: number | string) => `${year}`;
