import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {CUES} from './data';
import {FPS, clamp} from './theme';

export const Subtitles: React.FC = () => {
  const frame = useCurrentFrame();
  const cue = CUES.find(
    (item) => frame >= item.start * FPS && frame < item.end * FPS,
  );
  if (!cue) {
    return null;
  }
  const start = cue.start * FPS;
  const end = cue.end * FPS;
  const length = Math.max(1, end - start);
  const fadeFrames = Math.min(6, Math.floor(length / 3));
  const opacity = Math.min(
    interpolate(frame, [start, start + fadeFrames], [0, 1], clamp),
    interpolate(frame, [end - fadeFrames, end], [1, 0], clamp),
  );

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 160,
          background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.34) 48%, rgba(0,0,0,0) 100%)',
          opacity: opacity * 0.9,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 40,
          display: 'flex',
          justifyContent: 'center',
          opacity,
        }}
      >
        <div
          style={{
            maxWidth: 1650,
            fontFamily: '"Noto Sans SC", sans-serif',
            fontWeight: 400,
            fontSize: 48,
            lineHeight: 1.32,
            letterSpacing: 1.5,
            color: '#ffffff',
            textAlign: 'center',
            textShadow: '0 2px 16px rgba(0,0,0,0.95)',
          }}
        >
          {cue.text}
        </div>
      </div>
    </AbsoluteFill>
  );
};
