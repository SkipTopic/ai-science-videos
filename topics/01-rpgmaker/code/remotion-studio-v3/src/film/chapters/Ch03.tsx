import React from 'react';
import {Beat, ChapterFrame, ChapterStamp} from '../ChapterBase';
import {getChapter} from '../data';
import {
  DoorPlaytest,
  EditorOverview,
  EventBuild,
  EventConstellation,
  EventsDatabase,
  MapPaint,
  TwoWords,
} from '../editor';

const chapter = getChapter('03');

export const Ch03: React.FC = () => {
  const sfx = [
    {at: 0.44, file: 'click.wav', volume: 0.28},
    {at: 2.72, file: 'click.wav', volume: 0.22},
    {at: 3.80, file: 'click.wav', volume: 0.22},
    {at: 9.31, file: 'whoosh.wav', volume: 0.25},
    {at: 9.60, file: 'click.wav', volume: 0.25},
    {at: 11.20, file: 'click.wav', volume: 0.2},
    {at: 12.46, file: 'click.wav', volume: 0.2},
    {at: 15.09, file: 'click.wav', volume: 0.22},
    {at: 23.60, file: 'whoosh.wav', volume: 0.22},
    {at: 24.15, file: 'click.wav', volume: 0.22},
    {at: 31.05, file: 'click.wav', volume: 0.25},
    {at: 38.15, file: 'whoosh.wav', volume: 0.25},
    {at: 40.20, file: 'cursor.wav', volume: 0.2},
    {at: 41.40, file: 'cursor.wav', volume: 0.2},
    {at: 45.70, file: 'whoosh.wav', volume: 0.25},
    {at: 45.86, file: 'click.wav', volume: 0.3},
    {at: 47.77, file: 'click.wav', volume: 0.28},
    {at: 49.34, file: 'click.wav', volume: 0.28},
    {at: 50.96, file: 'click.wav', volume: 0.3},
    {at: 53.54, file: 'click.wav', volume: 0.28},
    {at: 55.06, file: 'click.wav', volume: 0.25},
    {at: 56.01, file: 'click.wav', volume: 0.28},
    {at: 68.13, file: 'whoosh.wav', volume: 0.3},
    {at: 68.49, file: 'click.wav', volume: 0.22},
    {at: 70.53, file: 'dialog.wav', volume: 0.35},
    {at: 72.14, file: 'switch.wav', volume: 0.45},
    {at: 73.64, file: 'door.wav', volume: 0.55},
    {at: 80.63, file: 'whoosh.wav', volume: 0.3},
  ];
  return (
    <ChapterFrame chapter={chapter} mood="night" sfx={sfx} background="#08090b">
      <ChapterStamp chapter={chapter} />
      <Beat from={0.00} to={9.38} scale={1.5785} fadeIn={0.5} fadeOut={0.35}>
        <EditorOverview />
      </Beat>
      <Beat from={9.38} to={23.66} scale={1.7500} fadeIn={0.35} fadeOut={0.35}>
        <MapPaint />
      </Beat>
      <Beat from={23.66} to={38.25} scale={1.0285} fadeIn={0.35} fadeOut={0.35}>
        <EventsDatabase />
      </Beat>
      <Beat from={38.25} to={45.75} scale={2.0000} fadeIn={0.4} fadeOut={0.3}>
        <TwoWords />
      </Beat>
      <Beat from={45.75} to={68.19} scale={1.7826} fadeIn={0.35} fadeOut={0.35}>
        <EventBuild />
      </Beat>
      <Beat from={68.19} to={80.69} scale={2.0000} fadeIn={0.3} fadeOut={0.35}>
        <DoorPlaytest />
      </Beat>
      <Beat from={80.69} to={93.79} scale={1.9228} fadeIn={0.4} fadeOut={0.6}>
        <EventConstellation />
      </Beat>
    </ChapterFrame>
  );
};
