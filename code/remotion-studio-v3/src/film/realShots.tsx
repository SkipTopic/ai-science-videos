import React from 'react';
import {AbsoluteFill, Img, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {FPS, PIXEL, SANS, clamp} from './theme';

export type RealShot = {
  at: number;
  dur?: number;
  img: string;
  label: string;
  note?: string;
};

const Shot: React.FC<{shot: RealShot}> = ({shot}) => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const dur = shot.dur ?? 3.2;
  const enter = interpolate(t, [shot.at, shot.at + 0.32], [0, 1], clamp);
  const leave = interpolate(t, [shot.at + dur - 0.34, shot.at + dur], [1, 0], clamp);
  const opacity = Math.min(enter, leave);
  if (opacity <= 0.001) {
    return null;
  }
  const push = interpolate(t, [shot.at, shot.at + dur], [1.055, 1.0], clamp);
  return (
    <AbsoluteFill style={{opacity, background: '#050607'}}>
      <Img
        src={staticFile(shot.img)}
        style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${push})`}}
      />
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.18) 26%, rgba(0,0,0,0) 46%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 72,
          bottom: 196,
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}
      >
        <span
          style={{
            fontFamily: SANS,
            fontSize: 17,
            letterSpacing: 3,
            color: '#0b0c0e',
            background: 'rgba(217,178,95,0.92)',
            padding: '5px 10px',
          }}
        >
          实机画面
        </span>
        <span
          style={{
            fontFamily: SANS,
            fontSize: 30,
            letterSpacing: 1.5,
            color: '#f2ecdd',
            textShadow: '0 3px 18px rgba(0,0,0,0.9)',
          }}
        >
          {shot.label}
        </span>
        {shot.note ? (
          <span
            style={{
              fontFamily: PIXEL,
              fontSize: 11,
              letterSpacing: 2,
              color: 'rgba(236,231,218,0.55)',
            }}
          >
            {shot.note}
          </span>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};

export const RealShots: React.FC<{shots: RealShot[]}> = ({shots}) => (
  <AbsoluteFill style={{pointerEvents: 'none'}}>
    {shots.map((shot) => (
      <Shot key={`${shot.img}-${shot.at}`} shot={shot} />
    ))}
  </AbsoluteFill>
);

export type VideoCut = {
  at: number;
  dur: number;
  src: string;
  label: string;
  note?: string;
};

const VideoClip: React.FC<{clip: VideoCut}> = ({clip}) => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const enter = interpolate(t, [0, 0.35], [0, 1], clamp);
  const leave = interpolate(t, [clip.dur - 0.4, clip.dur], [1, 0], clamp);
  const opacity = Math.min(enter, leave);
  return (
    <AbsoluteFill style={{opacity, background: '#040506'}}>
      <OffthreadVideo src={staticFile(clip.src)} muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      <AbsoluteFill style={{background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.16) 26%, rgba(0,0,0,0) 46%)'}} />
      <div style={{position: 'absolute', left: 72, bottom: 196, display: 'flex', alignItems: 'center', gap: 14}}>
        <span style={{fontFamily: SANS, fontSize: 17, letterSpacing: 3, color: '#0b0c0e', background: 'rgba(217,178,95,0.92)', padding: '5px 10px'}}>
          3D 复原
        </span>
        <span style={{fontFamily: SANS, fontSize: 30, letterSpacing: 1.5, color: '#f2ecdd', textShadow: '0 3px 18px rgba(0,0,0,0.9)'}}>
          {clip.label}
        </span>
        {clip.note ? (
          <span style={{fontFamily: PIXEL, fontSize: 11, letterSpacing: 2, color: 'rgba(236,231,218,0.55)'}}>{clip.note}</span>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};

export const VideoCutaways: React.FC<{clips: VideoCut[]}> = ({clips}) => (
  <AbsoluteFill style={{pointerEvents: 'none'}}>
    {clips.map((clip) => (
      <Sequence key={clip.src} from={Math.round(clip.at * FPS)} durationInFrames={Math.round(clip.dur * FPS)}>
        <VideoClip clip={clip} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
