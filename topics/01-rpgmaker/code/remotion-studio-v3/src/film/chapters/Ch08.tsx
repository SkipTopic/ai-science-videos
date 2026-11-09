import React from 'react';
import {Beat, ChapterFrame, ChapterStamp} from '../ChapterBase';
import {getChapter} from '../data';
import {AIGenerate, AIPrompt, DanteFlashback, SplitEras} from './ch08-scenes';

const chapter = getChapter('08');

export const Ch08: React.FC = () => {
  const sfx = [
    {at: 3.43, file: 'type.wav', volume: 0.2},
    {at: 4.33, file: 'type.wav', volume: 0.18},
    {at: 5.24, file: 'type.wav', volume: 0.2},
    {at: 6.15, file: 'type.wav', volume: 0.18},
    {at: 7.05, file: 'type.wav', volume: 0.2},
    {at: 7.96, file: 'type.wav', volume: 0.18},
    {at: 8.87, file: 'type.wav', volume: 0.2},
    {at: 9.77, file: 'type.wav', volume: 0.18},
    {at: 10.28, file: 'whoosh.wav', volume: 0.3},
    {at: 11.98, file: 'title_chime.wav', volume: 0.28},
    {at: 16.08, file: 'whoosh.wav', volume: 0.3},
    {at: 16.44, file: 'paper.wav', volume: 0.24},
    {at: 22.05, file: 'whoosh.wav', volume: 0.3},
    {at: 26.24, file: 'tick.wav', volume: 0.2},
    {at: 27.88, file: 'whoosh.wav', volume: 0.3},
    {at: 30.07, file: 'tick.wav', volume: 0.2},
  ];
  return (
    <ChapterFrame chapter={chapter} mood="night" sfx={sfx} background="#050607">
      <ChapterStamp chapter={chapter} />
      <Beat from={0.00} to={10.28} fadeIn={0.6} fadeOut={0.3}>
        <AIPrompt />
      </Beat>
      <Beat from={10.28} to={16.08} scale={2.0000} fadeIn={0.3} fadeOut={0.35}>
        <AIGenerate />
      </Beat>
      <Beat from={16.08} to={22.05} scale={1.6739} fadeIn={0.4} fadeOut={0.3}>
        <DanteFlashback />
      </Beat>
      <Beat from={22.05} to={34.07} scale={1.0980} fadeIn={0.4} fadeOut={0.6}>
        <SplitEras />
      </Beat>
    </ChapterFrame>
  );
};
