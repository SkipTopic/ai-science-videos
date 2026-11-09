import React from 'react';
import {hash} from '../theme';

export const FilmGrain: React.FC<{
  frame: number;
  intensity?: number;
  count?: number;
}> = ({frame, intensity = 0.55, count = 150}) => {
  const seed = Math.floor(frame / 2);
  const dots = [];
  for (let i = 0; i < count; i += 1) {
    const x = hash(seed * 131 + i * 17) * 1920;
    const y = hash(seed * 71 + i * 29 + 9) * 1080;
    const size = hash(seed * 43 + i * 11 + 3) > 0.86 ? 2 : 1;
    const opacity = (0.025 + hash(seed * 19 + i * 7) * 0.09) * intensity;
    dots.push(
      <div
        key={i}
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: size,
          height: size,
          background: `rgba(255,255,255,${opacity})`,
        }}
      />,
    );
  }
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {dots}
      <div
        style={{
          position: 'absolute',
          left: 420 + Math.sin(frame * 0.02) * 10,
          top: 0,
          width: 1,
          height: '100%',
          background: 'rgba(255,255,255,0.035)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 1370 + Math.cos(frame * 0.017) * 12,
          top: 0,
          width: 1,
          height: '100%',
          background: 'rgba(255,255,255,0.025)',
        }}
      />
    </div>
  );
};
