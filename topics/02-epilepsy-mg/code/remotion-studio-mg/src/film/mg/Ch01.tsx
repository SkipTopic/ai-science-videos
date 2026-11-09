import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {getChapter} from '../data';
import {Content, MGFrame, PopIn, Reveal, Scene} from './MGFrame';
import {
  Body,
  BrainNetwork,
  Card,
  Glyph,
  Highlight,
  Kicker,
  NumBadge,
  Portrait,
  Squiggle,
  Sunburst,
  Tag,
  Title,
  WaveLine,
} from './mgKit';
import {C, FPS, INK, INK_SOFT, TONES, easeOut, springIn} from './theme';

const chapter = getChapter('01');
const T = (seconds: number) => Math.round(seconds * FPS);

const SignalLine: React.FC<{frame: number}> = ({frame}) => {
  const t = frame / FPS;
  const p = (t * 0.22) % 1;
  return (
    <svg width="540" height="80" viewBox="0 0 540 80">
      <line x1="20" y1="42" x2="520" y2="42" stroke={INK} strokeWidth="2.5" opacity="0.25" />
      {[20, 180, 350, 520].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy={42} r="13" fill={C.white} stroke={INK} strokeWidth="3" />
          <circle cx={x} cy={42} r="5" fill={i === 3 ? C.coral : C.teal} />
        </g>
      ))}
      <circle cx={20 + p * 500} cy={42} r="7" fill={C.mustard} />
      <text x="20" y="14" fontFamily="'Noto Sans SC'" fontSize="15" fill={INK_SOFT} letterSpacing="2">按顺序传递</text>
      <text x="490" y="76" fontFamily="'Noto Sans SC'" fontSize="15" fill={INK_SOFT} letterSpacing="2">下一个</text>
    </svg>
  );
};

const S0: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 20, width: 710}}>
        <Reveal delay={4}>
          <Kicker color={C.mustardDeep}>01 · 电风暴</Kicker>
        </Reveal>
        <Reveal delay={10}>
          <Title size={108} style={{marginTop: 20}}>
            先认识
            <br />
            你的<Highlight color={C.mustardSoft} progress={Math.min(1, t / 1.1)}>大脑</Highlight>
          </Title>
        </Reveal>
        <Reveal delay={18}>
          <Body size={29} style={{marginTop: 28, width: 590}}>
            它大约有几百亿个神经元，彼此用微弱的电信号和化学信号通话。
          </Body>
        </Reveal>
        <Reveal delay={26} style={{marginTop: 26, display: 'flex', gap: 10}}>
          <Tag color={C.teal} fg={C.white} rotate={-1}>电信号</Tag>
          <Tag color={C.mustard} rotate={1}>化学信号</Tag>
          <Tag color={C.white} rotate={-0.6}>按顺序</Tag>
        </Reveal>
        <div style={{display: 'flex', alignItems: 'flex-end', gap: 18, marginTop: 28}}>
          <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 86, lineHeight: 1, color: C.coral}}>数百亿</div>
          <div style={{fontFamily: '"Noto Sans SC"', fontSize: 21, color: INK_SOFT, lineHeight: 1.5, paddingBottom: 8}}>
            个神经元
            <br />
            在同时通话
          </div>
        </div>
      </div>
      <div style={{position: 'absolute', left: 690, top: 0, width: 958, height: 672}}>
        <div style={{position: 'absolute', right: 70, top: 60, width: 620, height: 620, borderRadius: 310, background: C.mustardSoft, opacity: 0.4}} />
        <div style={{position: 'absolute', right: 0, top: 42, opacity: 0.6}}>
          <Sunburst size={760} color={C.mustard} rays={30} opacity={0.32} />
        </div>
        <div style={{position: 'absolute', right: 95, top: 5}}>
          <BrainNetwork size={780} color={INK} accent={C.coral} frame={frame} intensity={0.8} />
        </div>
        <div style={{position: 'absolute', right: 30, top: 22, fontFamily: '"Noto Sans SC"', fontSize: 15, letterSpacing: 4, color: INK_SOFT, opacity: 0.55}}>NEURAL NETWORK / 示意</div>
        <PopIn delay={T(7.2)} style={{position: 'absolute', left: 0, top: 310}}>
          <Tag color={C.white} rotate={-2}>每一个动作</Tag>
        </PopIn>
        <PopIn delay={T(9.4)} style={{position: 'absolute', right: 0, bottom: 120}}>
          <Tag color={C.teal} fg={C.white} rotate={2}>都是信号</Tag>
        </PopIn>
      </div>
    </Content>
  );
};

const BUILDINGS = [
  {x: 22, y: 18, w: 92, h: 74, color: C.blueSoft},
  {x: 172, y: 20, w: 170, h: 72, color: C.tealSoft},
  {x: 410, y: 16, w: 146, h: 78, color: C.coralSoft},
  {x: 632, y: 22, w: 104, h: 70, color: C.mustardSoft},
  {x: 20, y: 146, w: 102, h: 78, color: C.mustardSoft},
  {x: 406, y: 146, w: 150, h: 78, color: C.blueSoft},
  {x: 624, y: 142, w: 112, h: 86, color: C.tealSoft},
  {x: 24, y: 276, w: 96, h: 78, color: C.coralSoft},
  {x: 168, y: 276, w: 174, h: 78, color: C.tealSoft},
  {x: 406, y: 276, w: 150, h: 78, color: C.mustardSoft},
  {x: 628, y: 272, w: 108, h: 82, color: C.blueSoft},
  {x: 24, y: 404, w: 96, h: 46, color: C.blueSoft},
  {x: 168, y: 404, w: 174, h: 46, color: C.coralSoft},
  {x: 406, y: 404, w: 150, h: 46, color: C.tealSoft},
  {x: 628, y: 404, w: 108, h: 46, color: C.mustardSoft},
];

const CityPanel: React.FC<{frame: number; storm: boolean; label: string; caption: string}> = ({
  frame,
  storm,
  label,
  caption,
}) => {
  const t = frame / FPS;
  const roadsY = [120, 250, 380];
  const roadsX = [150, 380, 610];
  return (
    <div style={{width: 790, height: 500, borderRadius: 26, background: storm ? '#FDE9DF' : '#F5F8F2', border: `2px solid rgba(28,43,58,0.13)`, overflow: 'hidden', position: 'relative', boxShadow: '0 9px 0 rgba(28,43,58,0.07)'}}>
      <div style={{position: 'absolute', left: 20, top: 16, display: 'flex', alignItems: 'center', gap: 10, zIndex: 2}}>
        <span style={{width: 12, height: 12, borderRadius: 6, background: storm ? C.coral : C.teal}} />
        <span style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 20, letterSpacing: 2, color: storm ? C.coralDeep : C.tealDeep}}>{label}</span>
      </div>
      <div style={{position: 'absolute', right: 20, top: 18, fontFamily: '"Noto Sans SC"', fontSize: 13, letterSpacing: 3, color: INK_SOFT, opacity: 0.45}}>CITY / 示意</div>
      <svg width="790" height="390" viewBox="0 0 760 390" style={{position: 'absolute', left: 0, top: 44}}>
        {roadsY.map((y) => (
          <g key={y}>
            <rect x="0" y={y - 14} width="760" height="28" fill={storm ? '#F9D4C3' : '#DEEAE4'} />
            <line x1="0" y1={y} x2="760" y2={y} stroke={C.white} strokeWidth="2" strokeDasharray="12 12" opacity="0.8" />
          </g>
        ))}
        {roadsX.map((x) => (
          <g key={x}>
            <rect x={x - 14} y="0" width="28" height="390" fill={storm ? '#F9D4C3' : '#DEEAE4'} />
            <line x1={x} y1="0" x2={x} y2="390" stroke={C.white} strokeWidth="2" strokeDasharray="12 12" opacity="0.8" />
          </g>
        ))}
        {BUILDINGS.map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={b.y + 44} width={b.w} height={b.h} rx="10" fill={b.color} opacity={storm ? 0.85 : 1} stroke="rgba(28,43,58,0.12)" strokeWidth="2" />
            {Array.from({length: Math.min(8, Math.floor(b.w / 24) * 2)}).map((_, j) => (
              <rect key={j} x={b.x + 12 + (j % 3) * 26} y={b.y + 58 + Math.floor(j / 3) * 22} width="13" height="10" rx="2" fill={storm ? C.coral : C.white} opacity={storm ? 0.55 : 0.75} />
            ))}
          </g>
        ))}
        {storm ? (
          <>
            {[0, 1, 2, 3].map((i) => (
              <circle key={i} cx="380" cy="250" r={30 + i * 46 + ((t * 9) % 46)} fill="none" stroke={C.coral} strokeWidth="3" opacity={0.42 - i * 0.08} />
            ))}
            <path d="M330 90 300 150h32l-24 54 60-70h-32l22-44Z" fill={C.coral} opacity="0.9" />
            <path d="M500 315 480 350h24l-18 34 42-48h-24l16-21Z" fill={C.mustardDeep} opacity="0.7" />
            <circle cx="380" cy="250" r="46" fill={C.white} opacity="0.9" />
            <text x="380" y="258" textAnchor="middle" fontFamily="'Noto Sans SC'" fontWeight="700" fontSize="24" fill={C.coralDeep} letterSpacing="3">同步</text>
          </>
        ) : (
          <>
            <circle cx="470" cy="187" r="26" fill={C.greenSoft} />
            <circle cx="470" cy="187" r="9" fill={C.green} />
          </>
        )}
        {Array.from({length: 14}).map((_, i) => {
          const lane = i % 3;
          const horizontal = i % 2 === 0;
          const speed = 28 + (i % 4) * 9;
          const pos = ((frame * (storm ? 0.5 : speed)) / 6 + i * 57) % 760;
          const color = storm ? (i % 2 === 0 ? C.coral : C.mustardDeep) : i % 3 === 0 ? C.coral : C.teal;
          if (horizontal) {
            const y = roadsY[lane] + 44 + (storm ? Math.sin(frame * 0.08 + i) * 4 : 0);
            const x = storm ? 110 + (i * 53) % 520 : pos;
            return <rect key={i} x={x} y={y - 5} width={storm ? 20 : 18} height="10" rx="5" fill={color} opacity={storm ? 0.9 : 0.8} />;
          }
          const x = roadsX[lane] + (storm ? Math.cos(frame * 0.07 + i) * 4 : 0);
          const y = storm ? 80 + (i * 71) % 260 : ((frame * speed) / 7 + i * 41) % 390;
          return <rect key={i} x={x - 5} y={y} width="10" height={storm ? 20 : 18} rx="5" fill={color} opacity={storm ? 0.9 : 0.8} />;
        })}
      </svg>
      <div style={{position: 'absolute', left: 20, bottom: 16, padding: '9px 16px', borderRadius: 10, background: C.white, border: `1.5px solid rgba(28,43,58,0.12)`, fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 18, color: INK, boxShadow: '0 4px 0 rgba(28,43,58,0.06)'}}>
        {caption}
      </div>
    </div>
  );
};

const S1: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const storm = t > 12;
  const rip = Math.min(1, Math.max(0, (t - 12) / 1.2));
  return (
    <Content>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div>
          <Kicker color={C.coralDeep}>大脑 · 城市隐喻</Kicker>
          <Title size={62} style={{marginTop: 8}}>秩序，突然被打乱</Title>
        </div>
        <div style={{display: 'flex', gap: 10, opacity: Math.min(1, t / 1)}}>
          <Tag color={C.coralSoft} rotate={-1}>异常</Tag>
          <Tag color={C.mustardSoft} rotate={1}>过度</Tag>
          <Tag color={C.tealSoft} rotate={-1.3}>同步</Tag>
        </div>
      </div>
      <div style={{position: 'absolute', left: 0, top: 132, display: 'flex', gap: 24}}>
        <CityPanel frame={frame} storm={false} label="平时" caption="车流各走各的路" />
        <CityPanel frame={frame} storm={storm} label="发作时" caption="所有车辆同时启动" />
      </div>
      <div style={{position: 'absolute', left: 0, bottom: 4, right: 0, display: 'flex', justifyContent: 'center', opacity: rip}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, fontFamily: '"Noto Sans SC"', fontSize: 21, color: INK_SOFT}}>
          <Glyph name="bolt" size={28} color={C.coral} />
          同一套线路，两种状态
        </div>
      </div>
    </Content>
  );
};

const neqCards = [
  {label: '脑子坏了', icon: 'brain', color: C.coral, bg: C.coralSoft},
  {label: '疯了', icon: 'people', color: C.blue, bg: C.blueSoft},
  {label: '中邪', icon: 'no', color: C.mustardDeep, bg: C.mustardSoft},
];

const S2: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const dial = Math.min(1, Math.max(0, (t - 1.8) / 2.4));
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 20, width: 940}}>
        <Reveal delay={4}>
          <Kicker color={C.tealDeep}>持续时间 · 不等于严重程度</Kicker>
          <Title size={92} style={{marginTop: 18}}>
            几秒，到几分钟
          </Title>
        </Reveal>
        <Reveal delay={16}>
          <Body size={29} style={{marginTop: 24, width: 760}}>
            这种“电风暴”能持续几秒，也可能几分钟。它是一次短暂的、大脑电活动的失控。
          </Body>
        </Reveal>
        <Reveal delay={24} style={{marginTop: 32, width: 760}}>
          <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: '"Noto Sans SC"', fontSize: 19, fontWeight: 700, color: INK_SOFT}}>
            <span>几秒</span>
            <span>几分钟</span>
          </div>
          <div style={{height: 26, borderRadius: 13, background: C.white, border: `2px solid rgba(28,43,58,0.10)`, position: 'relative', marginTop: 8, overflow: 'hidden'}}>
            <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${dial * 100}%`, background: `linear-gradient(90deg, ${C.teal}, ${C.mustard} 58%, ${C.coral})`, borderRadius: 13}} />
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 10, fontFamily: '"Noto Sans SC"', fontSize: 16, color: INK_SOFT, opacity: 0.7}}>
            <span>短暂失控</span>
            <span>通常自行停止</span>
          </div>
        </Reveal>
      </div>
      <div style={{position: 'absolute', right: 40, top: 0}}>
        <div style={{position: 'absolute', left: -30, top: 20, width: 360, height: 360, borderRadius: 180, border: `2px dashed ${C.teal}`, opacity: 0.25, transform: `scale(${1 + Math.sin(t * 0.9) * 0.02})`}} />
        <Portrait size={330} shirt={C.teal} mood="calm" glasses bg={C.white} />
        <div style={{position: 'absolute', left: -34, bottom: 20}}>
          <Tag color={C.white} rotate={-2}>平静下来</Tag>
        </div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, display: 'flex', gap: 20}}>
        {neqCards.map((card, i) => {
          const p = springIn(frame, T(2.2 + i * 1.1), 150, 14);
          return (
            <div key={card.label} style={{flex: 1, height: 208, borderRadius: 22, background: C.white, border: `2px solid rgba(28,43,58,0.12)`, boxShadow: '0 8px 0 rgba(28,43,58,0.06)', padding: '20px 26px', display: 'flex', alignItems: 'center', gap: 22, opacity: Math.min(1, p * 2), transform: `translateY(${(1 - p) * 24}px)`}}>
              <div style={{width: 92, height: 92, borderRadius: 46, background: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Glyph name={card.icon} size={52} color={card.color} />
              </div>
              <div>
                <div style={{display: 'flex', alignItems: 'baseline', gap: 6}}>
                  <span style={{fontFamily: 'Georgia, serif', fontSize: 56, lineHeight: 1, color: C.coral}}>≠</span>
                  <span style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 40, color: INK}}>{card.label}</span>
                </div>
                <div style={{fontFamily: '"Noto Sans SC"', fontSize: 18, color: INK_SOFT, marginTop: 8}}>癫痫不是这个意思</div>
              </div>
            </div>
          );
        })}
      </div>
    </Content>
  );
};

const S3: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const rise = Math.min(1, t / 1.2);
  return (
    <AbsoluteFill style={{background: C.teal}}>
      <div style={{position: 'absolute', right: -160, top: -220, width: 900, height: 900, borderRadius: 450, background: C.tealDeep, opacity: 0.5}} />
      <div style={{position: 'absolute', left: -120, bottom: -300, width: 700, height: 700, borderRadius: 350, background: C.mustard, opacity: 0.2}} />
      <div style={{position: 'absolute', left: 130, top: 140, width: 970}}>
        <Reveal delay={4}>
          <Kicker color={C.mustardSoft}>EPILEPSY · 癫痫</Kicker>
        </Reveal>
        <div style={{overflow: 'hidden', marginTop: 18}}>
          <div style={{transform: `translateY(${(1 - rise) * 180}px)`, fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 250, lineHeight: 1, letterSpacing: 12, color: C.white}}>癫痫</div>
        </div>
        <Reveal delay={18}>
          <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 64, color: C.mustardSoft, marginTop: 12, letterSpacing: 4}}>大脑里的一场“电风暴”</div>
        </Reveal>
        <Reveal delay={30} style={{marginTop: 40, display: 'flex', gap: 12}}>
          <Tag color={C.white} fg={INK} rotate={-1}>常见脑部疾病</Tag>
          <Tag color={C.mustard} fg={INK} rotate={1}>不传染</Tag>
          <Tag color={C.coral} fg={C.white} rotate={-0.6}>不是中邪</Tag>
        </Reveal>
      </div>
      <div style={{position: 'absolute', right: 50, top: 260, opacity: 0.9}}>
        <BrainNetwork size={620} color={C.white} accent={C.mustard} frame={frame} />
      </div>
      <div style={{position: 'absolute', right: 70, bottom: 66, display: 'flex', alignItems: 'center', gap: 12, fontFamily: '"Noto Sans SC"', fontSize: 17, letterSpacing: 3, color: C.white, opacity: 0.8}}>
        <span style={{width: 9, height: 9, borderRadius: 5, background: C.mustard}} />
        本片无高频闪光 · 医学科普
      </div>
    </AbsoluteFill>
  );
};

export const Ch01: React.FC = () => (
  <MGFrame chapter={chapter} accent={C.teal}>
    <Scene from={0} to={19.77} tone="butter">
      <S0 />
    </Scene>
    <Scene from={19.77} to={39.77} tone="mint">
      <S1 />
    </Scene>
    <Scene from={39.77} to={54.77} tone="cream">
      <S2 />
    </Scene>
    <Scene from={54.77} to={65} full tone="butter">
      <S3 />
    </Scene>
  </MGFrame>
);
