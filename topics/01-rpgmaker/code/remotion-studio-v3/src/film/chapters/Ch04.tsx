import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {ResolutionFrames} from '../archive';
import {Beat, ChapterFrame, ChapterStamp} from '../ChapterBase';
import {Caption, Kicker} from '../components';
import {getChapter} from '../data';
import {DefaultRPG} from '../pixel';
import {C, FPS, PIXEL, SANS, SERIF, clamp} from '../theme';

const chapter = getChapter('04');

const ResolutionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  let index = 0;
  if (t >= 14.0) index = 0;
  else if (t >= 9.4) index = 3;
  else if (t >= 5.2) index = 1;
  const progress = interpolate(t, [0, 1.2], [0.92, 1], clamp);
  return (
    <div style={{position: 'absolute', inset: 0, background: '#08090b'}}>
      <ResolutionFrames index={index} progress={progress} />
    </div>
  );
};

const RMMood: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const styleIn = interpolate(t, [6.0, 7.0], [0, 1], clamp);
  return (
    <div style={{position: 'absolute', inset: 0, background: '#050607'}}>
      <DefaultRPG />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(5,6,7,0.58) 0%, rgba(5,6,7,0) 46%)',
        }}
      />
      <div style={{position: 'absolute', left: 100, top: 100}}>
        <Kicker color="rgba(236,231,218,0.45)">RPG MAKER 2000 / DEFAULT ASSETS</Kicker>
        <div
          style={{
            marginTop: 18,
            fontFamily: SERIF,
            fontWeight: 900,
            fontSize: 76,
            lineHeight: 1.25,
            color: C.cream,
            textShadow: '0 6px 30px rgba(0,0,0,0.8)',
          }}
        >
          蓝头发的骑士。
          <br />
          那片草地。
          <br />
          那个蓝底白字的对话框。
        </div>
        <div
          style={{
            marginTop: 34,
            fontFamily: PIXEL,
            fontSize: 16,
            letterSpacing: 2,
            color: 'rgba(217,178,95,0.85)',
            opacity: styleIn,
          }}
        >
          “RM 味”
        </div>
      </div>
    </div>
  );
};

const AccentStatement: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const enter = interpolate(t, [0.2, 1.2], [0, 1], clamp);
  return (
    <div style={{position: 'absolute', inset: 0, background: '#050607', overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 46% 44%, rgba(90,100,118,0.26) 0%, rgba(5,6,7,1) 68%)',
        }}
      />
      <div style={{position: 'absolute', left: 120, top: 120}}>
        <div style={{fontFamily: SANS, fontSize: 19, letterSpacing: 5, color: 'rgba(236,231,218,0.4)'}}>
          RM / ACCENT
        </div>
        <div
          style={{
            marginTop: 40,
            fontFamily: SERIF,
            fontWeight: 900,
            fontSize: 190,
            lineHeight: 1.25,
            color: C.cream,
            opacity: enter,
            transform: `translateY(${(1 - enter) * 20}px)`,
          }}
        >
          它不是一种风格。
          <br />
          它是一种口音。
        </div>
        <div style={{marginTop: 40, width: 460, height: 3, background: C.red, opacity: enter * 0.8}} />
        <div
          style={{
            marginTop: 26,
            fontFamily: SANS,
            fontSize: 22,
            letterSpacing: 3,
            color: 'rgba(236,231,218,0.4)',
            opacity: enter,
          }}
        >
          320 × 240 / 1992 — 2015
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          right: 140,
          bottom: 140,
          fontFamily: PIXEL,
          fontSize: 13,
          letterSpacing: 2,
          color: 'rgba(236,231,218,0.22)',
        }}
      >
        RPG MAKER
      </div>
    </div>
  );
};

export const Ch04: React.FC = () => {
  const sfx = [
    {at: 0.79, file: 'tick.wav', volume: 0.2},
    {at: 4.75, file: 'tick.wav', volume: 0.25},
    {at: 8.62, file: 'tick.wav', volume: 0.25},
    {at: 12.50, file: 'tick.wav', volume: 0.2},
    {at: 17.34, file: 'whoosh.wav', volume: 0.3},
    {at: 17.92, file: 'dialog.wav', volume: 0.35},
    {at: 23.54, file: 'cursor.wav', volume: 0.2},
    {at: 26.00, file: 'whoosh.wav', volume: 0.25},
    {at: 27.68, file: 'whoosh.wav', volume: 0.35},
    {at: 27.83, file: 'paper.wav', volume: 0.25},
  ];
  return (
    <ChapterFrame chapter={chapter} mood="night" sfx={sfx} background="#050607">
      <ChapterStamp chapter={chapter} />
      <Beat from={0.00} to={17.43} scale={1.1363} fadeIn={0.5} fadeOut={0.35}>
        <ResolutionScene />
      </Beat>
      <Beat from={17.43} to={27.68} fadeIn={0.35} fadeOut={0.3}>
        <RMMood />
      </Beat>
      <Beat from={27.68} to={32.58} scale={2.0000} fadeIn={0.4} fadeOut={0.5}>
        <AccentStatement />
      </Beat>
    </ChapterFrame>
  );
};
