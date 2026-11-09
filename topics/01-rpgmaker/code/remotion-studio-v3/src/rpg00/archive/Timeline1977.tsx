import React from 'react';
import {interpolate, spring, useCurrentFrame} from 'remotion';
import {FPS, clamp} from '../theme';
import {FilmGrain} from './FilmGrain';

const START_YEAR = 1977;
const END_YEAR = 2015;
const LINE_X0 = 260;
const LINE_X1 = 1660;

const MARKERS = [
  {year: 1977, label: 'ASCII 成立', above: true},
  {year: 1988, label: 'Mamirin', above: false},
  {year: 1992, label: 'Dante 98', above: true},
  {year: 1995, label: 'Super Dante', above: false},
  {year: 2004, label: 'RPG Maker XP', above: true},
  {year: 2015, label: 'RPG Maker MV', above: false},
];

const xFor = (year: number) =>
  LINE_X0 + ((year - START_YEAR) / (END_YEAR - START_YEAR)) * (LINE_X1 - LINE_X0);

export const Timeline1977: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [0.25 * FPS, 2.4 * FPS], [0, 1], clamp);
  const bracket = interpolate(frame, [2.45 * FPS, 3.0 * FPS], [0, 1], clamp);
  const fadeOut = interpolate(frame, [3.9 * FPS, 4.35 * FPS], [0, 1], clamp);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'radial-gradient(circle at 50% 52%, #17191d 0%, #0c0d0f 62%, #070809 100%)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: LINE_X0,
          top: 200,
          fontFamily: '"Press Start 2P", monospace',
          fontSize: 22,
          letterSpacing: 6,
          color: 'rgba(206,199,184,0.45)',
        }}
      >
        1977 — 2015
      </div>

      {/* 38 年括号 */}
      <div
        style={{
          position: 'absolute',
          left: LINE_X0,
          top: 328,
          width: (LINE_X1 - LINE_X0) * bracket,
          height: 2,
          background: 'rgba(214,207,190,0.45)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: LINE_X0,
          top: 328,
          width: 2,
          height: 24,
          background: 'rgba(214,207,190,0.45)',
          opacity: bracket,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: LINE_X1 - 2,
          top: 328,
          width: 2,
          height: 24,
          background: 'rgba(214,207,190,0.45)',
          opacity: bracket,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: (LINE_X0 + LINE_X1) / 2,
          top: 288,
          transform: 'translateX(-50%)',
          fontFamily: '"Noto Sans SC", sans-serif',
          fontSize: 24,
          letterSpacing: 6,
          color: 'rgba(226,218,199,0.72)',
          opacity: bracket,
        }}
      >
        38 年
      </div>

      {/* 主时间线 */}
      <div
        style={{
          position: 'absolute',
          left: LINE_X0,
          top: 598,
          width: (LINE_X1 - LINE_X0) * draw,
          height: 2,
          background: 'linear-gradient(90deg, rgba(226,218,199,0.35), #e2dac7)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: LINE_X0 - 4,
          top: 594,
          width: 10,
          height: 10,
          background: '#e2dac7',
          opacity: draw > 0.01 ? 1 : 0,
        }}
      />

      {MARKERS.map((marker, index) => {
        const x = xFor(marker.year);
        const local = frame - (0.4 * FPS + index * 0.4 * FPS);
        const pop = spring({
          frame: Math.max(0, local),
          fps: FPS,
          config: {damping: 12, stiffness: 180},
        });
        const visible = local >= 0;
        const labelY = marker.above ? 528 : 634;
        return (
          <div key={marker.year}>
            <div
              style={{
                position: 'absolute',
                left: x - 7,
                top: 591,
                width: 14,
                height: 14,
                background: '#0c0d0f',
                border: '3px solid #d9d1bd',
                boxSizing: 'border-box',
                transform: `scale(${visible ? pop : 0})`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: x,
                top: marker.above ? 552 : 606,
                width: 1,
                height: 34,
                background: 'rgba(214,207,190,0.3)',
                opacity: visible ? 1 : 0,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: x,
                top: labelY - (marker.above ? 42 : 0),
                transform: 'translateX(-50%)',
                textAlign: 'center',
                opacity: visible ? Math.min(1, pop) : 0,
                whiteSpace: 'nowrap',
              }}
            >
              {marker.above ? (
                <div
                  style={{
                    fontFamily: '"Noto Sans SC", sans-serif',
                    fontSize: 20,
                    letterSpacing: 1,
                    color: 'rgba(214,207,190,0.62)',
                    marginBottom: 6,
                  }}
                >
                  {marker.label}
                </div>
              ) : null}
              <div
                style={{
                  fontFamily: '"Press Start 2P", monospace',
                  fontSize: 27,
                  color: '#ece5d3',
                }}
              >
                {marker.year}
              </div>
              {!marker.above ? (
                <div
                  style={{
                    marginTop: 6,
                    fontFamily: '"Noto Sans SC", sans-serif',
                    fontSize: 20,
                    letterSpacing: 1,
                    color: 'rgba(214,207,190,0.62)',
                  }}
                >
                  {marker.label}
                </div>
              ) : null}
            </div>
          </div>
        );
      })}

      <FilmGrain frame={frame + 360} intensity={0.65} count={140} />
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
