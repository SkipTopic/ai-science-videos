import React from 'react';
import {Beat, ChapterFrame, ChapterStamp} from '../ChapterBase';
import {RealShots} from '../realShots';
import {getChapter} from '../data';
import {
  AgetecShelf,
  CollectThenBalcony,
  DonMiguel,
  DreamNoGoal,
  IbWitch,
  NexusDoor,
  OmoriSales,
  PirateVsOfficial,
  RPGErase,
  TheMoon,
  TwoThings2000,
  WorksMontage,
  YumePost,
  YumeTitle,
} from './ch05-scenes';
import {DreamBedroom, DreamCorridor} from '../pixel';
import {NetworkMap} from '../archive';

const chapter = getChapter('05');

export const Ch05: React.FC = () => {
  const sfx = [
    {at: 0.32, file: 'whoosh.wav', volume: 0.25},
    {at: 10.57, file: 'whoosh.wav', volume: 0.25},
    {at: 15.87, file: 'paper.wav', volume: 0.28},
    {at: 20.28, file: 'whoosh.wav', volume: 0.25},
    {at: 28.59, file: 'cursor.wav', volume: 0.18},
    {at: 33.99, file: 'whoosh.wav', volume: 0.25},
    {at: 43.32, file: 'whoosh.wav', volume: 0.22},
    {at: 55.18, file: 'modem.wav', volume: 0.4},
    {at: 62.74, file: 'whoosh.wav', volume: 0.3},
    {at: 68.46, file: 'whoosh.wav', volume: 0.26},
    {at: 75.67, file: 'whoosh.wav', volume: 0.26},
    {at: 83.56, file: 'tick.wav', volume: 0.2},
    {at: 86.10, file: 'whoosh.wav', volume: 0.3},
    {at: 88.31, file: 'whoosh.wav', volume: 0.25},
    {at: 107.10, file: 'erase.wav', volume: 0.4},
    {at: 115.57, file: 'whoosh.wav', volume: 0.3},
    {at: 121.72, file: 'whoosh.wav', volume: 0.25},
    {at: 141.05, file: 'whoosh.wav', volume: 0.3},
    {at: 156.75, file: 'whoosh.wav', volume: 0.25},
    {at: 174.20, file: 'whoosh.wav', volume: 0.3},
  ];
  return (
    <ChapterFrame chapter={chapter} mood="night" sfx={sfx} background="#050607">
      <ChapterStamp chapter={chapter} />
      <Beat from={0.00} to={11.10} scale={0.9458} fadeIn={0.6} fadeOut={0.35}>
        <TwoThings2000 />
      </Beat>
      <Beat from={11.10} to={20.73} scale={1.0901} fadeIn={0.4} fadeOut={0.35}>
        <DonMiguel />
      </Beat>
      <Beat from={20.73} to={34.48} scale={1.0186} fadeIn={0.35} fadeOut={0.35}>
        <AgetecShelf />
      </Beat>
      <Beat from={34.48} to={44.02} scale={0.7128} fadeIn={0.35} fadeOut={0.3}>
        <PirateVsOfficial />
      </Beat>
      <Beat from={44.02} to={55.47} scale={1.3619} fadeIn={0.35} fadeOut={0.35}>
        <NetworkMap />
      </Beat>
      <Beat from={55.47} to={63.12} scale={1.0458} fadeIn={0.35} fadeOut={0.3}>
        <YumePost />
      </Beat>
      <Beat from={63.12} to={68.84} scale={1.0674} fadeIn={0.4} fadeOut={0.3}>
        <DreamBedroom />
      </Beat>
      <Beat from={68.84} to={76.06} scale={1.0391} fadeIn={0.35} fadeOut={0.35}>
        <DreamCorridor />
      </Beat>
      <Beat from={76.06} to={84.06} scale={0.8125} fadeIn={0.35} fadeOut={0.3}>
        <DreamNoGoal />
      </Beat>
      <Beat from={84.06} to={88.31} scale={1.9534} fadeIn={0.35} fadeOut={0.3}>
        <CollectThenBalcony />
      </Beat>
      <Beat from={88.31} to={107.10} scale={1.0749} fadeIn={0.4} fadeOut={0.4}>
        <YumeTitle />
      </Beat>
      <Beat from={107.10} to={115.97} fadeIn={0.3} fadeOut={0.4}>
        <RPGErase />
      </Beat>
      <Beat from={115.97} to={121.72} scale={2.0000} fadeIn={0.5} fadeOut={0.4}>
        <NexusDoor />
      </Beat>
      <Beat from={121.72} to={141.05} scale={1.0350} fadeIn={0.4} fadeOut={0.35}>
        <TheMoon />
      </Beat>
      <Beat from={141.05} to={156.75} scale={1.2734} fadeIn={0.35} fadeOut={0.35}>
        <IbWitch />
      </Beat>
      <Beat from={156.75} to={174.20} scale={0.9171} fadeIn={0.35} fadeOut={0.35}>
        <OmoriSales />
      </Beat>
      <Beat from={174.20} to={181.20} scale={2.0000} fadeIn={0.35} fadeOut={0.6}>
        <WorksMontage />
      </Beat>
      <RealShots
        shots={[
          {at: 89.4, dur: 3.2, img: 'images/v2/yumenikki.jpg', label: '《梦日记》', note: 'YUME NIKKI / 2004'},
          {at: 124.4, dur: 3.2, img: 'images/v2/tothemoon.jpg', label: '《去月球》', note: 'TO THE MOON / 2011'},
          {at: 145.5, dur: 2.9, img: 'images/v2/ib.jpg', label: '《Ib》', note: '2012'},
          {at: 148.1, dur: 2.9, img: 'images/v2/witchhouse.jpg', label: '《魔女之家》', note: '2012'},
          {at: 159.4, dur: 3.0, img: 'images/v2/omori.jpg', label: '《OMORI》', note: '2020 / RPG MAKER MV'},
        ]}
      />
    </ChapterFrame>
  );
};
