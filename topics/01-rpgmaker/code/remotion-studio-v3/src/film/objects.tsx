import React from 'react';
import {C, PIXEL, SANS, SERIF} from './theme';

type Palette = {
  bg: string;
  ink: string;
  accent: string;
  sub?: string;
};

const BoxArtDante: React.FC<{palette: Palette}> = ({palette}) => (
  <svg width="100%" height="100%" viewBox="0 0 300 300" preserveAspectRatio="none">
    <rect width="300" height="300" fill={palette.bg} />
    <rect y="196" width="300" height="104" fill="rgba(0,0,0,0.28)" />
    <circle cx="228" cy="76" r="40" fill={palette.accent} opacity="0.18" />
    <path
      d="M0 214 L42 178 L74 198 L106 158 L142 192 L176 168 L214 196 L256 172 L300 206 L300 300 L0 300 Z"
      fill="#0b0d16"
      opacity="0.75"
    />
    <path
      d="M126 224 L150 118 L174 224 Z"
      fill="#d9b25f"
      opacity="0.85"
    />
    <rect x="146" y="188" width="8" height="42" fill="#1a1308" />
    <rect x="136" y="196" width="28" height="4" fill="#1a1308" />
    {Array.from({length: 9}, (_, index) => (
      <rect
        key={index}
        x={18 + index * 30}
        y={22 + (index % 3) * 10}
        width="14"
        height="14"
        fill={palette.accent}
        opacity={0.12 + (index % 4) * 0.04}
      />
    ))}
  </svg>
);

const BoxArtMap: React.FC<{palette: Palette}> = ({palette}) => (
  <svg width="100%" height="100%" viewBox="0 0 300 300">
    <rect width="300" height="300" fill={palette.bg} />
    {Array.from({length: 8}, (_, row) =>
      Array.from({length: 8}, (_, col) => (
        <rect
          key={`${row}-${col}`}
          x={col * 38 + 2}
          y={row * 38 + 2}
          width="34"
          height="34"
          fill={
            (row + col) % 3 === 0
              ? '#38503b'
              : (row + col) % 5 === 0
                ? '#2b3d49'
                : '#22322a'
          }
        />
      )),
    )}
    <rect x="170" y="96" width="22" height="22" fill="#d9b25f" />
    <rect x="172" y="98" width="18" height="6" fill="#5a4520" />
    <rect x="118" y="188" width="20" height="34" fill="#2f4d83" />
    <rect x="124" y="178" width="8" height="14" fill="#c6a078" />
    <rect x="98" y="132" width="28" height="20" fill="#7a5a3a" />
  </svg>
);

const BoxArtUnity: React.FC<{palette: Palette}> = ({palette}) => (
  <svg width="100%" height="100%" viewBox="0 0 300 300">
    <rect width="300" height="300" fill={palette.bg} />
    <path
      d="M150 50 L236 100 L236 200 L150 250 L64 200 L64 100 Z"
      fill="none"
      stroke={palette.accent}
      strokeWidth="3"
      opacity="0.8"
    />
    <path
      d="M150 96 L200 124 L200 180 L150 208 L100 180 L100 124 Z"
      fill={palette.accent}
      opacity="0.14"
    />
    <text
      x="150"
      y="166"
      textAnchor="middle"
      fontFamily="monospace"
      fontSize="34"
      fill={palette.ink}
      opacity="0.9"
    >
      {'</>'}
    </text>
    {Array.from({length: 8}, (_, index) => (
      <rect
        key={index}
        x={40 + index * 28}
        y={238 + (index % 3) * 8}
        width="18"
        height="2"
        fill={palette.accent}
        opacity="0.3"
      />
    ))}
  </svg>
);

const BoxArtHandheld: React.FC<{palette: Palette; art?: 'fes' | 'with'}> = ({
  palette,
  art = 'fes',
}) => (
  <svg width="100%" height="100%" viewBox="0 0 300 300">
    <rect width="300" height="300" fill={palette.bg} />
    <rect x="74" y="64" width="152" height="104" rx="12" fill="#d8d3c6" />
    <rect x="88" y="78" width="124" height="76" rx="4" fill="#2d3d33" />
    <rect x="104" y="98" width="92" height="36" fill="#7ca579" opacity="0.7" />
    <rect x="112" y="106" width="12" height="12" fill="#e7ddc8" />
    <rect x="142" y="118" width="30" height="10" fill="#b33a2f" />
    <circle cx="130" cy="192" r="18" fill="#f0eee8" />
    <circle cx="176" cy="192" r="18" fill="#f0eee8" />
    <rect x="118" y="210" width="70" height="8" rx="4" fill="#d8d3c6" />
    <text
      x="150"
      y="252"
      textAnchor="middle"
      fontFamily="monospace"
      fontSize={art === 'fes' ? 17 : 20}
      fill={palette.ink}
      letterSpacing="2"
    >
      {art === 'fes' ? 'RPG MAKER FES' : 'RPG MAKER WITH'}
    </text>
  </svg>
);

export const SoftwareBox: React.FC<{
  left: number;
  top: number;
  width: number;
  height: number;
  title: string;
  subtitle?: string;
  year?: string;
  platform?: string;
  palette: Palette;
  art?: 'dante' | 'map' | 'unity' | 'fes' | 'with';
  rotate?: number;
  label?: string;
  opacity?: number;
}> = ({
  left,
  top,
  width,
  height,
  title,
  subtitle,
  year,
  platform,
  palette,
  art = 'map',
  rotate = 0,
  label,
  opacity = 1,
}) => {
  const spine = Math.max(18, width * 0.07);
  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width,
        height,
        transform: `rotate(${rotate}deg)`,
        opacity,
        filter: 'drop-shadow(0 34px 40px rgba(0,0,0,0.42))',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: spine,
          height: '100%',
          background: 'linear-gradient(90deg, rgba(0,0,0,0.5), rgba(255,255,255,0.08))',
          borderRight: '1px solid rgba(255,255,255,0.1)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: spine,
          top: 0,
          width: width - spine,
          height: '100%',
          background: palette.bg,
          border: '1px solid rgba(255,255,255,0.15)',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        <div style={{position: 'absolute', inset: 0, opacity: 0.6}}>
          {art === 'dante' ? <BoxArtDante palette={palette} /> : null}
          {art === 'map' ? <BoxArtMap palette={palette} /> : null}
          {art === 'unity' ? <BoxArtUnity palette={palette} /> : null}
          {art === 'fes' || art === 'with' ? (
            <BoxArtHandheld palette={palette} art={art} />
          ) : null}
        </div>
        <div
          style={{
            position: 'absolute',
            left: 18,
            right: 18,
            top: 18,
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: SANS,
            fontSize: Math.max(13, width * 0.035),
            letterSpacing: 2,
            color: palette.ink,
            opacity: 0.86,
          }}
        >
          <span>{platform}</span>
          <span>{year}</span>
        </div>
        <div
          style={{
            position: 'absolute',
            left: 18,
            right: 18,
            bottom: 18,
            color: palette.ink,
          }}
        >
          {subtitle ? (
            <div
              style={{
                fontFamily: SANS,
                fontSize: Math.max(12, width * 0.03),
                letterSpacing: 2,
                opacity: 0.72,
                marginBottom: 6,
              }}
            >
              {subtitle}
            </div>
          ) : null}
          <div
            style={{
              fontFamily: SERIF,
              fontWeight: 900,
              fontSize: Math.max(24, width * 0.105),
              lineHeight: 1.08,
              letterSpacing: 1,
              textShadow: '0 2px 0 rgba(255,255,255,0.15)',
              whiteSpace: 'pre-line',
            }}
          >
            {title}
          </div>
          {label ? (
            <div
              style={{
                marginTop: 10,
                fontFamily: SANS,
                fontSize: 12,
                letterSpacing: 2,
                opacity: 0.5,
              }}
            >
              {label}
            </div>
          ) : null}
        </div>
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: '100%',
            background:
              'linear-gradient(105deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 28%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.16) 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
};

export const MagazineCover: React.FC<{
  left: number;
  top: number;
  width: number;
  height: number;
  title?: string;
  issue: string;
  price: string;
  headline: string;
  sublines?: string[];
  rotate?: number;
  dark?: boolean;
  label?: string;
}> = ({
  left,
  top,
  width,
  height,
  title = '月刊 ASCII',
  issue,
  price,
  headline,
  sublines = [],
  rotate = -1.2,
  dark = false,
  label = '封面复原',
}) => {
  const ink = dark ? '#e8e2d4' : '#26221c';
  const bg = dark ? '#1a1c20' : '#ece3cf';
  const red = '#b33a2f';
  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width,
        height,
        transform: `rotate(${rotate}deg)`,
        background: bg,
        boxShadow: '0 34px 56px rgba(0,0,0,0.45)',
        padding: width * 0.055,
        boxSizing: 'border-box',
        border: '1px solid rgba(0,0,0,0.18)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          borderBottom: `3px solid ${ink}`,
          paddingBottom: width * 0.018,
        }}
      >
        <div
          style={{
            fontFamily: SERIF,
            fontWeight: 900,
            fontSize: width * 0.075,
            color: red,
            letterSpacing: 3,
            lineHeight: 1,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: SANS,
            fontSize: width * 0.026,
            color: ink,
            opacity: 0.75,
            letterSpacing: 1,
          }}
        >
          {price}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: width * 0.015,
          fontFamily: SANS,
          fontSize: width * 0.032,
          color: ink,
          opacity: 0.85,
          letterSpacing: 1,
        }}
      >
        <span>{issue}</span>
        <span>{label}</span>
      </div>
      <div
        style={{
          marginTop: width * 0.035,
          height: height * 0.34,
          background: dark
            ? 'linear-gradient(135deg,#26343a,#101418)'
            : 'linear-gradient(135deg,#cfc2a5,#b2a180)',
          border: `2px solid ${ink}`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 300 180">
          <rect x="26" y="26" width="248" height="128" fill="none" stroke={ink} strokeWidth="2" opacity="0.5" />
          <rect x="52" y="50" width="132" height="82" fill={dark ? '#101418' : '#3a4038'} />
          <rect x="66" y="64" width="104" height="54" fill={dark ? '#3e6b55' : '#54806a'} opacity="0.7" />
          <rect x="72" y="70" width="10" height="10" fill={dark ? '#d7cfbd' : '#e7ddc8'} />
          <rect x="92" y="82" width="42" height="4" fill={dark ? '#d7cfbd' : '#e7ddc8'} opacity="0.65" />
          <rect x="92" y="92" width="28" height="4" fill={dark ? '#d7cfbd' : '#e7ddc8'} opacity="0.4" />
          <rect x="196" y="58" width="58" height="74" fill={dark ? '#20262a' : '#d6c9ab'} stroke={ink} strokeWidth="2" />
          <circle cx="225" cy="92" r="16" fill="none" stroke={red} strokeWidth="3" />
          <rect x="56" y="148" width="188" height="10" fill={ink} opacity="0.7" />
        </svg>
      </div>
      <div
        style={{
          marginTop: width * 0.035,
          fontFamily: SERIF,
          fontWeight: 900,
          fontSize: width * 0.06,
          lineHeight: 1.28,
          color: ink,
          letterSpacing: 1,
          whiteSpace: 'pre-line',
        }}
      >
        {headline}
      </div>
      {sublines.map((line) => (
        <div
          key={line}
          style={{
            marginTop: width * 0.017,
            fontFamily: SANS,
            fontSize: width * 0.028,
            color: ink,
            opacity: 0.65,
            letterSpacing: 1,
          }}
        >
          {line}
        </div>
      ))}
      <div
        style={{
          position: 'absolute',
          left: width * 0.055,
          bottom: width * 0.05,
          display: 'flex',
          gap: 6,
        }}
      >
        {Array.from({length: 34}, (_, index) => (
          <div
            key={index}
            style={{
              width: index % 7 === 0 ? 3 : 1.5,
              height: width * 0.08,
              background: ink,
              opacity: 0.7,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export const FloppyDisk: React.FC<{
  left: number;
  top: number;
  size?: number;
  rotate?: number;
  label?: string;
  dark?: boolean;
}> = ({left, top, size = 220, rotate = 0, label = '1988\n附录软盘', dark = true}) => (
  <div
    style={{
      position: 'absolute',
      left,
      top,
      width: size,
      height: size * 0.96,
      transform: `rotate(${rotate}deg)`,
      background: dark ? '#191d26' : '#2a3448',
      border: '2px solid rgba(255,255,255,0.16)',
      borderRadius: size * 0.03,
      boxShadow: '0 24px 34px rgba(0,0,0,0.45)',
      boxSizing: 'border-box',
    }}
  >
    <div
      style={{
        position: 'absolute',
        left: '30%',
        top: 0,
        width: '40%',
        height: '30%',
        background: '#b9bcc0',
        borderRadius: '0 0 3px 3px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '16%',
          top: '30%',
          width: '22%',
          height: '62%',
          background: '#333a40',
        }}
      />
    </div>
    <div
      style={{
        position: 'absolute',
        left: '9%',
        top: '38%',
        width: '82%',
        height: '48%',
        background: '#e4dbc7',
        padding: '7% 8%',
        boxSizing: 'border-box',
        color: '#2b2620',
      }}
    >
      <div
        style={{
          fontFamily: PIXEL,
          fontSize: size * 0.035,
          color: '#b33a2f',
          marginBottom: '7%',
        }}
      >
        ASCII
      </div>
      <div
        style={{
          fontFamily: SANS,
          fontSize: size * 0.065,
          lineHeight: 1.4,
          whiteSpace: 'pre-line',
          fontWeight: 700,
          letterSpacing: 1,
        }}
      >
        {label}
      </div>
      <div
        style={{
          marginTop: '8%',
          height: 1,
          width: '72%',
          background: 'rgba(43,38,32,0.35)',
        }}
      />
      <div
        style={{
          marginTop: '6%',
          fontFamily: SANS,
          fontSize: size * 0.03,
          opacity: 0.55,
          letterSpacing: 1,
        }}
      >
        3.5" / 2HD
      </div>
    </div>
    <div
      style={{
        position: 'absolute',
        right: '8%',
        bottom: '6%',
        width: '10%',
        height: '10%',
        border: '2px solid rgba(255,255,255,0.2)',
      }}
    />
  </div>
);

export const Cartridge: React.FC<{
  left: number;
  top: number;
  width?: number;
  rotate?: number;
  title?: string;
  platform?: string;
}> = ({left, top, width = 380, rotate = 0, title = 'Super Dante', platform = 'SUPER FAMICOM'}) => (
  <div
    style={{
      position: 'absolute',
      left,
      top,
      width,
      height: width * 0.62,
      transform: `rotate(${rotate}deg)`,
      filter: 'drop-shadow(0 24px 34px rgba(0,0,0,0.45))',
    }}
  >
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        background: '#c9c4b6',
        borderRadius: '10px 10px 4px 4px',
        border: '1px solid #8e897c',
      }}
    />
    <div
      style={{
        position: 'absolute',
        left: '7%',
        top: '7%',
        width: '86%',
        height: '62%',
        background: '#e8e1cf',
        border: '2px solid #8e897c',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '5% 7%',
          fontFamily: SERIF,
          fontWeight: 900,
          fontSize: width * 0.075,
          color: '#1d2a4a',
          lineHeight: 1.1,
        }}
      >
        {title}
      </div>
      <div
        style={{
          position: 'absolute',
          right: '6%',
          bottom: '8%',
          fontFamily: PIXEL,
          fontSize: width * 0.028,
          color: '#6b5a33',
        }}
      >
        {platform}
      </div>
      <div
        style={{
          position: 'absolute',
          left: '7%',
          top: '52%',
          width: '42%',
          height: '30%',
          background:
            'repeating-linear-gradient(90deg, #2a3c2c 0 6px, #3f5d3f 6px 12px)',
          opacity: 0.7,
        }}
      />
    </div>
    <div
      style={{
        position: 'absolute',
        left: '18%',
        right: '18%',
        bottom: '11%',
        height: '14%',
        background: '#2b2b2e',
        borderRadius: 2,
      }}
    />
    {Array.from({length: 12}, (_, index) => (
      <div
        key={index}
        style={{
          position: 'absolute',
          left: `${22 + index * 4.8}%`,
          bottom: '14%',
          width: 3,
          height: '8%',
          background: '#c9b27c',
          opacity: 0.7,
        }}
      />
    ))}
  </div>
);

export const DiscCase: React.FC<{
  left: number;
  top: number;
  width?: number;
  rotate?: number;
  title: string;
  subtitle?: string;
  year?: string;
}> = ({left, top, width = 260, rotate = 0, title, subtitle, year}) => (
  <div
    style={{
      position: 'absolute',
      left,
      top,
      width,
      height: width * 1.35,
      transform: `rotate(${rotate}deg)`,
      background:
        'linear-gradient(135deg, rgba(255,255,255,0.18), rgba(20,24,30,0.9) 38%, rgba(8,10,14,0.95))',
      border: '1px solid rgba(255,255,255,0.24)',
      boxShadow: '0 26px 44px rgba(0,0,0,0.5)',
      padding: width * 0.07,
      boxSizing: 'border-box',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        position: 'absolute',
        right: -width * 0.2,
        top: width * 0.1,
        width: width * 0.9,
        height: width * 0.9,
        borderRadius: '50%',
        background:
          'conic-gradient(from 210deg, rgba(120,180,210,0.35), rgba(230,180,120,0.3), rgba(160,220,190,0.25), rgba(120,180,210,0.35))',
        opacity: 0.5,
        filter: 'blur(1px)',
      }}
    />
    <div
      style={{
        position: 'relative',
        fontFamily: PIXEL,
        fontSize: width * 0.035,
        color: '#d9b25f',
        letterSpacing: 1,
      }}
    >
      PLAYSTATION
    </div>
    <div
      style={{
        position: 'absolute',
        left: width * 0.07,
        bottom: width * 0.16,
        right: width * 0.07,
        color: '#f0eee8',
      }}
    >
      <div
        style={{
          fontFamily: SERIF,
          fontWeight: 900,
          fontSize: width * 0.12,
          lineHeight: 1.18,
          letterSpacing: 1,
        }}
      >
        {title}
      </div>
      {subtitle ? (
        <div
          style={{
            marginTop: 6,
            fontFamily: SANS,
            fontSize: width * 0.048,
            opacity: 0.65,
            letterSpacing: 1,
          }}
        >
          {subtitle}
        </div>
      ) : null}
      <div
        style={{
          marginTop: 10,
          fontFamily: PIXEL,
          fontSize: width * 0.032,
          opacity: 0.6,
        }}
      >
        {year}
      </div>
    </div>
  </div>
);

export const RetroComputer: React.FC<{
  left: number;
  top: number;
  scale?: number;
  screen?: React.ReactNode;
  label?: string;
}> = ({left, top, scale = 1, screen, label = 'PC-9801'}) => (
  <div
    style={{
      position: 'absolute',
      left,
      top,
      width: 600 * scale,
      height: 520 * scale,
      filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.4))',
    }}
  >
    <div
      style={{
        position: 'absolute',
        left: 80 * scale,
        top: 0,
        width: 440 * scale,
        height: 350 * scale,
        background: '#cfc8b7',
        border: `${2 * scale}px solid #8f8879`,
        boxSizing: 'border-box',
        borderRadius: 8 * scale,
        padding: 18 * scale,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#101612',
          border: `${4 * scale}px solid #55504a`,
          boxSizing: 'border-box',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {screen ?? (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: PIXEL,
              fontSize: 16 * scale,
              color: '#6f9f72',
              letterSpacing: 2,
            }}
          >
            PC-9801
          </div>
        )}
      </div>
      <div
        style={{
          position: 'absolute',
          right: 22 * scale,
          bottom: 9 * scale,
          fontFamily: PIXEL,
          fontSize: 8 * scale,
          color: '#55504a',
        }}
      >
        {label}
      </div>
    </div>
    <div
      style={{
        position: 'absolute',
        left: 30 * scale,
        top: 358 * scale,
        width: 540 * scale,
        height: 150 * scale,
        background: '#d6cfbe',
        border: `${2 * scale}px solid #8f8879`,
        borderRadius: 6 * scale,
        boxSizing: 'border-box',
      }}
    >
      {Array.from({length: 60}, (_, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: (28 + (index % 15) * 33) * scale,
            top: (24 + Math.floor(index / 15) * 26) * scale,
            width: 26 * scale,
            height: 20 * scale,
            background: '#c3bba8',
            border: `1px solid #9a9281`,
            borderRadius: 2 * scale,
          }}
        />
      ))}
      <div
        style={{
          position: 'absolute',
          left: 30 * scale,
          bottom: 18 * scale,
          width: 90 * scale,
          height: 30 * scale,
          background: '#b8b0a0',
          border: `1px solid #8f8879`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 132 * scale,
          bottom: 18 * scale,
          width: 90 * scale,
          height: 30 * scale,
          background: '#b8b0a0',
          border: `1px solid #8f8879`,
        }}
      />
    </div>
  </div>
);

export const GameConsole: React.FC<{
  kind: 'sfc' | 'ps1' | 'ds' | '3ds' | 'switch' | 'ps5';
  left: number;
  top: number;
  scale?: number;
  label?: string;
}> = ({kind, left, top, scale = 1, label}) => {
  const base: React.CSSProperties = {
    position: 'absolute',
    left,
    top,
    transform: `scale(${scale})`,
    transformOrigin: '0 0',
    filter: 'drop-shadow(0 26px 34px rgba(0,0,0,0.45))',
  };
  const labelEl = label ? (
    <div
      style={{
        marginTop: 18,
        fontFamily: SANS,
        fontSize: 18,
        letterSpacing: 2,
        color: 'rgba(236,231,218,0.55)',
      }}
    >
      {label}
    </div>
  ) : null;
  if (kind === 'sfc') {
    return (
      <div style={base}>
        <div
          style={{
            width: 420,
            height: 230,
            background: 'linear-gradient(180deg,#d9d4c6,#bdb7a6)',
            borderRadius: 10,
            border: '2px solid #8d887c',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 30,
              top: 24,
              width: 360,
              height: 92,
              background: '#b1aa99',
              borderRadius: 4,
              border: '1px solid #8d887c',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 22,
              bottom: 26,
              width: 44,
              height: 16,
              background: '#5b3a6b',
              borderRadius: 8,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 76,
              bottom: 26,
              width: 44,
              height: 16,
              background: '#5b3a6b',
              borderRadius: 8,
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: 28,
              bottom: 22,
              width: 100,
              height: 10,
              background: '#8d887c',
            }}
          />
        </div>
        {labelEl}
      </div>
    );
  }
  if (kind === 'ps1') {
    return (
      <div style={base}>
        <div
          style={{
            width: 430,
            height: 150,
            background: 'linear-gradient(180deg,#b9b5ab,#8f8b82)',
            borderRadius: 8,
            border: '2px solid #6c6962',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 32,
              top: 20,
              width: 190,
              height: 110,
              borderRadius: '50%',
              background: '#9c9890',
              border: '3px solid #726e66',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 246,
              top: 28,
              width: 120,
              height: 80,
              background: '#84817a',
              border: '2px solid #6c6962',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: 24,
              bottom: 18,
              fontFamily: PIXEL,
              fontSize: 9,
              color: '#47453f',
            }}
          >
            PlayStation
          </div>
        </div>
        {labelEl}
      </div>
    );
  }
  if (kind === 'switch') {
    return (
      <div style={base}>
        <div
          style={{
            width: 340,
            height: 150,
            background: '#1f2228',
            borderRadius: 12,
            border: '2px solid #3a3e46',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 88,
              top: 10,
              width: 164,
              height: 130,
              background: '#11151a',
              border: '3px solid #2a2e35',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 8,
              top: 10,
              width: 70,
              height: 130,
              background: '#3b86a8',
              borderRadius: '12px 4px 4px 12px',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: 8,
              top: 10,
              width: 70,
              height: 130,
              background: '#b34b45',
              borderRadius: '4px 12px 12px 4px',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 132,
              top: 52,
              width: 76,
              height: 46,
              background: '#243c33',
              opacity: 0.7,
            }}
          />
        </div>
        {labelEl}
      </div>
    );
  }
  if (kind === 'ds' || kind === '3ds') {
    return (
      <div style={base}>
        <div
          style={{
            width: 260,
            height: 320,
            background: 'linear-gradient(180deg,#d9d4c6,#b6b1a6)',
            borderRadius: '14px 14px 8px 8px',
            border: '2px solid #8d887c',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 20,
              top: 20,
              width: 220,
              height: 125,
              background: '#20262a',
              border: '3px solid #55504a',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 20,
              bottom: 86,
              width: 220,
              height: 105,
              background: '#20262a',
              border: '3px solid #55504a',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 100,
              bottom: 52,
              width: 60,
              height: 18,
              background: '#6c6a63',
              borderRadius: 9,
            }}
          />
          {kind === '3ds' ? (
            <div
              style={{
                position: 'absolute',
                right: 28,
                top: 162,
                width: 36,
                height: 18,
                background: '#b33a2f',
                borderRadius: 4,
              }}
            />
          ) : null}
        </div>
        {labelEl}
      </div>
    );
  }
  if (kind === 'ps5') {
    return (
      <div style={base}>
        <div
          style={{
            width: 170,
            height: 420,
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg,#f4f1ea,#d7d3ca 58%,#c2beb4)',
              borderRadius: '8px 8px 6px 6px',
              border: '1px solid #9b978c',
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.6)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 26,
              top: 20,
              width: 118,
              height: 310,
              background: '#14171b',
              borderRadius: 4,
              border: '2px solid #2c3036',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 40,
              top: 42,
              width: 90,
              height: 8,
              background: 'rgba(96,150,210,0.55)',
              boxShadow: '0 0 18px rgba(96,150,210,0.35)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 44,
              top: 286,
              width: 82,
              height: 3,
              background: '#4a4e55',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 16,
              bottom: 0,
              width: 138,
              height: 28,
              background: 'linear-gradient(180deg,#b9b5ab,#8f8b82)',
              borderRadius: 4,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 30,
              bottom: 22,
              width: 8,
              height: 14,
              background: '#6c6962',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: 30,
              bottom: 22,
              width: 8,
              height: 14,
              background: '#6c6962',
            }}
          />
        </div>
        {labelEl}
      </div>
    );
  }
  return (
    <div style={base}>
      <div
        style={{
          width: 170,
          height: 360,
          background: 'linear-gradient(90deg,#ece9e1,#c8c5bc)',
          borderRadius: '10px 10px 20px 20px',
          border: '1px solid #9b978c',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 20,
            top: 18,
            width: 130,
            height: 250,
            background: '#15181c',
            border: '2px solid #3a3d42',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 54,
            bottom: 42,
            width: 62,
            height: 3,
            background: '#3a3d42',
          }}
        />
      </div>
      {labelEl}
    </div>
  );
};

export const DossierPhoto: React.FC<{
  style?: React.CSSProperties;
  tone?: string;
  variant?: number;
  label?: string;
}> = ({style, tone = '#7a6a52', variant = 0, label}) => (
  <div
    style={{
      position: 'relative',
      background: '#cec2a9',
      border: '1px solid rgba(60,45,25,0.35)',
      overflow: 'hidden',
      ...style,
    }}
  >
    <div
      style={{
        position: 'absolute',
        inset: '6%',
        background:
          variant % 3 === 0
            ? 'linear-gradient(155deg,#a8997d,#615847)'
            : variant % 3 === 1
              ? 'linear-gradient(155deg,#9aa39a,#4a534b)'
              : 'linear-gradient(155deg,#a89b8c,#5b4d3d)',
      }}
    />
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 200 260"
      preserveAspectRatio="xMidYMid slice"
      style={{position: 'absolute', inset: 0}}
    >
      <rect width="200" height="260" fill={tone} opacity="0.25" />
      <ellipse cx="100" cy="96" rx="46" ry="58" fill="#2b2822" opacity="0.55" />
      <path
        d="M58 96 Q100 30 142 96 Q138 66 100 52 Q62 66 58 96 Z"
        fill="#171512"
        opacity="0.8"
      />
      <path
        d="M46 260 Q48 176 100 166 Q152 176 154 260 Z"
        fill="#1c1a16"
        opacity="0.8"
      />
      <rect x="86" y="110" width="28" height="10" fill="#d8cbb0" opacity="0.35" />
      <rect x="92" y="108" width="4" height="4" fill="#161411" />
      <rect x="106" y="108" width="4" height="4" fill="#161411" />
      <path d="M94 128 Q100 134 106 128" stroke="#161411" strokeWidth="2" fill="none" opacity="0.6" />
    </svg>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage:
          'radial-gradient(circle, rgba(20,16,10,0.22) 1px, transparent 1.3px)',
        backgroundSize: '4px 4px',
        mixBlendMode: 'multiply',
      }}
    />
    {label ? (
      <div
        style={{
          position: 'absolute',
          left: 12,
          bottom: 10,
          fontFamily: SANS,
          fontSize: 14,
          letterSpacing: 2,
          color: 'rgba(236,231,218,0.7)',
        }}
      >
        {label}
      </div>
    ) : null}
  </div>
);
