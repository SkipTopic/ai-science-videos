import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {getChapter} from '../data';
import {Content, MGFrame, PopIn, Reveal, Scene} from './MGFrame';
import {
  Arrow,
  Body,
  Card,
  Glyph,
  Highlight,
  Kicker,
  NumBadge,
  Panel,
  PaperDots,
  Tag,
  Title,
} from './mgKit';
import {C, FPS, INK, INK_SOFT, PAPER, TONES, easeOut, springIn} from './theme';

const chapter = getChapter('00');
const T = (seconds: number) => Math.round(seconds * FPS);

const CharlieBack: React.FC<{size?: number; hoodie?: string; style?: React.CSSProperties}> = ({
  size = 340,
  hoodie = C.teal,
  style,
}) => (
  <svg width={size} height={size * 1.15} viewBox="0 0 300 345" style={style}>
    <ellipse cx="150" cy="330" rx="118" ry="14" fill="rgba(28,43,58,0.10)" />
    <path d="M45 330c2-90 42-137 105-137s103 47 105 137H45Z" fill={hoodie} />
    <path d="M104 196c0-14 20-24 46-24s46 10 46 24v34c0 22-18 36-46 36s-46-14-46-36v-34Z" fill={hoodie} />
    <circle cx="150" cy="150" r="64" fill={C.skin} />
    <path d="M84 151c0-48 26-74 66-74 42 0 66 27 66 70-24-2-45-11-58-30-14 18-39 27-74 26v8Z" fill="#25313E" />
    <path d="M102 148c-6 0-10 6-10 14s4 14 10 14M198 148c6 0 10 6 10 14s-4 14-10 14" fill={C.skin} />
    <path d="M128 218c8 7 36 7 44 0" stroke={C.tealDeep} strokeWidth="4" fill="none" strokeLinecap="round" />
  </svg>
);

const LaptopClosed: React.FC<{width?: number; style?: React.CSSProperties}> = ({width = 620, style}) => (
  <svg width={width} height={width * 0.62} viewBox="0 0 620 384" style={style}>
    <path d="M92 296h436l38 46H54l38-46Z" fill={C.blueSoft} stroke={INK} strokeWidth="5" strokeLinejoin="round" />
    <rect x="92" y="34" width="436" height="266" rx="18" fill={C.white} stroke={INK} strokeWidth="5" />
    <rect x="120" y="62" width="380" height="210" rx="10" fill={C.blueSoft} opacity="0.55" />
    <circle cx="310" cy="272" r="9" fill={C.coral} opacity="0.9" />
    <rect x="394" y="80" width="86" height="28" rx="14" fill={C.coralSoft} opacity="0.9" />
    <path d="M148 300h324" stroke={INK} strokeWidth="4" opacity="0.25" />
  </svg>
);

const S0: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const glow = Math.min(1, Math.max(0, (t - 5.2) / 1.2));
  const power = springIn(frame, T(3.4), 120, 12);
  const dream = Math.min(1, Math.max(0, (t - 5.8) / 1.4));
  return (
    <AbsoluteFill style={{background: TONES.sand.bg}}>
      <PaperDots color={INK} gap={34} opacity={0.055} />
      <div style={{position: 'absolute', left: 1080, top: 70, width: 720, height: 760, borderRadius: 360, background: C.tealSoft, opacity: 0.62}} />
      <div style={{position: 'absolute', left: 1160, top: 150, width: 560, height: 620, borderRadius: 280, border: '2px dashed rgba(28,43,58,0.22)'}} />
      <div
        style={{
          position: 'absolute',
          left: 1230,
          top: 220,
          fontFamily: 'Georgia, serif',
          fontSize: 330,
          fontWeight: 700,
          color: C.mustard,
          opacity: 0.2 + dream * 0.5,
          lineHeight: 1,
        }}
      >
        50
      </div>
      <div style={{position: 'absolute', left: 140, top: 150, width: 880}}>
        <Reveal delay={6}>
          <Kicker color={C.coralDeep}>PROLOGUE / 序章 · 白屏</Kicker>
        </Reveal>
        <Reveal delay={14}>
          <Title size={116} style={{marginTop: 26}}>
            很多年后，
            <br />
            我打开了一台
            <br />
            <Highlight color={C.mustardSoft} progress={Math.min(1, t / 1.2)}>旧电脑</Highlight>
          </Title>
        </Reveal>
        <Reveal delay={T(5.8)} style={{marginTop: 38, display: 'flex', alignItems: 'center', gap: 22}}>
          <div style={{width: 66, height: 3, background: C.coral}} />
          <Body size={30} color={INK}>屏幕亮起的那一刻，我又回到了那场比赛。</Body>
        </Reveal>
        <PopIn delay={T(8.9)} style={{marginTop: 34}}>
          <Tag color={C.coral} fg={C.white} rotate={-1.5}>我叫查理</Tag>
        </PopIn>
      </div>
      <div style={{position: 'absolute', left: 900, bottom: 90, width: 980, height: 330}}>
        <div style={{position: 'absolute', left: 0, top: 160, width: 980, height: 30, borderRadius: 12, background: C.mustard}} />
        <div style={{position: 'absolute', left: 40, top: 188, width: 34, height: 130, background: C.mustardDeep, opacity: 0.5}} />
        <div style={{position: 'absolute', left: 890, top: 188, width: 34, height: 130, background: C.mustardDeep, opacity: 0.5}} />
        <div style={{position: 'absolute', left: 370, top: 158, width: 52, height: 34, background: INK, opacity: 0.7, borderRadius: 4}} />
        <div style={{position: 'absolute', left: 308, top: 188, width: 180, height: 13, borderRadius: 7, background: INK, opacity: 0.7}} />
        <div style={{position: 'absolute', left: 150, top: -30, width: 520, height: 190, borderRadius: 26, background: C.white, border: `5px solid ${INK}`, boxShadow: '0 14px 0 rgba(28,43,58,0.12)'}}>
          <div style={{position: 'absolute', left: 24, top: 20, right: 24, bottom: 32, borderRadius: 12, background: '#143247', overflow: 'hidden'}}>
            <div style={{padding: '16px 20px', fontFamily: 'Consolas, monospace', fontSize: 18, lineHeight: 1.7, color: C.tealSoft, opacity: 0.9}}>
              <div>&gt; boot blackhand.sys</div>
              <div style={{color: C.mustardSoft}}>target: THE SERVER</div>
              <div style={{color: C.coralSoft}}>proxy: online / anti-intrusion</div>
              <div style={{opacity: 0.55}}>10 hooks ready ...</div>
              <div style={{opacity: 0.35}}>awaiting operator</div>
            </div>
            <div style={{position: 'absolute', inset: 0, background: C.white, opacity: glow * 0.9, transition: 'none'}} />
          </div>
          <div style={{position: 'absolute', right: 22, bottom: 12, display: 'flex', alignItems: 'center', gap: 9}}>
            <span style={{width: 10, height: 10, borderRadius: 5, background: power > 0.5 ? C.teal : '#8f9aa5'}} />
          </div>
        </div>
        <div style={{position: 'absolute', left: 618, top: 120, width: 34, height: 34, borderRadius: 17, background: C.coral, border: `3px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 0 rgba(28,43,58,0.15)'}}>
          <Glyph name="power" size={18} color={C.white} stroke={4} />
        </div>
        <div
          style={{
            position: 'absolute',
            left: 650,
            top: 100,
            transform: `translate(${(1 - power) * 46}px, ${(1 - power) * 12}px) rotate(-4deg)`,
            transformOrigin: 'left center',
          }}
        >
          <svg width="166" height="122" viewBox="0 0 166 122">
            <rect x="2" y="39" width="64" height="23" rx="11.5" fill={C.skin} stroke={INK} strokeWidth="4" />
            <path d="M52 34c16-11 36-8 46 6 8 11 8 27-2 38-10 11-27 15-40 7l-12-7V47c0-6 4-10 8-13Z" fill={C.skin} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
            <path d="M64 36c6-12 18-17 27-11 8 5 8 15 1 21" fill={C.skin} stroke={INK} strokeWidth="4" strokeLinecap="round" />
            <rect x="93" y="44" width="58" height="60" rx="20" fill={C.teal} stroke={INK} strokeWidth="4" />
            <path d="M8 46h15" stroke={INK} strokeWidth="3" strokeLinecap="round" opacity="0.35" />
          </svg>
        </div>
        <div style={{position: 'absolute', left: 480, top: -92, transform: `scale(${power})`, transformOrigin: 'center'}}>
          <Tag color={C.teal} fg={C.white} rotate={2}>按下开机键</Tag>
        </div>
      </div>
      <div style={{position: 'absolute', left: 140, bottom: 58, display: 'flex', alignItems: 'center', gap: 12, fontFamily: '"Noto Sans SC"', fontSize: 18, letterSpacing: 3, color: INK_SOFT}}>
        <span style={{width: 10, height: 10, borderRadius: 5, background: C.coral}} />
        情景再现 · 非真实病例影像
      </div>
    </AbsoluteFill>
  );
};

const ARENA_TILES = Array.from({length: 50}, (_, i) => i);
const BANNED = (i: number, t: number) => {
  if (i === 17 || i === 33) return false;
  const at = 5.4 + (i % 12) * 0.52 + Math.floor(i / 12) * 0.35;
  return t > at;
};

const ArenaTile: React.FC<{i: number; t: number}> = ({i, t}) => {
  const banned = BANNED(i, t);
  const special = i === 17 ? 'CHARLIE' : i === 33 ? 'JOKER7' : null;
  const appear = springIn(T(t), i * 0.7, 150, 14);
  const bannedAt = 5.4 + (i % 12) * 0.52 + Math.floor(i / 12) * 0.35;
  return (
    <div
      style={{
        width: 94,
        height: 92,
        borderRadius: 12,
        background: banned ? '#D9D5CA' : special ? (special === 'CHARLIE' ? C.coral : C.blue) : C.white,
        border: `2px solid ${special ? INK : 'rgba(28,43,58,0.15)'}`,
        boxShadow: special ? '0 5px 0 rgba(28,43,58,0.18)' : '0 3px 0 rgba(28,43,58,0.08)',
        opacity: appear * (banned ? 0.55 : 1),
        transform: `scale(${0.8 + appear * 0.2}) rotate(${banned ? ((i % 5) - 2) * 0.8 : 0}deg)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{position: 'absolute', left: 16, top: 17, width: 58, height: 40, borderRadius: 6, background: banned ? '#C5C0B5' : '#143247'}}>
        <div style={{padding: '5px 6px', fontFamily: 'monospace', fontSize: 8, lineHeight: 1.5, color: banned ? '#8D887D' : C.tealSoft, opacity: 0.9}}>
          <div>{'>'}_{i.toString().padStart(2, '0')}</div>
          <div style={{opacity: 0.45}}>0101</div>
        </div>
      </div>
      <div style={{position: 'absolute', left: 34, top: 57, width: 22, height: 3, background: banned ? '#BDB7AA' : INK, opacity: 0.45}} />
      {banned ? (
        <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{transform: 'rotate(-12deg)', border: '2px solid #8A857B', color: '#6E6A62', fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 10, padding: '2px 5px', borderRadius: 3, letterSpacing: 1}}>IP BAN</div>
        </div>
      ) : null}
      {special ? (
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 4, textAlign: 'center', fontFamily: 'monospace', fontSize: 9, fontWeight: 700, color: C.white, letterSpacing: 0.5}}>{special}</div>
      ) : null}
      {special && t > 12 ? (
        <div style={{position: 'absolute', inset: -4, borderRadius: 14, border: `2px solid ${C.mustard}`, opacity: 0.6 + Math.sin(t * 3) * 0.2}} />
      ) : null}
    </div>
  );
};

const S1: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const online = 50 - ARENA_TILES.filter((i) => BANNED(i, t)).length;
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 20, width: 560}}>
        <Reveal delay={4}>
          <Kicker color={C.blue}>BLACKHAND · 全球黑客比赛</Kicker>
        </Reveal>
        <Reveal delay={10}>
          <div style={{marginTop: 18, display: 'flex', alignItems: 'baseline', gap: 12}}>
            <span style={{fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 176, color: C.coral, lineHeight: 0.9}}>50</span>
            <span style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 58, color: INK}}>个人</span>
          </div>
          <Title size={52} style={{marginTop: 6}}>围着 1 台服务器</Title>
        </Reveal>
        <Reveal delay={24} style={{marginTop: 28, display: 'flex', gap: 10, flexWrap: 'wrap', width: 500}}>
          <Tag color={C.white} rotate={-1}>反代理</Tag>
          <Tag color={C.mustard} rotate={1}>反入侵</Tag>
          <Tag color={C.blueSoft} rotate={-0.5}>开场 10 分钟</Tag>
        </Reveal>
        <div style={{position: 'absolute', left: 0, top: 448, width: 540}}>
          <Reveal delay={28}>
            <Card bg={C.white} padding={22} style={{display: 'flex', alignItems: 'center', gap: 22}}>
              <div style={{width: 78, height: 78, borderRadius: 18, background: TONES.sky.soft, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Glyph name="server" size={44} color={C.blue} />
              </div>
              <div>
                <div style={{fontFamily: '"Noto Sans SC"', fontSize: 16, letterSpacing: 2.5, color: C.blueDeep}}>WORLD'S STRONGEST SERVER</div>
                <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 28, color: INK, marginTop: 2}}>号称世界最强</div>
              </div>
            </Card>
          </Reveal>
          <div style={{display: 'flex', alignItems: 'center', gap: 18, marginTop: 22}}>
            <div style={{fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 58, color: INK}}>{online.toString().padStart(2, '0')}</div>
            <div style={{fontFamily: '"Noto Sans SC"', fontSize: 19, color: INK_SOFT, lineHeight: 1.5}}>
              仍在比赛
              <br />
              <span style={{color: C.coral, fontWeight: 700}}>屏幕正在一个个变灰</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{position: 'absolute', right: 0, top: 0, width: 1052}}>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: 9}}>
          {ARENA_TILES.map((i) => (
            <ArenaTile key={i} i={i} t={t} />
          ))}
        </div>
        <div style={{marginTop: 22, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
            <span style={{width: 12, height: 12, borderRadius: 6, background: C.coral}} />
            <span style={{fontFamily: '"Noto Sans SC"', fontSize: 19, color: INK_SOFT}}>查理</span>
            <span style={{width: 12, height: 12, borderRadius: 6, background: C.blue, marginLeft: 16}} />
            <span style={{fontFamily: '"Noto Sans SC"', fontSize: 19, color: INK_SOFT}}>Joker7</span>
          </div>
          <Tag color={C.blueSoft} rotate={-1.5}>{50 - online} 个 IP 被封</Tag>
        </div>
      </div>
    </Content>
  );
};

const CODE = 'BLACKHAND01ACCESSGRANTEDDENIEDPROXYHOOKSHELLROOTNULLVOIDFIREWALLPACKETTRACE';
const CodeRain: React.FC<{width: number; height: number; color: string; frame: number; opacity?: number}> = ({
  width,
  height,
  color,
  frame,
  opacity = 0.75,
}) => {
  const cols = Math.floor(width / 26);
  const rows = Math.floor(height / 24);
  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden', opacity}}>
      {Array.from({length: cols}).map((_, c) => (
        <div
          key={c}
          style={{
            position: 'absolute',
            left: 8 + c * 26,
            top: 0,
            transform: `translateY(${((frame * (0.9 + (c % 5) * 0.25) + c * 37) % (rows * 24)) - rows * 12}px)`,
            fontFamily: 'Consolas, monospace',
            fontSize: 12,
            lineHeight: '24px',
            letterSpacing: 1,
            color,
            whiteSpace: 'nowrap',
          }}
        >
          {Array.from({length: rows + 6}).map((__, r) => (
            <div key={r} style={{opacity: 0.25 + ((c * 7 + r * 3) % 10) / 14}}>{CODE[(c * 5 + r * 7) % CODE.length]}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

const HookTarget: React.FC<{frame: number}> = ({frame}) => {
  const t = frame / FPS;
  const p = Math.min(1, Math.max(0, (t - 7.2) / 4.4));
  const close = easeOut(p);
  const radius = 250 - close * 120;
  return (
    <svg width="660" height="660" viewBox="0 0 660 660">
      <circle cx="330" cy="330" r="286" fill="none" stroke={INK} strokeWidth="1.5" strokeDasharray="4 9" opacity="0.25" />
      <circle cx="330" cy="330" r="214" fill="none" stroke={INK} strokeWidth="1.5" opacity="0.18" />
      <circle cx="330" cy="330" r="112" fill={C.white} stroke={C.coral} strokeWidth="4" />
      <circle cx="330" cy="330" r="78" fill={C.coralSoft} opacity="0.5" />
      <circle cx="330" cy="330" r="34" fill={C.coral} />
      <text x="330" y="337" textAnchor="middle" fontFamily="monospace" fontSize="14" fill={C.white} fontWeight="700">0DAY</text>
      {Array.from({length: 10}).map((_, i) => {
        const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
        const x = 330 + Math.cos(a) * radius;
        const y = 330 + Math.sin(a) * radius;
        const deg = (a * 180) / Math.PI + 90;
        return (
          <g key={i} transform={`translate(${x},${y}) rotate(${deg})`} opacity={0.35 + close * 0.65}>
            <path d="M0 0v-27M-10-27 0-14l10-13" fill="none" stroke={i % 2 === 0 ? C.coral : INK} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="0" cy="-2" r="5" fill={i % 2 === 0 ? C.coral : INK} />
          </g>
        );
      })}
    </svg>
  );
};

const S2: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const pull = Math.min(1, Math.max(0, (t - 10.8) / 0.6));
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, display: 'flex', justifyContent: 'center'}}>
        <Tag color={C.white} rotate={-1}>最后，只剩两个人</Tag>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 58, display: 'flex', justifyContent: 'center', gap: 12}}>
        <div style={{opacity: Math.min(1, t / 1)}}>
          <Tag color={C.mustard} rotate={-1.2}>找到漏洞</Tag>
        </div>
        <div style={{opacity: Math.min(1, Math.max(0, (t - 4.5) / 0.8))}}>
          <Tag color={C.coral} fg={C.white} rotate={1}>只差最后一下</Tag>
        </div>
      </div>
      <div style={{position: 'absolute', left: 40, top: 118, width: 470}}>
        <div style={{width: 470, height: 300, borderRadius: 24, background: C.white, border: `4px solid ${INK}`, boxShadow: '0 12px 0 rgba(28,43,58,0.14)', padding: 18}}>
          <div style={{position: 'relative', width: '100%', height: '100%', borderRadius: 12, background: '#143247', overflow: 'hidden'}}>
            <CodeRain width={434} height={264} color={C.tealSoft} frame={frame} opacity={0.55} />
            <div style={{position: 'absolute', left: 16, right: 16, bottom: 14, padding: '7px 10px', borderRadius: 7, background: 'rgba(6,20,31,0.75)', fontFamily: 'Consolas, monospace', fontSize: 13, color: C.tealSoft}}>
              charlie@blackhand:~$ ./claw --hooks 10
            </div>
          </div>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 18}}>
          <span style={{width: 14, height: 14, borderRadius: 7, background: C.coral}} />
          <span style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 36, color: INK}}>查理</span>
          <Tag color={C.coralSoft} rotate={1}>我</Tag>
        </div>
      </div>
      <div style={{position: 'absolute', right: 40, top: 118, width: 470}}>
        <div style={{width: 470, height: 300, borderRadius: 24, background: C.white, border: `4px solid ${INK}`, boxShadow: '0 12px 0 rgba(28,43,58,0.14)', padding: 18}}>
          <div style={{position: 'relative', width: '100%', height: '100%', borderRadius: 12, background: '#143247', overflow: 'hidden'}}>
            <CodeRain width={434} height={264} color={C.coralSoft} frame={frame + 43} opacity={0.55} />
            <div style={{position: 'absolute', left: 16, right: 16, bottom: 14, padding: '7px 10px', borderRadius: 7, background: 'rgba(6,20,31,0.75)', fontFamily: 'Consolas, monospace', fontSize: 13, color: C.coralSoft}}>
              joker7@blackhand:~$ ____
            </div>
          </div>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 18}}>
          <span style={{width: 14, height: 14, borderRadius: 7, background: C.blue}} />
          <span style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 36, color: INK}}>Joker7</span>
          <Tag color={C.blueSoft} rotate={-1}>偶像</Tag>
        </div>
      </div>
      <div style={{position: 'absolute', left: 490, top: 66}}>
        <HookTarget frame={frame} />
      </div>
      {pull > 0 ? (
        <div style={{position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', background: C.white, opacity: pull, pointerEvents: 'none'}} />
      ) : null}
    </Content>
  );
};

const S3a: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const gone1 = Math.min(1, Math.max(0, (t - 0.8) / 1.2));
  const gone2 = Math.min(1, Math.max(0, (t - 2.2) / 1.2));
  const gone3 = Math.min(1, Math.max(0, (t - 3.6) / 1.2));
  const whiteout = Math.min(1, Math.max(0, (t - 2.4) / 2.6));
  return (
    <AbsoluteFill style={{background: C.white}}>
      <PaperDots color={INK} gap={36} opacity={0.035} />
      <div style={{position: 'absolute', left: 0, top: 110, right: 0, display: 'flex', justifyContent: 'center'}}>
        <Tag color={C.mustardSoft} rotate={-1}>主观体验 · 示意</Tag>
      </div>
      <div style={{position: 'absolute', left: 0, top: 250, right: 0, display: 'flex', justifyContent: 'center', gap: 46}}>
        {[
          {icon: 'window', label: '舞台', o: 1 - gone1},
          {icon: 'people', label: '观众', o: 1 - gone2},
          {icon: 'laptop', label: '电脑', o: 1 - gone3},
        ].map((item) => (
          <div key={item.label} style={{opacity: item.o, textAlign: 'center'}}>
            <div style={{width: 120, height: 120, borderRadius: 30, background: TONES.cream.soft, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Glyph name={item.icon} size={62} color={INK} />
            </div>
            <div style={{fontFamily: '"Noto Sans SC"', fontSize: 20, letterSpacing: 3, color: INK_SOFT, marginTop: 10}}>{item.label}消失</div>
          </div>
        ))}
      </div>
      <div style={{position: 'absolute', left: 0, top: 470, right: 0, textAlign: 'center', opacity: whiteout}}>
        <Title size={132} style={{letterSpacing: 8}}>只剩下白色</Title>
        <Body size={34} color={INK_SOFT} style={{marginTop: 26, letterSpacing: 2}}>
          无尽的、让人绝望的白色
        </Body>
      </div>
      <div style={{position: 'absolute', left: '50%', top: 760, width: 14, height: 14, marginLeft: -7, borderRadius: 7, background: C.coral, opacity: whiteout}} />
      <svg width="1920" height="1080" style={{position: 'absolute', inset: 0, opacity: 0.5}}>
        <circle cx="960" cy="540" r="360" fill="none" stroke={INK} strokeWidth="1.5" opacity="0.08" />
        <circle cx="960" cy="540" r="440" fill="none" stroke={INK} strokeWidth="1.5" opacity="0.05" />
        <circle cx="960" cy="540" r={300 + t * 6} fill="none" stroke={C.coral} strokeWidth="2" opacity="0.12" />
      </svg>
    </AbsoluteFill>
  );
};

const S3b: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const line = Math.min(1, t / 1.8);
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 20, width: 610}}>
        <Reveal delay={10}>
          <Kicker color={C.tealDeep}>医院的白色天花板</Kicker>
          <Title size={88} style={{marginTop: 20}}>
            后来我才知道
            <br />
            那叫<Highlight color={C.mustardSoft}>癫痫发作</Highlight>
          </Title>
          <Body size={28} style={{marginTop: 26, width: 540}}>
            不是中邪，不是“疯了”。是大脑的电活动，短暂地失去了控制。
          </Body>
        </Reveal>
        <div style={{display: 'flex', gap: 12, marginTop: 30}}>
          <Tag color={C.white} rotate={-1}>情景再现</Tag>
          <Tag color={C.teal} fg={C.white} rotate={1}>不是诊断</Tag>
        </div>
      </div>
      <svg width="1000" height="672" viewBox="0 0 1000 672" style={{position: 'absolute', right: 0, top: 0}}>
        <ellipse cx="680" cy="648" rx="330" ry="16" fill="rgba(28,43,58,0.08)" />
        <g>
          <rect x="18" y="42" width="300" height="330" rx="12" fill={C.white} stroke={INK} strokeWidth="4" />
          <rect x="32" y="56" width="272" height="302" rx="6" fill="#DCEAF6" />
          {Array.from({length: 16}).map((_, i) => (
            <line key={i} x1={46 + ((i * 47) % 240)} y1={66 + ((i * 31) % 220)} x2={38 + ((i * 47) % 240)} y2={96 + ((i * 31) % 220)} stroke="#8FB6D9" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
          ))}
          <path d="M60 130c30-28 60-28 90 0M190 100c24-20 48-20 72 0" stroke={C.white} strokeWidth="12" fill="none" strokeLinecap="round" opacity="0.8" />
          <rect x="14" y="368" width="310" height="18" rx="9" fill={C.mustard} />
          <g>
            <path d="M48 368v-46h54v46" fill={C.teal} />
            <path d="M75 322c-16-18-14-32 0-42 14 10 16 24 0 42Z" fill={C.green} />
            <path d="M75 322c-20-2-30-14-28-28 16 0 28 12 28 28Z" fill="#7DB589" />
          </g>
        </g>
        <g>
          <rect x="710" y="40" width="264" height="196" rx="18" fill={C.white} stroke={INK} strokeWidth="4" />
          <text x="732" y="72" fontFamily="Consolas, monospace" fontSize="15" fill={C.tealDeep}>ECG / 示意</text>
          <polyline points="732,150 760,150 770,120 780,176 792,142 818,142 832,130 846,162 862,146 950,146" fill="none" stroke={C.teal} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M896 96c-8-9-22-2-22 9 0 10 14 18 22 24 8-6 22-14 22-24 0-11-14-18-22-9Z" fill={C.coral} opacity="0.9" />
          <line x1="842" y1="236" x2="842" y2="270" stroke={INK} strokeWidth="4" />
          <line x1="810" y1="270" x2="874" y2="270" stroke={INK} strokeWidth="4" strokeLinecap="round" />
        </g>
        <g>
          <rect x="342" y="302" width="30" height="262" rx="15" fill={C.mustard} stroke={INK} strokeWidth="4" />
          <rect x="370" y="472" width="606" height="96" rx="34" fill={C.white} stroke={INK} strokeWidth="4" />
          <rect x="388" y="558" width="570" height="38" rx="12" fill={C.teal} />
          <rect x="404" y="596" width="26" height="58" rx="8" fill={INK} opacity="0.7" />
          <rect x="912" y="596" width="26" height="58" rx="8" fill={INK} opacity="0.7" />
          <rect x="394" y="432" width="192" height="84" rx="40" fill={C.white} stroke={INK} strokeWidth="3" />
          <circle cx="502" cy="450" r="52" fill={C.skin} />
          <path d="M451 448c0-36 20-56 52-56 34 0 54 20 54 54-20-2-36-10-46-26-12 16-33 25-60 24v4Z" fill="#25313E" />
          <circle cx="482" cy="452" r="14" fill="none" stroke={INK} strokeWidth="3.5" />
          <circle cx="518" cy="452" r="14" fill="none" stroke={INK} strokeWidth="3.5" />
          <path d="M496 452h8M468 448l-8-2M532 448l8-2" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M486 478c8-4 16-4 24 0" stroke={INK} strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M540 506c60-44 126-52 220-52 84 0 132 10 174 38 24 16 34 34 34 58v18H540v-40c0-8 0-16 0-22Z" fill={C.teal} />
          <path d="M580 508c84-20 224-22 348 6M620 540c72-12 198-12 300 4" stroke={C.tealDeep} strokeWidth="3" fill="none" opacity="0.3" strokeLinecap="round" />
          <path d="M902 502c40 0 58 12 58 32s-18 32-58 32" fill={C.teal} opacity="0.9" />
          <path d="M580 520c18 2 30 12 30 24 0 12-12 20-30 20" fill={C.skin} opacity="0.95" />
        </g>
        <g>
          <rect x="964" y="254" width="20" height="380" rx="10" fill={INK} opacity="0.75" />
          <path d="M954 238h40l-6 22h-28l-6-22Z" fill={C.blueSoft} stroke={INK} strokeWidth="3" />
          <path d="M950 258c-8 34-6 62 10 84" stroke={C.blue} strokeWidth="3" fill="none" opacity="0.7" />
          <rect x="932" y="366" width="84" height="16" rx="8" fill={C.teal} />
          <rect x="958" y="300" width="32" height="66" rx="14" fill={C.tealSoft} stroke={INK} strokeWidth="3" />
        </g>
        <rect x="18" y="404" width="300" height="14" rx="7" fill={INK} opacity="0.14" />
      </svg>
    </Content>
  );
};

const memoryCards = [
  {label: '梦想', icon: 'sun', color: C.mustard, bg: TONES.butter.soft},
  {label: '欲望', icon: 'heart', color: C.coral, bg: TONES.peach.soft},
  {label: '未来', icon: 'stairs', color: C.blue, bg: TONES.sky.soft},
  {label: '期待', icon: 'window', color: C.teal, bg: TONES.mint.soft},
];

const S4a: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const vanish = Math.min(1, Math.max(0, (t - 6.2) / 4.2));
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 24, width: 720}}>
        <Reveal delay={4}>
          <Kicker color={C.coralDeep}>在那件事情发生之后</Kicker>
          <Title size={116} style={{marginTop: 24}}>
            全部
            <span style={{color: C.coral}}>消失</span>
          </Title>
        </Reveal>
        <Reveal delay={T(1.6)}>
          <Body size={31} style={{marginTop: 24, width: 620}}>
            那场比赛，我失去了资格，也失去了原本以为会有的未来。
          </Body>
        </Reveal>
        <div style={{position: 'absolute', left: 120, top: 470, width: 340, height: 130, borderRadius: '26px 26px 8px 8px', background: C.lilacSoft, border: `2px solid rgba(28,43,58,0.12)`}} />
        <div style={{position: 'absolute', left: 110, top: 570, width: 350, height: 34, borderRadius: 17, background: C.lilacSoft, border: `2px solid rgba(28,43,58,0.12)`}} />
        <div style={{position: 'absolute', left: 150, top: 604, width: 16, height: 48, borderRadius: 6, background: INK, opacity: 0.35}} />
        <div style={{position: 'absolute', left: 400, top: 604, width: 16, height: 48, borderRadius: 6, background: INK, opacity: 0.35}} />
        <div style={{position: 'absolute', left: 150, top: 316}}>
          <CharlieBack size={252} hoodie={C.teal} style={{opacity: 0.97}} />
        </div>
      </div>
      <div style={{position: 'absolute', right: 20, top: 20, width: 760, display: 'flex', flexWrap: 'wrap', gap: 22}}>
        {memoryCards.map((card, i) => {
          const delay = T(0.4 + i * 0.9);
          const p = springIn(frame, delay, 150, 14);
          const fall = Math.min(1, Math.max(0, (t - 6.4 - i * 0.28) / 2.4));
          return (
            <div
              key={card.label}
              style={{
                width: 355,
                height: 244,
                borderRadius: 22,
                background: card.bg,
                border: `2px solid rgba(28,43,58,0.14)`,
                boxShadow: '0 9px 0 rgba(28,43,58,0.08)',
                transform: `translateY(${(1 - p) * 30 + fall * 220}px) rotate(${(i % 2 === 0 ? -1.5 : 1.2) + fall * 8}deg)`,
                opacity: p * (1 - vanish * 0.95),
                padding: 26,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{width: 86, height: 86, borderRadius: 22, background: 'rgba(255,253,247,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Glyph name={card.icon} size={48} color={card.color} />
              </div>
              <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 44, color: INK, marginTop: 20}}>{card.label}</div>
              <div style={{position: 'absolute', right: 20, top: 20, width: 46, height: 46, borderRadius: 23, background: C.white, opacity: 0.7}} />
            </div>
          );
        })}
      </div>
      <div style={{position: 'absolute', right: 24, bottom: 6, opacity: Math.min(1, Math.max(0, (t - 7) / 1))}}>
        <Tag color={INK} fg={C.white} rotate={-1}>记忆正在褪色 · 示意</Tag>
      </div>
    </Content>
  );
};

const S4b: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const back = Math.min(1, Math.max(0, (t - 1.4) / 1.8));
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 40, width: 620}}>
        <Reveal delay={3}>
          <Kicker color={C.coralDeep}>按下开机键的勇气</Kicker>
          <Title size={92} style={{marginTop: 22}}>
            我不敢
            <br />
            再碰电脑
          </Title>
        </Reveal>
        <Reveal delay={18}>
          <Body size={30} style={{marginTop: 26, width: 520}}>
            不敢熬夜，连键盘声都会让我紧张。
          </Body>
          <div style={{display: 'flex', gap: 10, marginTop: 26, flexWrap: 'wrap', width: 540}}>
            <Tag color={C.white} rotate={-1}>不敢碰电脑</Tag>
            <Tag color={C.white} rotate={1}>不敢熬夜</Tag>
            <Tag color={C.coralSoft} rotate={-0.8}>键盘声 → 紧张</Tag>
          </div>
        </Reveal>
      </div>
      <div style={{position: 'absolute', right: 0, top: 0, width: 1008, height: 672}}>
        <div style={{position: 'absolute', left: 190, top: 96, width: 750, height: 440, borderRadius: '50%', border: `3px dashed ${C.coral}`, opacity: 0.55 * back, transform: `scale(${0.94 + back * 0.06})`}} />
        <div style={{position: 'absolute', left: 170, top: 518, width: 790, height: 26, borderRadius: 13, background: C.mustard, border: `3px solid ${INK}`}} />
        <div style={{position: 'absolute', left: 205, top: 544, width: 22, height: 96, background: C.mustardDeep, opacity: 0.5}} />
        <div style={{position: 'absolute', left: 900, top: 544, width: 22, height: 96, background: C.mustardDeep, opacity: 0.5}} />
        <LaptopClosed width={620} style={{position: 'absolute', left: 260, top: 142, transform: `rotate(-2deg) translateY(${(1 - back) * 20}px)`}} />
        <div style={{position: 'absolute', left: 20, top: 242, opacity: back}}>
          <Card bg={C.white} padding={20} style={{width: 178, height: 178, borderRadius: 89, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `3px solid ${C.coral}`}}>
            <div style={{position: 'relative'}}>
              <Glyph name="hand" size={82} color={INK} />
              <div style={{position: 'absolute', right: -24, top: -18, width: 40, height: 40, borderRadius: 20, background: C.coral, color: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 24}}>×</div>
            </div>
          </Card>
          <div style={{marginTop: 12, textAlign: 'center', fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 18, color: C.coralDeep, letterSpacing: 1}}>不敢碰</div>
        </div>
        <div style={{position: 'absolute', left: 200, top: 330, opacity: back}}>
          <Arrow length={150} thickness={4} color={C.coral} rotate={8} />
        </div>
        <div style={{position: 'absolute', left: 760, top: 210, display: 'flex', alignItems: 'center', gap: 8, opacity: 0.8}}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{width: 18 + i * 12, height: 18 + i * 12, borderRadius: '50%', border: `2px solid ${C.coral}`, opacity: 0.7 - i * 0.15}} />
          ))}
        </div>
        <div style={{position: 'absolute', left: 790, top: 76, opacity: back}}>
          <Tag color={C.coral} fg={C.white} rotate={3}>停摆</Tag>
        </div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 2, display: 'flex', justifyContent: 'center', opacity: Math.min(1, t / 1.2)}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
          <Glyph name="moon" size={28} color={C.lilacDeep} />
          <span style={{fontFamily: '"Noto Sans SC"', fontSize: 22, color: INK_SOFT, letterSpacing: 2}}>失去的不只是比赛，还有对未来的想象</span>
        </div>
      </div>
    </Content>
  );
};

const S4c: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const p = Math.min(1, Math.max(0, (t - 1.2) / 3.2));
  const sun = Math.min(1, t / 2);
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 30, width: 760}}>
        <Reveal delay={3}>
          <Kicker color={C.tealDeep}>直到很多年后</Kicker>
          <Title size={104} style={{marginTop: 22}}>
            我才重新
            <br />
            坐回电脑前
          </Title>
        </Reveal>
        <Reveal delay={T(3.1)}>
          <div style={{display: 'flex', alignItems: 'center', gap: 18, marginTop: 34}}>
            <div style={{width: 54, height: 4, background: C.coral, borderRadius: 2}} />
            <Body size={29} color={INK}>而这一切，要从大脑里的一场电活动说起。</Body>
          </div>
        </Reveal>
      </div>
      <div style={{position: 'absolute', right: 0, top: 0, width: 840, height: 672}}>
        <div style={{position: 'absolute', right: 30, top: 20, width: 660, height: 560, borderRadius: 330, background: TONES.butter.soft, overflow: 'hidden'}}>
          <div style={{position: 'absolute', left: 190, top: 130, width: 260, height: 260, borderRadius: 130, background: C.mustard, opacity: 0.75 * sun, boxShadow: '0 0 0 24px rgba(243,178,63,0.16)'}} />
          {Array.from({length: 18}).map((_, i) => {
            const a = (i / 18) * Math.PI * 2;
            return <div key={i} style={{position: 'absolute', left: 320 + Math.cos(a) * 170, top: 260 + Math.sin(a) * 170, width: 34, height: 4, borderRadius: 2, background: C.mustard, opacity: 0.35 * sun, transform: `rotate(${(a * 180) / Math.PI}deg)`}} />;
          })}
          <div style={{position: 'absolute', left: 70, top: 420, width: 520, height: 6, borderRadius: 3, background: INK, opacity: 0.15}} />
        </div>
        <div style={{position: 'absolute', left: 40, top: 160, transform: `translateY(${(1 - sun) * 16}px)`}}>
          <CharlieBack size={360} hoodie={C.teal} />
        </div>
        <div style={{position: 'absolute', left: 0, top: 590, width: 700, height: 24, borderRadius: 12, background: C.mustard, border: `3px solid ${INK}`}} />
        <div style={{position: 'absolute', left: 55, top: 614, width: 20, height: 58, background: C.mustardDeep, opacity: 0.5}} />
        <div style={{position: 'absolute', left: 640, top: 614, width: 20, height: 58, background: C.mustardDeep, opacity: 0.5}} />
        <div style={{position: 'absolute', left: 285, top: 400, width: 310, height: 185, borderRadius: 18, background: C.white, border: `3px solid ${INK}`, boxShadow: '0 8px 0 rgba(28,43,58,0.1)', transform: 'rotate(-2deg)'}}>
          <div style={{position: 'absolute', inset: 14, borderRadius: 9, background: '#143247', opacity: 0.9}} />
          <div style={{position: 'absolute', left: 34, top: 46, fontFamily: 'Consolas, monospace', fontSize: 18, color: C.tealSoft}}>
            &gt; hello, world
            <br />
            <span style={{color: C.coralSoft}}>ready.</span>
          </div>
          <div style={{position: 'absolute', left: 28, bottom: 18, right: 20, height: 8, borderRadius: 4, background: C.mustard, opacity: 0.8}} />
        </div>
        <div style={{position: 'absolute', left: 620, top: 520, width: 58, height: 70, borderRadius: '0 0 14px 14px', background: C.coral, border: `3px solid ${INK}`}}>
          <div style={{position: 'absolute', left: 46, top: 12, width: 26, height: 24, borderRadius: 13, border: `3px solid ${INK}`}} />
          <div style={{position: 'absolute', left: 16, top: -26, width: 4, height: 20, borderRadius: 2, background: INK, opacity: 0.2}} />
        </div>
      </div>
      <svg width="1920" height="900" style={{position: 'absolute', left: 0, top: 0, pointerEvents: 'none'}}>
        <path
          d="M600 600 C 780 640, 950 610, 1100 540 S 1360 430, 1500 360 S 1600 300, 1620 250"
          fill="none"
          stroke={C.coral}
          strokeWidth="5"
          strokeLinecap="round"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={1 - p}
        />
        {p > 0.2 ? (
          <>
            <circle cx="900" cy="595" r="7" fill={C.mustard} opacity={p} />
            <circle cx="1380" cy="410" r="5" fill={C.coral} opacity={p * 0.8} />
          </>
        ) : null}
      </svg>
      <div style={{position: 'absolute', right: 54, top: 140, opacity: p}}>
        <Glyph name="brain" size={104} color={C.coral} />
      </div>
      <div style={{position: 'absolute', right: 40, top: 60, opacity: p}}>
        <Tag color={C.coral} fg={C.white} rotate={2}>01 · 电风暴</Tag>
      </div>
    </Content>
  );
};

export const Ch00: React.FC = () => (
  <MGFrame chapter={chapter} accent={C.coral}>
    <Scene from={0} to={9.7} full tone="sand">
      <S0 />
    </Scene>
    <Scene from={9.7} to={28.9} tone="sky">
      <S1 />
    </Scene>
    <Scene from={28.9} to={41.55} tone="lilac">
      <S2 />
    </Scene>
    <Scene from={41.55} to={53.9} bg={C.white} full>
      <S3a />
    </Scene>
    <Scene from={53.9} to={57} tone="mint">
      <S3b />
    </Scene>
    <Scene from={57} to={68} tone="lilac">
      <S4a />
    </Scene>
    <Scene from={68} to={72.8} tone="pink">
      <S4b />
    </Scene>
    <Scene from={72.8} to={80.322} tone="sand">
      <S4c />
    </Scene>
  </MGFrame>
);
