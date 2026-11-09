import React from 'react';
import {interpolate, spring} from 'remotion';
import {FPS, clamp, sec} from './theme';

export const EditorCursor: React.FC<{frame: number}> = ({frame}) => {
  const start = sec(44.0);
  const end = sec(54.5);
  if (frame < start || frame > end) {
    return null;
  }
  const move = interpolate(
    frame,
    [sec(48.5), sec(50.0)],
    [0, 1],
    {...clamp, easing: (t) => t * t * (3 - 2 * t)},
  );
  const x = interpolate(move, [0, 1], [1040, 900]) + Math.sin(frame * 0.13) * 2;
  const y = interpolate(move, [0, 1], [430, 940]) + Math.cos(frame * 0.17) * 2;
  const opacity =
    interpolate(frame, [sec(44.0), sec(44.4)], [0, 1], clamp) *
    interpolate(frame, [sec(54.1), sec(54.5)], [1, 0], clamp);
  const blinkOn = Math.floor((frame - start) / 18) % 5 !== 4;
  const click = spring({
    frame: Math.max(0, frame - sec(50.0)),
    fps: FPS,
    config: {damping: 10, stiffness: 300},
  });
  const clickScale = 1 - (click > 0 ? Math.sin(Math.min(1, click) * Math.PI) * 0.12 : 0);
  const ripple = interpolate(
    frame,
    [sec(50.0), sec(50.0) + 14],
    [0, 1],
    clamp,
  );

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity: opacity * (blinkOn ? 1 : 0.12),
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          transform: `scale(${clickScale})`,
          transformOrigin: '2px 2px',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.55))',
        }}
      >
        <svg width="30" height="40" viewBox="0 0 30 40">
          <path
            d="M3 2 L3 30 L10 23 L15 36 L21 33 L16 21 L27 21 Z"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {frame >= sec(50.0) && frame <= sec(50.0) + 16 ? (
        <div
          style={{
            position: 'absolute',
            left: 900 - 30 * ripple,
            top: 940 - 30 * ripple,
            width: 60 * ripple,
            height: 60 * ripple,
            borderRadius: '50%',
            border: '2px solid rgba(70,130,220,0.5)',
            opacity: 0.6 * (1 - ripple),
          }}
        />
      ) : null}
    </div>
  );
};
