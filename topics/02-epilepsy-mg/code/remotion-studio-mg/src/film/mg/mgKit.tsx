import React from 'react';
import {C, INK, INK_SOFT, SERIF, SANS} from './theme';

export const Panel: React.FC<{
  bg: string;
  children?: React.ReactNode;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  radius?: number;
  style?: React.CSSProperties;
}> = ({bg, children, x = 72, y = 64, w = 1776, h = 800, radius = 40, style}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: w,
      height: h,
      borderRadius: radius,
      background: bg,
      overflow: 'hidden',
      boxShadow: '0 18px 42px rgba(28,43,58,0.10)',
      ...style,
    }}
  >
    {children}
  </div>
);

export const PaperDots: React.FC<{color?: string; size?: number; gap?: number; opacity?: number}> = ({
  color = INK,
  size = 2,
  gap = 30,
  opacity = 0.07,
}) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      backgroundImage: `radial-gradient(circle, ${color} ${size}px, transparent ${size}px)`,
      backgroundSize: `${gap}px ${gap}px`,
      opacity,
      pointerEvents: 'none',
    }}
  />
);

export const GLYPHS: Record<string, React.ReactNode> = {
  brain: (
    <>
      <path d="M30 12c-8 0-14 5-15 12-7 2-11 8-10 15 1 6 5 10 10 12 0 8 7 13 15 12 5 5 14 4 17-2 7 1 13-4 13-11 6-3 9-9 7-15-2-7-8-10-14-10-2-8-9-13-17-13-3-3-7-3-10 0Z" />
      <path d="M32 14v42M21 23c5 2 8 6 8 11M52 26c-6 1-10 5-11 11M20 45c6-2 10-1 13 3M49 47c-5-2-9-1-12 2" />
    </>
  ),
  bolt: <path d="M36 5 15 36h14l-3 23 23-33H34l2-21Z" fill="currentColor" stroke="none" />,
  city: (
    <>
      <path d="M7 56h50M10 56V30h12v26M22 56V17h15v39M37 56V33h12v23M49 56V24h7v32" />
      <path d="M14 36h4M14 43h4M27 24h5M27 32h5M27 40h5M41 39h4M41 47h4" />
    </>
  ),
  server: (
    <>
      <rect x="10" y="10" width="44" height="19" rx="4" />
      <rect x="10" y="35" width="44" height="19" rx="4" />
      <path d="M17 19h22M17 44h22" />
      <circle cx="46" cy="19" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="46" cy="44" r="2.5" fill="currentColor" stroke="none" />
    </>
  ),
  people: (
    <>
      <circle cx="24" cy="20" r="8" />
      <circle cx="43" cy="24" r="7" />
      <path d="M9 53c1-11 7-17 15-17s14 6 15 17M32 53c1-9 5-14 11-14 7 0 11 5 12 14" />
    </>
  ),
  person: (
    <>
      <circle cx="32" cy="17" r="9" />
      <path d="M14 56c1-14 8-21 18-21s17 7 18 21M24 36v-3M40 36v-3" />
    </>
  ),
  eeg: <path d="M5 34h9l5-14 7 28 7-22 6 16 5-8h9" />,
  mri: (
    <>
      <circle cx="32" cy="32" r="23" />
      <circle cx="32" cy="32" r="13" />
      <circle cx="32" cy="32" r="4" fill="currentColor" stroke="none" />
      <path d="M32 4v6M32 54v6M4 32h6M54 32h6" />
    </>
  ),
  pill: (
    <>
      <rect x="12" y="22" width="40" height="20" rx="10" transform="rotate(-38 32 32)" />
      <path d="M21 23.5 40 40.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="9" y="13" width="46" height="42" rx="5" />
      <path d="M9 26h46M20 8v10M44 8v10" />
      <path d="M18 34h5M30 34h5M42 34h5M18 44h5M30 44h5M42 44h5" />
    </>
  ),
  shield: (
    <>
      <path d="M32 6 9 14v17c0 13 9 22 23 27 14-5 23-14 23-27V14L32 6Z" />
      <path d="m21 32 8 8 15-17" />
    </>
  ),
  phone: (
    <>
      <rect x="18" y="6" width="28" height="52" rx="6" />
      <path d="M27 12h10M29 51h6" />
    </>
  ),
  clock: (
    <>
      <circle cx="32" cy="32" r="24" />
      <path d="M32 17v16l11 7" />
    </>
  ),
  moon: <path d="M41 8c-12 2-21 13-21 25 0 14 11 25 25 25 4 0 8-1 11-3-6 0-12-3-16-8-5-6-6-14-3-21 2-7 7-13 13-16-3-1-6-2-9-2Z" />,
  eye: (
    <>
      <path d="M5 32c8-12 17-18 27-18s19 6 27 18c-8 12-17 18-27 18S13 44 5 32Z" />
      <circle cx="32" cy="32" r="8" />
    </>
  ),
  no: (
    <>
      <circle cx="32" cy="32" r="24" />
      <path d="M15 15 49 49" />
    </>
  ),
  question: (
    <>
      <circle cx="32" cy="32" r="24" />
      <path d="M24 25c0-5 4-9 9-9s9 3 9 8c0 7-9 8-9 15" />
      <circle cx="33" cy="47" r="2.6" fill="currentColor" stroke="none" />
    </>
  ),
  dna: (
    <>
      <path d="M21 6c0 16 22 20 22 36 0 6-2 11-5 16M43 6c0 16-22 20-22 36 0 6 2 11 5 16" />
      <path d="M23 16h18M21 26h22M21 36h22M23 46h18" />
    </>
  ),
  virus: (
    <>
      <circle cx="32" cy="32" r="15" />
      <path d="M32 9v8M32 47v8M9 32h8M47 32h8M16 16l6 6M42 42l6 6M48 16l-6 6M22 42l-6 6" />
      <circle cx="28" cy="30" r="2" fill="currentColor" stroke="none" />
      <circle cx="37" cy="36" r="2" fill="currentColor" stroke="none" />
    </>
  ),
  immune: (
    <>
      <path d="M32 6 9 14v17c0 13 9 22 23 27 14-5 23-14 23-27V14L32 6Z" />
      <path d="M32 20v20M22 30h20" />
    </>
  ),
  heart: <path d="M32 55S8 41 8 23c0-9 7-15 15-15 5 0 9 3 9 3s4-3 9-3c8 0 15 6 15 15 0 18-24 32-24 32Z" />,
  swim: (
    <>
      <circle cx="21" cy="24" r="6" />
      <path d="M5 40c5-4 10-4 15 0s10 4 15 0 10-4 15 0 7 3 9 2M14 31l9-4 10 8M29 48c5 3 11 3 16 0" />
    </>
  ),
  bike: (
    <>
      <circle cx="16" cy="44" r="11" />
      <circle cx="48" cy="44" r="11" />
      <path d="M16 44 27 25h10l11 19M27 25l9 19M22 19h10" />
    </>
  ),
  work: (
    <>
      <rect x="8" y="20" width="48" height="32" rx="4" />
      <path d="M24 20v-6h16v6M8 31h48M28 31v6h8v-6" />
    </>
  ),
  school: (
    <>
      <path d="M32 8 6 21l26 13 26-13L32 8Z" />
      <path d="M18 27v13c0 5 6 9 14 9s14-4 14-9V27M56 23v17" />
    </>
  ),
  home: <path d="M9 31 32 10l23 21M14 28v28h36V28M26 56V40h12v16" />,
  laptop: (
    <>
      <rect x="14" y="12" width="36" height="28" rx="3" />
      <path d="M7 48h50l-4 7H11l-4-7Z" />
    </>
  ),
  keyboard: (
    <>
      <rect x="6" y="18" width="52" height="28" rx="4" />
      <path d="M14 27h3M22 27h3M30 27h3M38 27h3M46 27h3M14 35h3M22 35h3M30 35h3M38 35h3M46 35h3M20 41h24" />
    </>
  ),
  hook: (
    <>
      <path d="M18 6v16c0 6 4 10 9 10s9-4 9-10M32 6v22c0 6 4 10 9 10s9-4 9-10M10 6v10" />
      <path d="M18 22c-3 0-5 3-5 7M32 28c-3 0-5 3-5 7M46 28c-3 0-5 3-5 7" />
    </>
  ),
  cursor: <path d="M17 9l30 24-14 2 7 15-7 3-7-15-9 9V9Z" fill="currentColor" stroke="none" />,
  drop: <path d="M32 6C26 17 14 29 14 41a18 18 0 0 0 36 0C50 29 38 17 32 6Z" />,
  camera: (
    <>
      <rect x="7" y="17" width="50" height="34" rx="5" />
      <circle cx="32" cy="34" r="10" />
      <path d="M19 17l4-6h18l4 6" />
    </>
  ),
  sun: (
    <>
      <circle cx="32" cy="32" r="11" />
      <path d="M32 5v7M32 52v7M5 32h7M52 32h7M13 13l5 5M46 46l5 5M51 13l-5 5M18 46l-5 5" />
    </>
  ),
  window: (
    <>
      <rect x="9" y="9" width="46" height="46" rx="3" />
      <path d="M32 9v46M9 32h46" />
    </>
  ),
  power: (
    <>
      <path d="M18 17a23 23 0 1 0 28 0" />
      <path d="M32 6v25" />
    </>
  ),
  book: (
    <>
      <path d="M32 16C25 9 14 8 7 11v38c7-3 18-2 25 5 7-7 18-8 25-5V11c-7-3-18-2-25 5Z" />
      <path d="M32 16v38" />
    </>
  ),
  hand: (
    <>
      <path d="M22 55V32l-5-7c-2-3 2-6 5-3l5 6V11c0-4 6-4 6 0v16-20c0-4 6-4 6 0v20-17c0-4 6-4 6 0v17-13c0-4 6-4 6 0v21c0 10-5 20-16 20H22Z" />
    </>
  ),
  pregnancy: (
    <>
      <circle cx="28" cy="12" r="7" />
      <path d="M24 22c-4 4-5 9-4 14 1 4-2 7-6 8 2 7 8 12 16 12 12 0 21-8 21-19 0-8-5-14-12-16-5-2-11-3-15 1Z" />
      <path d="M33 38c4 2 7 5 8 9" />
    </>
  ),
  coffee: (
    <>
      <path d="M10 19h36v19c0 10-8 17-18 17S10 48 10 38V19Z" />
      <path d="M46 25h5a8 8 0 0 1 0 16h-5M6 58h44" />
    </>
  ),
  child: (
    <>
      <circle cx="32" cy="20" r="9" />
      <path d="M20 56c0-14 5-21 12-21s12 7 12 21M26 31v-4M38 31v-4" />
      <path d="M24 12c2-6 14-7 16 0" />
    </>
  ),
  elder: (
    <>
      <circle cx="27" cy="15" r="8" />
      <path d="M27 23v18l-8 14M27 30l10 5 3 20M46 20v33" />
      <path d="M43 20h6" />
    </>
  ),
  stairs: <path d="M8 52h12V40h12V28h12V16h12" />,
  spiral: <path d="M32 31c0-5 4-9 9-9s9 4 9 9-4 9-9 9-13-5-13-13 7-15 15-15 18 7 18 19-9 21-21 21-24-9-24-24 10-27 27-27" />,
  umbrella: <path d="M8 32c0-14 11-24 24-24s24 10 24 24c-8-4-16-4-24 0-8-4-16-4-24 0ZM32 34v16c0 6 4 10 10 10" />,
  wine: <path d="M22 8h20v10c0 8-4 14-10 14s-10-6-10-14V8ZM32 32v14M24 52h16" />,
  key: <><circle cx="20" cy="32" r="10" /><path d="M30 32h26M48 32v8M56 32v-6" /></>,
};

export const Glyph: React.FC<{
  name: string;
  size?: number;
  color?: string;
  stroke?: number;
  style?: React.CSSProperties;
}> = ({name, size = 64, color = INK, stroke = 3.6, style}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    stroke={color}
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{color, display: 'block', flexShrink: 0, ...style}}
  >
    {GLYPHS[name] ?? GLYPHS.question}
  </svg>
);

export const Tag: React.FC<{
  children: React.ReactNode;
  color?: string;
  fg?: string;
  rotate?: number;
  style?: React.CSSProperties;
}> = ({children, color = C.mustard, fg = INK, rotate = -2, style}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      padding: '9px 18px',
      borderRadius: 10,
      background: color,
      color: fg,
      fontFamily: SANS,
      fontWeight: 700,
      fontSize: 20,
      letterSpacing: 1.5,
      transform: `rotate(${rotate}deg)`,
      boxShadow: '0 4px 0 rgba(28,43,58,0.14)',
      whiteSpace: 'nowrap',
      ...style,
    }}
  >
    {children}
  </div>
);

export const Kicker: React.FC<{
  children: React.ReactNode;
  color?: string;
  style?: React.CSSProperties;
}> = ({children, color = C.coral, style}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      fontFamily: SANS,
      fontWeight: 700,
      fontSize: 22,
      letterSpacing: 5,
      color,
      ...style,
    }}
  >
    <span style={{width: 34, height: 6, borderRadius: 3, background: color}} />
    {children}
  </div>
);

export const Title: React.FC<{
  children: React.ReactNode;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({children, size = 104, color = INK, style}) => (
  <div
    style={{
      fontFamily: SERIF,
      fontWeight: 900,
      fontSize: size,
      lineHeight: 1.08,
      letterSpacing: 2,
      color,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Body: React.FC<{
  children: React.ReactNode;
  size?: number;
  color?: string;
  weight?: number;
  style?: React.CSSProperties;
}> = ({children, size = 32, color = INK_SOFT, weight = 400, style}) => (
  <div
    style={{
      fontFamily: SANS,
      fontSize: size,
      fontWeight: weight,
      lineHeight: 1.62,
      color,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Highlight: React.FC<{
  children: React.ReactNode;
  color?: string;
  progress?: number;
  style?: React.CSSProperties;
}> = ({children, color = C.mustard, progress = 1, style}) => (
  <span style={{position: 'relative', display: 'inline-block', ...style}}>
    <span
      style={{
        position: 'absolute',
        left: -6,
        right: -6,
        bottom: 4,
        height: '38%',
        background: color,
        borderRadius: 3,
        transform: `scaleX(${progress})`,
        transformOrigin: 'left center',
        zIndex: 0,
        opacity: 0.85,
      }}
    />
    <span style={{position: 'relative', zIndex: 1}}>{children}</span>
  </span>
);

export const Card: React.FC<{
  children: React.ReactNode;
  bg?: string;
  border?: string;
  radius?: number;
  shadow?: string;
  padding?: number | string;
  style?: React.CSSProperties;
}> = ({
  children,
  bg = C.white,
  border = '2px solid rgba(28,43,58,0.12)',
  radius = 26,
  shadow = '0 10px 0 rgba(28,43,58,0.08)',
  padding = 28,
  style,
}) => (
  <div
    style={{
      background: bg,
      border,
      borderRadius: radius,
      boxShadow: shadow,
      padding,
      ...style,
    }}
  >
    {children}
  </div>
);

export const NumBadge: React.FC<{
  n: number | string;
  color?: string;
  fg?: string;
  size?: number;
  style?: React.CSSProperties;
}> = ({n, color = C.coral, fg = C.white, size = 52, style}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size,
      background: color,
      color: fg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: SANS,
      fontWeight: 700,
      fontSize: size * 0.5,
      flexShrink: 0,
      ...style,
    }}
  >
    {n}
  </div>
);

export const Arrow: React.FC<{
  length?: number;
  color?: string;
  thickness?: number;
  rotate?: number;
  style?: React.CSSProperties;
}> = ({length = 120, color = INK, thickness = 3.5, rotate = 0, style}) => (
  <svg
    width={length}
    height={36}
    viewBox={`0 0 ${length} 36`}
    style={{transform: `rotate(${rotate}deg)`, ...style}}
  >
    <path
      d={`M4 18h${length - 24}M${length - 26} 9l11 9-11 9`}
      stroke={color}
      strokeWidth={thickness}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Portrait: React.FC<{
  size?: number;
  shirt?: string;
  skin?: string;
  hair?: string;
  glasses?: boolean;
  mood?: 'calm' | 'worried' | 'absent' | 'closed' | 'sad';
  bg?: string;
  style?: React.CSSProperties;
}> = ({
  size = 140,
  shirt = C.teal,
  skin = C.skin,
  hair = '#25313E',
  glasses = false,
  mood = 'calm',
  bg = 'rgba(255,253,247,0.7)',
  style,
}) => {
  const eyes =
    mood === 'closed' ? (
      <>
        <path d="M72 92c5 4 10 4 15 0M113 92c5 4 10 4 15 0" stroke={INK} strokeWidth="4" fill="none" strokeLinecap="round" />
      </>
    ) : mood === 'absent' ? (
      <>
        <path d="M72 93h15M113 93h15" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
      </>
    ) : (
      <>
        <circle cx="80" cy="92" r="4" fill={INK} />
        <circle cx="120" cy="92" r="4" fill={INK} />
      </>
    );
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{display: 'block', ...style}}>
      <defs>
        <clipPath id={`portrait-${mood}-${shirt.replace('#', '')}`}>
          <circle cx="100" cy="100" r="97" />
        </clipPath>
      </defs>
      <circle cx="100" cy="100" r="97" fill={bg} />
      <g clipPath={`url(#portrait-${mood}-${shirt.replace('#', '')})`}>
        <path d="M30 208c2-48 28-73 70-73s68 25 70 73" fill={shirt} />
        <rect x="83" y="113" width="34" height="34" rx="14" fill={skin} />
        <circle cx="100" cy="89" r="47" fill={skin} />
        <circle cx="55" cy="95" r="9" fill={skin} />
        <circle cx="145" cy="95" r="9" fill={skin} />
        <path d="M53 88c0-34 19-54 48-54 30 0 48 20 48 52-11-3-20-11-25-25-13 15-37 21-71 19v8Z" fill={hair} />
        {eyes}
        {glasses ? (
          <>
            <circle cx="80" cy="92" r="16" fill="none" stroke={INK} strokeWidth="4.5" />
            <circle cx="120" cy="92" r="16" fill="none" stroke={INK} strokeWidth="4.5" />
            <path d="M96 92h8M64 88l-9-2M136 88l9-2" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
          </>
        ) : null}
        {mood === 'worried' ? (
          <path d="M67 72c6-5 13-5 19-1M114 71c6-4 13-4 19 1" stroke={INK} strokeWidth="4" strokeLinecap="round" fill="none" />
        ) : lastBrow(mood)}
        {mood === 'absent' ? (
          <path d="M90 128h20" stroke={INK} strokeWidth="4" strokeLinecap="round" />
        ) : mood === 'worried' || mood === 'sad' ? (
          <path d="M89 131c6-5 12-5 18 0" stroke={INK} strokeWidth="4" strokeLinecap="round" fill="none" />
        ) : mood === 'closed' ? (
          <path d="M91 128h18" stroke={INK} strokeWidth="4" strokeLinecap="round" />
        ) : (
          <path d="M88 126c7 7 16 7 23 0" stroke={INK} strokeWidth="4" strokeLinecap="round" fill="none" />
        )}
      </g>
    </svg>
  );
};

const lastBrow = (mood: string) =>
  mood === 'calm' || mood === 'closed' ? (
    <path d="M68 74c6-4 12-4 18 0M114 74c6-4 12-4 18 0" stroke={INK} strokeWidth="4" strokeLinecap="round" fill="none" />
  ) : null;

export const Person: React.FC<{
  variant?: 'stand' | 'walk' | 'sit' | 'point' | 'sleep';
  shirt?: string;
  pants?: string;
  skin?: string;
  hair?: string;
  glasses?: boolean;
  width?: number;
  style?: React.CSSProperties;
}> = ({
  variant = 'stand',
  shirt = C.teal,
  pants = INK,
  skin = C.skin,
  hair = '#25313E',
  glasses = false,
  width = 190,
  style,
}) => {
  const lying = variant === 'sleep';
  return (
    <svg
      width={width}
      height={width * 2.1}
      viewBox="0 0 200 420"
      style={{
        transform: lying ? 'rotate(-90deg)' : undefined,
        ...style,
      }}
    >
      {variant === 'walk' ? (
        <>
          <path d="M78 300 61 386" stroke={pants} strokeWidth="26" strokeLinecap="round" fill="none" />
          <path d="M118 300 145 378" stroke={pants} strokeWidth="26" strokeLinecap="round" fill="none" />
          <path d="M55 392h20M138 388h22" stroke={INK} strokeWidth="12" strokeLinecap="round" />
        </>
      ) : variant === 'sit' ? (
        <>
          <path d="M80 300v44h50v44" stroke={pants} strokeWidth="26" fill="none" strokeLinejoin="round" />
          <path d="M70 388h64" stroke={INK} strokeWidth="12" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M82 300 72 390M118 300l10 90" stroke={pants} strokeWidth="26" strokeLinecap="round" />
          <path d="M62 396h22M116 396h24" stroke={INK} strokeWidth="13" strokeLinecap="round" />
        </>
      )}
      <path
        d="M64 170c0-24 16-38 36-38s36 14 36 38v98c0 18-12 30-36 30s-36-12-36-30v-98Z"
        fill={shirt}
      />
      {variant === 'point' ? (
        <path d="M126 186c18-18 30-38 34-62" stroke={skin} strokeWidth="20" strokeLinecap="round" fill="none" />
      ) : variant === 'sit' ? (
        <path d="M70 200c-8 26-6 48 10 62M130 200c8 26 6 48-10 62" stroke={skin} strokeWidth="20" strokeLinecap="round" fill="none" />
      ) : (
        <path d="M66 196c-10 26-8 50 2 70M134 196c10 26 8 50-2 70" stroke={skin} strokeWidth="20" strokeLinecap="round" fill="none" />
      )}
      <circle cx="100" cy="108" r="46" fill={skin} />
      <path
        d="M55 108c0-34 18-52 45-52 29 0 46 19 46 50-12-2-21-10-25-24-12 13-35 18-66 16v10Z"
        fill={hair}
      />
      {glasses ? (
        <>
          <circle cx="83" cy="112" r="15" fill="none" stroke={INK} strokeWidth="5" />
          <circle cx="118" cy="112" r="15" fill="none" stroke={INK} strokeWidth="5" />
          <path d="M98 112h5M68 108l-8-3M133 108l8-3" stroke={INK} strokeWidth="5" strokeLinecap="round" />
        </>
      ) : null}
      <circle cx="83" cy="112" r="3.6" fill={INK} />
      <circle cx="118" cy="112" r="3.6" fill={INK} />
      <path d="M91 139c6 5 12 5 18 0" stroke={INK} strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
  );
};

const nodeAngles = [
  [-158, 0.78], [-126, 0.58], [-96, 0.82], [-66, 0.62], [-34, 0.86], [-8, 0.66],
  [18, 0.8], [48, 0.6], [76, 0.84], [106, 0.62], [136, 0.78], [166, 0.56],
  [-142, 0.42], [-108, 0.32], [-74, 0.44], [-40, 0.3], [0, 0.38], [38, 0.34],
  [74, 0.46], [110, 0.34], [146, 0.42], [-120, 0.14], [-80, 0.18], [-40, 0.1],
  [0, 0.16], [40, 0.12], [80, 0.18], [120, 0.14],
];

export const BrainNetwork: React.FC<{
  size?: number;
  color?: string;
  accent?: string;
  frame: number;
  intensity?: number;
}> = ({size = 640, color = INK, accent = C.coral, frame, intensity = 1}) => {
  const cx = 320;
  const cy = 320;
  const pts = nodeAngles.map(([deg, r], i) => {
    const a = (deg * Math.PI) / 180;
    return {
      x: cx + Math.cos(a) * 292 * r,
      y: cy + Math.sin(a) * 250 * r,
      i,
    };
  });
  return (
    <svg width={size} height={size} viewBox="0 0 640 640">
      <path
        d="M320 82c-50 0-86 18-112 48-42 6-78 38-78 82 0 26 10 48 27 64-8 20-6 44 5 62 14 24 39 37 66 36 18 22 46 34 76 30 34 26 82 18 102-13 34 4 66-13 77-43 14-36 2-68-26-89 4-34-15-66-47-78-16-44-50-71-90-71Z"
        fill="none"
        stroke={color}
        strokeWidth="3"
        opacity="0.35"
      />
      {pts.map((p, i) =>
        pts.slice(i + 1).map((q, j) => {
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d > 150) return null;
          return (
            <line
              key={`${i}-${j}`}
              x1={p.x}
              y1={p.y}
              x2={q.x}
              y2={q.y}
              stroke={color}
              strokeWidth="1.6"
              opacity={0.18}
            />
          );
        }),
      )}
      {pts.map((p) => {
        const pulse = 0.55 + 0.45 * Math.sin(frame * 0.055 + p.i * 1.7);
        return (
          <g key={p.i}>
            <circle cx={p.x} cy={p.y} r={5 + pulse * 4 * intensity} fill={p.i % 6 === 0 ? accent : color} opacity={p.i % 6 === 0 ? 0.9 : 0.55} />
            {p.i % 9 === 0 ? (
              <circle cx={p.x} cy={p.y} r={13 + pulse * 12} fill="none" stroke={accent} strokeWidth="2" opacity={0.25 * pulse} />
            ) : null}
          </g>
        );
      })}
    </svg>
  );
};

export const WaveLine: React.FC<{
  width?: number;
  height?: number;
  color?: string;
  frame: number;
  speed?: number;
  amplitude?: number;
  stroke?: number;
  style?: React.CSSProperties;
}> = ({width = 800, height = 180, color = C.teal, frame, speed = 0.07, amplitude = 40, stroke = 4, style}) => {
  const mid = height / 2;
  const pts: string[] = [];
  for (let x = 0; x <= width; x += 8) {
    const y =
      mid +
      Math.sin(x * 0.022 + frame * speed) * amplitude * 0.55 +
      Math.sin(x * 0.051 - frame * speed * 1.4) * amplitude * 0.3 +
      Math.sin(x * 0.011 + frame * speed * 0.4) * amplitude * 0.35;
    pts.push(`${x},${y.toFixed(2)}`);
  }
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={style}>
      <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const Sunburst: React.FC<{
  size?: number;
  color?: string;
  rays?: number;
  opacity?: number;
  style?: React.CSSProperties;
}> = ({size = 700, color = C.mustard, rays = 24, opacity = 0.5, style}) => (
  <svg width={size} height={size} viewBox="0 0 200 200" style={style}>
    {Array.from({length: rays}).map((_, i) => {
      const a = (i / rays) * Math.PI * 2;
      return (
        <line
          key={i}
          x1={100 + Math.cos(a) * 52}
          y1={100 + Math.sin(a) * 52}
          x2={100 + Math.cos(a) * 98}
          y2={100 + Math.sin(a) * 98}
          stroke={color}
          strokeWidth={i % 2 === 0 ? 6 : 4}
          opacity={opacity}
          strokeLinecap="round"
        />
      );
    })}
  </svg>
);

export const Squiggle: React.FC<{
  width?: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({width = 220, color = C.coral, style}) => (
  <svg width={width} height={26} viewBox="0 0 220 26" style={style}>
    <path d="M4 18c18-14 36-14 54 0s36 14 54 0 36-14 54 0 30 12 50 0" stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" />
  </svg>
);
