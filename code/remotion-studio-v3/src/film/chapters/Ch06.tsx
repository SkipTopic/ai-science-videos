import React from 'react';
import {Beat, ChapterFrame, ChapterStamp} from '../ChapterBase';
import {getChapter} from '../data';
import {
  ChinaRoom,
  Forum66Scene,
  HolySwordScene,
  ProjectTree,
  StudentMoment,
} from './ch06-scenes';

const chapter = getChapter('06');

export const Ch06: React.FC = () => {
  const sfx = [
    {at: 0.19, file: 'paper.wav', volume: 0.22},
    {at: 7.19, file: 'whoosh.wav', volume: 0.3},
    {at: 16.11, file: 'whoosh.wav', volume: 0.28},
    {at: 16.71, file: 'click.wav', volume: 0.24},
    {at: 18.46, file: 'click.wav', volume: 0.24},
    {at: 19.96, file: 'paper.wav', volume: 0.25},
    {at: 26.36, file: 'whoosh.wav', volume: 0.28},
    {at: 27.20, file: 'click.wav', volume: 0.2},
    {at: 32.05, file: 'dialog.wav', volume: 0.32},
    {at: 36.19, file: 'whoosh.wav', volume: 0.3},
    {at: 36.79, file: 'click.wav', volume: 0.2},
    {at: 47.32, file: 'whoosh.wav', volume: 0.3},
  ];
  return (
    <ChapterFrame chapter={chapter} mood="night" sfx={sfx} background="#050607">
      <ChapterStamp chapter={chapter} />
      <Beat from={0.00} to={7.66} scale={1.0706} fadeIn={0.6} fadeOut={0.35}>
        <ChinaRoom statement={'2005 年，中国。'} statementAt={0.8} />
      </Beat>
      <Beat from={7.66} to={16.41} scale={2.0000} fadeIn={0.35} fadeOut={0.35}>
        <HolySwordScene />
      </Beat>
      <Beat from={16.41} to={26.41} scale={2.0000} fadeIn={0.35} fadeOut={0.35}>
        <ProjectTree />
      </Beat>
      <Beat from={26.41} to={36.25} scale={1.5239} fadeIn={0.4} fadeOut={0.35}>
        <StudentMoment />
      </Beat>
      <Beat from={36.25} to={49.82} scale={1.1203} fadeIn={0.35} fadeOut={0.5}>
        <Forum66Scene />
      </Beat>
    </ChapterFrame>
  );
};
