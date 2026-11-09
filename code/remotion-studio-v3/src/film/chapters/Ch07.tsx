import React from 'react';
import {UniteStore} from '../archive';
import {Beat, ChapterFrame, ChapterStamp} from '../ChapterBase';
import {getChapter} from '../data';
import {
  CorporateBeat,
  EnterbrainArchive,
  GGGIntro,
  HandheldLineup,
} from './ch07-scenes';

const chapter = getChapter('07');

export const Ch07: React.FC = () => {
  const sfx = [
    {at: 0.19, file: 'paper.wav', volume: 0.25},
    {at: 7.11, file: 'tick.wav', volume: 0.16},
    {at: 12.50, file: 'tick.wav', volume: 0.16},
    {at: 16.15, file: 'tick.wav', volume: 0.16},
    {at: 19.51, file: 'tick.wav', volume: 0.16},
    {at: 23.45, file: 'tick.wav', volume: 0.16},
    {at: 26.91, file: 'whoosh.wav', volume: 0.25},
    {at: 34.60, file: 'whoosh.wav', volume: 0.3},
    {at: 37.97, file: 'cursor.wav', volume: 0.18},
    {at: 43.46, file: 'cursor.wav', volume: 0.18},
    {at: 49.22, file: 'cursor.wav', volume: 0.18},
    {at: 55.33, file: 'cursor.wav', volume: 0.18},
    {at: 64.10, file: 'whoosh.wav', volume: 0.3},
    {at: 69.68, file: 'whoosh.wav', volume: 0.3},
    {at: 73.10, file: 'click.wav', volume: 0.22},
    {at: 85.40, file: 'click.wav', volume: 0.2},
    {at: 93.10, file: 'whoosh.wav', volume: 0.3},
    {at: 103.55, file: 'dialog.wav', volume: 0.3},
    {at: 108.92, file: 'whoosh.wav', volume: 0.25},
    {at: 116.67, file: 'tick.wav', volume: 0.2},
    {at: 118.58, file: 'whoosh.wav', volume: 0.22},
  ];
  return (
    <ChapterFrame chapter={chapter} mood="night" sfx={sfx} background="#06080a">
      <ChapterStamp chapter={chapter} />
      <Beat from={0.00} to={34.70} scale={1.0404} fadeIn={0.5} fadeOut={0.35}>
        <EnterbrainArchive />
      </Beat>
      <Beat from={34.70} to={64.19} scale={1.1292} fadeIn={0.35} fadeOut={0.35}>
        <CorporateBeat />
      </Beat>
      <Beat from={64.19} to={70.00} scale={0.9639} fadeIn={0.35} fadeOut={0.3}>
        <GGGIntro />
      </Beat>
      <Beat from={70.00} to={93.21} scale={0.8700} fadeIn={0.35} fadeOut={0.35}>
        <UniteStore />
      </Beat>
      <Beat from={93.21} to={121.94} scale={1.0445} fadeIn={0.35} fadeOut={0.5}>
        <HandheldLineup />
      </Beat>
    </ChapterFrame>
  );
};
