import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {getChapter} from '../data';
import {Content, MGFrame, PopIn, Reveal, Scene} from './MGFrame';
import {
  Body,
  Card,
  Glyph,
  Highlight,
  Kicker,
  Portrait,
  Sunburst,
  Tag,
  Title,
} from './mgKit';
import {C, FPS, INK, INK_SOFT, TONES, springIn} from './theme';
import {BrainNetwork} from './mgKit';

const chapter = getChapter('09');
const T = (seconds: number) => Math.round(seconds * FPS);

const CharBack: React.FC<{size?: number; hoodie?: string}> = ({size = 340, hoodie = C.teal}) => (
  <svg width={size} height={size * 1.15} viewBox="0 0 300 345">
    <ellipse cx="150" cy="330" rx="118" ry="14" fill="rgba(28,43,58,0.10)" />
    <path d="M45 330c2-90 42-137 105-137s103 47 105 137H45Z" fill={hoodie} />
    <path d="M104 196c0-14 20-24 46-24s46 10 46 24v34c0 22-18 36-46 36s-46-14-46-36v-34Z" fill={hoodie} />
    <circle cx="150" cy="150" r="64" fill={C.skin} />
    <path d="M84 151c0-48 26-74 66-74 42 0 66 27 66 70-24-2-45-11-58-30-14 18-39 27-74 26v8Z" fill="#25313E" />
    <path d="M102 148c-6 0-10 6-10 14s4 14 10 14M198 148c6 0 10 6 10 14s-4 14-10 14" fill={C.skin} />
    <path d="M128 218c8 7 36 7 44 0" stroke={C.tealDeep} strokeWidth="4" fill="none" strokeLinecap="round" />
  </svg>
);

const S0: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const hover = 0.5 + Math.sin(t * 1.6) * 0.5;
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 18, width: 690}}>
        <Reveal delay={4}>
          <Kicker color={C.tealDeep}>09 · 尾声 · 重新开机</Kicker>
          <Title size={78} style={{marginTop: 16}}>
            很多年后
            <br />
            我又坐回电脑前
          </Title>
        </Reveal>
        <Reveal delay={14}>
          <Body size={28} style={{marginTop: 24, width: 630}}>
            按下开机键之前，我犹豫了很久。
          </Body>
        </Reveal>
        <Reveal delay={24} style={{marginTop: 26, display: 'flex', gap: 10}}>
          <Tag color={C.white} rotate={-1}>桌上：药盒</Tag>
          <Tag color={C.white} rotate={1}>水杯</Tag>
          <Tag color={C.tealSoft} rotate={-0.8}>复查单</Tag>
        </Reveal>
        <div style={{position: 'absolute', left: 0, top: 500, display: 'flex', alignItems: 'center', gap: 16}}>
          <div style={{width: 64, height: 64, borderRadius: 20, background: C.white, border: '2px solid rgba(28,43,58,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Glyph name="power" size={34} color={C.coral} />
          </div>
          <div style={{fontFamily: '"Noto Sans SC"', fontSize: 19, lineHeight: 1.55, color: INK_SOFT}}>
            这一次，他停了一下
            <br />
            <span style={{fontWeight: 700, color: C.coralDeep}}>然后才按下开机键</span>
          </div>
        </div>
      </div>
      <div style={{position: 'absolute', right: 0, top: 6, width: 920, height: 656}}>
        <Card bg={C.white} padding={0} style={{width: '100%', height: '100%', overflow: 'hidden'}}>
          <div style={{height: 78, background: TONES.sand.soft, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px'}}>
            <span style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 21, color: INK}}>很多年后 · 普通的房间</span>
            <Tag color={C.white} rotate={1}>日常</Tag>
          </div>
          <div style={{position: 'relative', height: 578, background: TONES.sand.bg, overflow: 'hidden'}}>
            <div style={{position: 'absolute', right: 40, top: 20, width: 280, height: 300, borderRadius: 140, background: TONES.butter.soft, overflow: 'hidden'}}>
              <div style={{position: 'absolute', left: 84, top: 84, width: 112, height: 112, borderRadius: 56, background: C.mustard, opacity: 0.8}} />
              <div style={{position: 'absolute', left: 20, right: 20, bottom: 44, height: 6, borderRadius: 3, background: INK, opacity: 0.14}} />
            </div>
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 180, background: '#E6D8BF'}} />
            <div style={{position: 'absolute', left: 40, bottom: 150, width: 800, height: 26, borderRadius: 13, background: C.mustard, border: `3px solid ${INK}`}} />
            <div style={{position: 'absolute', left: 90, bottom: 80, width: 20, height: 90, background: C.mustardDeep, opacity: 0.45}} />
            <div style={{position: 'absolute', left: 760, bottom: 80, width: 20, height: 90, background: C.mustardDeep, opacity: 0.45}} />
            <div style={{position: 'absolute', left: 70, bottom: 176, width: 370, height: 240, borderRadius: 18, background: C.white, border: `3px solid ${INK}`, boxShadow: '0 8px 0 rgba(28,43,58,0.08)'}}>
              <div style={{position: 'absolute', inset: 14, borderRadius: 9, background: '#143247'}} />
              <div style={{position: 'absolute', left: 34, top: 40, fontFamily: 'Consolas, monospace', fontSize: 17, color: C.tealSoft}}>
                &gt; boot...
                <br />
                <span style={{color: C.mustardSoft}}>hello, world</span>
                <br />
                <span style={{opacity: 0.5}}>ready.</span>
              </div>
              <div style={{position: 'absolute', left: 34, bottom: 18, right: 24, height: 8, borderRadius: 4, background: C.mustard, opacity: 0.8}} />
            </div>
            <div style={{position: 'absolute', left: 560, bottom: 176}}>
              <CharBack size={300} />
            </div>
            <div style={{position: 'absolute', left: 392, bottom: 188, width: 70, height: 70, borderRadius: 35, border: `2px dashed ${C.coral}`, background: 'rgba(240,91,65,0.08)', transform: `scale(${0.94 + hover * 0.06})`}} />
            <div style={{position: 'absolute', left: 416, bottom: 208, width: 22, height: 22, borderRadius: 11, background: C.coral, border: `2px solid ${INK}`}} />
            <div style={{position: 'absolute', left: 320, top: 386}}>
              <Tag color={C.mustard} rotate={-2}>犹豫了一下</Tag>
            </div>
            <div style={{position: 'absolute', left: 520, bottom: 188, width: 110, height: 84, borderRadius: 12, background: TONES.mint.soft, border: `2px solid rgba(28,43,58,0.12)`}}>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 4, padding: 10}}>
                {Array.from({length: 8}).map((_, i) => <div key={i} style={{height: 28, borderRadius: 5, background: C.white, border: '1px solid rgba(28,43,58,0.1)'}} />)}
              </div>
            </div>
            <div style={{position: 'absolute', left: 470, bottom: 190, width: 34, height: 52, borderRadius: 8, background: C.blueSoft, border: `2px solid ${INK}`}} />
            <div style={{position: 'absolute', left: 430, bottom: 190, width: 70, height: 50, borderRadius: 8, background: C.white, border: '2px solid rgba(28,43,58,0.12)', transform: 'rotate(-6deg)'}}>
              <div style={{height: 4, background: 'rgba(28,43,58,0.15)', margin: '10px 8px 0'}} />
              <div style={{height: 4, background: 'rgba(28,43,58,0.1)', margin: '6px 8px 0', width: '60%'}} />
            </div>
          </div>
        </Card>
      </div>
    </Content>
  );
};

const CodeScreen: React.FC<{frame: number}> = ({frame}) => {
  const t = frame / FPS;
  const typed = Math.min(26, Math.floor(Math.max(0, (t - 2.6) * 8)));
  const line = 'hello, world.// 我回来了';
  const cursor = Math.floor(t * 1.5) % 2 === 0;
  return (
    <div style={{position: 'relative', width: 980, height: 600, borderRadius: 30, background: INK, padding: 18, boxShadow: '0 18px 36px rgba(28,43,58,0.16)'}}>
      <div style={{position: 'relative', width: '100%', height: '100%', borderRadius: 20, background: '#F7F1E3', overflow: 'hidden'}}>
        <div style={{height: 58, background: C.teal, display: 'flex', alignItems: 'center', gap: 10, padding: '0 24px'}}>
          <span style={{width: 12, height: 12, borderRadius: 6, background: C.coral}} />
          <span style={{width: 12, height: 12, borderRadius: 6, background: C.mustard}} />
          <span style={{width: 12, height: 12, borderRadius: 6, background: C.tealSoft}} />
          <span style={{marginLeft: 18, fontFamily: 'Consolas, monospace', fontSize: 15, color: C.white, opacity: 0.8}}>charlie — terminal</span>
        </div>
        <div style={{padding: '30px 34px', fontFamily: 'Consolas, monospace', fontSize: 22, lineHeight: 1.9, color: INK}}>
          <div><span style={{color: C.tealDeep}}>$</span> power on</div>
          <div style={{opacity: 0.55}}>no white screen</div>
          <div><span style={{color: C.tealDeep}}>$</span> type</div>
          <div style={{minHeight: 44}}>{line.slice(0, typed)}<span style={{display: 'inline-block', width: 12, height: 26, background: C.coral, opacity: cursor ? 1 : 0, verticalAlign: 'middle', marginLeft: 2}} /></div>
          <div style={{opacity: Math.min(1, Math.max(0, (t - 8) / 1.2)), marginTop: 10}}>
            <span style={{color: C.tealDeep}}>✓</span> connected
          </div>
        </div>
        <div style={{position: 'absolute', left: 34, bottom: 24, right: 34, display: 'flex', justifyContent: 'space-between', fontFamily: '"Noto Sans SC"', fontSize: 16, color: INK_SOFT}}>
          <span>没有白色</span>
          <span>只是普通的一天</span>
        </div>
      </div>
    </div>
  );
};

const S1: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const done = Math.min(1, Math.max(0, (t - 7.6) / 1));
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 0}}>
        <CodeScreen frame={frame} />
      </div>
      <div style={{position: 'absolute', right: 0, top: 26, width: 570}}>
        <Reveal delay={4}>
          <Kicker color={C.tealDeep}>重新开机 / 没有白色</Kicker>
          <Title size={74} style={{marginTop: 16}}>
            屏幕亮了
            <br />
            这一次
            <br />
            没有白色
          </Title>
        </Reveal>
        <Reveal delay={18}>
          <Body size={26} style={{marginTop: 22, width: 530}}>
            我敲下第一个字，第二个字，然后是一整行代码。
          </Body>
        </Reveal>
        <div style={{marginTop: 34, opacity: done, transform: `translateY(${(1 - done) * 18}px)`}}>
          <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 120, color: INK}}>我好了<span style={{color: C.coral}}>。</span></div>
          <div style={{fontFamily: '"Noto Sans SC"', fontSize: 21, color: INK_SOFT, marginTop: 6}}>不是“根治”，是“回到生活”。</div>
        </div>
        <div style={{marginTop: 24, display: 'flex', gap: 10, opacity: done}}>
          <Tag color={C.teal} fg={C.white} rotate={-1}>没有消失</Tag>
          <Tag color={C.mustard} rotate={1}>但我回来了</Tag>
        </div>
      </div>
    </Content>
  );
};

const S2: React.FC = () => {
  const frame = useCurrentFrame();
  const pillars = [
    {icon: 'pill', label: '规范治疗', sub: '按医嘱，不自行调整'},
    {icon: 'moon', label: '规律作息', sub: '睡眠，是治疗的一部分'},
    {icon: 'calendar', label: '按时复查', sub: '和医生一起看进展'},
    {icon: 'home', label: '回到生活', sub: '上学、工作、恋爱、生育'},
  ];
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 20, width: 710}}>
        <Reveal delay={4}>
          <Kicker color={C.coralDeep}>“好了”的含义</Kicker>
          <Title size={70} style={{marginTop: 16}}>
            “好了”
            <br />
            不是把癫痫
            <br />
            从生命里抹掉
          </Title>
        </Reveal>
        <Reveal delay={16}>
          <Body size={27} style={{marginTop: 20, width: 650}}>
            它是规范治疗，是规律作息，是按时复查。是大多数患者，都可以回到自己的生活里。
          </Body>
        </Reveal>
        <div style={{marginTop: 24, display: 'flex', gap: 8, flexWrap: 'wrap', width: 620}}>
          {['上学', '工作', '恋爱', '生育'].map((item, i) => <Tag key={item} color={i % 2 === 0 ? C.white : TONES.mint.soft} rotate={i % 2 === 0 ? -1 : 1}>{item}</Tag>)}
        </div>
      </div>
      <div style={{position: 'absolute', right: 0, top: 20, width: 860, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18}}>
        {pillars.map((p, i) => {
          const app = springIn(frame, T(0.5 + i * 0.7), 150, 14);
          return (
            <div key={p.label} style={{height: 255, borderRadius: 22, background: C.white, border: '2px solid rgba(28,43,58,0.12)', boxShadow: '0 8px 0 rgba(28,43,58,0.06)', padding: '24px 24px', opacity: Math.min(1, app * 2), transform: `translateY(${(1 - app) * 18}px)`}}>
              <div style={{width: 70, height: 70, borderRadius: 20, background: TONES.mint.soft, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Glyph name={p.icon} size={40} color={C.tealDeep} />
              </div>
              <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 34, color: INK, marginTop: 16}}>{p.label}</div>
              <div style={{fontFamily: '"Noto Sans SC"', fontSize: 17, color: INK_SOFT, marginTop: 6}}>{p.sub}</div>
            </div>
          );
        })}
      </div>
    </Content>
  );
};

const S3a: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const p = Math.min(1, t / 1.2);
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 20, width: 760}}>
        <Reveal delay={4}>
          <Kicker color={C.coralDeep}>下一次 / 你也可以</Kicker>
          <Title size={66} style={{marginTop: 14}}>
            你不需要是医生
            <br />
            也能做对最重要的事
          </Title>
        </Reveal>
        <Reveal delay={14}>
          <Body size={26} style={{marginTop: 20, width: 680}}>
            不要塞东西，不要按住他，记下时间，保护他，陪着他。
          </Body>
        </Reveal>
        <div style={{marginTop: 24, display: 'flex', gap: 10, flexWrap: 'wrap', width: 660}}>
          {['不要塞东西', '不要按住', '记下时间', '保护', '陪伴'].map((tag, i) => (
            <Tag key={tag} color={i === 0 ? C.coral : i === 2 ? C.mustard : C.white} rotate={i % 2 === 0 ? -1 : 1} fg={i === 0 ? C.white : INK}>{tag}</Tag>
          ))}
        </div>
      </div>
      <div style={{position: 'absolute', right: 0, top: 10, width: 860, height: 540}}>
        <Card bg={C.white} padding={0} style={{width: '100%', height: '100%', overflow: 'hidden'}}>
          <div style={{height: 74, background: TONES.peach.soft, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 26px'}}>
            <span style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 21, color: INK}}>如果有人在你面前倒下</span>
            <Tag color={C.white} rotate={1}>记住这几件事</Tag>
          </div>
          <div style={{position: 'relative', height: 466, background: TONES.cream.bg, overflow: 'hidden'}}>
            <div style={{position: 'absolute', left: 80, top: 70, width: 640, height: 340, borderRadius: 26, background: C.white, border: '2px dashed rgba(28,43,58,0.14)'}} />
            <div style={{position: 'absolute', left: 140, top: 190, width: 520, transform: 'rotate(-4deg)'}}>
              <svg width="520" height="260" viewBox="0 0 620 300">
                <rect x="30" y="234" width="560" height="44" rx="22" fill={C.white} stroke={INK} strokeWidth="3" />
                <circle cx="150" cy="174" r="38" fill={C.skin} />
                <path d="M112 172c0-26 16-40 40-40 26 0 40 16 40 38-16-2-28-9-35-21-8 13-25 22-45 20v3Z" fill="#25313E" />
                <path d="M172 165c52-22 126-16 176 12 20 12 24 30 8 40H172v-52Z" fill={C.teal} stroke={INK} strokeWidth="3" />
                <path d="M342 196c46-12 96-6 130 14 16 10 20 22 14 32H342v-46Z" fill={C.blue} stroke={INK} strokeWidth="3" />
                <path d="M230 186c-12 14-14 28-4 42M280 180c-6 14-4 26 6 36" stroke={C.skin} strokeWidth="14" strokeLinecap="round" fill="none" />
                <g>
                  <circle cx="530" cy="140" r="30" fill={C.skin} />
                  <path d="M500 138c0-22 13-34 32-34 22 0 33 13 33 32-13-2-23-8-29-18-7 11-19 18-36 17v3Z" fill="#25313E" />
                  <path d="M516 142c4-3 8-3 12 0M540 142c4-3 8-3 12 0" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
                  <path d="M486 260c0-52 18-88 44-88s44 36 44 88" fill={C.coral} stroke={INK} strokeWidth="3" />
                  <path d="M494 190c-24 8-44 22-58 40" stroke={C.skin} strokeWidth="14" strokeLinecap="round" fill="none" />
                </g>
              </svg>
            </div>
            <div style={{position: 'absolute', left: 120, top: 90, opacity: p}}>
              <Tag color={C.mustardSoft} rotate={-2}>保护头部 · 记下时间</Tag>
            </div>
            <div style={{position: 'absolute', right: 40, bottom: 30, opacity: p}}>
              <Tag color={C.teal} fg={C.white} rotate={1}>陪伴，等清醒</Tag>
            </div>
          </div>
        </Card>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: '18px 26px', borderRadius: 16, background: C.coral, color: C.white, display: 'flex', alignItems: 'center', gap: 16}}>
        <Glyph name="heart" size={32} color={C.white} />
        <span style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 22}}>你不需要“止住”这场发作，只要让他在最危险的几分钟里，不受到额外的伤害。</span>
      </div>
    </Content>
  );
};

const S3b: React.FC = () => {
  const frame = useCurrentFrame();
  const p = Math.min(1, frame / 30);
  return (
    <AbsoluteFill style={{background: TONES.cream.bg}}>
      <div style={{position: 'absolute', right: -140, top: -160, opacity: 0.5}}>
        <Sunburst size={900} color={C.mustard} rays={24} opacity={0.3} />
      </div>
      <div style={{position: 'absolute', right: 50, top: 250, opacity: 0.28}}>
        <BrainNetwork size={620} color={C.tealDeep} accent={C.coral} frame={frame} />
      </div>
      <div style={{position: 'absolute', left: 140, top: 150, width: 1200}}>
        <div style={{opacity: p}}>
          <Glyph name="brain" size={70} color={C.coral} />
          <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 100, color: INK, marginTop: 18}}>癫痫</div>
          <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 48, color: C.tealDeep, marginTop: 4}}>大脑里的一场“电风暴”</div>
          <div style={{width: 130, height: 6, background: C.coral, borderRadius: 3, marginTop: 36}} />
          <div style={{fontFamily: '"Noto Sans SC"', fontSize: 24, lineHeight: 1.7, color: INK_SOFT, marginTop: 30, width: 1120}}>
            本片为医学科普，不能替代诊断和治疗。
            <br />
            如有疑似癫痫发作，请及时就医。
          </div>
          <div style={{fontFamily: '"Noto Sans SC"', fontSize: 17, color: INK_SOFT, opacity: 0.55, marginTop: 34, letterSpacing: 3}}>
            2026 · 癫痫科普 · 纯 MG 动画版
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Ch09: React.FC = () => (
  <MGFrame chapter={chapter} accent={C.teal}>
    <Scene from={0} to={14.77} tone="sand">
      <S0 />
    </Scene>
    <Scene from={14.77} to={29.77} tone="mint">
      <S1 />
    </Scene>
    <Scene from={29.77} to={45.34} tone="peach">
      <S2 />
    </Scene>
    <Scene from={45.34} to={54.5} tone="cream">
      <S3a />
    </Scene>
    <Scene from={54.5} to={60} full tone="cream">
      <S3b />
    </Scene>
  </MGFrame>
);
