import React from 'react';
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
} from './theme';
import {
  Caption,
  Halftone,
  PaperBG,
  Reconstruction,
  Scanlines,
} from './components';
import {DossierPhoto, RetroComputer} from './objects';
import {useSceneFrame} from './sceneClock';

const camera = (frame: number, strength = 1): React.CSSProperties => ({
  transform: `scale(${1.02 + (frame / (30 * 40)) * 0.035 * strength}) translate(${
    -6 * strength
  }px, ${-4 * strength}px)`,
});

export const Tokyo1977: React.FC = () => {
  const frame = useSceneFrame();
  const slide = interpolatePan(frame);
  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden', background: '#8b5b3b'}}>
      <div style={{position: 'absolute', inset: 0, ...camera(frame, 1.3)}}>
        <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="sky77" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#d6a36a" />
              <stop offset="0.52" stopColor="#b47a50" />
              <stop offset="1" stopColor="#5d3a2c" />
            </linearGradient>
            <linearGradient id="ground77" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#4a362c" />
              <stop offset="1" stopColor="#211a17" />
            </linearGradient>
          </defs>
          <rect width="1920" height="1080" fill="url(#sky77)" />
          <circle cx="1500" cy="195" r="86" fill="#f0c98d" opacity="0.55" />
          <g transform={`translate(${slide} 0)`}>
            {[
              [80, 300, 250, 560],
              [330, 420, 190, 440],
              [520, 235, 320, 625],
              [840, 355, 210, 505],
              [1050, 280, 280, 580],
              [1330, 390, 250, 470],
              [1580, 245, 340, 615],
            ].map(([x, y, w, h], index) => (
              <g key={index}>
                <rect x={x} y={y} width={w} height={h} fill={index % 2 ? '#3c2c26' : '#32231f'} />
                <rect x={x} y={y} width={w} height={10} fill="#5e4434" opacity="0.6" />
                {Array.from({length: Math.floor((h - 80) / 54)}, (_, row) =>
                  Array.from({length: Math.floor((w - 30) / 42)}, (_, col) => {
                    const lit = hash(index * 91 + row * 13 + col * 7) > 0.45;
                    return (
                      <rect
                        key={`${row}-${col}`}
                        x={x + 18 + col * 42}
                        y={y + 42 + row * 54}
                        width="18"
                        height="22"
                        fill={lit ? '#e0b271' : '#211917'}
                        opacity={lit ? 0.5 : 0.7}
                      />
                    );
                  }),
                )}
              </g>
            ))}
            <g transform="translate(560 190)">
              <rect x="0" y="0" width="290" height="96" fill="#1e1a18" stroke="#efe0c2" strokeWidth="3" />
              <text x="24" y="64" fontFamily="monospace" fontSize="52" fill="#f2dfbd" letterSpacing="6">
                ASCII
              </text>
              <rect x="8" y="96" width="8" height="90" fill="#2a211d" />
              <rect x="274" y="96" width="8" height="90" fill="#2a211d" />
            </g>
            <g transform="translate(1220 400)">
              <rect x="0" y="0" width="210" height="78" fill="#1c1816" stroke="#c9a06a" strokeWidth="2" />
              <text x="18" y="50" fontFamily="sans-serif" fontSize="34" fill="#d9b887" letterSpacing="7">
                秋葉原
              </text>
            </g>
            <g transform="translate(1400 520)">
              <rect x="0" y="0" width="150" height="62" fill="#221b17" />
              <text x="14" y="40" fontFamily="sans-serif" fontSize="26" fill="#d98a67" letterSpacing="4">
                電気街
              </text>
            </g>
            <rect y="840" width="1920" height="240" fill="url(#ground77)" />
            <g stroke="#7e5e45" strokeWidth="2" opacity="0.4">
              <line x1="0" y1="884" x2="1920" y2="884" />
              <line x1="0" y1="970" x2="1920" y2="970" />
              <line x1="420" y1="840" x2="300" y2="1080" />
              <line x1="1140" y1="840" x2="1320" y2="1080" />
            </g>
            <g fill="#1b1512">
              <path d="M862 846 Q880 742 904 742 Q926 744 936 846 Z" />
              <circle cx="902" cy="712" r="27" />
              <path d="M930 846 Q948 770 972 770 Q994 778 998 846 Z" />
              <circle cx="970" cy="744" r="24" />
              <path d="M1006 848 Q1020 790 1040 790 Q1058 796 1062 848 Z" />
              <circle cx="1038" cy="768" r="21" />
            </g>
            <g transform="translate(690 268) rotate(-2)">
              <rect width="38" height="550" fill="#211b17" />
              <rect x="0" y="0" width="190" height="9" fill="#211b17" />
              <rect x="150" y="0" width="5" height="180" fill="#211b17" />
              <rect x="152" y="176" width="54" height="20" fill="#3a2b22" />
            </g>
          </g>
          <rect width="1920" height="1080" fill="#b33a2f" opacity="0.08" />
        </svg>
      </div>
      <Halftone opacity={0.12} size={5} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(20,12,8,0.3) 0%, rgba(20,12,8,0) 35%, rgba(20,12,8,0) 70%, rgba(20,12,8,0.55) 100%)',
        }}
      />
      <Reconstruction text="街景复原示意" />
      <div style={{position: 'absolute', left: 90, top: 74}}>
        <div
          style={{
            fontFamily: PIXEL,
            fontSize: 13,
            letterSpacing: 2,
            color: '#e6cba3',
            opacity: 0.75,
          }}
        >
          1977.05 / TOKYO
        </div>
        <div
          style={{
            marginTop: 14,
            fontFamily: SERIF,
            fontWeight: 900,
            fontSize: 40,
            letterSpacing: 4,
            color: '#f0dfc1',
          }}
        >
          秋叶原，电气街
        </div>
      </div>
      <Caption dark={false}>东京 · 千代田区 / 1977 年 5 月</Caption>
    </div>
  );
};

const interpolatePan = (frame: number) =>
  Math.round(-24 + 24 * Math.min(1, frame / (FPS * 18)));

export const FoundersDossier: React.FC = () => {
  const frame = useSceneFrame();
  const names = [
    {name: '郡司明郎', role: '社长', variant: 0, tone: '#6f5f49'},
    {name: '西和彦', role: '21 岁', variant: 1, tone: '#667066'},
    {name: '塚本慶一郎', role: '编辑', variant: 2, tone: '#705a4b'},
  ];
  return (
    <PaperBG>
      <div style={{position: 'absolute', inset: 0, ...camera(frame, 0.5)}}>
        <div
          style={{
            position: 'absolute',
            left: 126,
            top: 108,
            fontFamily: SANS,
            fontSize: 21,
            letterSpacing: 5,
            color: 'rgba(28,26,22,0.52)',
          }}
        >
          ASCII 出版 / 创业档案 001
        </div>
        <div
          style={{
            position: 'absolute',
            left: 126,
            top: 160,
            fontFamily: SERIF,
            fontWeight: 900,
            fontSize: 78,
            letterSpacing: 4,
            color: C.ink,
          }}
        >
          三个人
        </div>
        <div
          style={{
            position: 'absolute',
            left: 130,
            top: 266,
            width: 230,
            height: 1,
            background: 'rgba(28,26,22,0.32)',
          }}
        />
        <div style={{position: 'absolute', left: 640, top: 292, display: 'flex', gap: 44}}>
          {names.map((person, index) => {
            const enter = Math.min(
              1,
              Math.max(0, (frame / FPS - 0.8 - index * 0.5) / 0.7),
            );
            return (
              <div
                key={person.name}
                style={{
                  width: 300,
                  opacity: enter,
                  transform: `translateY(${(1 - enter) * 32}px) rotate(${
                    index === 1 ? -1.2 : 1
                  }deg)`,
                }}
              >
                <DossierPhoto
                  style={{width: 300, height: 390}}
                  tone={person.tone}
                  variant={person.variant}
                  label={`0${index + 1}`}
                />
                <div
                  style={{
                    marginTop: 18,
                    fontFamily: SERIF,
                    fontWeight: 900,
                    fontSize: 34,
                    letterSpacing: 2,
                    color: C.ink,
                  }}
                >
                  {person.name}
                </div>
                <div
                  style={{
                    marginTop: 6,
                    fontFamily: SANS,
                    fontSize: 17,
                    letterSpacing: 2,
                    color: 'rgba(28,26,22,0.5)',
                  }}
                >
                  {person.role}
                </div>
              </div>
            );
          })}
        </div>
        <div
          style={{
            position: 'absolute',
            left: 1120,
            bottom: 120,
            width: 560,
            textAlign: 'right',
            opacity: Math.min(1, Math.max(0, (frame / FPS - 2.2) / 0.8)),
          }}
        >
          <div
            style={{
              fontFamily: SANS,
              fontSize: 19,
              letterSpacing: 5,
              color: 'rgba(28,26,22,0.45)',
            }}
          >
            启动资金
          </div>
          <div
            style={{
              fontFamily: SERIF,
              fontWeight: 900,
              fontSize: 108,
              lineHeight: 1.15,
              color: C.ink,
            }}
          >
            300 万
            <span style={{fontSize: 56, marginLeft: 12}}>日元</span>
          </div>
          <div
            style={{
              marginTop: 14,
              fontFamily: SANS,
              fontSize: 21,
              letterSpacing: 2,
              color: 'rgba(28,26,22,0.55)',
            }}
          >
            西和彦从父亲那里拿的钱
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            left: 520,
            top: 180,
            width: 180,
            height: 180,
            border: `5px solid ${C.red}`,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'rotate(-14deg)',
            opacity: 0.24,
          }}
        >
          <div
            style={{
              fontFamily: SERIF,
              fontWeight: 900,
              fontSize: 38,
              color: C.red,
              lineHeight: 1.2,
              textAlign: 'center',
            }}
          >
            1977
            <br />
            创业
          </div>
        </div>
      </div>
      <Reconstruction text="人物为复原示意" dark />
      <Caption dark>ASCII 出版 · 东京 / 1977</Caption>
    </PaperBG>
  );
};

export const Waseda1975: React.FC = () => {
  const frame = useSceneFrame();
  const paperFall = (frame / FPS) * 22;
  return (
    <PaperBG tint={0.02}>
      <div style={{position: 'absolute', inset: 0, ...camera(frame, 0.6)}}>
        <div
          style={{
            position: 'absolute',
            inset: '7% 8% 10%',
            background: 'linear-gradient(180deg,#b8b6aa 0%,#8e8c80 58%,#5c5b53 100%)',
            overflow: 'hidden',
            filter: 'grayscale(0.5)',
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 1600 800" preserveAspectRatio="xMidYMid slice">
            <rect width="1600" height="800" fill="#9b9a8e" />
            <rect y="540" width="1600" height="260" fill="#56564e" />
            <g fill="#3b3b35">
              <rect x="380" y="260" width="70" height="290" />
              <rect x="1150" y="260" width="70" height="290" />
              <rect x="300" y="210" width="1000" height="46" />
              <path d="M250 210 L800 120 L1350 210 Z" />
              <rect x="520" y="330" width="560" height="220" />
            </g>
            <g fill="#77776c">
              <rect x="560" y="360" width="480" height="150" />
              <rect x="600" y="390" width="400" height="90" fill="#5b5b52" />
            </g>
            <text
              x="800"
              y="398"
              textAnchor="middle"
              fontFamily="serif"
              fontSize="48"
              letterSpacing="18"
              fill="#d9d3c2"
            >
              早稲田大学
            </text>
            {Array.from({length: 7}, (_, index) => (
              <g key={index} fill="#2b2b27" opacity={0.65}>
                <circle cx={620 + index * 60} cy={610 + (index % 2) * 8} r="16" />
                <rect x={604 + index * 60} y={628 + (index % 2) * 8} width="32" height="86" />
              </g>
            ))}
          </svg>
          <Halftone opacity={0.16} size={4} />
        </div>
        <div
          style={{
            position: 'absolute',
            left: 170,
            top: 170,
            width: 380,
            height: 480,
            background: '#efe7d5',
            boxShadow: '0 22px 50px rgba(0,0,0,0.28)',
            transform: `translateY(${Math.sin(frame / 40) * 2}px) rotate(-3deg)`,
            padding: 34,
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              fontFamily: SANS,
              fontSize: 18,
              letterSpacing: 4,
              color: 'rgba(28,26,22,0.5)',
            }}
          >
            入学試験 / 1973–1975
          </div>
          <div
            style={{
              marginTop: 30,
              fontFamily: SERIF,
              fontWeight: 900,
              fontSize: 48,
              color: C.ink,
              lineHeight: 1.5,
            }}
          >
            东京大学
            <br />
            两次
          </div>
          <div
            style={{
              marginTop: 26,
              display: 'flex',
              gap: 18,
              fontFamily: SERIF,
              fontWeight: 900,
              fontSize: 80,
              color: C.red,
              opacity: 0.8,
            }}
          >
            <span>×</span>
            <span>×</span>
          </div>
          <div
            style={{
              marginTop: 32,
              fontFamily: SANS,
              fontSize: 19,
              lineHeight: 1.8,
              letterSpacing: 1,
              color: 'rgba(28,26,22,0.55)',
            }}
          >
            第三次，他没考。
            <br />
            他去创业了。
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            right: 160,
            top: 220,
            fontFamily: SERIF,
            fontWeight: 900,
            fontSize: 340,
            color: C.ink,
            opacity: 0.82,
            lineHeight: 1,
          }}
        >
          21
          <span style={{fontSize: 72, marginLeft: 18}}>岁</span>
        </div>
        <div
          style={{
            position: 'absolute',
            right: 170,
            top: 600,
            width: 420,
            textAlign: 'right',
            fontFamily: SANS,
            fontSize: 20,
            lineHeight: 1.9,
            letterSpacing: 1,
            color: 'rgba(28,26,22,0.6)',
          }}
        >
          早稻田大学理工学部
          <br />
          还没毕业
        </div>
        {Array.from({length: 6}, (_, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: 720 + hash(index * 39) * 680,
              top: ((paperFall + index * 130) % 900) - 60,
              width: 120,
              height: 150,
              background: '#f1e9d8',
              boxShadow: '0 10px 24px rgba(0,0,0,0.18)',
              transform: `rotate(${hash(index * 11) * 40 - 20}deg)`,
              opacity: 0.75,
            }}
          >
            <div
              style={{
                margin: 18,
                height: 4,
                background: 'rgba(28,26,22,0.18)',
                boxShadow:
                  '0 14px 0 rgba(28,26,22,0.12), 0 28px 0 rgba(28,26,22,0.12), 0 42px 0 rgba(28,26,22,0.12)',
              }}
            />
          </div>
        ))}
      </div>
      <Caption dark>早稻田大学 · 1975 / 复原示意</Caption>
    </PaperBG>
  );
};

export const Meeting1978: React.FC = () => {
  const frame = useSceneFrame();
  return (
    <div style={{position: 'absolute', inset: 0, background: '#0c0d10', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, ...camera(frame, 0.8)}}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at 66% 42%, rgba(198,164,108,0.34) 0%, rgba(198,164,108,0.06) 34%, rgba(8,9,12,0.98) 72%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 240,
            top: 110,
            width: 1440,
            height: 860,
            background: 'linear-gradient(180deg,#1a1a1c,#0b0b0d)',
            border: '1px solid rgba(236,231,218,0.08)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              right: 110,
              top: 80,
              width: 560,
              height: 480,
              background:
                'linear-gradient(180deg, rgba(200,168,112,0.25), rgba(120,92,58,0.08))',
              border: '2px solid rgba(236,231,218,0.18)',
            }}
          >
            <svg width="100%" height="100%" viewBox="0 0 560 480">
              {Array.from({length: 6}, (_, index) => (
                <line
                  key={index}
                  x1={index * 94}
                  y1={0}
                  x2={index * 94}
                  y2={480}
                  stroke="rgba(236,231,218,0.14)"
                />
              ))}
              <line x1="280" y1="0" x2="280" y2="480" stroke="rgba(236,231,218,0.3)" strokeWidth="2" />
            </svg>
          </div>
          <div
            style={{
              position: 'absolute',
              left: 170,
              bottom: 180,
              width: 700,
              height: 24,
              background: '#1f1c18',
              boxShadow: '0 12px 0 rgba(0,0,0,0.6)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 340,
              bottom: 204,
              width: 280,
              height: 180,
              background: 'linear-gradient(180deg,#2a2a2e,#141417)',
              border: '2px solid rgba(236,231,218,0.12)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 18,
                background: '#43624b',
                boxShadow: '0 0 46px rgba(110,180,130,0.25)',
                fontFamily: PIXEL,
                fontSize: 13,
                color: '#bfe0c2',
                padding: 14,
                lineHeight: 2.1,
              }}
            >
              MICROSOFT
              <br />
              BASIC
            </div>
          </div>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1440 860"
            style={{position: 'absolute', inset: 0}}
          >
            <g fill="#07080a">
              <circle cx="680" cy="330" r="42" />
              <path d="M604 372 Q640 366 680 366 Q722 366 756 372 L790 640 L566 640 Z" />
              <circle cx="930" cy="346" r="38" />
              <path d="M864 382 Q900 376 934 376 Q970 376 1002 382 L1012 640 L854 640 Z" />
            </g>
            <g fill="#07080a">
              <rect x="610" y="410" width="70" height="120" transform="rotate(14 610 410)" />
              <rect x="610" y="410" width="70" height="120" transform="rotate(8 610 410)" />
              <rect x="600" y="410" width="150" height="34" transform="rotate(10 600 410)" />
            </g>
          </svg>
          <div
            style={{
              position: 'absolute',
              left: 170,
              top: 110,
              fontFamily: PIXEL,
              fontSize: 16,
              letterSpacing: 2,
              color: 'rgba(217,178,95,0.75)',
            }}
          >
            JUNE 1978 / USA
          </div>
          <div
            style={{
              position: 'absolute',
              left: 170,
              top: 148,
              fontFamily: SERIF,
              fontWeight: 900,
              fontSize: 68,
              letterSpacing: 3,
              color: '#efe6d4',
            }}
          >
            两个年轻人
          </div>
          <div
            style={{
              position: 'absolute',
              left: 172,
              top: 232,
              fontFamily: SANS,
              fontSize: 22,
              letterSpacing: 2,
              color: 'rgba(236,231,218,0.55)',
            }}
          >
            一个 22 岁，一个 21 岁
          </div>
          <div
            style={{
              position: 'absolute',
              right: 106,
              bottom: 90,
              border: '1px solid rgba(217,178,95,0.45)',
              padding: '20px 30px',
              fontFamily: PIXEL,
              fontSize: 17,
              letterSpacing: 2,
              color: '#d9b25f',
              transform: 'rotate(-2deg)',
            }}
          >
            ASCII MICROSOFT
            <div
              style={{
                marginTop: 8,
                fontFamily: SANS,
                fontSize: 13,
                letterSpacing: 3,
                color: 'rgba(236,231,218,0.55)',
              }}
            >
              TOKYO / 1979
            </div>
          </div>
        </div>
      </div>
      <Halftone opacity={0.1} size={5} color="255,255,255" />
      <Reconstruction text="场景复原示意" />
      <Caption>1978 年 6 月 · 美国 / 比尔·盖茨与西和彦</Caption>
    </div>
  );
};

export const MSXLineup: React.FC = () => {
  const frame = useSceneFrame();
  const pan = -40 + Math.min(1, frame / (FPS * 14)) * 40;
  const machines = [
    {name: 'SONY HB-55', color: '#cfc8b5'},
    {name: 'PANASONIC CF-2700', color: '#b9b3a4'},
    {name: 'MSX', color: '#d5cec0'},
    {name: 'MSX', color: '#c4bcab'},
    {name: 'MSX', color: '#c9c2b2'},
  ];
  return (
    <div style={{position: 'absolute', inset: 0, background: '#08090b', overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 32%, rgba(87,105,130,0.28) 0%, rgba(8,9,11,1) 70%)',
        }}
      />
      <div style={{position: 'absolute', inset: 0, transform: `translateX(${pan}px)`}}>
        {machines.map((machine, index) => (
          <RetroComputer
            key={machine.name}
            left={80 + index * 380}
            top={420 - (index % 2) * 26}
            scale={0.82}
            label={machine.name}
            screen={
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg,#13211a,#0a120e)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: PIXEL,
                  fontSize: 13,
                  letterSpacing: 1,
                  color: '#78b281',
                  boxShadow: 'inset 0 0 40px rgba(90,160,110,0.2)',
                }}
              >
                MSX
              </div>
            }
          />
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 240,
          background:
            'linear-gradient(to top, rgba(8,9,11,1) 0%, rgba(8,9,11,0.9) 45%, rgba(8,9,11,0) 100%)',
        }}
      />
      <div style={{position: 'absolute', left: 120, top: 120}}>
        <div
          style={{
            fontFamily: SANS,
            fontSize: 20,
            letterSpacing: 5,
            color: 'rgba(236,231,218,0.45)',
          }}
        >
          MSX / 1983
        </div>
        <div
          style={{
            marginTop: 18,
            fontFamily: SERIF,
            fontWeight: 900,
            fontSize: 74,
            letterSpacing: 4,
            color: '#ece7da',
          }}
        >
          同一种语言
        </div>
        <div
          style={{
            marginTop: 14,
            fontFamily: SANS,
            fontSize: 24,
            letterSpacing: 1,
            color: 'rgba(236,231,218,0.55)',
          }}
        >
          索尼、NEC、松下，都跟着他做。
        </div>
      </div>
      <Reconstruction text="机种复原示意" />
      <Caption>MSX 机群 / 1983</Caption>
    </div>
  );
};

export const MechaDino: React.FC = () => {
  const frame = useSceneFrame();
  const drift = Math.min(1, frame / (FPS * 16));
  return (
    <div style={{position: 'absolute', inset: 0, background: '#070a0d', overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg,#0b1117 0%,#111a20 40%,#1c2429 72%,#090b0e 100%)',
        }}
      />
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1920 1080"
        style={{position: 'absolute', inset: 0}}
      >
        {Array.from({length: 90}, (_, index) => (
          <circle
            key={index}
            cx={hash(index * 7) * 1920}
            cy={hash(index * 13 + 4) * 520}
            r={hash(index * 17) > 0.82 ? 2 : 1}
            fill="#e6e0d2"
            opacity={0.15 + hash(index * 23) * 0.4}
          />
        ))}
        <circle cx="1480" cy="180" r="66" fill="#d8cfb8" opacity="0.35" />
        <g transform={`translate(${-20 + drift * 20} 0)`}>
          {[
            [0, 520, 240, 560],
            [220, 610, 300, 470],
            [500, 470, 270, 610],
            [760, 560, 250, 520],
            [990, 430, 320, 650],
            [1290, 570, 240, 510],
            [1510, 490, 410, 590],
          ].map(([x, y, w, h], index) => (
            <g key={index}>
              <rect x={x} y={y} width={w} height={h} fill={index % 2 ? '#0f1317' : '#0c1014'} />
              {Array.from({length: Math.floor((h - 60) / 50)}, (_, row) =>
                Array.from({length: Math.floor((w - 24) / 38)}, (_, col) => {
                  const lit = hash(index * 33 + row * 19 + col * 5) > 0.68;
                  return lit ? (
                    <rect
                      key={`${row}-${col}`}
                      x={x + 14 + col * 38}
                      y={y + 34 + row * 50}
                      width="13"
                      height="18"
                      fill="#c7a36c"
                      opacity="0.35"
                    />
                  ) : null;
                }),
              )}
            </g>
          ))}
          <g transform={`translate(${1140 + drift * 30} 190)`}>
            <g fill="#05070a">
              <path d="M90 400 L150 260 L260 230 L330 150 L470 120 L560 180 L610 310 L560 380 L430 400 L340 380 L250 410 Z" />
              <path d="M470 130 L620 60 L760 90 L830 160 L760 210 L640 190 L560 180 Z" />
              <path d="M560 190 L690 170 L760 240 L690 280 Z" />
              <path d="M150 260 L70 180 L110 150 L180 215 Z" />
              <path d="M180 380 L120 500 L230 480 L280 400 Z" />
              <path d="M520 380 L560 520 L640 500 L610 390 Z" />
            </g>
            <g fill="#b33a2f">
              <circle cx="690" cy="135" r="9" />
              <circle cx="740" cy="145" r="6" />
            </g>
            <path
              d="M90 400 L610 380"
              stroke="#1b222a"
              strokeWidth="16"
            />
            <g stroke="#24303a" strokeWidth="8">
              <line x1="280" y1="400" x2="230" y2="520" />
              <line x1="400" y1="400" x2="420" y2="520" />
              <line x1="520" y1="400" x2="560" y2="520" />
            </g>
            <path
              d="M760 90 L880 30"
              stroke="#0a0d10"
              strokeWidth="8"
            />
          </g>
          <g transform="translate(1600 120)">
            <ellipse cx="100" cy="40" rx="120" ry="46" fill="#171e24" stroke="#3a4148" strokeWidth="2" />
            <text
              x="100"
              y="48"
              textAnchor="middle"
              fontFamily="monospace"
              fontSize="22"
              letterSpacing="4"
              fill="#c7a36c"
            >
              ASCII
            </text>
          </g>
          <g stroke="rgba(214,190,140,0.18)" strokeWidth="2">
            <line x1="1180" y1="0" x2="1390" y2="700" />
            <line x1="1310" y1="0" x2="1460" y2="700" />
          </g>
        </g>
      </svg>
      <Halftone opacity={0.12} size={4} color="220,210,190" />
      <div
        style={{
          position: 'absolute',
          left: 120,
          top: 120,
          fontFamily: SANS,
          fontSize: 22,
          letterSpacing: 5,
          color: 'rgba(236,231,218,0.55)',
        }}
      >
        1986 / TOKYO
      </div>
      <div
        style={{
          position: 'absolute',
          left: 120,
          top: 168,
          fontFamily: SERIF,
          fontWeight: 900,
          fontSize: 86,
          letterSpacing: 6,
          color: '#ece7da',
          lineHeight: 1.2,
        }}
      >
        楼顶的恐龙
      </div>
      <div
        style={{
          position: 'absolute',
          left: 124,
          top: 286,
          fontFamily: SANS,
          fontSize: 22,
          letterSpacing: 2,
          color: 'rgba(236,231,218,0.52)',
        }}
      >
        100 万美元的广告 / 荒诞、突兀
      </div>
      <Reconstruction text="场景复原示意" />
      <Caption>东京 · 1986 / 机械恐龙</Caption>
    </div>
  );
};

export const PressConference: React.FC = () => {
  const frame = useSceneFrame();
  const flashSeed = Math.floor(frame / 3);
  return (
    <div style={{position: 'absolute', inset: 0, background: '#0a0a0b', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, filter: 'grayscale(1)'}}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at 50% 30%, rgba(235,232,224,0.32) 0%, rgba(50,50,52,0.15) 34%, rgba(6,6,7,1) 76%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 520,
            top: 410,
            width: 880,
            height: 300,
            background: 'linear-gradient(180deg,#1a1a1b,#080809)',
            borderTop: '2px solid rgba(255,255,255,0.12)',
          }}
        />
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1920 1080"
          style={{position: 'absolute', inset: 0}}
        >
          <g fill="#080809">
            <circle cx="960" cy="320" r="62" />
            <path d="M840 400 Q900 380 960 380 Q1020 380 1080 400 L1130 700 L790 700 Z" />
            <path d="M840 430 L760 700 L820 720 L900 520 Z" />
          </g>
          <g>
            {Array.from({length: 26}, (_, index) => {
              const x = 200 + hash(index * 17 + flashSeed) * 1500;
              const y = 180 + hash(index * 31 + flashSeed) * 520;
              const on = hash(index * 7 + flashSeed * 3) > 0.5;
              return on ? (
                <g key={index}>
                  <circle cx={x} cy={y} r={3 + hash(index * 11) * 4} fill="#f4f1e7" opacity="0.9" />
                  <line x1={x} y1={y} x2={x + 18} y2={y - 12} stroke="#f4f1e7" strokeWidth="2" opacity="0.35" />
                  <line x1={x} y1={y} x2={x - 14} y2={y + 16} stroke="#f4f1e7" strokeWidth="2" opacity="0.25" />
                </g>
              ) : null;
            })}
          </g>
          <g fill="#111112">
            {Array.from({length: 14}, (_, index) => (
              <g key={index}>
                <circle cx={200 + index * 120} cy={780 + (index % 3) * 14} r="28" />
                <rect x={166 + index * 120} y={810 + (index % 3) * 14} width="68" height="170" />
              </g>
            ))}
          </g>
        </svg>
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            background: `rgba(255,255,255,${0.02 + (flashSeed % 4 === 0 ? 0.05 : 0)})`,
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 120,
          top: 110,
          fontFamily: SANS,
          fontSize: 20,
          letterSpacing: 5,
          color: 'rgba(236,231,218,0.5)',
        }}
      >
        PRESS CONFERENCE / 1991
      </div>
      <div
        style={{
          position: 'absolute',
          left: 120,
          right: 120,
          bottom: 190,
          fontFamily: SERIF,
          fontWeight: 900,
          fontSize: 64,
          lineHeight: 1.5,
          letterSpacing: 2,
          color: '#ece7da',
        }}
      >
        “他们跟不上我，
        <br />
        因为我加速得太快了。”
        <span
          style={{
            display: 'inline-block',
            width: 22,
            height: 62,
            marginLeft: 18,
            background: C.red,
            opacity: Math.floor(frame / 15) % 2 === 0 ? 0.85 : 0.15,
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 124,
          bottom: 132,
          fontFamily: SANS,
          fontSize: 20,
          letterSpacing: 4,
          color: 'rgba(236,231,218,0.45)',
        }}
      >
        西和彦 · 记者会
      </div>
      <Reconstruction text="场景复原示意" />
      <Caption>1991 年 / 两位创始人辞职</Caption>
    </div>
  );
};

export const LivingRoom1995: React.FC = () => {
  const frame = useSceneFrame();
  const flicker = 0.9 + Math.sin(frame * 0.7) * 0.04 + Math.sin(frame * 1.3) * 0.03;
  return (
    <div style={{position: 'absolute', inset: 0, background: '#2a1f18', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, ...camera(frame, 0.7)}}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(160deg,#4c3827 0%,#33241b 52%,#1a1310 100%)',
          }}
        />
        <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
          <rect x="1120" y="120" width="640" height="480" fill="#c7ab7d" opacity="0.18" />
          <rect x="1150" y="150" width="580" height="420" fill="#e0c495" opacity="0.22" />
          <rect x="1680" y="150" width="20" height="420" fill="#2a1d15" opacity="0.5" />
          <rect y="760" width="1920" height="320" fill="#3a2a1f" />
          <rect x="560" y="640" width="580" height="70" fill="#241a13" />
          <rect x="580" y="700" width="540" height="120" fill="#33231a" />
          <rect x="540" y="360" width="620" height="300" fill="#151515" />
          <rect x="560" y="380" width="580" height="250" fill="#2e3c3d" opacity={flicker} />
          <rect x="560" y="380" width="580" height="250" fill="#7aa39c" opacity="0.08" />
          <rect x="620" y="400" width="460" height="210" fill="#15211f" />
          <rect x="700" y="440" width="300" height="120" fill="#5d7d6f" opacity="0.5" />
          <circle cx="850" cy="690" r="12" fill="#b33a2f" />
          <rect x="760" y="460" width="180" height="10" fill="#d8cbb0" opacity="0.3" />
          <rect x="760" y="490" width="240" height="8" fill="#d8cbb0" opacity="0.18" />
          <rect x="760" y="515" width="200" height="8" fill="#d8cbb0" opacity="0.18" />
          <rect x="740" y="620" width="220" height="22" fill="#6f6a60" />
          <rect x="770" y="600" width="120" height="22" fill="#8f8a80" />
          <path d="M760 620 L720 660 L840 660 L810 620 Z" fill="#4a463f" />
          <g fill="#17100c">
            <circle cx="1010" cy="760" r="44" />
            <path d="M940 800 Q980 786 1010 786 Q1050 786 1080 800 L1110 980 L910 980 Z" />
            <rect x="900" y="880" width="220" height="60" rx="30" />
          </g>
          <g fill="#2b1b12">
            <rect x="180" y="520" width="300" height="350" />
            <rect x="210" y="550" width="240" height="290" fill="#3a271b" />
            <rect x="180" y="470" width="20" height="400" />
          </g>
          <g fill="#d8b98a" opacity="0.5">
            <rect x="230" y="580" width="200" height="6" />
            <rect x="230" y="610" width="160" height="5" />
            <rect x="230" y="640" width="180" height="5" />
            <rect x="230" y="670" width="120" height="5" />
          </g>
        </svg>
        <div
          style={{
            position: 'absolute',
            left: 560,
            top: 380,
            width: 580,
            height: 250,
            boxShadow: '0 0 160px rgba(170,210,200,0.16)',
            background: 'transparent',
          }}
        />
      </div>
      <Halftone opacity={0.13} size={5} color="30,20,10" />
      <div
        style={{
          position: 'absolute',
          left: 120,
          top: 100,
          fontFamily: SANS,
          fontSize: 20,
          letterSpacing: 4,
          color: 'rgba(240,226,204,0.55)',
        }}
      >
        1995 / JAPAN
      </div>
      <div
        style={{
          position: 'absolute',
          left: 120,
          top: 144,
          fontFamily: SERIF,
          fontWeight: 900,
          fontSize: 66,
          letterSpacing: 4,
          color: '#f0e2cc',
        }}
      >
        客厅，成了入口
      </div>
      <Reconstruction text="场景复原示意" />
      <Caption>1995 年 / 超级任天堂与客厅</Caption>
    </div>
  );
};

export const StudentAtPC: React.FC<{china?: boolean; chrome?: boolean}> = ({china = false, chrome = true}) => {
  const frame = useSceneFrame();
  const glow = 0.72 + Math.sin(frame / 23) * 0.06;
  return (
    <div style={{position: 'absolute', inset: 0, background: '#07080a', overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: china
            ? 'radial-gradient(ellipse at 60% 45%, rgba(109,143,164,0.24) 0%, rgba(7,8,10,1) 68%)'
            : 'radial-gradient(ellipse at 60% 45%, rgba(120,140,160,0.2) 0%, rgba(7,8,10,1) 68%)',
        }}
      />
      <div style={{position: 'absolute', inset: 0, ...camera(frame, 0.6)}}>
        <div
          style={{
            position: 'absolute',
            left: 930,
            top: 210,
            width: 650,
            height: 490,
            background: 'linear-gradient(180deg,#23272b,#141619)',
            border: '1px solid rgba(236,231,218,0.15)',
            padding: 26,
            boxSizing: 'border-box',
            boxShadow: '0 0 160px rgba(110,150,180,0.16)',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              background: '#0f1115',
              border: '2px solid #2f353a',
              padding: 22,
              boxSizing: 'border-box',
              fontFamily: PIXEL,
              fontSize: 12,
              lineHeight: 2.1,
              color: '#8fb3c7',
              letterSpacing: 1,
              opacity: glow,
            }}
          >
            <div style={{color: '#d9b25f'}}>EVENT EDITOR</div>
            <div>◆ 条件分支：开关「钥匙」为 ON</div>
            <div style={{paddingLeft: 22}}>◆ 暂时消除本事件</div>
            <div>◆ 否则</div>
            <div style={{paddingLeft: 22}}>◆ 显示文字：“门锁着。”</div>
            <div style={{color: '#6c8a9c'}}>◆ 等待 0.2 秒</div>
            <div style={{color: '#6c8a9c'}}>◆ 场所移动：主角</div>
          </div>
        </div>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1920 1080"
          style={{position: 'absolute', inset: 0}}
        >
          <g fill="#050608">
            <circle cx="700" cy="430" r="78" />
            <path d="M560 520 Q640 492 700 492 Q770 492 840 520 L900 840 L520 840 Z" />
          </g>
          <g fill="#0d0f12">
            <rect x="470" y="800" width="660" height="70" />
            <rect x="560" y="870" width="40" height="150" />
            <rect x="990" y="870" width="40" height="150" />
          </g>
          <rect x="1150" y="720" width="160" height="30" fill="#1a1d21" />
          <rect x="1200" y="750" width="60" height="80" fill="#121518" />
          <g fill="#1c2226">
            <rect x="330" y="250" width="220" height="330" />
            <rect x="350" y="270" width="180" height="290" fill="#101418" />
          </g>
          <g fill="#2f3a40">
            <rect x="370" y="300" width="140" height="6" />
            <rect x="370" y="330" width="110" height="5" />
            <rect x="370" y="360" width="130" height="5" />
          </g>
        </svg>
        <div
          style={{
            position: 'absolute',
            left: 620,
            top: 260,
            width: 520,
            height: 360,
            background:
              'linear-gradient(180deg, rgba(130,160,180,0.06), rgba(130,160,180,0))',
            filter: 'blur(30px)',
          }}
        />
      </div>
      <Scanlines opacity={0.1} />
      {chrome ? (
        <>
          <div
            style={{
              position: 'absolute',
              left: 120,
              top: 120,
              fontFamily: SANS,
              fontSize: 20,
              letterSpacing: 4,
              color: 'rgba(236,231,218,0.45)',
            }}
          >
            {china ? '2005 / CHINA' : '2003 / ONE ROOM'}
          </div>
          <Caption>
            {china ? '2005 年 / 家用电脑与 RPG Maker XP' : '一个中学生 / 一台电脑'}
          </Caption>
        </>
      ) : null}
    </div>
  );
};

export const FoundersDoor1977: React.FC = () => {
  const frame = useSceneFrame();
  const dawn = 0.8 + Math.sin(frame / 80) * 0.03;
  return (
    <div style={{position: 'absolute', inset: 0, background: '#1b1410', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, ...camera(frame, 0.5)}}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(160deg,#5b4230 0%,#3a2a1e 44%,#17110d 100%)',
          }}
        />
        <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
          <rect x="0" y="760" width="1920" height="320" fill="#17110d" />
          <rect x="560" y="220" width="800" height="620" fill="#241a13" />
          <rect x="600" y="260" width="720" height="540" fill="#2d2118" />
          <rect x="780" y="330" width="360" height="470" fill="#17110d" />
          <rect x="820" y="380" width="280" height="420" fill="#3e2c1f" />
          <rect x="860" y="420" width="200" height="260" fill="#5d4632" opacity={dawn} />
          <rect x="1040" y="540" width="14" height="14" fill="#c7a36c" />
          <rect x="820" y="380" width="280" height="10" fill="#6b5238" opacity="0.5" />
          <text
            x="960"
            y="310"
            textAnchor="middle"
            fontFamily="serif"
            fontSize="34"
            letterSpacing="10"
            fill="#b89c74"
            opacity="0.7"
          >
            ASCII 出版
          </text>
          <g fill="#0b0806">
            <circle cx="880" cy="640" r="34" />
            <path d="M830 680 Q860 668 880 668 Q906 668 930 680 L948 900 L812 900 Z" />
            <circle cx="960" cy="620" r="36" />
            <path d="M908 662 Q938 650 960 650 Q990 650 1014 662 L1030 900 L892 900 Z" />
            <circle cx="1042" cy="646" r="33" />
            <path d="M994 684 Q1022 674 1042 674 Q1068 674 1088 684 L1104 900 L976 900 Z" />
          </g>
          <g stroke="#c7a36c" strokeWidth="2" opacity="0.5">
            <line x1="600" y1="260" x2="1320" y2="260" />
            <line x1="600" y1="800" x2="1320" y2="800" />
          </g>
        </svg>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, rgba(14,9,6,0.55) 0%, rgba(14,9,6,0) 36%, rgba(14,9,6,0) 70%, rgba(14,9,6,0.6) 100%)',
          }}
        />
      </div>
      <Halftone opacity={0.12} size={5} color="20,12,6" />
      <div
        style={{
          position: 'absolute',
          left: 120,
          top: 112,
          fontFamily: PIXEL,
          fontSize: 14,
          letterSpacing: 2,
          color: 'rgba(236,211,172,0.7)',
        }}
      >
        1977.05 / TOKYO
      </div>
      <div
        style={{
          position: 'absolute',
          left: 120,
          top: 154,
          fontFamily: SERIF,
          fontWeight: 900,
          fontSize: 86,
          letterSpacing: 5,
          color: '#f0e3cb',
          lineHeight: 1.25,
        }}
      >
        三个人
        <br />
        一个门口
      </div>
      <div
        style={{
          position: 'absolute',
          left: 124,
          top: 410,
          width: 280,
          height: 3,
          background: C.red,
          opacity: 0.8,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 124,
          top: 438,
          fontFamily: SANS,
          fontSize: 22,
          lineHeight: 1.9,
          letterSpacing: 1,
          color: 'rgba(240,227,203,0.55)',
        }}
      >
        300 万日元
        <br />
        一间小办公室
        <br />
        一个没有实现的标准
      </div>
      <Reconstruction text="场景复原示意" />
      <Caption>1977 年 / 创业的第一天</Caption>
    </div>
  );
};

export const NightDesk: React.FC<{mode?: 'ai' | 'archive'; promptChars?: number}> = ({mode = 'ai', promptChars}) => {
  const frame = useSceneFrame();
  const glow = 0.8 + Math.sin(frame / 33) * 0.08;
  return (
    <div style={{position: 'absolute', inset: 0, background: '#050608', overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 56% 46%, rgba(101,130,160,0.26) 0%, rgba(5,6,8,1) 68%)',
        }}
      />
      <svg width="100%" height="100%" viewBox="0 0 1920 1080" style={{position: 'absolute', inset: 0}}>
        <g fill="#030405">
          <circle cx="780" cy="450" r="76" />
          <path d="M640 540 Q720 510 780 510 Q850 510 920 540 L980 880 L580 880 Z" />
        </g>
        <g fill="#0b0d10">
          <rect x="540" y="830" width="660" height="80" />
          <rect x="620" y="910" width="40" height="120" />
          <rect x="1080" y="910" width="40" height="120" />
        </g>
        <g fill="#0c0f12">
          <rect x="250" y="180" width="330" height="470" />
          <rect x="270" y="210" width="290" height="410" fill="#0f1a24" />
          <rect x="300" y="250" width="230" height="8" fill="#25414e" />
          <rect x="300" y="286" width="170" height="6" fill="#1d3541" />
          <rect x="1420" y="200" width="250" height="430" fill="#0a0c0f" />
          <rect x="1450" y="240" width="190" height="320" fill="#121820" />
        </g>
      </svg>
      <div
        style={{
          position: 'absolute',
          left: 900,
          top: 240,
          width: 760,
          height: 470,
          background: 'linear-gradient(180deg,#141a21,#0a0d11)',
          border: '1px solid rgba(150,180,200,0.2)',
          boxShadow: '0 0 130px rgba(120,160,190,0.18)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: 34,
            background: '#1a222b',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 18,
            fontFamily: SANS,
            fontSize: 14,
            letterSpacing: 2,
            color: 'rgba(220,230,240,0.5)',
          }}
        >
          {mode === 'ai' ? 'NEW WORLD / PROMPT' : 'ARCHIVE BROWSER'}
        </div>
        <div
          style={{
            padding: 30,
            fontFamily: SANS,
            fontSize: 22,
            lineHeight: 1.8,
            letterSpacing: 1,
            color: 'rgba(220,228,236,0.72)',
            opacity: glow,
          }}
        >
          {mode === 'ai' ? (
            (() => {
              const prompt = `做一个 RPG。主角是一个女孩。
她住在一间不能出门的房间里，
只能睡觉。`;
              const shown = promptChars === undefined ? prompt : prompt.slice(0, promptChars);
              const done = promptChars !== undefined && promptChars >= prompt.length;
              return (
                <>
                  <div style={{color: 'rgba(140,170,190,0.55)', fontSize: 15, letterSpacing: 3}}>
                    YOU
                  </div>
                  <div style={{marginTop: 12, whiteSpace: 'pre-wrap'}}>
                    {shown}
                    {!done ? (
                      <span style={{color: '#a8c9d9', opacity: Math.floor(frame / 12) % 2 === 0 ? 1 : 0.2}}>
                        ▌
                      </span>
                    ) : null}
                  </div>
                  <div
                    style={{
                      marginTop: 28,
                      height: 2,
                      background:
                        'linear-gradient(90deg, rgba(150,190,210,0.8), rgba(150,190,210,0))',
                    }}
                  />
                  <div style={{marginTop: 18, fontFamily: PIXEL, fontSize: 11, color: '#6d93a8'}}>
                    {done ? 'GENERATING…' : 'PROMPT / 2026'}
                  </div>
                </>
              );
            })()
          ) : (
            <>
              <div style={{fontFamily: PIXEL, fontSize: 12, color: '#b33a2f'}}>1997.12.11</div>
              <div style={{marginTop: 18}}>ASCII HOMEPAGE</div>
            </>
          )}
        </div>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(120deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 36%)',
          }}
        />
      </div>
      <Scanlines opacity={0.08} />
      <div
        style={{
          position: 'absolute',
          left: 120,
          top: 118,
          fontFamily: PIXEL,
          fontSize: 13,
          letterSpacing: 2,
          color: 'rgba(200,215,225,0.55)',
        }}
      >
        2026 / ONE ROOM
      </div>
      <Caption>2026 年 / 屏幕的光</Caption>
    </div>
  );
};
