import raw from '../data/rpg00.json';

export type Word = {
  text: string;
  start: number;
  duration: number;
};

export type Line = {
  id: string;
  text: string;
  file: string;
  start: number;
  duration: number;
  words: Word[];
};

export type Cue = {
  lineId: string;
  text: string;
  start: number;
  end: number;
};

export const LINES = raw.lines as Line[];
export const CUES = raw.cues as Cue[];
