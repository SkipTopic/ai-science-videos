import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {ASCII1997Page, BrowserFrame} from '../archive';
import {Beat, ChapterFrame, ChapterStamp} from '../ChapterBase';
import {VideoCutaways} from '../realShots';
import {getChapter} from '../data';
import {
  FoundersDossier,
  MechaDino,
  Meeting1978,
  MSXLineup,
  PressConference,
  Tokyo1977,
  Waseda1975,
} from '../illustrations';
import {FPS, SANS, clamp} from '../theme';
import {BackTo1988, Magazine1977} from './ch01-scenes';

const chapter = getChapter('01');

const AsciiArchive: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const highlight = t > 7.1 ? (t > 11.2 ? 2 : t > 9.2 ? 1 : 0) : -1;
  const dim = t > 13.6;
  const scroll = interpolate(t, [0, 12], [0, 130], clamp);
  return (
    <div style={{position: 'absolute', inset: 0, background: '#24211c', overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(130,160,200,0.12), rgba(8,8,9,0.98) 70%)',
        }}
      />
      <BrowserFrame
        title="Netscape Navigator"
        url="http://www.ascii.co.jp/"
        left={150}
        top={74}
        width={1620}
        height={930}
        scroll={scroll}
        pageHeight={1600}
        status={dim ? '3 items hidden' : 'Document: Done'}
        dark
      >
        <ASCII1997Page highlight={highlight} dim={dim} />
      </BrowserFrame>
      <div
        style={{
          position: 'absolute',
          right: 80,
          bottom: 56,
          fontFamily: SANS,
          fontSize: 17,
          letterSpacing: 3,
          color: 'rgba(236,231,218,0.42)',
        }}
      >
        1997.12.11 / ASCII HOMEPAGE / 复原页面
      </div>
    </div>
  );
};

export const Ch01: React.FC = () => {
  const sfx = [
    {at: 0.37, file: 'paper.wav', volume: 0.25},
    {at: 6.40, file: 'cursor.wav', volume: 0.22},
    {at: 13.80, file: 'whoosh.wav', volume: 0.25},
    {at: 26.46, file: 'paper.wav', volume: 0.3},
    {at: 40.81, file: 'whoosh.wav', volume: 0.25},
    {at: 57.34, file: 'whoosh.wav', volume: 0.22},
    {at: 78.04, file: 'whoosh.wav', volume: 0.3},
    {at: 95.07, file: 'flash.wav', volume: 0.5},
    {at: 100.59, file: 'tick.wav', volume: 0.2},
    {at: 102.85, file: 'tick.wav', volume: 0.2},
    {at: 107.55, file: 'paper.wav', volume: 0.28},
    {at: 114.64, file: 'tick.wav', volume: 0.18},
    {at: 116.83, file: 'tick.wav', volume: 0.2},
    {at: 118.93, file: 'tick.wav', volume: 0.22},
    {at: 123.72, file: 'whoosh.wav', volume: 0.35},
  ];
  return (
    <ChapterFrame chapter={chapter} mood="mixed" sfx={sfx} background="#0b0b0c">
      <ChapterStamp chapter={chapter} />
      <Beat from={0.00} to={6.25} scale={1.3449} fadeIn={0.8} fadeOut={0.35}>
        <Tokyo1977 />
      </Beat>
      <Beat from={6.25} to={13.75} scale={2.0000} fadeIn={0.35} fadeOut={0.35}>
        <FoundersDossier />
      </Beat>
      <Beat from={13.75} to={26.31} scale={1.9897} fadeIn={0.4} fadeOut={0.4}>
        <Waseda1975 />
      </Beat>
      <Beat from={26.31} to={40.74} scale={1.3862} fadeIn={0.4} fadeOut={0.4}>
        <Magazine1977 />
      </Beat>
      <Beat from={40.74} to={57.27} scale={1.5123} fadeIn={0.4} fadeOut={0.4}>
        <Meeting1978 />
      </Beat>
      <Beat from={57.27} to={77.96} scale={1.4502} fadeIn={0.45} fadeOut={0.4}>
        <MSXLineup />
      </Beat>
      <Beat from={77.96} to={94.90} scale={1.1802} fadeIn={0.4} fadeOut={0.4}>
        <MechaDino />
      </Beat>
      <Beat from={94.90} to={107.45} scale={1.1956} fadeIn={0.35} fadeOut={0.35}>
        <PressConference />
      </Beat>
      <Beat from={107.45} to={123.82} fadeIn={0.35} fadeOut={0.35}>
        <AsciiArchive />
      </Beat>
      <Beat from={123.82} to={133.61} scale={1.0425} fadeIn={0.3} fadeOut={0.5}>
        <BackTo1988 />
      </Beat>
      <VideoCutaways
        clips={[
          {at: 83.0, dur: 5.2, src: 'video/mecha_dino.mp4', label: '机械恐龙 / 东京 / 1986', note: 'BLENDER 3D'},
        ]}
      />
    </ChapterFrame>
  );
};
