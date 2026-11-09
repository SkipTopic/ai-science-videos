import React from 'react';
import {spring} from 'remotion';
import {FPS, GAME_PX_H, GAME_PX_W, GAME_X, GAME_Y, fade, fadeOut} from './theme';

export const PixelFrame: React.FC<{frame: number}> = ({frame}) => {
  const intro = fade(frame, 0.15, 1.25) * fadeOut(frame, 8.9, 9.5);
  const corners = [
    {x: GAME_X, y: GAME_Y, dx: -1, dy: -1, d: `M${GAME_X} ${GAME_Y} h64 v8 h-56 v56 h-8 z`},
    {
      x: GAME_X + GAME_PX_W,
      y: GAME_Y,
      dx: 1,
      dy: -1,
      d: `M${GAME_X + GAME_PX_W} ${GAME_Y} h-64 v8 h56 v56 h8 z`,
    },
    {
      x: GAME_X,
      y: GAME_Y + GAME_PX_H,
      dx: -1,
      dy: 1,
      d: `M${GAME_X} ${GAME_Y + GAME_PX_H} v-64 h8 v56 h56 v8 z`,
    },
    {
      x: GAME_X + GAME_PX_W,
      y: GAME_Y + GAME_PX_H,
      dx: 1,
      dy: 1,
      d: `M${GAME_X + GAME_PX_W} ${GAME_Y + GAME_PX_H} v-64 h-8 v56 h-56 v8 z`,
    },
  ];
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1920 1080"
      style={{position: 'absolute', inset: 0, pointerEvents: 'none', opacity: intro}}
      shapeRendering="crispEdges"
    >
      <rect
        x={GAME_X}
        y={GAME_Y}
        width={GAME_PX_W}
        height={GAME_PX_H}
        fill="none"
        stroke="rgba(236,228,212,0.13)"
        strokeWidth={1}
      />
      {corners.map((corner, index) => {
        const pop = spring({
          frame: Math.max(0, frame - (8 + index * 3)),
          fps: FPS,
          config: {damping: 16, stiffness: 120},
        });
        return (
          <path
            key={corner.d}
            d={corner.d}
            fill="#ece5d5"
            opacity={0.78 * Math.min(1, pop)}
            transform={`translate(${corner.dx * (1 - pop) * 36} ${corner.dy * (1 - pop) * 36})`}
          />
        );
      })}
    </svg>
  );
};
