import React from 'react';
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {FPS, clamp, hash} from '../theme';
import {FilmGrain} from './FilmGrain';
import {Floppy} from './Floppy';

const W = 1740;
const H = 900;

const ShotFrame: React.FC<{
  year: string;
  label: string;
  duration: number;
  children: React.ReactNode;
  drift?: number;
}> = ({year, label, duration, children, drift = 0.04}) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 5], [0, 1], clamp);
  const fadeOut = interpolate(
    frame,
    [Math.max(0, duration - 5), duration],
    [1, 0],
    clamp,
  );
  const zoom = interpolate(frame, [0, duration], [1, 1 + drift], clamp);
  const shift = interpolate(frame, [0, duration], [0, -10], clamp);
  return (
    <AbsoluteFill style={{background: '#07080a', opacity: Math.min(fadeIn, fadeOut)}}>
      <div
        style={{
          position: 'absolute',
          left: 90,
          top: 86,
          width: W,
          height: H,
          overflow: 'hidden',
          background: '#111',
          border: '1px solid rgba(230,220,200,0.32)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.55)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transform: `scale(${zoom}) translateY(${shift}px)`,
            transformOrigin: '50% 50%',
          }}
        >
          {children}
        </div>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 50% 48%, transparent 42%, rgba(0,0,0,0.28) 76%, rgba(0,0,0,0.62) 100%)',
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 120,
          top: 112,
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          padding: '8px 16px',
          background: 'rgba(5,6,8,0.52)',
          border: '1px solid rgba(230,220,200,0.12)',
        }}
      >
        <div
          style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: 20,
            color: '#cfc6b2',
            letterSpacing: 2,
          }}
        >
          {year}
        </div>
        <div style={{width: 52, height: 1, background: 'rgba(207,198,178,0.4)'}} />
        <div
          style={{
            fontFamily: '"Noto Sans SC", sans-serif',
            fontSize: 25,
            letterSpacing: 2,
            color: '#bfb7a5',
          }}
        >
          {label}
        </div>
      </div>
      <FilmGrain frame={frame} intensity={0.65} count={120} />
    </AbsoluteFill>
  );
};

const FloppyShot: React.FC<{duration: number}> = ({duration}) => (
  <ShotFrame year="1988" label="软盘 · 杂志附录" duration={duration} drift={0.05}>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'radial-gradient(circle at 35% 30%, #3a3026 0%, #241c15 52%, #120d09 100%)',
      }}
    />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage:
          'repeating-linear-gradient(0deg, rgba(230,190,140,0.05) 0 2px, transparent 2px 8px)',
      }}
    />
    <div
      style={{
        position: 'absolute',
        left: 120,
        top: 120,
        width: 980,
        height: 700,
        borderRadius: 8,
        background: 'linear-gradient(145deg, #d9cdb2, #b9ab8e)',
        transform: 'rotate(-7deg)',
        boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 36,
          top: 34,
          fontSize: 22,
          letterSpacing: 3,
          color: '#6d6250',
          fontFamily: '"Noto Sans SC", sans-serif',
        }}
      >
        读者投稿 · 附录
      </div>
    </div>
    <div
      style={{
        position: 'absolute',
        left: 380,
        top: 160,
        filter: 'drop-shadow(0 40px 50px rgba(0,0,0,0.55))',
      }}
    >
      <Floppy size={620} rotation={-5} label="1988" sublabel="附录软盘" handwritten="?" />
    </div>
    <div
      style={{
        position: 'absolute',
        left: 1320,
        top: 210,
        width: 6,
        height: 520,
        background: 'rgba(240,220,180,0.08)',
        transform: 'rotate(12deg)',
      }}
    />
  </ShotFrame>
);

const Pc9801: React.FC = () => (
  <svg width="100%" height="100%" viewBox="0 0 1000 760">
    <rect x={120} y={40} width={760} height={520} rx={14} fill="#c8bda1" />
    <rect x={120} y={40} width={760} height={520} rx={14} fill="none" stroke="#91876c" strokeWidth={4} />
    <rect x={168} y={86} width={664} height={420} rx={8} fill="#252822" />
    <rect x={190} y={108} width={620} height={376} rx={4} fill="#0d2b1d" />
    {Array.from({length: 14}, (_, row) =>
      Array.from({length: 24}, (_, col) => (
        <rect
          key={`${row}-${col}`}
          x={202 + col * 25}
          y={120 + row * 25}
          width={22}
          height={22}
          fill={(row * 3 + col) % 7 === 0 ? '#4c9d6a' : '#16402b'}
          opacity={(row * 3 + col) % 7 === 0 ? 0.75 : 0.55}
        />
      )),
    )}
    <rect x={428} y={276} width={44} height={38} fill="#f0d77a" opacity={0.8} />
    <text
      x={500}
      y={470}
      textAnchor="middle"
      fontFamily='"Press Start 2P", monospace'
      fontSize={20}
      fill="#7fe0a2"
      opacity={0.8}
    >
      RPG MAKER
    </text>
    <rect x={878} y={548} width={34} height={10} rx={4} fill="#91876c" />
    <circle cx={952} cy={554} r={8} fill="#b03a30" />
    <text
      x={220}
      y={548}
      fontFamily='"Press Start 2P", monospace'
      fontSize={16}
      fill="#6f6654"
    >
      PC-9801
    </text>
    <rect x={150} y={600} width={700} height={118} rx={8} fill="#bdb294" />
    <rect x={150} y={600} width={700} height={118} rx={8} fill="none" stroke="#91876c" strokeWidth={3} />
    {Array.from({length: 4}, (_, row) => (
      <g key={row}>
        {Array.from({length: 18}, (_, col) => (
          <rect
            key={col}
            x={172 + col * 37}
            y={616 + row * 24}
            width={28}
            height={17}
            rx={2}
            fill="#8f8469"
          />
        ))}
      </g>
    ))}
    <rect x={890} y={640} width={54} height={32} rx={14} fill="#bdb294" />
    <rect x={884} y={676} width={66} height={8} rx={4} fill="#91876c" />
  </svg>
);

const PcShot: React.FC<{duration: number}> = ({duration}) => (
  <ShotFrame year="1992" label="PC-9801 · 320×240" duration={duration} drift={0.05}>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'radial-gradient(circle at 50% 38%, #2b3230 0%, #171b1a 52%, #0a0c0b 100%)',
      }}
    />
    <div
      style={{
        position: 'absolute',
        left: 370,
        top: 80,
        width: 1000,
        height: 760,
        filter: 'drop-shadow(0 40px 70px rgba(0,0,0,0.6))',
      }}
    >
      <Pc9801 />
    </div>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'repeating-linear-gradient(0deg, rgba(120,220,160,0.05) 0 1px, transparent 1px 4px)',
        opacity: 0.55,
      }}
    />
    <div
      style={{
        position: 'absolute',
        left: 170,
        top: 140,
        width: 240,
        height: 2,
        background: 'rgba(255,255,255,0.12)',
      }}
    />
  </ShotFrame>
);

const MAP_COLS = 20;
const MAP_ROWS = 10;
const TILE = 60;
const MAP_X = 420;
const MAP_Y = 150;

const targetCells: Array<[number, number]> = (() => {
  const cells: Array<[number, number]> = [];
  for (let y = 2; y <= 8; y += 1) {
    for (let x = 4; x <= 16; x += 1) {
      const dx = x - 10;
      const dy = y - 5;
      if ((dx * dx) / 34 + (dy * dy) / 9 <= 1) {
        cells.push([x, y]);
      }
    }
  }
  return cells;
})();

const MapShot: React.FC<{duration: number}> = ({duration}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, duration], [0, 1], clamp);
  const painted = Math.floor(progress * targetCells.length);
  const cursor = targetCells[Math.min(painted, targetCells.length - 1)] ?? [11, 6];
  return (
    <ShotFrame year="1995" label="地图编辑器 · 16×16" duration={duration} drift={0.03}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#14171b',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: MAP_X,
          top: MAP_Y,
          width: MAP_COLS * TILE,
          height: MAP_ROWS * TILE,
          background: '#1c2024',
          boxShadow: '0 0 0 2px #2b3036',
        }}
      >
        {Array.from({length: MAP_ROWS}, (_, y) =>
          Array.from({length: MAP_COLS}, (_, x) => {
            const index = targetCells.findIndex(
              ([tx, ty]) => tx === x && ty === y,
            );
            const isPainted = index >= 0 && index < painted;
            const tone = hash(x * 19 + y * 37);
            return (
              <div
                key={`${x}-${y}`}
                style={{
                  position: 'absolute',
                  left: x * TILE,
                  top: y * TILE,
                  width: TILE,
                  height: TILE,
                  background: isPainted
                    ? tone > 0.5
                      ? '#2d4a33'
                      : '#29452f'
                    : tone > 0.5
                      ? '#20252a'
                      : '#1e2328',
                  boxShadow:
                    'inset -1px -1px 0 rgba(0,0,0,0.45), inset 1px 1px 0 rgba(255,255,255,0.02)',
                }}
              >
                {isPainted ? (
                  <>
                    <div
                      style={{
                        position: 'absolute',
                        left: 14,
                        top: 34,
                        width: 2,
                        height: 16,
                        background: '#4f7f55',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        left: 28,
                        top: 28,
                        width: 2,
                        height: 22,
                        background: '#5d925f',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        left: 42,
                        top: 38,
                        width: 2,
                        height: 13,
                        background: '#4f7f55',
                      }}
                    />
                  </>
                ) : null}
              </div>
            );
          }),
        )}
        <div
          style={{
            position: 'absolute',
            left: cursor[0] * TILE,
            top: cursor[1] * TILE,
            width: TILE * 2,
            height: TILE * 2,
            border: '3px solid #d34a3a',
            boxSizing: 'border-box',
            boxShadow: '0 0 18px rgba(211,74,58,0.45)',
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 70,
          top: 150,
          width: 300,
          height: 430,
          background: '#22272c',
          border: '2px solid #3c434a',
          padding: 18,
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            fontFamily: '"Noto Sans SC", sans-serif',
            fontSize: 18,
            color: '#aab3ba',
            marginBottom: 14,
          }}
        >
          图块素材
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 56px)',
            gap: 8,
          }}
        >
          {['#2d4a33', '#4a4036', '#24506b', '#6b4a2b', '#5b5b57', '#8a6238', '#2f5a38', '#c7b06a'].map(
            (color, index) => (
              <div
                key={color}
                style={{
                  width: 56,
                  height: 56,
                  background: color,
                  outline: index === 0 ? '2px solid #d34a3a' : '1px solid #111',
                }}
              />
            ),
          )}
        </div>
        <div
          style={{
            marginTop: 18,
            fontFamily: '"Noto Sans SC", sans-serif',
            fontSize: 16,
            color: '#7f8991',
            lineHeight: 1.7,
          }}
        >
          图块 16×16
          <br />
          缩放 300%
        </div>
      </div>
    </ShotFrame>
  );
};

const CorridorShot: React.FC<{duration: number}> = ({duration}) => {
  const frame = useCurrentFrame();
  const glow = interpolate(
    frame,
    [0, duration * 0.5, duration],
    [0.55, 0.9, 0.6],
    clamp,
  );
  return (
    <ShotFrame year="2004" label="一条走廊" duration={duration} drift={0.06}>
      <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`}>
        <defs>
          <radialGradient id="corridor-glow" cx="50%" cy="52%" r="34%">
            <stop offset="0%" stopColor="#f4dcae" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#f4dcae" stopOpacity={0} />
          </radialGradient>
          <linearGradient id="corridor-floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2c2b27" />
            <stop offset="100%" stopColor="#0c0c0b" />
          </linearGradient>
        </defs>
        <rect width={W} height={H} fill="#060607" />
        <polygon points="0,900 1740,900 1200,520 540,520" fill="url(#corridor-floor)" />
        <polygon points="0,0 1740,0 1200,380 540,380" fill="#121315" />
        <polygon points="0,0 540,380 540,520 0,900" fill="#1a1b1e" />
        <polygon points="1740,0 1200,380 1200,520 1740,900" fill="#16171a" />
        <rect x={540} y={380} width={660} height={140} fill="#232427" />
        <rect x={790} y={396} width={160} height={124} fill="#2f2a24" />
        <rect x={798} y={404} width={144} height={108} fill="#3d362d" />
        <rect x={806} y={412} width={128} height={92} fill="#1e1a16" />
        <rect x={860} y={428} width={20} height={10} fill="#a88b55" opacity={0.8} />
        <rect x={786} y={390} width={168} height={6} fill="#5a5143" />
        <ellipse cx={870} cy={520} rx={180} ry={26} fill="#f4dcae" opacity={0.18 * glow} />
        <ellipse cx={870} cy={300} rx={300} ry={230} fill="url(#corridor-glow)" opacity={glow} />
        {[0, 1, 2, 3].map((index) => (
          <rect
            key={index}
            x={0}
            y={140 + index * 150}
            width={W}
            height={1}
            fill="rgba(190,200,210,0.05)"
          />
        ))}
        <path d="M0 0 L540 380" stroke="rgba(255,255,255,0.04)" strokeWidth={2} />
        <path d="M1740 0 L1200 380" stroke="rgba(255,255,255,0.04)" strokeWidth={2} />
        <path d="M0 900 L540 520" stroke="rgba(255,255,255,0.035)" strokeWidth={2} />
        <path d="M1740 900 L1200 520" stroke="rgba(255,255,255,0.035)" strokeWidth={2} />
      </svg>
    </ShotFrame>
  );
};

const EventShot: React.FC<{duration: number}> = ({duration}) => {
  const frame = useCurrentFrame();
  const blink = Math.floor(frame / 16) % 2 === 0;
  return (
    <ShotFrame year="2000" label="事件 · 开关" duration={duration} drift={0.025}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 45% 40%, #1a2230 0%, #0d1219 58%, #06080b 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 260,
          top: 120,
          width: 1220,
          height: 560,
          background: '#0d1420',
          border: '2px solid #2b3a52',
          boxShadow: '0 0 60px rgba(70,120,180,0.18)',
          fontFamily: '"Noto Sans SC", sans-serif',
          color: '#c6d2e2',
        }}
      >
        <div
          style={{
            height: 52,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 22,
            fontSize: 20,
            color: '#8fa6c4',
            borderBottom: '1px solid #263449',
            letterSpacing: 2,
          }}
        >
          事件编辑器 · 开关
        </div>
        {[
          ['0001', '钥匙', 'OFF', false],
          ['0002', '见到小鲸鱼', 'ON', true],
          ['0003', '宝箱', 'ON', false],
          ['0004', '门', 'ON', false],
        ].map(([id, name, state, active]) => (
          <div
            key={String(id)}
            style={{
              height: 78,
              display: 'grid',
              gridTemplateColumns: '140px 1fr 140px',
              alignItems: 'center',
              paddingLeft: 26,
              paddingRight: 26,
              fontSize: 28,
              background: active ? 'rgba(80,130,200,0.18)' : 'transparent',
              borderBottom: '1px solid rgba(90,120,160,0.13)',
            }}
          >
            <span style={{fontFamily: '"Press Start 2P", monospace', fontSize: 20, color: '#7f97b5'}}>
              {id}
            </span>
            <span>{name}</span>
            <span
              style={{
                color: state === 'ON' ? '#7fd9a0' : '#9aa6b4',
                letterSpacing: 2,
              }}
            >
              {state}
            </span>
          </div>
        ))}
        <div
          style={{
            padding: '26px 26px',
            fontSize: 22,
            color: '#8ba1bb',
            lineHeight: 1.8,
          }}
        >
          条件：开关 0001 为 ON
          <br />
          指令：暂时消除本事件
        </div>
        <div
          style={{
            position: 'absolute',
            left: 790,
            top: 526,
            width: 16,
            height: 34,
            background: '#d8e4f4',
            opacity: blink ? 0.9 : 0,
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'repeating-linear-gradient(0deg, rgba(150,200,255,0.035) 0 1px, transparent 1px 4px)',
        }}
      />
    </ShotFrame>
  );
};

const BlankShot: React.FC<{duration: number}> = ({duration}) => {
  const frame = useCurrentFrame();
  const blink = Math.floor(frame / 20) % 2 === 0;
  const fadeOut = interpolate(
    frame,
    [Math.max(0, duration - 26), duration],
    [0, 1],
    clamp,
  );
  return (
    <ShotFrame year="20XX" label="新建工程" duration={duration} drift={0.02}>
      <div style={{position: 'absolute', inset: 0, background: '#101317'}} />
      <div
        style={{
          position: 'absolute',
          left: 180,
          top: 90,
          width: 1380,
          height: 720,
          background: '#171b20',
          border: '2px solid #2d343c',
        }}
      >
        {Array.from({length: 12}, (_, y) => (
          <div key={y} style={{display: 'flex'}}>
            {Array.from({length: 23}, (_, x) => (
              <div
                key={x}
                style={{
                  width: 60,
                  height: 60,
                  boxSizing: 'border-box',
                  borderRight: '1px solid rgba(255,255,255,0.035)',
                  borderBottom: '1px solid rgba(255,255,255,0.035)',
                }}
              />
            ))}
          </div>
        ))}
        <div
          style={{
            position: 'absolute',
            left: 720,
            top: 360,
            width: 12,
            height: 26,
            background: '#e8e2d4',
            opacity: blink ? 0.9 : 0,
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 184,
          top: 830,
          fontFamily: '"Noto Sans SC", sans-serif',
          fontSize: 20,
          letterSpacing: 2,
          color: '#717a84',
        }}
      >
        地图001 · 20 × 15 · 空白
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#000',
          opacity: fadeOut,
        }}
      />
    </ShotFrame>
  );
};

export const Montage: React.FC = () => {
  const start = 0;
  return (
    <>
      <Sequence from={start} durationInFrames={51}>
        <FloppyShot duration={51} />
      </Sequence>
      <Sequence from={start + 51} durationInFrames={51}>
        <PcShot duration={51} />
      </Sequence>
      <Sequence from={start + 102} durationInFrames={51}>
        <MapShot duration={51} />
      </Sequence>
      <Sequence from={start + 153} durationInFrames={51}>
        <CorridorShot duration={51} />
      </Sequence>
      <Sequence from={start + 204} durationInFrames={51}>
        <EventShot duration={51} />
      </Sequence>
      <Sequence from={start + 255} durationInFrames={63}>
        <BlankShot duration={63} />
      </Sequence>
    </>
  );
};
