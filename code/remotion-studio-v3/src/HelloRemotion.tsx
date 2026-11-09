import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const ACCENT = '#ff8a3d';
const CYAN = '#5ad0ff';
const VIOLET = '#a78bfa';
const CENTER = {x: 960, y: 430};

type Orbit = {
  angle: number;
  rx: number;
  ry: number;
  speed: number;
  offset: number;
  color: string;
};

const ORBITS: Orbit[] = [
  {angle: 0, rx: 330, ry: 118, speed: 1.4, offset: 0, color: CYAN},
  {angle: 60, rx: 330, ry: 118, speed: -1.1, offset: 2.1, color: ACCENT},
  {angle: 120, rx: 330, ry: 118, speed: 0.85, offset: 4.2, color: VIOLET},
];

const electronPosition = (orbit: Orbit, seconds: number) => {
  const rotation = (orbit.angle * Math.PI) / 180;
  const theta = seconds * orbit.speed + orbit.offset;
  const x = Math.cos(theta) * orbit.rx;
  const y = Math.sin(theta) * orbit.ry;
  return {
    x: CENTER.x + x * Math.cos(rotation) - y * Math.sin(rotation),
    y: CENTER.y + x * Math.sin(rotation) + y * Math.cos(rotation),
  };
};

export const HelloRemotion: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const seconds = frame / fps;

  const atomIn = spring({
    frame: Math.max(0, frame - 4),
    fps,
    config: {damping: 16, stiffness: 90},
  });
  const titleIn = spring({
    frame: Math.max(0, frame - 20),
    fps,
    config: {damping: 18, stiffness: 120},
  });
  const subtitleIn = spring({
    frame: Math.max(0, frame - 36),
    fps,
    config: {damping: 200},
  });

  const atomScale = interpolate(atomIn, [0, 1], [0.72, 1]);
  const progress = interpolate(
    frame,
    [0, durationInFrames - 1],
    [0, 100],
    {extrapolateRight: 'clamp'},
  );

  return (
    <AbsoluteFill
      style={{
        background:
          'radial-gradient(circle at 50% 38%, #16233a 0%, #0a0e17 55%, #05070b 100%)',
        fontFamily: '"Microsoft YaHei", "PingFang SC", sans-serif',
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage:
            'linear-gradient(rgba(120,170,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(120,170,255,0.05) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage:
            'radial-gradient(circle at 50% 45%, black 0%, transparent 75%)',
        }}
      />

      <AbsoluteFill
        style={{
          opacity: interpolate(atomIn, [0, 1], [0, 1]),
          transform: `scale(${atomScale})`,
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 1920 1080">
          <defs>
            <radialGradient id="nucleus-glow">
              <stop offset="0%" stopColor={ACCENT} stopOpacity={0.55} />
              <stop offset="100%" stopColor={ACCENT} stopOpacity={0} />
            </radialGradient>
          </defs>
          <circle cx={CENTER.x} cy={CENTER.y} r={110} fill="url(#nucleus-glow)" />
          {ORBITS.map((orbit) => (
            <ellipse
              key={`ring-${orbit.angle}`}
              cx={CENTER.x}
              cy={CENTER.y}
              rx={orbit.rx}
              ry={orbit.ry}
              fill="none"
              stroke={orbit.color}
              strokeOpacity={0.34}
              strokeWidth={1.5}
              transform={`rotate(${orbit.angle} ${CENTER.x} ${CENTER.y})`}
            />
          ))}
          {ORBITS.map((orbit) => {
            const pos = electronPosition(orbit, seconds);
            return (
              <g key={`electron-${orbit.angle}`}>
                <circle cx={pos.x} cy={pos.y} r={16} fill={orbit.color} opacity={0.28} />
                <circle cx={pos.x} cy={pos.y} r={7} fill={orbit.color} />
              </g>
            );
          })}
          <circle cx={CENTER.x} cy={CENTER.y} r={26} fill={ACCENT} />
          <circle cx={CENTER.x} cy={CENTER.y} r={44} fill="none" stroke={ACCENT} strokeOpacity={0.45} strokeWidth={1} />
        </svg>
      </AbsoluteFill>

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 720,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 22,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 26,
            opacity: titleIn,
            transform: `translateY(${interpolate(titleIn, [0, 1], [70, 0])}px)`,
          }}
        >
          <span
            style={{
              fontFamily: 'Consolas, monospace',
              fontSize: 30,
              color: CYAN,
              letterSpacing: 8,
            }}
          >
            AI
          </span>
          <span style={{fontSize: 26, color: '#5b6b82'}}>×</span>
          <span
            style={{
              fontSize: 86,
              fontWeight: 700,
              color: '#f4f7fb',
              letterSpacing: 10,
            }}
          >
            REMOTION
          </span>
        </div>

        <div
          style={{
            width: interpolate(titleIn, [0, 1], [0, 140]),
            height: 2,
            background: ACCENT,
          }}
        />

        <div
          style={{
            fontSize: 34,
            color: '#9fb0c8',
            letterSpacing: 6,
            opacity: subtitleIn,
            transform: `translateY(${interpolate(subtitleIn, [0, 1], [26, 0])}px)`,
          }}
        >
          科普视频引擎 · 已就绪
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 72,
          top: 56,
          fontFamily: 'Consolas, monospace',
          fontSize: 20,
          letterSpacing: 4,
          color: 'rgba(159,176,200,0.7)',
        }}
      >
        REMOTION // READY
      </div>

      <div
        style={{
          position: 'absolute',
          right: 72,
          bottom: 56,
          fontFamily: 'Consolas, monospace',
          fontSize: 20,
          letterSpacing: 3,
          color: 'rgba(159,176,200,0.55)',
        }}
      >
        1920×1080 · 30 FPS
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          height: 5,
          width: `${progress}%`,
          background: `linear-gradient(90deg, ${CYAN}, ${ACCENT})`,
        }}
      />
    </AbsoluteFill>
  );
};
