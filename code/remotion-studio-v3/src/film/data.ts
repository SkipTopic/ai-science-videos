import raw from '../data/film.json';

export type FilmLine = {
  id: string;
  text: string;
  file: string;
  start: number;
  duration: number;
  trimStart: number;
  trimEnd: number;
  block: number;
  end: number;
};

export type FilmBlock = {
  index: number;
  start: number;
  end: number;
  lineIds: string[];
};

export type FilmCue = {
  lineId: string;
  text: string;
  start: number;
  end: number;
};

export type FilmChapter = {
  id: string;
  title: string;
  start: number;
  duration: number;
  frames: number;
  lines: FilmLine[];
  blocks: FilmBlock[];
  cues: FilmCue[];
};

export type SfxCue = {
  at: number;
  file: string;
  volume?: number;
};

type FilmData = {
  fps: number;
  chapters: FilmChapter[];
};

const data = raw as FilmData;

export const CHAPTERS = data.chapters;

export const getChapter = (id: string): FilmChapter => {
  const chapter = CHAPTERS.find((item) => item.id === id);
  if (!chapter) {
    throw new Error(`Missing chapter ${id} in film.json`);
  }
  return chapter;
};

export const lineOf = (chapter: FilmChapter, id: string): FilmLine => {
  const line = chapter.lines.find((item) => item.id === id);
  if (!line) {
    throw new Error(`Missing line ${id}`);
  }
  return line;
};

export const blockOf = (chapter: FilmChapter, index: number): FilmBlock => {
  const block = chapter.blocks.find((item) => item.index === index);
  if (!block) {
    throw new Error(`Missing block ${index} in chapter ${chapter.id}`);
  }
  return block;
};

export const atLine = (
  chapter: FilmChapter,
  id: string,
  offset = 0,
): number => lineOf(chapter, id).start + offset;

export const endOfLine = (
  chapter: FilmChapter,
  id: string,
  tail = 0.6,
): number => lineOf(chapter, id).end + tail;

export const atBlock = (
  chapter: FilmChapter,
  index: number,
  offset = 0,
): number => blockOf(chapter, index).start + offset;

export const endOfBlock = (chapter: FilmChapter, index: number): number =>
  blockOf(chapter, index).end;

export const allText = CHAPTERS.flatMap((chapter) => [
  chapter.title,
  ...chapter.lines.map((line) => line.text),
  ...chapter.cues.map((cue) => cue.text),
]).join('');
