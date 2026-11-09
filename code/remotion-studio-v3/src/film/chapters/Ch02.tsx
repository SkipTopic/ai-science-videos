import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Beat, ChapterFrame, ChapterStamp} from '../ChapterBase';
import {RealShots} from '../realShots';
import {getChapter} from '../data';
import {LivingRoom1995} from '../illustrations';
import {C, FPS, SANS, SERIF, clamp} from '../theme';
import {
  AloneRoom,
  CartridgeCloseup,
  ConsoleTimeline,
  CorpseAward,
  CorpseTitle,
  DanteHistory,
  Desk1988,
  DialUpForum,
  FloppyBoot,
  LivingRoomSuperDante,
  MagazineSpread,
  MamirinScene,
  TwoWordsEnd,
} from './ch02-scenes';

const chapter = getChapter('02');

const ShareRoom: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const dim = interpolate(t, [0.2, 1.4], [0, 0.5], clamp);
  return (
    <div style={{position: 'absolute', inset: 0}}>
      <LivingRoom1995 />
      <div style={{position: 'absolute', inset: 0, background: `rgba(5,7,9,${dim})`}} />
      <div
        style={{
          position: 'absolute',
          left: 120,
          bottom: 160,
          fontFamily: SERIF,
          fontWeight: 900,
          fontSize: 64,
          lineHeight: 1.5,
          color: C.cream,
          textShadow: '0 6px 30px rgba(0,0,0,0.7)',
        }}
      >
        客厅，
        <br />
        这个工具的第一个大众入口。
      </div>
    </div>
  );
};

export const Ch02: React.FC = () => {
  const sfx = [
    {at: 0.20, file: 'paper.wav', volume: 0.28},
    {at: 8.30, file: 'whoosh.wav', volume: 0.2},
    {at: 15.01, file: 'floppy.wav', volume: 0.5},
    {at: 16.91, file: 'floppy.wav', volume: 0.35},
    {at: 22.18, file: 'dialog.wav', volume: 0.35},
    {at: 27.46, file: 'whoosh.wav', volume: 0.25},
    {at: 47.39, file: 'paper.wav', volume: 0.3},
    {at: 55.26, file: 'title_chime.wav', volume: 0.35},
    {at: 58.70, file: 'whoosh.wav', volume: 0.35},
    {at: 72.07, file: 'whoosh.wav', volume: 0.3},
    {at: 79.71, file: 'whoosh.wav', volume: 0.25},
    {at: 89.93, file: 'cursor.wav', volume: 0.22},
    {at: 93.30, file: 'disc.wav', volume: 0.35},
    {at: 110.25, file: 'whoosh.wav', volume: 0.28},
    {at: 116.89, file: 'whoosh.wav', volume: 0.3},
    {at: 120.62, file: 'whoosh.wav', volume: 0.35},
    {at: 142.38, file: 'whoosh.wav', volume: 0.3},
    {at: 144.19, file: 'modem.wav', volume: 0.5},
    {at: 157.91, file: 'cursor.wav', volume: 0.25},
  ];
  return (
    <ChapterFrame chapter={chapter} mood="mixed" sfx={sfx} background="#07080a">
      <ChapterStamp chapter={chapter} />
      <Beat from={0.00} to={12.99} scale={1.0240} fadeIn={0.6} fadeOut={0.35}>
        <Desk1988 />
      </Beat>
      <Beat from={12.99} to={22.96} scale={0.8921} fadeIn={0.35} fadeOut={0.4}>
        <FloppyBoot />
      </Beat>
      <Beat from={22.96} to={27.61} scale={2.0000} fadeIn={0.5} fadeOut={0.4}>
        <MamirinScene />
      </Beat>
      <Beat from={27.61} to={47.47} scale={1.2589} fadeIn={0.4} fadeOut={0.4}>
        <DanteHistory />
      </Beat>
      <Beat from={47.47} to={59.21} fadeIn={0.4} fadeOut={0.35}>
        <MagazineSpread />
      </Beat>
      <Beat from={59.21} to={72.26} scale={1.0649} fadeIn={0.35} fadeOut={0.4}>
        <CorpseAward />
      </Beat>
      <Beat from={72.26} to={79.81} scale={2.0000} fadeIn={0.35} fadeOut={0.4}>
        <CorpseTitle />
      </Beat>
      <Beat from={79.81} to={94.02} scale={0.9787} fadeIn={0.4} fadeOut={0.35}>
        <LivingRoomSuperDante />
      </Beat>
      <Beat from={94.02} to={111.26} scale={0.8932} fadeIn={0.35} fadeOut={0.35}>
        <ConsoleTimeline />
      </Beat>
      <Beat from={111.26} to={117.15} scale={1.5278} fadeIn={0.35} fadeOut={0.35}>
        <ShareRoom />
      </Beat>
      <Beat from={117.15} to={122.22} scale={0.7494} fadeIn={0.35} fadeOut={0.3}>
        <AloneRoom />
      </Beat>
      <Beat from={122.22} to={143.09} scale={1.1211} fadeIn={0.3} fadeOut={0.35}>
        <CartridgeCloseup />
      </Beat>
      <Beat from={143.09} to={158.89} scale={0.9113} fadeIn={0.35} fadeOut={0.3}>
        <DialUpForum />
      </Beat>
      <Beat from={158.89} to={164.06} scale={1.5885} fadeIn={0.3} fadeOut={0.4}>
        <TwoWordsEnd />
      </Beat>
      <RealShots
        shots={[
          {at: 75.0, dur: 2.8, img: 'images/v2/corpseparty.jpg', label: '《尸体派对》', note: 'CORPSE PARTY / 1996'},
        ]}
      />
    </ChapterFrame>
  );
};
