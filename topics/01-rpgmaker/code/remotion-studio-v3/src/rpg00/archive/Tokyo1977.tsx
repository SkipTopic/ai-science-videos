import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {FPS, clamp, hash, sec} from '../theme';
import {FilmGrain} from './FilmGrain';

const BUILDINGS = [
  {x: 0, w: 120, h: 210},
  {x: 118, w: 96, h: 260},
  {x: 212, w: 140, h: 180},
  {x: 350, w: 110, h: 300},
  {x: 458, w: 150, h: 220},
  {x: 606, w: 100, h: 280},
  {x: 704, w: 130, h: 190},
  {x: 832, w: 118, h: 320},
  {x: 948, w: 150, h: 240},
  {x: 1096, w: 96, h: 290},
  {x: 1190, w: 140, h: 210},
  {x: 1328, w: 112, h: 260},
  {x: 1438, w: 102, h: 190},
];

const WindowGrid: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  cols: number;
  rows: number;
}> = ({x, y, w, h, cols, rows}) => {
  const cells = [];
  const cw = w / cols;
  const ch = h / rows;
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      if (hash(row * 31 + col * 17 + x + y) < 0.36) {
        continue;
      }
      cells.push(
        <rect
          key={`${row}-${col}`}
          x={x + col * cw + cw * 0.2}
          y={y + row * ch + ch * 0.22}
          width={cw * 0.6}
          height={ch * 0.44}
          fill="#d7d3c8"
          opacity={0.22 + hash(row * 7 + col * 13 + x) * 0.3}
        />,
      );
    }
  }
  return <g>{cells}</g>;
};

const Person: React.FC<{x: number; y: number; scale?: number; hat?: boolean}> = ({
  x,
  y,
  scale = 1,
  hat,
}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`} fill="#393732">
    <circle cx={0} cy={-46} r={8} />
    {hat ? <rect x={-11} y={-57} width={22} height={5} /> : null}
    <rect x={-8} y={-38} width={16} height={30} rx={3} />
    <rect x={-7} y={-9} width={6} height={24} />
    <rect x={1} y={-9} width={6} height={24} />
    <rect x={-10} y={-34} width={4} height={22} />
    <rect x={6} y={-34} width={4} height={22} />
  </g>
);

const TokyoScene: React.FC = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 1540 820"
    shapeRendering="geometricPrecision"
    style={{display: 'block'}}
  >
    <defs>
      <linearGradient id="tokyo-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#dcd9d0" />
        <stop offset="60%" stopColor="#c2bfb5" />
        <stop offset="100%" stopColor="#a9a69d" />
      </linearGradient>
      <linearGradient id="tokyo-street" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#77746c" />
        <stop offset="100%" stopColor="#4f4d48" />
      </linearGradient>
      <radialGradient id="tokyo-vignette" cx="50%" cy="48%" r="72%">
        <stop offset="0%" stopColor="#000" stopOpacity={0} />
        <stop offset="70%" stopColor="#000" stopOpacity={0.06} />
        <stop offset="100%" stopColor="#000" stopOpacity={0.5} />
      </radialGradient>
      <pattern id="halftone" width="4" height="4" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.65" fill="#1a1917" opacity="0.1" />
      </pattern>
    </defs>

    <rect width="1540" height="820" fill="url(#tokyo-sky)" />

    {BUILDINGS.map((building, index) => {
      const baseY = 560;
      const y = baseY - building.h;
      const tone = ['#8d8a82', '#7c7972', '#6f6c66'][index % 3];
      return (
        <g key={`b-${index}`}>
          <rect x={building.x} y={y} width={building.w} height={building.h} fill={tone} />
          <rect x={building.x} y={y} width={building.w} height={5} fill="#9d9a92" />
          <WindowGrid
            x={building.x + 8}
            y={y + 18}
            w={building.w - 16}
            h={building.h - 34}
            cols={Math.max(2, Math.round(building.w / 34))}
            rows={Math.max(3, Math.round(building.h / 42))}
          />
        </g>
      );
    })}

    {/* 高架铁路 */}
    <rect x={0} y={512} width={1540} height={16} fill="#5a5852" />
    <rect x={0} y={528} width={1540} height={72} fill="#4b4944" />
    {Array.from({length: 13}, (_, index) => (
      <g key={`arch-${index}`}>
        <rect
          x={index * 120 + 18}
          y={548}
          width={84}
          height={52}
          fill="#373632"
        />
        <rect
          x={index * 120 + 28}
          y={558}
          width={64}
          height={42}
          fill="#5e5b55"
        />
      </g>
    ))}
    <rect x={0} y={596} width={1540} height={7} fill="#35342f" />

    {/* 左楼与招牌 */}
    <rect x={-10} y={110} width={360} height={542} fill="#6d6a63" />
    <rect x={-10} y={110} width={360} height={7} fill="#89867d" />
    <WindowGrid x={18} y={140} w={300} h={380} cols={6} rows={9} />
    <rect x={288} y={196} width={54} height={290} fill="#d3cec0" />
    <rect x={292} y={202} width={46} height={278} fill="none" stroke="#4d4a43" strokeWidth="2" />
    {['秋', '叶', '原'].map((char, index) => (
      <text
        key={char}
        x={315}
        y={254 + index * 74}
        textAnchor="middle"
        fontFamily='"Noto Serif SC", serif'
        fontWeight={900}
        fontSize={46}
        fill="#2c2a26"
      >
        {char}
      </text>
    ))}
    <rect x={38} y={596} width={210} height={16} fill="#8e8b82" />
    <rect x={38} y={612} width={210} height={38} fill="#5a5751" />
    {[0, 1, 2, 3, 4].map((index) => (
      <rect
        key={`awning-${index}`}
        x={40 + index * 42}
        y={612}
        width={38}
        height={38}
        fill={index % 2 === 0 ? '#c9c5ba' : '#66635d'}
      />
    ))}

    {/* 右楼与招牌 */}
    <rect x={1190} y={82} width={360} height={570} fill="#5f5c56" />
    <rect x={1190} y={82} width={360} height={7} fill="#77746d" />
    <WindowGrid x={1212} y={120} w={310} h={360} cols={6} rows={8} />
    <rect x={1216} y={188} width={300} height={66} fill="#d8d3c5" />
    <text
      x={1366}
      y={238}
      textAnchor="middle"
      fontFamily='"Press Start 2P", monospace'
      fontSize={38}
      fill="#24221f"
      letterSpacing={4}
    >
      RADIO
    </text>
    <rect x={1248} y={278} width={236} height={54} fill="#b23b32" />
    <text
      x={1366}
      y={316}
      textAnchor="middle"
      fontFamily='"Press Start 2P", monospace'
      fontSize={27}
      fill="#f1ebdd"
      letterSpacing={5}
    >
      ASCII
    </text>
    <rect x={1250} y={500} width={250} height={92} fill="#4b4944" />
    <rect x={1262} y={512} width={226} height={68} fill="#8e8a80" />
    <text
      x={1375}
      y={556}
      textAnchor="middle"
      fontFamily='"Noto Sans SC", sans-serif'
      fontSize={28}
      fill="#2b2925"
      letterSpacing={6}
    >
      电器街
    </text>

    {/* 中景楼 */}
    <rect x={360} y={300} width={300} height={218} fill="#7b7870" />
    <WindowGrid x={376} y={320} w={268} h={180} cols={7} rows={5} />
    <rect x={800} y={278} width={300} height={240} fill="#716e68" />
    <WindowGrid x={816} y={298} w={268} h={200} cols={7} rows={5} />

    {/* 电线杆与电线 */}
    <rect x={512} y={70} width={10} height={700} fill="#3d3b37" />
    <rect x={470} y={132} width={94} height={7} fill="#3d3b37" />
    <rect x={480} y={184} width={74} height={6} fill="#3d3b37" />
    <rect x={1076} y={96} width={10} height={674} fill="#3d3b37" />
    <rect x={1034} y={150} width={94} height={7} fill="#3d3b37" />
    <rect x={1046} y={198} width={70} height={6} fill="#3d3b37" />
    {[0, 1, 2, 3].map((index) => (
      <path
        key={`wire-a-${index}`}
        d={`M520 ${140 + index * 24} Q 800 ${205 + index * 16} 1080 ${160 + index * 22}`}
        fill="none"
        stroke="#3c3a36"
        strokeWidth={2.2}
        opacity={0.8}
      />
    ))}
    {[0, 1, 2].map((index) => (
      <path
        key={`wire-b-${index}`}
        d={`M520 ${148 + index * 22} Q 300 ${250 + index * 18} 40 ${190 + index * 20}`}
        fill="none"
        stroke="#3c3a36"
        strokeWidth={1.8}
        opacity={0.65}
      />
    ))}
    <path
      d="M1080 168 Q 1260 250 1400 210"
      fill="none"
      stroke="#3c3a36"
      strokeWidth={1.8}
      opacity={0.6}
    />

    {/* 街道 */}
    <rect x={0} y={640} width={1540} height={180} fill="url(#tokyo-street)" />
    <rect x={0} y={640} width={1540} height={22} fill="#8b887f" />
    <rect x={0} y={662} width={1540} height={4} fill="#55524c" />
    {Array.from({length: 12}, (_, index) => (
      <rect
        key={`lane-${index}`}
        x={60 + index * 130}
        y={748}
        width={58}
        height={5}
        fill="#d2cdbf"
        opacity={0.55}
      />
    ))}

    {/* 电车与汽车 */}
    <g>
      <rect x={720} y={622} width={250} height={94} rx={8} fill="#55524c" />
      <rect x={734} y={634} width={222} height={36} rx={4} fill="#cbc6b9" opacity={0.55} />
      <rect x={720} y={692} width={250} height={10} fill="#3a3834" />
      <circle cx={760} cy={712} r={12} fill="#2e2c29" />
      <circle cx={930} cy={712} r={12} fill="#2e2c29" />
    </g>
    <g>
      <rect x={300} y={688} width={130} height={44} rx={9} fill="#4a4843" />
      <rect x={314} y={696} width={78} height={22} rx={4} fill="#bbb6aa" opacity={0.5} />
      <circle cx={326} cy={734} r={9} fill="#2c2a27" />
      <circle cx={406} cy={734} r={9} fill="#2c2a27" />
    </g>

    {/* 行人 */}
    <Person x={250} y={730} scale={1.05} hat />
    <Person x={600} y={738} scale={0.95} />
    <Person x={1010} y={732} scale={1.1} hat />
    <Person x={1170} y={742} scale={0.9} />
    <Person x={1450} y={736} scale={1.0} />

    {/* 路灯 */}
    {[410, 860, 1300].map((x) => (
      <g key={`lamp-${x}`}>
        <rect x={x} y={590} width={5} height={120} fill="#3d3b37" />
        <rect x={x - 18} y={584} width={40} height={6} fill="#3d3b37" />
        <circle cx={x + 20} cy={600} r={26} fill="#e7e0ce" opacity={0.16} />
        <circle cx={x + 20} cy={594} r={6} fill="#e7e0ce" opacity={0.7} />
      </g>
    ))}

    <rect width="1540" height="820" fill="url(#halftone)" />
    <rect width="1540" height="820" fill="url(#tokyo-vignette)" />
  </svg>
);

export const Tokyo1977: React.FC = () => {
  const frame = useCurrentFrame();
  const local = frame;
  const scale = interpolate(local, [0, 7.4 * FPS], [1.03, 1.09], clamp);
  const x = interpolate(local, [0, 7.4 * FPS], [-8, 10], clamp);
  const y = interpolate(local, [0, 7.4 * FPS], [2, -6], clamp);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'radial-gradient(circle at 50% 42%, #e2dac8 0%, #cdc4b1 62%, #b3aa98 100%)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(80,70,50,0.035) 0 1px, transparent 1px 3px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 170,
          top: 64,
          width: 1580,
          height: 846,
          transform: 'rotate(-0.7deg)',
          background: '#f4efe3',
          boxShadow: '0 30px 70px rgba(40,30,18,0.45)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 16,
            top: 16,
            width: 1548,
            height: 814,
            overflow: 'hidden',
            background: '#b9b6ad',
            filter: 'grayscale(0.9) sepia(0.12) contrast(1.06)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              transform: `scale(${scale}) translate(${x}px, ${y}px)`,
              transformOrigin: '50% 50%',
            }}
          >
            <TokyoScene />
          </div>
          <div
            style={{
              position: 'absolute',
              right: 34,
              bottom: 30,
              fontFamily: '"Press Start 2P", monospace',
              fontSize: 30,
              color: '#e08a50',
              opacity: 0.95,
              textShadow: '0 0 18px rgba(210,110,60,0.75), 0 2px 8px rgba(0,0,0,0.5)',
              transform: 'rotate(-2deg)',
              letterSpacing: 3,
              background: 'rgba(20,16,12,0.28)',
              padding: '2px 10px',
            }}
          >
            77 5 12
          </div>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 190,
          top: 934,
          display: 'flex',
          alignItems: 'baseline',
          gap: 24,
          color: '#4b463c',
          fontFamily: '"Noto Sans SC", sans-serif',
        }}
      >
        <div style={{width: 42, height: 2, background: '#6b6455'}} />
        <div style={{fontSize: 28, letterSpacing: 2}}>
          1977 年 5 月 · 东京 秋叶原
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          right: 190,
          top: 940,
          fontSize: 18,
          letterSpacing: 2,
          color: '#7d7565',
          fontFamily: '"Noto Sans SC", sans-serif',
        }}
      >
        复原示意
      </div>

      <FilmGrain frame={frame + sec(54.5)} intensity={0.8} count={170} />
    </div>
  );
};
