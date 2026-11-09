import React from 'react';
import {C, FPS, PIXEL, SANS, hash} from './theme';
import {useSceneFrame} from './sceneClock';

const W = 320;
const H = 180;

export const PixelBox: React.FC<{
  children: React.ReactNode;
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  label?: string;
  caption?: string;
  glow?: number;
  bare?: boolean;
}> = ({
  children,
  left = 0,
  top = 0,
  width = 1920,
  height = 1080,
  label,
  caption,
  glow = 0.4,
  bare = false,
}) => (
  <div
    style={{
      position: 'absolute',
      left,
      top,
      width,
      height,
      background: '#050607',
      overflow: 'hidden',
      boxShadow: bare ? undefined : '0 0 120px rgba(90,120,140,0.16)',
    }}
  >
    <div
      style={{
        position: 'absolute',
        inset: bare ? 0 : 26,
        background: '#000',
        border: bare ? undefined : '1px solid rgba(236,231,218,0.16)',
        overflow: 'hidden',
      }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height="100%"
        shapeRendering="crispEdges"
        preserveAspectRatio="xMidYMid slice"
        style={{display: 'block', imageRendering: 'pixelated'}}
      >
        {children}
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'repeating-linear-gradient(0deg, rgba(0,0,0,0.26) 0px, rgba(0,0,0,0.26) 1px, transparent 1px, transparent 4px)',
          opacity: 0.55,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          boxShadow: `inset 0 0 ${80 + glow * 160}px rgba(0,0,0,0.8)`,
          pointerEvents: 'none',
        }}
      />
    </div>
    {label ? (
      <div
        style={{
          position: 'absolute',
          left: 52,
          top: 40,
          fontFamily: PIXEL,
          fontSize: 13,
          letterSpacing: 2,
          color: 'rgba(236,231,218,0.6)',
        }}
      >
        {label}
      </div>
    ) : null}
    {caption ? (
      <div
        style={{
          position: 'absolute',
          left: 52,
          bottom: 34,
          fontFamily: SANS,
          fontSize: 18,
          letterSpacing: 2,
          color: 'rgba(236,231,218,0.45)',
        }}
      >
        {caption}
      </div>
    ) : null}
  </div>
);

const R: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  f?: string;
  o?: number;
  opacity?: number | string;
}> = ({x, y, w, h, f, o = 1, opacity}) => (
  <rect
    x={x}
    y={y}
    width={w}
    height={h}
    fill={f}
    opacity={opacity ?? o}
  />
);

const Knight: React.FC<{x: number; y: number; scale?: number; fallen?: boolean}> = ({
  x,
  y,
  scale = 1,
  fallen = false,
}) => (
  <g transform={`translate(${x} ${y}) scale(${scale}) ${fallen ? 'rotate(-84) translate(-8 10)' : ''}`}>
    <R x={5} y={0} w={6} h={3} f="#5a3b25" />
    <R x={4} y={2} w={8} h={3} f="#d8b08a" />
    <R x={4} y={2} w={8} h={1} f="#3a2a1c" />
    <R x={3} y={5} w={10} h={6} f="#294a86" />
    <R x={3} y={5} w={2} h={6} f="#1d3563" />
    <R x={8} y={5} w={5} h={6} f="#365b9b" />
    <R x={2} y={11} w={12} h={2} f="#a83a32" />
    <R x={4} y={11} w={8} h={1} f="#d05a4b" />
    <R x={4} y={13} w={3} h={3} f="#20242c" />
    <R x={9} y={13} w={3} h={3} f="#20242c" />
    <R x={3} y={16} w={4} h={1} f="#151820" />
    <R x={9} y={16} w={4} h={1} f="#151820" />
  </g>
);

const Whale: React.FC<{x: number; y: number; scale?: number}> = ({x, y, scale = 1}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <R x={2} y={3} w={12} h={9} f="#3f7fb5" />
    <R x={1} y={5} w={14} h={5} f="#4a8fc5" />
    <R x={3} y={9} w={9} h={5} f="#bfe3ee" />
    <R x={4} y={10} w={7} h={3} f="#dff2f6" />
    <R x={14} y={4} w={2} h={3} f="#2b5f90" />
    <R x={13} y={2} w={3} h={2} f="#2b5f90" />
    <R x={0} y={7} w={2} h={3} f="#2b5f90" />
    <R x={4} y={5} w={1} h={2} f="#f2f2e8" />
    <R x={5} y={5} w={1} h={1} f="#14202a" />
    <R x={3} y={12} w={2} h={1} f="#f0a6b2" />
    <R x={11} y={12} w={2} h={1} f="#f0a6b2" />
  </g>
);

const Girl: React.FC<{
  x: number;
  y: number;
  scale?: number;
  dress?: string;
  hair?: string;
  eyes?: string;
}> = ({x, y, scale = 1, dress = '#d8d3c6', hair = '#2a2420', eyes = '#141414'}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <R x={3} y={0} w={7} h={7} f={hair} />
    <R x={4} y={3} w={5} h={4} f="#dfb894" />
    <R x={4} y={0} w={5} h={2} f={hair} />
    <R x={5} y={5} w={1} h={1} f={eyes} />
    <R x={7} y={5} w={1} h={1} f={eyes} />
    <R x={3} y={7} w={7} h={7} f={dress} />
    <R x={4} y={14} w={2} h={2} f="#d8b08a" />
    <R x={7} y={14} w={2} h={2} f="#d8b08a" />
    <R x={3} y={16} w={3} h={1} f="#2b2620" />
    <R x={7} y={16} w={3} h={1} f="#2b2620" />
  </g>
);

const Dialog: React.FC<{text: string; name?: string; left?: number}> = ({
  text,
  name,
  left = 12,
}) => (
  <g>
    <R x={left} y={142} w={296} h={30} f="#12204f" />
    <R x={left} y={142} w={296} h={30} f="#2e4b95" o={0.5} />
    <R x={left} y={142} w={296} h={1} f="#e8e2d4" />
    <R x={left} y={171} w={296} h={1} f="#e8e2d4" />
    <R x={left} y={142} w={1} h={30} f="#e8e2d4" />
    <R x={left + 295} y={142} w={1} h={30} f="#e8e2d4" />
    {name ? (
      <g>
        <R x={left + 10} y={134} w={54} h={10} f="#12204f" />
        <R x={left + 10} y={134} w={54} h={1} f="#e8e2d4" />
        <text x={left + 16} y={142} fontFamily={SANS} fontSize={7.4} fill="#ece7da">
          {name}
        </text>
      </g>
    ) : null}
    <text x={left + 16} y={162} fontFamily={SANS} fontSize={10.5} fill="#f4f0e5" letterSpacing="0.4">
      {text}
    </text>
  </g>
);

const tileGrass = (x: number, y: number, i: number) => (
  <g key={`${x}-${y}`}>
    <R x={x * 16} y={y * 16} w={16} h={16} f={i % 3 === 0 ? '#3d6740' : '#345d39'} />
    {hash(x * 71 + y * 33) > 0.5 ? (
      <R x={x * 16 + 4 + Math.floor(hash(i) * 6)} y={y * 16 + 6} w={1} h={4} f="#527f4c" o={0.7} />
    ) : null}
    {hash(x * 17 + y * 53) > 0.74 ? (
      <R x={x * 16 + 9} y={y * 16 + 10} w={1} h={1} f="#c7b06a" o={0.8} />
    ) : null}
  </g>
);

export const DefaultRPG: React.FC = () => {
  const frame = useSceneFrame();
  const bob = Math.floor(frame / 15) % 2;
  return (
    <PixelBox label="RPG MAKER 2000 / 默认素材复原" caption="蓝头发的骑士、草地、蓝底白字的对话框">
      <R x={0} y={0} w={W} h={H} f="#2a4a30" />
      {Array.from({length: 20}, (_, row) =>
        Array.from({length: 20}, (_, col) => tileGrass(col, row, row * 20 + col)),
      )}
      <R x={0} y={0} w={W} h={26} f="#1e3a25" />
      <R x={0} y={26} w={W} h={2} f="#162b1c" />
      <R x={52} y={132} w={168} h={28} f="#9c7a50" />
      <R x={58} y={136} w={156} h={20} f="#b89360" />
      <R x={210} y={94} w={42} h={66} f="#9c7a50" />
      <R x={214} y={98} w={34} h={58} f="#b89360" />
      <g>
        <R x={16} y={62} w={30} h={44} f="#241c14" />
        <R x={12} y={52} w={38} h={20} f="#2f5c33" />
        <R x={18} y={44} w={26} h={14} f="#3b6c3b" />
        <R x={24} y={36} w={16} h={10} f="#477c46" />
        <R x={28} y={72} w={6} h={26} f="#4a3522" />
      </g>
      <g>
        <R x={272} y={58} w={34} h={50} f="#241c14" />
        <R x={266} y={46} w={44} h={24} f="#2f5c33" />
        <R x={276} y={34} w={26} h={16} f="#3b6c3b" />
        <R x={282} y={68} w={8} h={30} f="#4a3522" />
      </g>
      <g>
        <R x={196} y={118} w={70} h={34} f="#284f5f" />
        <R x={200} y={122} w={62} h={6} f="#3f7080" o={0.7} />
        <R x={204} y={130} w={30} h={1} f="#7fa8a8" o={0.6} />
        <R x={238} y={136} w={20} h={1} f="#7fa8a8" o={0.4} />
      </g>
      {Array.from({length: 5}, (_, index) => (
        <g key={index}>
          <R x={40 + index * 26} y={120 + (index % 2) * 10} w={1} h={4} f="#5f8d55" />
          <R x={43 + index * 26} y={118 + (index % 2) * 10} w={1} h={6} f="#6f9d63" />
        </g>
      ))}
      <Knight x={186} y={64 + bob} />
      <Dialog name="Alex" text="……" />
    </PixelBox>
  );
};

export const Mamirin: React.FC = () => {
  const frame = useSceneFrame();
  const cursor = Math.floor(frame / 18) % 4;
  return (
    <PixelBox glow={0.6}>
      <R x={0} y={0} w={W} h={H} f="#08120b" />
      <R x={0} y={0} w={W} h={14} f="#12351d" />
      <text x={8} y={10} fontFamily={PIXEL} fontSize={6} fill="#9bd39d">
        MAMIRIN
      </text>
      <R x={8} y={20} w={206} h={132} f="#0a1c10" />
      {Array.from({length: 13}, (_, row) =>
        Array.from({length: 26}, (_, col) => {
          const on = hash(row * 31 + col * 17) > 0.78;
          return (
            <g key={`${row}-${col}`}>
              <R x={12 + col * 7.6} y={24 + row * 9.6} w={7} h={9} f={on ? '#1d5a2e' : '#0e2a18'} />
              {on ? <R x={14 + col * 7.6} y={27 + row * 9.6} w={3} h={3} f="#5cae68" /> : null}
            </g>
          );
        }),
      )}
      <R x={12 + 10 * 7.6} y={24 + 7 * 9.6} w={7} h={9} f="#c7b06a" />
      <R x={12 + 14 * 7.6} y={24 + 5 * 9.6} w={7} h={9} f="#7fb7d8" />
      <R x={220} y={20} w={92} h={92} f="#0a1c10" />
      {['つくる', 'あそぶ', 'なおす', 'おわる'].map((item, index) => (
        <g key={item}>
          <R
            x={226}
            y={26 + index * 18}
            w={80}
            h={14}
            f={cursor === index ? '#285f35' : '#0e2a18'}
          />
          <text x={232} y={36 + index * 18} fontFamily={SANS} fontSize={7.5} fill={cursor === index ? '#e8f3dc' : '#8fbf92'}>
            {item}
          </text>
        </g>
      ))}
      <R x={220} y={118} w={92} h={34} f="#0a1c10" />
      <text x={226} y={130} fontFamily={SANS} fontSize={6.4} fill="#6f9f72">
        作者
      </text>
      <R x={226} y={136} w={66} h={1} f="#6f9f72" />
      <text x={226} y={146} fontFamily={SANS} fontSize={5.8} fill="#4d7350">
        （空栏）
      </text>
      <R x={8} y={158} w={304} h={14} f="#12351d" />
      <text x={12} y={168} fontFamily={SANS} fontSize={6.4} fill="#7fae83">
        1988 / 月刊 ASCII 附录软盘
      </text>
      <rect x={0} y={0} width={W} height={H} fill="#80c98a" opacity={0.025} />
    </PixelBox>
  );
};

export const CorpseParty: React.FC = () => {
  const frame = useSceneFrame();
  return (
    <PixelBox label="CORPSE PARTY / 1996" caption="PC-98 / 走廊复原示意" glow={0.7}>
      <R x={0} y={0} w={W} h={H} f="#08080a" />
      <R x={0} y={54} w={W} h={96} f="#1c1a1c" />
      <R x={0} y={54} w={W} h={4} f="#2b282a" />
      <R x={0} y={146} w={W} h={34} f="#141214" />
      {Array.from({length: 8}, (_, index) => (
        <g key={index}>
          <R x={6 + index * 40} y={60} w={28} h={72} f="#242124" />
          <R x={9 + index * 40} y={64} w={22} h={64} f="#131113" />
          <R x={20 + index * 40} y={92} w={3} h={6} f="#55504e" />
        </g>
      ))}
      <g fill="#7d2428" opacity="0.7">
        <path d="M212 132 L236 120 L252 138 L228 150 Z" />
        <path d="M120 152 L146 146 L158 160 L132 166 Z" />
        <path d="M60 110 L80 104 L88 116 L66 120 Z" />
      </g>
      <g>
        <R x={262} y={70} w={30} h={78} f="#2c2424" />
        <R x={266} y={74} w={22} h={70} f="#171313" />
        <R x={268} y={88} w={2} h={20} f="#bfb5a4" opacity="0.3" />
      </g>
      <g>
        <R x={150} y={104} w={22} h={44} f="#1a1518" />
        <R x={152} y={96} w={18} h={12} f="#c9b5a3" />
        <R x={154} y={98} w={14} h={8} f="#2a2220" />
        <R x={154} y={106} w={14} h={2} f="#2a2220" />
        <R x={156} y={96} w={2} h={4} f="#b33a2f" />
        <R x={153} y={120} w={16} h={28} f="#2f2528" />
      </g>
      <g opacity={0.6 + 0.05 * Math.sin(frame / 13)}>
        <path d="M168 120 L300 40 L320 180 L190 180 Z" fill="#e6dcc2" opacity="0.05" />
        <path d="M174 128 L270 74 L292 180 L196 180 Z" fill="#e6dcc2" opacity="0.06" />
      </g>
      <R x={0} y={0} w={W} h={H} f="#1a0708" o={0.16} />
    </PixelBox>
  );
};

export const DreamBedroom: React.FC<{construct?: number; label?: string; caption?: string; width?: number; height?: number}> = ({construct = 1, label = 'DREAM DIARY / 2004', caption = '女孩的房间 / 复原示意', width = 1920, height = 1080}) => {
  const frame = useSceneFrame();
  const breath = Math.sin(frame / 38) * 0.7;
  return (
    <PixelBox label={label} caption={caption} glow={0.5} width={width} height={height}>
      <R x={0} y={0} w={W} h={H} f="#181321" />
      <R x={0} y={18} w={W} h={118} f="#292236" />
      <R x={0} y={136} w={W} h={44} f="#1d1826" />
      <R x={0} y={136} w={W} h={2} f="#403552" />
      <R x={16} y={34} w={72} h={94} f="#3a3048" opacity={construct} />
      <R x={20} y={38} w={64} h={86} f="#211a2c" opacity={construct} />
      <R x={26} y={44} w={52} h={42} f="#4a5b78" opacity={0.35 * construct} />
      <R x={60} y={46} w={18} h={36} f="#c9b988" opacity={0.3 * construct} />
      <R x={28} y={46} w={16} h={14} f="#8ea7bd" opacity={0.15 * construct} />
      <R x={16} y={128} w={76} h={4} f="#4a3c56" opacity={construct} />
      <g opacity={construct}>
        <R x={180} y={78} w={92} h={38} f="#392e46" />
        <R x={184} y={82} w={84} h={30} f="#584063" />
        <R x={188} y={72} w={28} h={10} f="#d8cbb0" />
        <R x={182} y={116} w={4} h={20} f="#2a2233" />
        <R x={266} y={116} w={4} h={20} f="#2a2233" />
      </g>
      <g transform={`translate(0 ${breath})`}>
        <R x={132} y={90} w={44} h={52} f="#3c3148" />
        <R x={136} y={94} w={36} h={40} f="#52405e" />
        <R x={140} y={82} w={26} h={12} f="#e2d4bd" />
        <R x={144} y={84} w={18} h={8} f="#d8b08a" />
        <R x={147} y={87} w={2} h={1} f="#5a4034" />
        <R x={153} y={87} w={2} h={1} f="#5a4034" />
        <R x={150} y={90} w={2} h={1} f="#b98f74" />
        <R x={146} y={82} w={16} h={6} f="#4a3327" />
      </g>
      <R x={116} y={140} w={70} h={4} f="#211a2c" />
      <g opacity={construct}>
        <R x={250} y={36} w={48} h={78} f="#2a2233" />
        <R x={254} y={40} w={40} h={70} f="#1b1524" />
        <R x={278} y={72} w={3} h={5} f="#8f7f5f" />
        <R x={262} y={58} w={20} h={1} f="#6b5a4a" opacity="0.5" />
      </g>
      <g opacity={construct}>
        <R x={108} y={36} w={32} h={22} f="#2b2436" />
        <R x={112} y={40} w={24} h={14} f="#7d6a8d" opacity="0.4" />
      </g>
      <R x={0} y={0} w={W} h={H} f="#221c33" o={0.14} />
    </PixelBox>
  );
};

export const DreamCorridor: React.FC = () => {
  const frame = useSceneFrame();
  const pulse = 0.5 + Math.sin(frame / 28) * 0.15;
  return (
    <PixelBox label="NEXUS / 12 DOORS" caption="十二扇门，每扇门后面是一个梦" glow={0.55}>
      <R x={0} y={0} w={W} h={H} f="#0a070c" />
      <polygon points="0,0 320,0 220,62 100,62" fill="#1a111e" />
      <polygon points="0,180 320,180 220,118 100,118" fill="#2a1420" />
      <polygon points="0,0 100,62 100,118 0,180" fill="#160d18" />
      <polygon points="320,0 220,62 220,118 320,180" fill="#120a14" />
      <R x={100} y={62} w={120} h={56} f="#241627" />
      <R x={140} y={76} w={40} h={28} f="#09060b" />
      <R x={160} y={76} w={1} h={28} f="#3a263f" />
      <g stroke="#5d3a5f" strokeWidth="0.7" opacity="0.5">
        <line x1="100" y1="62" x2="100" y2="118" />
        <line x1="220" y1="62" x2="220" y2="118" />
        <line x1="100" y1="90" x2="0" y2="90" />
        <line x1="220" y1="90" x2="320" y2="90" />
      </g>
      {[0, 1, 2, 3, 4, 5].map((index) => {
        const t = index / 6;
        const left = 8 + t * 86;
        const right = 312 - t * 86;
        const top = 20 + t * 34;
        const bottom = 126 - t * 32;
        const doorW = 22 - t * 14;
        return (
          <g key={index}>
            <R x={left} y={top} w={doorW} h={bottom - top} f="#2d1f33" />
            <R x={left + 2} y={top + 2} w={doorW - 4} h={bottom - top - 4} f="#19101d" />
            <R x={left + doorW - 5} y={top + (bottom - top) / 2} w={1.3} h={1.3} f="#b08a54" />
            <R x={right - 2} y={top} w={doorW} h={bottom - top} f="#2d1f33" />
            <R x={right} y={top + 2} w={doorW - 4} h={bottom - top - 4} f="#19101d" />
            <R x={right + 3} y={top + (bottom - top) / 2} w={1.3} h={1.3} f="#b08a54" />
            <text x={left + 2} y={top - 4} fontFamily={PIXEL} fontSize={4.6} fill={`rgba(200,170,180,${pulse})`}>
              {String(index + 1).padStart(2, '0')}
            </text>
            <text x={right + 4} y={top - 4} fontFamily={PIXEL} fontSize={4.6} fill={`rgba(200,170,180,${pulse})`}>
              {String(12 - index).padStart(2, '0')}
            </text>
          </g>
        );
      })}
      <g opacity={0.7}>
        <R x={148} y={112} w={10} h={30} f="#d8d3c6" />
        <R x={150} y={106} w={6} h={8} f="#3a2a2a" />
        <R x={151} y={108} w={4} h={5} f="#dfb894" />
        <R x={150} y={120} w={3} h={10} f="#d8b08a" />
        <R x={155} y={120} w={3} h={10} f="#d8b08a" />
      </g>
      <R x={0} y={0} w={W} h={H} f="#3a1026" o={0.08} />
    </PixelBox>
  );
};

export const DreamSnow: React.FC = () => {
  const frame = useSceneFrame();
  return (
    <PixelBox label="DREAM / SNOW" caption="雪地" glow={0.4}>
      <R x={0} y={0} w={W} h={92} f="#8f9caf" />
      <R x={0} y={92} w={W} h={88} f="#d8dde2" />
      <R x={0} y={92} w={W} h={2} f="#aeb9c2" />
      {Array.from({length: 9}, (_, index) => (
        <g key={index}>
          <R x={10 + index * 36} y={64 - (index % 3) * 6} w={5} h={32} f="#3d4a4e" />
          <R x={4 + index * 36} y={58 - (index % 3) * 6} w={18} h={10} f="#5a6a6c" />
          <R x={8 + index * 36} y={52 - (index % 3) * 6} w={10} h={8} f="#758482" />
        </g>
      ))}
      {Array.from({length: 60}, (_, index) => (
        <R
          key={index}
          x={(hash(index * 7) * 320 + frame * (0.2 + hash(index) * 0.4)) % 320}
          y={(hash(index * 13) * 180 + frame * (0.5 + hash(index * 3) * 0.5)) % 180}
          w={1}
          h={1}
          f="#ffffff"
          o={0.5 + hash(index * 17) * 0.4}
        />
      ))}
      <Girl x={150} y={96} scale={1.4} dress="#3a3a44" hair="#2a2420" />
      <R x={0} y={0} w={W} h={H} f="#b6c6d6" o={0.06} />
    </PixelBox>
  );
};

export const DreamStairs: React.FC = () => {
  const frame = useSceneFrame();
  return (
    <PixelBox label="DREAM / STAIRS" caption="楼梯" glow={0.5}>
      <R x={0} y={0} w={W} h={H} f="#0b080a" />
      <R x={0} y={0} w={W} h={H} f="#29121a" o={0.6} />
      <polygon points="80,0 240,0 300,180 140,180" fill="#3c2026" />
      <polygon points="80,0 240,0 220,20 100,20" fill="#1a0d12" />
      {Array.from({length: 12}, (_, index) => {
        const t = index / 12;
        const y = 20 + t * 160;
        const w = 140 + t * 80;
        return (
          <g key={index}>
            <R x={160 - w / 2} y={y} w={w} h={4 + t * 6} f={index % 2 ? '#4a2a2e' : '#553236'} />
            <R x={160 - w / 2} y={y} w={w} h={1} f="#7a4a48" opacity="0.4" />
          </g>
        );
      })}
      <Girl x={148} y={94} scale={1.25} dress="#d8d3c6" hair="#2a2420" />
      <g opacity={0.28 + 0.04 * Math.sin(frame / 12)}>
        <R x={0} y={0} w={W} h={H} f="#b33a2f" />
      </g>
    </PixelBox>
  );
};

export const DreamForest: React.FC = () => {
  const frame = useSceneFrame();
  return (
    <PixelBox label="DREAM / FOREST" caption="森林" glow={0.5}>
      <R x={0} y={0} w={W} h={H} f="#0d1410" />
      <R x={0} y={0} w={W} h={54} f="#2a3d35" />
      <R x={0} y={54} w={W} h={126} f="#121a14" />
      {Array.from({length: 11}, (_, index) => (
        <g key={index}>
          <R x={4 + index * 30} y={10 - (index % 4) * 6} w={8 + (index % 3) * 3} h={90} f="#1d2a20" />
          <R x={0 + index * 30} y={16 + (index % 3) * 6} w={24 + (index % 2) * 10} h={12} f="#26382a" />
          <R x={6 + index * 30} y={26 + (index % 2) * 6} w={12} h={8} f="#314a36" />
        </g>
      ))}
      {Array.from({length: 6}, (_, index) => (
        <g key={index} opacity={0.3 + 0.2 * Math.sin(frame / 20 + index)}>
          <R x={40 + index * 44} y={82 + (index % 3) * 20} w={2} h={2} f="#d8b08a" />
          <R x={42 + index * 44} y={82 + (index % 3) * 20} w={2} h={2} f="#d8b08a" />
        </g>
      ))}
      <Girl x={144} y={92} scale={1.2} dress="#b8b0a4" hair="#2a2420" />
      <R x={0} y={0} w={W} h={H} f="#233d2a" o={0.1} />
    </PixelBox>
  );
};

export const DreamRedRoom: React.FC = () => {
  return (
    <PixelBox label="DREAM / RED ROOM" caption="红色的房间" glow={0.5}>
      <R x={0} y={0} w={W} h={H} f="#3a0e14" />
      <R x={0} y={0} w={W} h={20} f="#21070c" />
      <R x={0} y={150} w={W} h={30} f="#26080e" />
      <R x={26} y={40} w={70} h={92} f="#561820" />
      <R x={30} y={44} w={62} h={84} f="#7a2028" />
      <R x={226} y={40} w={70} h={92} f="#561820" />
      <R x={230} y={44} w={62} h={84} f="#7a2028" />
      <g>
        <R x={118} y={86} w={34} h={44} f="#2b0a0f" />
        <R x={122} y={90} w={26} h={36} f="#420f16" />
        <R x={128} y={98} w={14} h={20} f="#e0c9b2" />
      </g>
      <g>
        <R x={146} y={74} w={32} h={10} f="#2a0a0e" />
        <R x={150} y={84} w={24} h={32} f="#5a141b" />
        <R x={158} y={94} w={8} h={14} f="#e6d4c0" />
      </g>
      <g opacity={0.8}>
        <R x={84} y={132} w={8} h={2} f="#d8b08a" />
        <R x={84} y={134} w={2} h={16} f="#d8b08a" />
        <R x={90} y={134} w={2} h={16} f="#d8b08a" />
        <R x={220} y={132} w={8} h={2} f="#d8b08a" />
        <R x={220} y={134} w={2} h={16} f="#d8b08a" />
        <R x={226} y={134} w={2} h={16} f="#d8b08a" />
      </g>
      <Girl x={148} y={104} scale={1.2} dress="#d8d3c6" hair="#2a2420" eyes="#b33a2f" />
    </PixelBox>
  );
};

export const Balcony: React.FC = () => {
  const frame = useSceneFrame();
  return (
    <PixelBox label="DREAM / BALCONY" caption="走到阳台" glow={0.4}>
      <R x={0} y={0} w={W} h={H} f="#101522" />
      <R x={0} y={50} w={W} h={90} f="#1c2536" />
      <R x={0} y={140} w={W} h={40} f="#0b0e15" />
      <circle cx={250} cy={54} r={16} fill="#d8cfb0" opacity="0.55" />
      <circle cx={244} cy={50} r={10} fill="#c7b998" opacity="0.3" />
      <g fill="#0a0d14">
        <R x={0} y={120} w={40} h={30} />
        <R x={34} y={132} w={28} h={18} />
        <R x={270} y={124} w={50} h={26} />
        <R x={236} y={136} w={40} h={14} />
      </g>
      {Array.from({length: 18}, (_, index) => (
        <R
          key={index}
          x={hash(index * 11) * 320}
          y={58 + hash(index * 5) * 50}
          w={1}
          h={1}
          f="#e8e2d4"
          o={0.2 + hash(index) * 0.5}
        />
      ))}
      <R x={0} y={124} w={320} h={3} f="#413b34" />
      {Array.from({length: 11}, (_, index) => (
        <g key={index}>
          <R x={10 + index * 28} y={124} w={2} h={26} f="#413b34" />
          <R x={0} y={150} w={320} h={3} f="#413b34" />
        </g>
      ))}
      <Girl x={144} y={84} scale={1.35} dress="#d8d3c6" hair="#2a2420" />
      <g opacity={0.7}>
        <R x={190 + Math.sin(frame / 30) * 4} y={64} w={3} h={1} f="#0b0e15" />
        <R x={184 + Math.sin(frame / 30) * 4} y={66} w={3} h={1} f="#0b0e15" />
      </g>
      <R x={0} y={0} w={W} h={H} f="#33506b" o={0.06} />
    </PixelBox>
  );
};

export const ToTheMoon: React.FC<{label?: string; caption?: string; width?: number; height?: number}> = ({label = 'TO THE MOON / 2011', caption = '两个医生，一段记忆', width = 1920, height = 1080}) => {
  const frame = useSceneFrame();
  return (
    <PixelBox label={label} caption={caption} glow={0.5} width={width} height={height}>
      <R x={0} y={0} w={W} h={H} f="#121826" />
      <R x={0} y={0} w={W} h={22} f="#1d2538" />
      <g>
        <R x={214} y={28} w={84} h={88} f="#0b1220" />
        <R x={216} y={30} w={80} h={84} f="#111b2f" />
        {Array.from({length: 26}, (_, index) => (
          <R key={index} x={220 + hash(index * 7) * 72} y={34 + hash(index * 11) * 76} w={1} h={1} f="#d8e0e8" o={0.4 + hash(index) * 0.5} />
        ))}
        <R x={248} y={58} w={18} h={18} f="#e8e1c8" opacity="0.75" />
        <R x={252} y={52} w={10} h={10} f="#e8e1c8" opacity="0.45" />
      </g>
      <R x={0} y={132} w={W} h={48} f="#202838" />
      <R x={0} y={132} w={W} h={3} f="#39445a" />
      <g>
        <R x={28} y={74} w={96} h={58} f="#c9c3b4" />
        <R x={32} y={70} w={88} h={16} f="#e4dcc8" />
        <R x={36} y={50} w={10} h={30} f="#4a4e58" />
        <R x={104} y={50} w={10} h={30} f="#4a4e58" />
        <R x={44} y={58} w={50} h={10} f="#9aa7b8" opacity="0.6" />
      </g>
      <g>
        <R x={132} y={88} w={22} h={44} f="#e6e2d8" />
        <R x={136} y={80} w={14} h={10} f="#d8b08a" />
        <R x={138} y={82} w={10} h={7} f="#5a3b25" />
        <R x={136} y={102} w={14} h={30} f="#c9c3b4" />
        <R x={158} y={88} w={22} h={44} f="#e6e2d8" />
        <R x={162} y={80} w={14} h={10} f="#e0b088" />
        <R x={164} y={82} w={10} h={7} f="#8a6a3a" />
        <R x={162} y={102} w={14} h={30} f="#c9c3b4" />
      </g>
      <g>
        <R x={92} y={112} w={136} h={16} f="#7a6450" />
        <R x={96} y={108} w={128} h={8} f="#d8d3c6" />
        <R x={112} y={102} w={20} h={8} f="#e0c9b2" />
        <R x={106} y={118} w={112} h={2} f="#5a4a3a" />
      </g>
      <R x={0} y={0} w={W} h={H} f="#4a6690" o={0.08} />
      <rect x={0} y={0} width={W} height={H} fill="#e8e2d4" opacity={0.02 + 0.01 * Math.sin(frame / 20)} />
    </PixelBox>
  );
};

export const IbGallery: React.FC<{label?: string; caption?: string; width?: number; height?: number}> = ({label = 'IB / 2012', caption = '美术馆', width = 1920, height = 1080}) => (
  <PixelBox label={label} caption={caption} glow={0.5} width={width} height={height}>
    <R x={0} y={0} w={W} h={H} f="#1c1216" />
    <R x={0} y={128} w={W} h={52} f="#2a1c1e" />
    <R x={0} y={0} w={W} h={22} f="#2b1a1c" />
    {[0, 1, 2, 3].map((index) => (
      <g key={index}>
        <R x={20 + index * 74} y={36} w={48} h={66} f="#5a3a30" />
        <R x={24 + index * 74} y={40} w={40} h={58} f="#1a1114" />
        <R x={30 + index * 74} y={48} w={28} h={30} f={index % 2 ? '#6d3b3e' : '#3e4a5a'} opacity="0.6" />
        <R x={34 + index * 74} y={54} w={8} h={8} f="#d8b08a" opacity="0.5" />
      </g>
    ))}
    <R x={148} y={42} w={30} h={54} f="#6a4a32" />
    <R x={152} y={46} w={22} h={46} f="#1c1214" />
    <R x={158} y={56} w={10} h={20} f="#a04a4a" opacity="0.6" />
    <R x={172} y={70} w={14} h={4} f="#d8b08a" opacity="0.3" />
    <R x={0} y={128} w={W} h={4} f="#4a2a28" />
    <Girl x={146} y={96} scale={1.15} dress="#8f2f35" hair="#2a2420" eyes="#141414" />
    <g>
      <R x={164} y={106} w={3} h={3} f="#b33a2f" />
      <R x={166} y={104} w={3} h={3} f="#d4483a" />
      <R x={168} y={108} w={2} h={2} f="#7a1d22" />
    </g>
  </PixelBox>
);

export const WitchCorridor: React.FC<{label?: string; caption?: string; width?: number; height?: number}> = ({label = "THE WITCH'S HOUSE / 2012", caption = '走廊', width = 1920, height = 1080}) => (
  <PixelBox label={label} caption={caption} glow={0.5} width={width} height={height}>
    <R x={0} y={0} w={W} h={H} f="#11130f" />
    <R x={0} y={0} w={W} h={24} f="#1d1a14" />
    <R x={0} y={136} w={W} h={44} f="#242016" />
    {Array.from({length: 7}, (_, index) => (
      <g key={index}>
        <R x={index * 46 + 8} y={30} w={26} h={100} f="#2a241c" />
        <R x={index * 46 + 12} y={34} w={18} h={92} f="#12100d" />
      </g>
    ))}
    <g fill="#3a1c1c" opacity="0.7">
      <path d="M0 150 L80 132 L140 180 L0 180 Z" />
      <path d="M240 138 L320 120 L320 180 L260 180 Z" />
    </g>
    <g>
      <R x={238} y={76} w={26} h={52} f="#141018" />
      <R x={240} y={60} w={22} h={18} f="#2a2028" />
      <R x={244} y={68} w={3} h={3} f="#b33a2f" />
      <R x={252} y={68} w={3} h={3} f="#b33a2f" />
      <R x={236} y={58} w={30} h={4} f="#1a1218" />
      <rect x={260} y={86} width={18} height={4} fill="#3a2a2e" transform="rotate(-20 260 86)" />
    </g>
    <Girl x={104} y={98} scale={1.2} dress="#d8d3c6" hair="#2a2420" eyes="#141414" />
    <R x={0} y={0} w={W} h={H} f="#0e1a10" o={0.16} />
  </PixelBox>
);

export const OmoriWhite: React.FC<{label?: string; caption?: string; width?: number; height?: number}> = ({label = 'OMORI / 2020', caption = '白色空间', width = 1920, height = 1080}) => (
  <PixelBox label={label} caption={caption} glow={0.25} width={width} height={height}>
    <R x={0} y={0} w={W} h={H} f="#f0eee8" />
    <R x={0} y={0} w={W} h={H} f="#ffffff" o={0.5} />
    <R x={0} y={128} w={W} h={4} f="#d8d4c8" />
    <R x={0} y={132} w={W} h={48} f="#e6e2d6" />
    <g>
      <R x={236} y={34} w={40} h={94} f="#0d0d0f" />
      <R x={240} y={38} w={32} h={86} f="#1a1a1d" />
      <R x={254} y={68} w={3} h={5} f="#d8d3c6" />
    </g>
    <g>
      <R x={138} y={104} w={22} h={30} f="#e6e2d6" />
      <R x={142} y={96} w={14} h={10} f="#d8d3c6" />
      <R x={140} y={92} w={16} h={6} f="#17171a" />
      <R x={143} y={100} w={3} h={3} f="#0d0d0f" />
      <R x={150} y={100} w={3} h={3} f="#0d0d0f" />
      <R x={141} y={112} w={16} h={22} f="#f4f2ec" />
      <R x={139} y={112} w={20} h={3} f="#17171a" />
      <R x={141} y={132} w={6} h={10} f="#e6e2d6" />
      <R x={151} y={132} w={6} h={10} f="#e6e2d6" />
    </g>
    <g fill="#0d0d0f">
      <R x={186} y={124} w={20} h={10} />
      <R x={192} y={118} w={8} h={6} />
      <R x={198} y={120} w={2} h={2} f="#f0eee8" />
    </g>
    <R x={0} y={0} w={W} h={H} f="#c9c5b8" o={0.02} />
  </PixelBox>
);

export const DarkHolySword: React.FC<{label?: string; caption?: string; width?: number; height?: number}> = ({label = '黑暗圣剑传说 / 2005', caption = 'RPG Maker XP / 复原示意', width = 1920, height = 1080}) => (
  <PixelBox label={label} caption={caption} glow={0.5} width={width} height={height}>
    <R x={0} y={0} w={W} h={H} f="#1a1410" />
    <R x={0} y={0} w={W} h={50} f="#2b1c14" />
    <R x={0} y={136} w={W} h={44} f="#34241a" />
    <R x={0} y={136} w={W} h={3} f="#6b4a2e" />
    {[0, 1, 2, 3].map((index) => (
      <g key={index}>
        <R x={22 + index * 78} y={26} w={18} h={106} f="#6a2420" />
        <R x={26 + index * 78} y={26} w={10} h={106} f="#8f342c" />
        <R x={18 + index * 78} y={22} w={26} h={6} f="#3a1a14" />
      </g>
    ))}
    <R x={246} y={34} w={54} h={86} f="#1b2a38" />
    <R x={250} y={38} w={46} h={78} f="#24394a" />
    <g opacity={0.35 + 0.08 * Math.sin(0)}>
      <R x={254} y={44} w={38} h={64} f="#3a5060" />
    </g>
    <g>
      <R x={124} y={86} w={24} h={40} f="#2b3a4a" />
      <R x={128} y={78} w={16} h={10} f="#e0c0a0" />
      <R x={128} y={74} w={18} h={6} f="#2a2420" />
      <rect x={146} y={66} width={2} height={60} fill="#c9c3b4" transform="rotate(18 146 66)" />
      <rect x={150} y={64} width={4} height={6} fill="#8f7f5f" transform="rotate(18 150 64)" />
      <R x={106} y={90} w={18} h={34} f="#6a2420" />
      <R x={110} y={84} w={10} h={8} f="#d8a888" />
      <R x={110} y={82} w={12} h={4} f="#2a2420" />
    </g>
    <R x={12} y={142} w={296} h={30} f="#101a2c" />
    <R x={12} y={142} w={296} h={1} f="#c9b988" />
    <R x={12} y={171} w={296} h={1} f="#c9b988" />
    <text x={28} y={162} fontFamily={SANS} fontSize={10} fill="#eadfc8">
      黑暗圣剑传说
    </text>
    <text x={228} y={162} fontFamily={SANS} fontSize={9} fill="#b8a888">
      十小时剧情
    </text>
  </PixelBox>
);

export const EpilogueMaze: React.FC<{label?: string; caption?: string; width?: number; height?: number}> = ({label = 'THE MAZE / MY GAME', caption = '小鲸鱼还在那里', width = 1920, height = 1080}) => {
  const frame = useSceneFrame();
  const drift = Math.min(1, frame / (FPS * 16));
  return (
    <PixelBox label={label} caption={caption} glow={0.55} width={width} height={height}>
      <R x={0} y={0} w={W} h={H} f="#0a100a" />
      {Array.from({length: 15}, (_, row) =>
        Array.from({length: 20}, (_, col) => {
          const wall = row < 2 || col < 2 || col > 17 || row > 13 || (row === 5 && col < 12) || (row === 9 && col > 7);
          return (
            <g key={`${row}-${col}`}>
              <R x={col * 16} y={row * 16} w={16} h={16} f={wall ? '#2b2a22' : '#24331f'} />
              {wall ? (
                <R x={col * 16 + 1} y={row * 16 + 1} w={14} h={14} f="#3a3529" />
              ) : (
                <R x={col * 16 + 3 + Math.floor(hash(row * 17 + col) * 6)} y={row * 16 + 8} w={1} h={3} f="#4d6b3d" o={0.6} />
              )}
              {!wall && hash(row * 9 + col * 13) > 0.85 ? (
                <R x={col * 16 + 8} y={row * 16 + 5} w={2} h={2} f="#b8a878" />
              ) : null}
            </g>
          );
        }),
      )}
      <g transform={`translate(${drift * 4} 0)`}>
        <Whale x={202} y={92} scale={3.6} />
      </g>
      <Knight x={92} y={102} scale={2.8} fallen />
      <g>
        <R x={74} y={138} w={30} h={2} f="#5d4a32" opacity="0.5" />
        <R x={80} y={132} w={2} h={8} f="#5d4a32" opacity="0.4" />
      </g>
      <g opacity={0.3 + 0.06 * Math.sin(frame / 12)}>
        <R x={0} y={0} w={W} h={H} f="#7a9ab8" />
      </g>
    </PixelBox>
  );
};
