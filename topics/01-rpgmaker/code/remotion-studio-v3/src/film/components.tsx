import React from 'react';
import {interpolate} from 'remotion';
import {useSceneFrame} from './sceneClock';
import {
  C,
  FPS,
  H,
  PIXEL,
  SANS,
  SERIF,
  W,
  clamp,
  hash,
  paperBackground,
  ramp,
} from './theme';

export const Grain: React.FC<{
  frame: number;
  dark?: boolean;
  intensity?: number;
  count?: number;
}> = ({frame, dark = false, intensity = 0.7, count = 190}) => {
  const seed = Math.floor(frame / 2);
  const dots = [];
  const tone = dark ? '0,0,0' : '255,255,255';
  for (let i = 0; i < count; i += 1) {
    const x = hash(seed * 131 + i * 17) * W;
    const y = hash(seed * 71 + i * 29 + 9) * H;
    const size = hash(seed * 43 + i * 11 + 3) > 0.88 ? 2 : 1;
    const opacity =
      (0.02 + hash(seed * 19 + i * 7) * (dark ? 0.06 : 0.09)) * intensity;
    dots.push(
      <div
        key={i}
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: size,
          height: size,
          background: `rgba(${tone},${opacity})`,
        }}
      />,
    );
  }
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {dots}
      <div
        style={{
          position: 'absolute',
          left: 380 + Math.sin(frame * 0.013) * 9,
          top: 0,
          width: 1,
          height: '100%',
          background: dark
            ? 'rgba(60,45,25,0.045)'
            : 'rgba(255,255,255,0.032)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 1420 + Math.cos(frame * 0.011) * 11,
          top: 0,
          width: 1,
          height: '100%',
          background: dark
            ? 'rgba(60,45,25,0.03)'
            : 'rgba(255,255,255,0.022)',
        }}
      />
    </div>
  );
};

export const Vignette: React.FC<{strength?: number}> = ({strength = 0.55}) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      background: `radial-gradient(ellipse at center, rgba(0,0,0,0) 42%, rgba(0,0,0,${strength}) 100%)`,
    }}
  />
);

export const PaperBG: React.FC<{children?: React.ReactNode; tint?: number}> = ({
  children,
  tint = 0,
}) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      background: paperBackground,
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: `rgba(112,78,32,${tint})`,
        mixBlendMode: 'multiply',
      }}
    />
    <div
      style={{
        position: 'absolute',
        left: '8%',
        top: 0,
        bottom: 0,
        width: 1,
        background: 'rgba(105,83,48,0.12)',
        boxShadow: '2px 0 12px rgba(90,66,30,0.05)',
      }}
    />
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: '72%',
        height: 1,
        background: 'rgba(105,83,48,0.1)',
      }}
    />
    {children}
  </div>
);

export const DarkBG: React.FC<{
  children?: React.ReactNode;
  grid?: boolean;
  tint?: string;
}> = ({children, grid = false, tint = 'rgba(20,26,34,0.55)'}) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      background: `radial-gradient(ellipse at 50% 40%, ${tint} 0%, ${C.night} 68%)`,
      overflow: 'hidden',
    }}
  >
    {grid ? (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(236,231,218,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(236,231,218,0.045) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage:
            'radial-gradient(ellipse at center, black 20%, transparent 76%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 20%, transparent 76%)',
        }}
      />
    ) : null}
    {children}
  </div>
);

export const Halftone: React.FC<{
  opacity?: number;
  size?: number;
  color?: string;
}> = ({opacity = 0.16, size = 6, color = '0,0,0'}) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      opacity,
      backgroundImage: `radial-gradient(circle, rgba(${color},0.9) 1px, transparent 1.4px)`,
      backgroundSize: `${size}px ${size}px`,
    }}
  />
);

export const Scanlines: React.FC<{opacity?: number}> = ({opacity = 0.18}) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      opacity,
      background:
        'repeating-linear-gradient(0deg, rgba(0,0,0,0.55) 0px, rgba(0,0,0,0.55) 1px, transparent 1px, transparent 4px)',
    }}
  />
);

export const Kicker: React.FC<{
  children: React.ReactNode;
  color?: string;
  opacity?: number;
  size?: number;
}> = ({children, color = C.dim, opacity = 1, size = 22}) => (
  <div
    style={{
      fontFamily: SANS,
      fontWeight: 700,
      fontSize: size,
      letterSpacing: 6,
      color,
      opacity,
      textTransform: 'uppercase',
    }}
  >
    {children}
  </div>
);

export const Rule: React.FC<{
  width?: number | string;
  color?: string;
  opacity?: number;
  thickness?: number;
}> = ({width = 240, color = C.cream, opacity = 0.35, thickness = 1}) => (
  <div
    style={{
      width,
      height: thickness,
      background: color,
      opacity,
    }}
  />
);

export const ArchiveTag: React.FC<{
  code: string;
  label: string;
  color?: string;
}> = ({code, label, color = '#d7cfbd'}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      fontFamily: SANS,
      fontSize: 19,
      letterSpacing: 3,
      color,
      opacity: 0.8,
    }}
  >
    <span
      style={{
        width: 9,
        height: 9,
        background: C.red,
        display: 'inline-block',
      }}
    />
    <span style={{fontFamily: PIXEL, fontSize: 12, letterSpacing: 1}}>
      {code}
    </span>
    <span>{label}</span>
  </div>
);

export const Reconstruction: React.FC<{
  text?: string;
  dark?: boolean;
  bottom?: boolean;
}> = ({text = '根据资料重绘', dark = false, bottom = false}) => (
  <div
    style={{
      position: 'absolute',
      right: 54,
      ...(bottom ? {bottom: 46} : {top: 46}),
      fontFamily: SANS,
      fontSize: 17,
      letterSpacing: 3,
      color: dark ? 'rgba(60,45,25,0.55)' : 'rgba(236,231,218,0.45)',
      border: `1px solid ${
        dark ? 'rgba(60,45,25,0.25)' : 'rgba(236,231,218,0.22)'
      }`,
      padding: '7px 12px',
    }}
  >
    {text}
  </div>
);

export const Caption: React.FC<{
  left?: number | string;
  right?: number | string;
  bottom?: number;
  children: React.ReactNode;
  dark?: boolean;
  opacity?: number;
}> = ({left = 90, right, bottom = 78, children, dark = false, opacity = 0.68}) => (
  <div
    style={{
      position: 'absolute',
      left,
      right,
      bottom,
      fontFamily: SANS,
      fontSize: 20,
      letterSpacing: 2.5,
      lineHeight: 1.6,
      color: dark ? C.ink : C.cream,
      opacity,
    }}
  >
    {children}
  </div>
);

export const Statement: React.FC<{
  lines: string[];
  size?: number;
  color?: string;
  accent?: string;
  align?: 'left' | 'center';
  paper?: boolean;
  start?: number;
  stagger?: number;
  width?: number;
}> = ({
  lines,
  size = 92,
  color = C.cream,
  accent = C.red,
  align = 'left',
  paper = false,
  start = 0,
  stagger = 0.22,
  width = 1500,
}) => {
  const frame = useSceneFrame();
  return (
    <div
      style={{
        position: 'absolute',
        left: align === 'center' ? (W - width) / 2 : 150,
        top: 0,
        width,
        height: H,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: align === 'center' ? 'center' : 'flex-start',
        textAlign: align,
        fontFamily: SERIF,
        fontWeight: 900,
        fontSize: size,
        lineHeight: 1.42,
        letterSpacing: 2,
        color,
      }}
    >
      {lines.map((line, index) => {
        const enter = ramp(
          frame,
          (start + index * stagger) * FPS,
          (start + index * stagger + 0.55) * FPS,
        );
        return (
          <div
            key={line}
            style={{
              opacity: enter,
              transform: `translateY(${(1 - enter) * 22}px)`,
              maxWidth: width,
            }}
          >
            {line}
            {index === lines.length - 1 ? (
              <span
                style={{
                  display: 'inline-block',
                  width: size * 0.22,
                  height: size * 0.09,
                  background: accent,
                  marginLeft: size * 0.18,
                  verticalAlign: 'middle',
                  transform: `scaleX(${enter})`,
                  transformOrigin: 'left center',
                }}
              />
            ) : null}
          </div>
        );
      })}
      <div
        style={{
          marginTop: 36,
          fontFamily: SANS,
          fontWeight: 400,
          fontSize: 20,
          letterSpacing: 4,
          color: paper ? 'rgba(28,26,22,0.45)' : 'rgba(236,231,218,0.42)',
        }}
      >
        RPG MAKER / DREAMS &amp; WORLDS
      </div>
    </div>
  );
};

export const Typewriter: React.FC<{
  text: string;
  start?: number;
  cps?: number;
  color?: string;
  size?: number;
  serif?: boolean;
  cursor?: boolean;
  align?: 'left' | 'center';
}> = ({
  text,
  start = 0,
  cps = 18,
  color = C.cream,
  size = 54,
  serif = true,
  cursor = true,
  align = 'left',
}) => {
  const frame = useSceneFrame();
  const local = Math.max(0, frame - start * FPS);
  const count = Math.min(text.length, Math.floor((local / FPS) * cps));
  const blink = Math.floor(frame / 15) % 2 === 0;
  return (
    <div
      style={{
        fontFamily: serif ? SERIF : SANS,
        fontWeight: serif ? 600 : 400,
        fontSize: size,
        lineHeight: 1.6,
        letterSpacing: 1,
        color,
        textAlign: align,
        whiteSpace: 'pre-wrap',
      }}
    >
      {text.slice(0, count)}
      {cursor && count < text.length ? (
        <span style={{opacity: blink ? 0.9 : 0.15, color: C.redBright}}>▌</span>
      ) : null}
    </div>
  );
};

export const BigNumber: React.FC<{
  value: number;
  start?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  size?: number;
  color?: string;
  label?: string;
  decimals?: number;
}> = ({
  value,
  start = 0,
  duration = 1.2,
  suffix = '',
  prefix = '',
  size = 210,
  color = C.cream,
  label,
  decimals = 0,
}) => {
  const frame = useSceneFrame();
  const progress = interpolate(
    frame,
    [start * FPS, (start + duration) * FPS],
    [0, 1],
    clamp,
  );
  const current = value * progress;
  const text =
    decimals > 0
      ? current.toFixed(decimals)
      : Math.round(current).toLocaleString('en-US');
  return (
    <div>
      {label ? (
        <div
          style={{
            fontFamily: SANS,
            fontSize: 22,
            letterSpacing: 5,
            color,
            opacity: 0.5,
            marginBottom: 12,
          }}
        >
          {label}
        </div>
      ) : null}
      <div
        style={{
          fontFamily: PIXEL,
          fontSize: size,
          color,
          letterSpacing: 2,
          textShadow: '0 8px 0 rgba(0,0,0,0.28)',
          whiteSpace: 'nowrap',
        }}
      >
        {prefix}
        {text}
        {suffix}
      </div>
    </div>
  );
};

export const ChapterOpener: React.FC<{
  number: string;
  title: string;
  years: string;
  paper?: boolean;
}> = ({number, title, years, paper = false}) => {
  const frame = useSceneFrame();
  const enter = ramp(frame, 8, 34);
  const line = interpolate(frame, [26, 58], [0, 1], clamp);
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: paper ? paperBackground : C.night,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {paper ? <Halftone opacity={0.07} /> : null}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 66,
          opacity: enter,
          transform: `translateY(${(1 - enter) * 18}px)`,
        }}
      >
        <div
          style={{
            fontFamily: PIXEL,
            fontSize: 30,
            color: paper ? C.red : C.redBright,
            letterSpacing: 4,
          }}
        >
          {number}
        </div>
        <div>
          <div
            style={{
              fontFamily: SERIF,
              fontWeight: 900,
              fontSize: 130,
              letterSpacing: 8,
              color: paper ? C.ink : C.cream,
              lineHeight: 1.1,
            }}
          >
            {title}
          </div>
          <div
            style={{
              marginTop: 34,
              width: `${line * 100}%`,
              height: 1,
              background: paper ? 'rgba(28,26,22,0.4)' : 'rgba(236,231,218,0.35)',
            }}
          />
          <div
            style={{
              marginTop: 22,
              fontFamily: PIXEL,
              fontSize: 15,
              letterSpacing: 3,
              color: paper ? C.inkSoft : C.dim,
              opacity: line,
            }}
          >
            {years}
          </div>
        </div>
      </div>
    </div>
  );
};

export const PhotoFrame: React.FC<{
  children: React.ReactNode;
  left: number;
  top: number;
  width: number;
  height: number;
  caption?: string;
  dark?: boolean;
  rotate?: number;
  label?: string;
}> = ({
  children,
  left,
  top,
  width,
  height,
  caption,
  dark = true,
  rotate = 0,
  label,
}) => (
  <div
    style={{
      position: 'absolute',
      left,
      top,
      width,
      transform: `rotate(${rotate}deg)`,
      boxShadow: '0 28px 60px rgba(0,0,0,0.45)',
    }}
  >
    <div
      style={{
        padding: '14px 14px 0',
        background: dark ? '#e7ddc8' : '#1a1b1d',
        border: `1px solid ${dark ? '#b5a789' : 'rgba(236,231,218,0.25)'}`,
      }}
    >
      <div style={{width: '100%', height, overflow: 'hidden', position: 'relative'}}>
        {children}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 4px 18px',
          fontFamily: SANS,
          fontSize: 18,
          letterSpacing: 2,
          color: dark ? 'rgba(28,26,22,0.62)' : 'rgba(236,231,218,0.55)',
        }}
      >
        <span>{caption}</span>
        {label ? (
          <span style={{fontFamily: PIXEL, fontSize: 11}}>{label}</span>
        ) : null}
      </div>
    </div>
  </div>
);

export const CornerMarks: React.FC<{color?: string; opacity?: number}> = ({
  color = C.cream,
  opacity = 0.25,
}) => {
  const mark = (style: React.CSSProperties) => (
    <div
      style={{
        position: 'absolute',
        width: 46,
        height: 46,
        borderColor: color,
        borderStyle: 'solid',
        borderWidth: 0,
        opacity,
        ...style,
      }}
    />
  );
  return (
    <div style={{position: 'absolute', inset: 52, pointerEvents: 'none'}}>
      {mark({left: 0, top: 0, borderLeftWidth: 2, borderTopWidth: 2})}
      {mark({right: 0, top: 0, borderRightWidth: 2, borderTopWidth: 2})}
      {mark({left: 0, bottom: 0, borderLeftWidth: 2, borderBottomWidth: 2})}
      {mark({right: 0, bottom: 0, borderRightWidth: 2, borderBottomWidth: 2})}
    </div>
  );
};
