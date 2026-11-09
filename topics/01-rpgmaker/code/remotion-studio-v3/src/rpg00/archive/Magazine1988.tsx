import React from 'react';
import {interpolate, spring, useCurrentFrame} from 'remotion';
import {FPS, clamp} from '../theme';
import {FilmGrain} from './FilmGrain';
import {Floppy} from './Floppy';

const CoverComputer: React.FC = () => (
  <svg width="100%" height="100%" viewBox="0 0 380 330">
    <rect x={18} y={10} width={344} height={250} rx={10} fill="#cabf9f" />
    <rect x={18} y={10} width={344} height={250} rx={10} fill="none" stroke="#8f8465" strokeWidth={3} />
    <rect x={40} y={34} width={300} height={196} rx={6} fill="#22251f" />
    <rect x={52} y={46} width={276} height={172} rx={3} fill="#0d2a1c" />
    <rect x={52} y={46} width={276} height={172} rx={3} fill="url(#crt)" opacity={0.4} />
    <defs>
      <linearGradient id="crt" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7fe0a2" stopOpacity={0.35} />
        <stop offset="100%" stopColor="#7fe0a2" stopOpacity={0} />
      </linearGradient>
    </defs>
    {Array.from({length: 9}, (_, row) =>
      Array.from({length: 14}, (_, col) => (
        <rect
          key={`${row}-${col}`}
          x={60 + col * 19}
          y={54 + row * 18}
          width={16}
          height={15}
          fill={(row + col) % 5 === 0 ? '#3f8a5c' : '#163d29'}
          opacity={(row + col) % 5 === 0 ? 0.8 : 0.55}
        />
      )),
    )}
    <rect x={194} y={198} width={20} height={16} fill="#f0d77a" opacity={0.75} />
    <text
      x={190}
      y={230}
      textAnchor="middle"
      fontFamily='"Press Start 2P", monospace'
      fontSize={9}
      fill="#7fe0a2"
      opacity={0.85}
    >
      RPG MAKER
    </text>
    <rect x={292} y={262} width={26} height={7} rx={3} fill="#8f8465" />
    <circle cx={330} cy={266} r={5} fill="#b03a30" />
    <rect x={56} y={270} width={268} height={46} rx={5} fill="#bdb293" />
    <rect x={56} y={270} width={268} height={46} rx={5} fill="none" stroke="#8f8465" strokeWidth={2} />
    {Array.from({length: 3}, (_, row) => (
      <g key={row}>
        {Array.from({length: 13}, (_, col) => (
          <rect
            key={col}
            x={66 + col * 19}
            y={278 + row * 12}
            width={14}
            height={9}
            fill="#8f8465"
            rx={1}
          />
        ))}
      </g>
    ))}
  </svg>
);

export const Magazine1988: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 4.8 * FPS], [1.0, 1.04], clamp);
  const floppyIn = spring({
    frame: Math.max(0, frame - 1.6 * FPS),
    fps: FPS,
    config: {damping: 13, stiffness: 90, mass: 0.9},
  });
  const floppyX = interpolate(floppyIn, [0, 1], [560, 0]);
  const floppyRotate = interpolate(floppyIn, [0, 1], [16, 7]);
  const landPulse = interpolate(
    frame,
    [1.6 * FPS + 18, 1.6 * FPS + 24, 1.6 * FPS + 42],
    [0, 1, 0],
    clamp,
  );
  const fadeOut = interpolate(frame, [4.4 * FPS, 4.8 * FPS], [0, 1], clamp);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'radial-gradient(circle at 48% 40%, #5c4330 0%, #3b2a1e 55%, #22170f 100%)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(255,220,170,0.045) 0 2px, transparent 2px 7px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${zoom})`,
          transformOrigin: '48% 48%',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 392,
            top: 38,
            width: 840,
            height: 1006,
            transform: 'rotate(-2.4deg)',
            background: 'linear-gradient(160deg, #eee5cf 0%, #ded2b5 62%, #c9bb9b 100%)',
            boxShadow: '0 40px 90px rgba(0,0,0,0.6)',
            border: '2px solid #b3a583',
            padding: '42px 52px',
            boxSizing: 'border-box',
            color: '#2a2822',
          }}
        >
          <div
            style={{
              fontFamily: '"Noto Serif SC", serif',
              fontWeight: 900,
              fontSize: 92,
              letterSpacing: 4,
              color: '#a9372e',
              lineHeight: 1.05,
            }}
          >
            月刊 ASCII
          </div>
          <div
            style={{
              height: 3,
              background: '#2a2822',
              marginTop: 14,
            }}
          />
          <div
            style={{
              height: 1,
              background: '#2a2822',
              marginTop: 4,
              marginBottom: 12,
            }}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontFamily: '"Noto Sans SC", sans-serif',
              fontSize: 26,
              letterSpacing: 3,
            }}
          >
            <span>1988 年 6 月号</span>
            <span>680 日元</span>
          </div>

          <div
            style={{
              marginTop: 22,
              height: 330,
              display: 'flex',
              gap: 18,
            }}
          >
            <div style={{width: 380, height: 330, flexShrink: 0}}>
              <CoverComputer />
            </div>
            <div
              style={{
                flex: 1,
                fontFamily: '"Noto Sans SC", sans-serif',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                paddingTop: 14,
              }}
            >
              <div style={{fontSize: 38, fontWeight: 700, lineHeight: 1.3}}>
                个人电脑
                <br />
                特集
              </div>
              <div style={{fontSize: 22, color: '#4a463d', lineHeight: 1.6}}>
                从硬件到软件
                <br />
                新时代的创作工具
              </div>
              <div
                style={{
                  marginTop: 10,
                  fontSize: 16,
                  color: '#6a6353',
                  letterSpacing: 1,
                  lineHeight: 1.7,
                }}
              >
                PC-9801 / MSX / BASIC
                <br />
                游戏制作入门
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: 26,
              background: '#a9372e',
              color: '#f4ead4',
              padding: '14px 20px',
              fontFamily: '"Noto Sans SC", sans-serif',
              fontSize: 30,
              letterSpacing: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>附录：3.5 英寸软盘</span>
            <span style={{fontSize: 18, opacity: 0.85}}>读者投稿程序</span>
          </div>

          <div
            style={{
              marginTop: 18,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <div style={{display: 'flex', gap: 3}}>
              {Array.from({length: 34}, (_, index) => (
                <div
                  key={index}
                  style={{
                    width: index % 4 === 0 ? 4 : 2,
                    height: 54,
                    background: '#2a2822',
                    opacity: index % 3 === 0 ? 1 : 0.7,
                  }}
                />
              ))}
            </div>
            <div
              style={{
                fontFamily: '"Noto Sans SC", sans-serif',
                fontSize: 14,
                color: '#7a7260',
                letterSpacing: 1,
              }}
            >
              复原示意
            </div>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            left: 1034,
            top: 594,
            width: 380,
            height: 380,
            transform: `translateX(${floppyX}px) rotate(${floppyRotate}deg)`,
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 20,
              top: 30,
              width: 360,
              height: 360,
              background: 'rgba(0,0,0,0.4)',
              filter: 'blur(22px)',
              borderRadius: 18,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: -18,
              top: -18,
              width: 400,
              height: 400,
              borderRadius: 6,
              background:
                'linear-gradient(160deg, rgba(240,232,210,0.95), rgba(200,188,160,0.9))',
              transform: 'rotate(-4deg)',
              boxShadow: '0 10px 24px rgba(0,0,0,0.35)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 12,
              top: 6,
              width: 360,
              height: 360,
            }}
          >
            <Floppy size={360} rotation={0} label="1988" sublabel="附录软盘" handwritten="?" />
          </div>
          <div
            style={{
              position: 'absolute',
              left: 20,
              top: 20,
              width: 340,
              height: 340,
              borderRadius: 20,
              border: '3px solid rgba(255,240,200,0.9)',
              transform: `scale(${1 + landPulse * 0.06})`,
              opacity: landPulse * 0.8,
            }}
          />
        </div>
      </div>

      <FilmGrain frame={frame + 120} intensity={0.6} count={150} />
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
