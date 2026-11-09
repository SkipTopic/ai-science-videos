import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {getChapter} from '../film/data';
import {Content, MGFrame, PopIn, Reveal, Scene, WipeIn} from '../film/mg/MGFrame';
import {
  Arrow,
  Body,
  BrainNetwork,
  Card,
  Glyph,
  Highlight,
  Kicker,
  NumBadge,
  Portrait,
  Sunburst,
  Tag,
  Title,
  WaveLine,
} from '../film/mg/mgKit';
import {C, INK, INK_SOFT, TONES} from '../film/mg/theme';

const S1: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = Math.min(1, frame / 26);
  return (
    <AbsoluteFill style={{background: TONES.butter.bg}}>
      <PaperRing />
      <div style={{position: 'absolute', right: 40, top: 10, opacity: 0.9}}>
        <Sunburst size={780} color={C.mustard} rays={28} opacity={0.4} />
      </div>
      <div style={{position: 'absolute', right: 238, top: 156, transform: `translateY(${Math.sin(frame * 0.03) * 6}px)`}}>
        <BrainNetwork size={560} color={INK} accent={C.coral} frame={frame} intensity={0.6} />
      </div>
      <div style={{position: 'absolute', left: 150, top: 132, width: 1030}}>
        <Kicker color={C.coralDeep}>EPILEPSY / 01</Kicker>
        <div style={{marginTop: 26, fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 138, lineHeight: 1.08, color: INK, letterSpacing: 4}}>
          大脑里的
          <br />
          一场
          <span style={{position: 'relative', display: 'inline-block', marginLeft: 12}}>
            电风暴
            <span style={{position: 'absolute', left: -2, right: -2, bottom: 2, height: 13, background: C.coral, borderRadius: 3, transform: `scaleX(${rise})`, transformOrigin: 'left'}} />
          </span>
        </div>
        <div style={{marginTop: 34, display: 'flex', gap: 16}}>
          <Tag color={C.teal} fg={C.white} rotate={-1.5}>不是中邪</Tag>
          <Tag color={C.white} rotate={1.3}>不是传染病</Tag>
          <Tag color={C.coral} fg={C.white} rotate={-1}>一次短暂的失控</Tag>
        </div>
      </div>
      <div style={{position: 'absolute', left: 150, bottom: 96, display: 'flex', alignItems: 'center', gap: 14, fontFamily: '"Noto Sans SC"', fontSize: 20, letterSpacing: 3, color: INK_SOFT}}>
        <span style={{width: 12, height: 12, borderRadius: 6, background: C.teal}} />
        本片无高频闪光 · 医学科普
      </div>
    </AbsoluteFill>
  );
};

const PaperRing: React.FC = () => (
  <div style={{position: 'absolute', width: 760, height: 760, borderRadius: '50%', border: `2px solid rgba(28,43,58,0.10)`, left: 960, top: 70}} />
);

const S2: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 30, width: 660}}>
        <Reveal delay={0}>
          <Kicker color={C.tealDeep}>大脑 · 一台超级计算机</Kicker>
          <Title size={78} style={{marginTop: 22, letterSpacing: 1}}>
            几百亿个神经元
            <br />
            在同时通话
          </Title>
        </Reveal>
        <Reveal delay={14}>
          <Body size={28} style={{marginTop: 26, width: 570}}>
            你看到的、想到的、做出的每一个动作，都是微弱的电信号，在特定线路上按顺序传递。
          </Body>
        </Reveal>
        <PopIn delay={30} style={{marginTop: 30, display: 'flex', gap: 12}}>
          <Tag color={C.teal} fg={C.white} rotate={-1}>电信号</Tag>
          <Tag color={C.mustard} rotate={1}>化学信号</Tag>
          <Tag color={C.white} rotate={-1}>按顺序</Tag>
        </PopIn>
      </div>
      <div style={{position: 'absolute', left: 570, top: -40}}>
        <BrainNetwork size={700} color={INK} accent={C.coral} frame={frame} />
      </div>
      <div style={{position: 'absolute', right: 26, top: 198, width: 300}}>
        <Reveal delay={20}>
          <Card bg={C.white} padding={22} style={{transform: 'rotate(1.5deg)'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <Glyph name="bolt" size={38} color={C.coral} />
              <div style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 25, color: INK}}>有序放电</div>
            </div>
            <div style={{marginTop: 12}}>
              <WaveLine width={250} height={90} color={C.teal} frame={frame} amplitude={18} stroke={3.4} />
            </div>
          </Card>
        </Reveal>
        <Reveal delay={34}>
          <Card bg={C.coral} padding={22} style={{marginTop: 22, transform: 'rotate(-1deg)', border: 'none'}}>
            <div style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 21, letterSpacing: 2, color: C.white}}>发作时</div>
            <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 44, color: C.white, marginTop: 4}}>同时亮起</div>
          </Card>
        </Reveal>
      </div>
    </Content>
  );
};

const typeCards = [
  {icon: 'people', title: '全面强直-阵挛', sub: '影视剧里最常见的样子', color: C.coral, soft: TONES.peach.soft, mood: 'closed' as const},
  {icon: 'hand', title: '局灶性发作', sub: '只影响一小片脑区', color: C.teal, soft: TONES.mint.soft, mood: 'worried' as const},
  {icon: 'clock', title: '失神发作', sub: '几秒钟的突然“断电”', color: C.blue, soft: TONES.sky.soft, mood: 'absent' as const},
];

const S3: React.FC = () => (
  <Content>
    <Reveal delay={0}>
      <Kicker color={C.coralDeep}>同一场病，很多种样子</Kicker>
      <Title size={78} style={{marginTop: 14}}>
        癫痫，<Highlight color={C.mustardSoft}>不止一种</Highlight>
      </Title>
    </Reveal>
    <div style={{position: 'absolute', left: 0, right: 0, top: 262, display: 'flex', gap: 26}}>
      {typeCards.map((card, i) => (
        <PopIn key={card.title} delay={12 + i * 7} style={{flex: 1}}>
          <Card bg={C.white} padding={0} style={{overflow: 'hidden', height: 372}}>
            <div style={{height: 176, background: card.soft, position: 'relative', overflow: 'hidden'}}>
              <div style={{position: 'absolute', left: 22, top: 20}}>
                <NumBadge n={`0${i + 1}`} color={card.color} size={42} />
              </div>
              <div style={{position: 'absolute', right: 22, top: 20}}>
                <Portrait size={136} shirt={card.color} mood={card.mood} glasses={i === 2} bg="rgba(255,253,247,0.55)" />
              </div>
              <div style={{position: 'absolute', left: 20, bottom: 16}}>
                <Glyph name={card.icon} size={52} color={INK} />
              </div>
            </div>
            <div style={{padding: '22px 26px'}}>
              <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 34, color: INK}}>{card.title}</div>
              <div style={{fontFamily: '"Noto Sans SC"', fontSize: 22, color: INK_SOFT, marginTop: 8}}>{card.sub}</div>
            </div>
          </Card>
        </PopIn>
      ))}
    </div>
  </Content>
);

const S4: React.FC = () => {
  const frame = useCurrentFrame();
  const p = Math.min(1, Math.max(0, (frame - 20) / 70));
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 40, width: 790}}>
        <Reveal delay={0}>
          <Kicker color={C.coralDeep}>急救 · 记住一个数字</Kicker>
          <Title size={76} style={{marginTop: 22}}>
            超过
            <span style={{fontSize: 250, color: C.coral, margin: '0 14px', letterSpacing: -6}}>5</span>
            分钟
          </Title>
          <Body size={30} style={{marginTop: 20, width: 680}}>
            发作持续超过 5 分钟，或一次接一次、中间没有恢复，就是<strong style={{color: INK}}>癫痫持续状态</strong>。
          </Body>
        </Reveal>
        <Reveal delay={16} style={{marginTop: 34}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
            <Card bg={C.coral} padding={18} style={{border: 'none', boxShadow: '0 8px 0 rgba(28,43,58,0.12)'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 14, color: C.white, fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 30}}>
                <Glyph name="phone" size={42} color={C.white} /> 立即呼叫 120
              </div>
            </Card>
            <Tag color={C.white} rotate={1.5}>这是急症</Tag>
          </div>
        </Reveal>
      </div>
      <div style={{position: 'absolute', right: 10, top: 70, width: 720}}>
        <Reveal delay={10}>
          <Card bg={C.white} padding={34} style={{height: 470}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
              <div style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, letterSpacing: 3, fontSize: 20, color: C.coralDeep}}>SEIZURE TIMER</div>
              <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 44, color: INK}}>05:00</div>
            </div>
            <div style={{marginTop: 54, height: 22, borderRadius: 11, background: TONES.cream.soft, position: 'relative'}}>
              <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${p * 100}%`, borderRadius: 11, background: `linear-gradient(90deg, ${C.teal}, ${C.mustard} 62%, ${C.coral})`}} />
              {Array.from({length: 6}).map((_, i) => (
                <div key={i} style={{position: 'absolute', left: `${(i / 5) * 100}%`, top: -12, width: 3, height: 46, background: i === 5 ? C.coral : 'rgba(28,43,58,0.18)'}} />
              ))}
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 16, fontFamily: '"Noto Sans SC"', fontSize: 18, color: INK_SOFT}}>
              <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span style={{color: C.coral, fontWeight: 700}}>5 分钟</span>
            </div>
            <div style={{marginTop: 42, display: 'flex', gap: 18, alignItems: 'center'}}>
              <div style={{width: 104, height: 104, borderRadius: 52, background: TONES.sky.bg, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Glyph name="clock" size={60} color={C.blue} />
              </div>
              <div style={{fontFamily: '"Noto Sans SC"', fontSize: 23, lineHeight: 1.5, color: INK_SOFT}}>
                大多数发作会在几分钟内<br />自行停止。计时，是为了识别危险。
              </div>
            </div>
          </Card>
        </Reveal>
      </div>
    </Content>
  );
};

export const MGStyleTest: React.FC = () => {
  const chapter = getChapter('01');
  return (
    <MGFrame chapter={chapter} accent={C.coral}>
      <Scene from={0} to={8} full tone="butter">
        <S1 />
      </Scene>
      <Scene from={8} to={16} tone="mint">
        <S2 />
      </Scene>
      <Scene from={16} to={24} tone="peach">
        <S3 />
      </Scene>
      <Scene from={24} to={32} tone="sky">
        <S4 />
      </Scene>
    </MGFrame>
  );
};
