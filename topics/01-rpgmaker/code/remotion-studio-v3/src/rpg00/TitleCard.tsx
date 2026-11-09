import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {FPS, clamp} from './theme';
import {FilmGrain} from './archive/FilmGrain';

export const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const line = interpolate(frame, [0, 0.9 * FPS], [0, 1], clamp);
  const kicker = interpolate(frame, [0.35 * FPS, 1.1 * FPS], [0, 1], clamp);
  const titleSpring = spring({
    frame: Math.max(0, frame - 0.75 * FPS),
    fps: FPS,
    config: {damping: 18, stiffness: 70},
  });
  const titleOpacity = interpolate(
    frame,
    [0.75 * FPS, 1.9 * FPS],
    [0, 1],
    clamp,
  );
  const letterSpacing = interpolate(titleSpring, [0, 1], [46, 10]);
  const titleY = interpolate(titleSpring, [0, 1], [36, 0]);
  const yearOpacity = interpolate(frame, [2.15 * FPS, 3.0 * FPS], [0, 1], clamp);
  const cursorVisible = frame >= 3.4 * FPS;
  const blink = Math.floor(frame / 24) % 2 === 0;
  const {durationInFrames} = useVideoConfig();
  const fadeOut = interpolate(frame, [durationInFrames - FPS, durationInFrames], [0, 1], clamp);
  const contentOpacity = 1 - fadeOut;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'radial-gradient(circle at 50% 46%, #141413 0%, #0a0a0a 52%, #050505 100%)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 470,
          width: 980 * line,
          height: 1,
          transform: 'translateX(-50%)',
          background:
            'linear-gradient(90deg, rgba(220,212,195,0), rgba(220,212,195,0.75), rgba(220,212,195,0))',
          opacity: contentOpacity,
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 390,
          textAlign: 'center',
          opacity: kicker * contentOpacity,
          transform: `translateY(${(1 - kicker) * 14}px)`,
        }}
      >
        <div
          style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: 26,
            letterSpacing: 18,
            color: '#8d8779',
            paddingLeft: 18,
          }}
        >
          RPG MAKER
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 528,
          display: 'flex',
          justifyContent: 'center',
          opacity: titleOpacity * contentOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div style={{position: 'relative'}}>
          <div
            style={{
              fontFamily: '"Noto Serif SC", serif',
              fontWeight: 900,
              fontSize: 176,
              lineHeight: 1,
              letterSpacing,
              color: '#f2ede0',
              textShadow: '0 12px 60px rgba(0,0,0,0.8)',
              whiteSpace: 'nowrap',
            }}
          >
            梦想与世界
          </div>
          <div
            style={{
              position: 'absolute',
              left: '100%',
              bottom: 22,
              marginLeft: 26,
              width: 10,
              height: 152,
              background: '#e8e2d4',
              opacity: cursorVisible && blink ? 0.92 : 0,
            }}
          />
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 790,
          textAlign: 'center',
          opacity: yearOpacity * contentOpacity,
        }}
      >
        <div
          style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: 24,
            letterSpacing: 10,
            color: '#777166',
            paddingLeft: 10,
          }}
        >
          1977 — 2026
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 80,
          top: 80,
          fontFamily: '"Press Start 2P", monospace',
          fontSize: 16,
          letterSpacing: 6,
          color: 'rgba(200,190,170,0.22)',
          opacity: contentOpacity,
        }}
      >
        CHAPTER 00
      </div>

      <FilmGrain frame={frame + 900} intensity={0.35} count={110} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#000',
          opacity: fadeOut,
        }}
      />
    </div>
  );
};
