import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {FPS} from './theme';

// Every scene sits inside a slow two-frequency camera drift so no 0.5 s window
// of the film is ever a frozen image. The scale stays above 1 so the edges
// cannot pull away from the frame.
export const Drift: React.FC<{children: React.ReactNode; amount?: number}> = ({
  children,
  amount = 1,
}) => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const scale = 1.030 + 0.012 * Math.sin(t * 0.35 + 0.6) * amount;
  const x =
    (14 * Math.sin(t * 0.42 + 0.4) + 5 * Math.sin(t * 1.1 + 2.4)) * amount;
  const y =
    (10 * Math.sin(t * 0.37 + 2.1) + 3 * Math.sin(t * 0.95 + 1.1)) * amount;
  return (
    <AbsoluteFill
      style={{
        transform: `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) scale(${scale.toFixed(5)})`,
        transformOrigin: '50% 50%',
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
