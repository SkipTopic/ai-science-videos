import React from 'react';
import {useCurrentFrame} from 'remotion';
import {getChapter} from '../data';
import {Content, MGFrame, PopIn, Reveal, Scene} from './MGFrame';
import {
  Body,
  Card,
  Glyph,
  Highlight,
  Kicker,
  NumBadge,
  Portrait,
  Tag,
  Title,
  WaveLine,
} from './mgKit';
import {C, FPS, INK, INK_SOFT, TONES, springIn} from './theme';

const chapter = getChapter('04');
const T = (seconds: number) => Math.round(seconds * FPS);

const stages = [
  {name: '先兆', icon: 'eye', color: C.mustardDeep, bg: TONES.butter.soft, duration: '几秒', desc: '怪味、心慌、闪光、似曾相识'},
  {name: '强直期', icon: 'bolt', color: C.coral, bg: TONES.peach.soft, duration: '约十几秒', desc: '失去意识，全身肌肉僵硬'},
  {name: '阵挛期', icon: 'eeg', color: C.pink, bg: '#FBE0E3', duration: '几十秒–2分钟', desc: '四肢有节律地抽动'},
  {name: '发作后', icon: 'moon', color: C.tealDeep, bg: TONES.mint.soft, duration: '几分钟–几小时', desc: '迷糊、头痛、疲惫'},
];

const S0: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 14, width: 960}}>
        <Reveal delay={4}>
          <Kicker color={C.coralDeep}>04 · 发作的那一刻</Kicker>
          <Title size={68} style={{marginTop: 10}}>
            一次发作，大概会经历什么
          </Title>
        </Reveal>
        <Reveal delay={14}>
          <Body size={25} style={{marginTop: 10, color: INK_SOFT}}>
            以最常见的全面强直-阵挛发作为例 · 时间因人而异
          </Body>
        </Reveal>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 240, display: 'flex', gap: 20}}>
        {stages.map((stage, i) => {
          const p = springIn(frame, T(0.5 + i * 0.7), 150, 14);
          return (
            <div key={stage.name} style={{flex: 1, height: 330, borderRadius: 24, background: C.white, border: '2px solid rgba(28,43,58,0.12)', boxShadow: '0 9px 0 rgba(28,43,58,0.06)', overflow: 'hidden', opacity: Math.min(1, p * 2), transform: `translateY(${(1 - p) * 26}px)`}}>
              <div style={{height: 110, background: stage.bg, display: 'flex', alignItems: 'center', padding: '0 24px', gap: 16, position: 'relative'}}>
                <div style={{width: 64, height: 64, borderRadius: 18, background: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Glyph name={stage.icon} size={36} color={stage.color} />
                </div>
                <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 38, color: INK}}>{stage.name}</div>
                <div style={{position: 'absolute', right: 20, top: 14, fontFamily: 'Georgia, serif', fontSize: 24, color: stage.color, opacity: 0.55}}>0{i + 1}</div>
              </div>
              <div style={{padding: '22px 26px'}}>
                <div style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 22, color: stage.color}}>{stage.duration}</div>
                <div style={{fontFamily: '"Noto Sans SC"', fontSize: 19, lineHeight: 1.55, color: INK_SOFT, marginTop: 10}}>{stage.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{position: 'absolute', left: 20, right: 20, bottom: 8, display: 'flex', alignItems: 'center', gap: 14}}>
        <div style={{flex: 1, height: 3, background: C.coral, borderRadius: 2}} />
        <span style={{fontFamily: '"Noto Sans SC"', fontSize: 17, letterSpacing: 3, color: INK_SOFT}}>先兆 → 强直 → 阵挛 → 发作后</span>
        <div style={{flex: 1, height: 3, background: C.coral, borderRadius: 2}} />
      </div>
    </Content>
  );
};

const auraItems = [
  {icon: 'drop', label: '奇怪的味道', x: 16, y: 106, color: C.teal, delay: 1.6},
  {icon: 'heart', label: '一阵心慌', x: 614, y: 106, color: C.coral, delay: 3.0},
  {icon: 'spiral', label: '似曾相识感', x: 16, y: 300, color: C.blue, delay: 4.4},
  {icon: 'sun', label: '眼前闪光', x: 614, y: 300, color: C.mustardDeep, delay: 5.8},
];

const S1: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const brain = Math.min(1, Math.max(0, (t - 7.4) / 1.2));
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 20, width: 720}}>
        <Reveal delay={4}>
          <Kicker color={C.coralDeep}>先兆 / AURA</Kicker>
          <Title size={90} style={{marginTop: 18}}>
            大脑在
            <br />
            <Highlight color={C.coralSoft}>“报警”</Highlight>
          </Title>
        </Reveal>
        <Reveal delay={16}>
          <Body size={28} style={{marginTop: 24, width: 650}}>
            有些人发作前会有“先兆”：一股奇怪的味道、一阵心慌、似曾相识感，或者眼前出现闪光。
          </Body>
        </Reveal>
        <Reveal delay={28} style={{marginTop: 26, display: 'flex', gap: 10}}>
          <Tag color={C.white} rotate={-1}>不是每个人都会有</Tag>
          <Tag color={C.mustard} rotate={1}>是发作的一部分</Tag>
        </Reveal>
        <div style={{position: 'absolute', left: 0, top: 520, display: 'flex', alignItems: 'center', gap: 16}}>
          <div style={{width: 62, height: 62, borderRadius: 18, background: C.white, border: '2px solid rgba(28,43,58,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Glyph name="brain" size={34} color={C.coral} />
          </div>
          <div style={{fontFamily: '"Noto Sans SC"', fontSize: 19, lineHeight: 1.55, color: INK_SOFT}}>
            异常电活动开始的地方
            <br />
            <span style={{fontWeight: 700, color: C.coralDeep}}>在发出信号</span>
          </div>
        </div>
      </div>
      <div style={{position: 'absolute', right: 0, top: 10, width: 880, height: 640}}>
        <Card bg={C.white} padding={0} style={{width: '100%', height: '100%', overflow: 'hidden'}}>
          <div style={{height: 70, background: TONES.peach.soft, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 26px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <Glyph name="eye" size={30} color={C.coralDeep} />
              <span style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 21, color: INK}}>发作前 · 主观体验</span>
            </div>
            <Tag color={C.white} rotate={1}>示意</Tag>
          </div>
          <div style={{position: 'absolute', left: 280, top: 130}}>
            <div style={{width: 330, height: 330, borderRadius: 165, background: TONES.peach.soft, opacity: 0.65}} />
            <div style={{position: 'absolute', left: 45, top: 45}}>
              <Portrait size={240} shirt={C.coral} mood="worried" glasses bg={C.white} />
            </div>
          </div>
          {auraItems.map((item) => {
            const p = springIn(frame, T(item.delay), 150, 13);
            return (
              <div key={item.label} style={{position: 'absolute', left: item.x, top: item.y, opacity: Math.min(1, p * 2), transform: `translateY(${(1 - p) * 14}px)`}}>
                <div style={{width: 250, padding: '14px 18px', borderRadius: 16, background: C.white, border: '2px solid rgba(28,43,58,0.1)', boxShadow: '0 6px 0 rgba(28,43,58,0.06)', display: 'flex', alignItems: 'center', gap: 12}}>
                  <div style={{width: 42, height: 42, borderRadius: 12, background: TONES.cream.bg, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Glyph name={item.icon} size={26} color={item.color} />
                  </div>
                  <span style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 19, color: INK}}>{item.label}</span>
                </div>
              </div>
            );
          })}
          <div style={{position: 'absolute', left: 26, right: 26, bottom: 22, height: 106, borderRadius: 18, background: TONES.cream.bg, opacity: brain, display: 'flex', alignItems: 'center', gap: 20, padding: '0 22px'}}>
            <Glyph name="brain" size={58} color={C.coral} />
            <div>
              <div style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 19, color: INK}}>异常放电开始的地方</div>
              <div style={{fontFamily: '"Noto Sans SC"', fontSize: 16, color: INK_SOFT, marginTop: 4}}>先兆 = 一个局部的“报警信号”</div>
            </div>
            <div style={{marginLeft: 'auto'}}>
              <WaveLine width={230} height={58} color={C.coral} frame={frame} amplitude={13} stroke={3.5} />
            </div>
          </div>
        </Card>
      </div>
    </Content>
  );
};

const LyingFigure: React.FC<{frame: number; phase: 'lying' | 'tonic' | 'clonic' | 'recovery'}> = ({frame, phase}) => {
  const t = frame / FPS;
  const jerk = phase === 'clonic' ? Math.sin(t * 2.8) : 0;
  const calm = phase === 'recovery';
  return (
    <svg width="100%" height="100%" viewBox="0 0 900 420" preserveAspectRatio="xMidYMid meet">
      <ellipse cx="460" cy="360" rx="390" ry="24" fill="rgba(28,43,58,0.08)" />
      <rect x="26" y="306" width="840" height="64" rx="30" fill={C.white} stroke={INK} strokeWidth="3" />
      <rect x="26" y="306" width="840" height="18" rx="9" fill={C.tealSoft} />
      <rect x="196" y="268" width="172" height="54" rx="27" fill={C.mustardSoft} stroke={INK} strokeWidth="3" />
      <g>
        <circle cx="112" cy="188" r="32" fill={C.skin} />
        <path d="M80 187c0-24 14-36 34-36 22 0 34 14 34 34-14-2-25-9-30-19-8 12-21 19-38 18v3Z" fill="#25313E" />
        <path d="M99 190c4-4 8-4 12 0M123 190c4-4 8-4 12 0" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M104 206c8 4 15 4 22 0" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M36 342c0-18 14-28 32-28h58c18 0 30 10 30 28s-12 26-30 26H68c-18 0-32-8-32-26Z" fill={C.coralDeep} stroke={INK} strokeWidth="3" />
        <path d="M82 338c0-56 14-92 34-92s34 36 34 92" fill={C.coral} stroke={INK} strokeWidth="3" />
        <path d="M142 250c28 2 58 18 68 38" stroke={C.skin} strokeWidth="18" strokeLinecap="round" fill="none" />
      </g>
      <g>
        <circle cx="318" cy="248" r="42" fill={C.skin} />
        <path d="M276 247c0-30 18-46 44-46 28 0 44 17 44 43-18-2-32-11-39-25-10 16-27 26-49 24v4Z" fill="#25313E" />
        <circle cx="300" cy="252" r="12" fill="none" stroke={INK} strokeWidth="3" />
        <circle cx="334" cy="252" r="12" fill="none" stroke={INK} strokeWidth="3" />
        <path d="M312 252h10M290 249l-7-2M344 249l7-2" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        <path d="M304 273c9 3 17 3 26 0" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" opacity={calm ? 1 : 0.6} />
      </g>
      {calm ? (
        <path d="M352 238c62-30 142-34 236-16 52 10 84 28 90 50 6 22-8 38-34 44H352v-78Z" fill={C.tealSoft} stroke={INK} strokeWidth="3" />
      ) : (
        <path d="M352 238c52-24 132-26 196-8 26 8 40 24 40 44 0 20-14 32-40 34H352v-70Z" fill={C.teal} stroke={INK} strokeWidth="3" />
      )}
      {calm ? (
        <>
          <path d="M390 248c74-18 178-16 268 8M402 280c70-12 170-10 248 8" stroke={C.tealDeep} strokeWidth="3" fill="none" opacity="0.25" strokeLinecap="round" />
          <rect x="590" y="290" width="152" height="26" rx="13" fill={C.tealSoft} opacity="0.9" />
        </>
      ) : null}
      <g transform={`translate(${jerk * 3}, ${jerk * 5})`}>
        <path d="M584 266h106c24 0 38 12 38 26 0 16-14 26-38 26H584v-52Z" fill={C.tealDeep} stroke={INK} strokeWidth="3" />
        <path d="M590 292c34 2 70 2 100-4" stroke={INK} strokeWidth="3" strokeLinecap="round" opacity="0.3" />
      </g>
      <path d="M400 300c-8 22-6 40 8 52M480 304c-4 20 0 36 12 48" stroke={C.skin} strokeWidth="14" strokeLinecap="round" fill="none" opacity="0.95" />
      {phase === 'clonic' ? (
        <g opacity={0.5 + Math.abs(jerk) * 0.45}>
          <path d="M470 220c10-12 22-12 32 0M500 214c10-10 18-10 26 0M540 226c10-10 20-10 30 0" stroke={C.coral} strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M610 250c12-8 22-8 32 0M650 256c10-6 20-6 28 0" stroke={C.coral} strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      ) : null}
      {phase === 'tonic' ? (
        <g>
          <path d="M420 212v-18M470 206v-18M520 214v-18" stroke={C.coral} strokeWidth="3" strokeLinecap="round" opacity="0.55" />
          <text x="620" y="210" fontFamily="'Noto Sans SC'" fontWeight="700" fontSize="18" fill={C.coralDeep} letterSpacing="2">肌肉僵硬</text>
        </g>
      ) : null}
      {calm ? (
        <g>
          <path d="M392 245c6-8 18-8 24 0M448 239c6-8 18-8 24 0" stroke={C.tealDeep} strokeWidth="2.5" fill="none" opacity="0.55" strokeLinecap="round" />
          <text x="620" y="210" fontFamily="'Noto Sans SC'" fontWeight="700" fontSize="18" fill={C.tealDeep} letterSpacing="2">陪伴 · 等清醒</text>
        </g>
      ) : null}
    </svg>
  );
};

const S2: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const phase = t > 8.6 ? 'clonic' : t > 0.6 ? 'tonic' : 'lying';
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 16, width: 650}}>
        <Reveal delay={4}>
          <Kicker color={C.coralDeep}>发作过程 / 强直 → 阵挛</Kicker>
          <Title size={66} style={{marginTop: 14}}>
            失去意识
            <br />
            身体会发生什么
          </Title>
        </Reveal>
        <div style={{marginTop: 26, display: 'flex', flexDirection: 'column', gap: 18}}>
          <div style={{height: 190, borderRadius: 22, background: C.white, border: phase !== 'lying' && phase !== 'clonic' ? `3px solid ${C.coral}` : '2px solid rgba(28,43,58,0.12)', boxShadow: '0 8px 0 rgba(28,43,58,0.06)', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 18}}>
            <NumBadge n="1" color={C.coral} size={52} />
            <div>
              <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 34, color: INK}}>强直期</div>
              <div style={{fontFamily: '"Noto Sans SC"', fontSize: 19, color: INK_SOFT, marginTop: 6}}>全身肌肉僵硬，可能倒在地上</div>
              <div style={{fontFamily: '"Noto Sans SC"', fontSize: 17, color: C.coralDeep, marginTop: 6, fontWeight: 700}}>约十几秒</div>
            </div>
          </div>
          <div style={{height: 190, borderRadius: 22, background: C.white, border: phase === 'clonic' ? `3px solid ${C.coral}` : '2px solid rgba(28,43,58,0.12)', boxShadow: '0 8px 0 rgba(28,43,58,0.06)', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 18}}>
            <NumBadge n="2" color={C.mustardDeep} size={52} />
            <div>
              <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 34, color: INK}}>阵挛期</div>
              <div style={{fontFamily: '"Noto Sans SC"', fontSize: 19, color: INK_SOFT, marginTop: 6}}>四肢开始有节律地抽动</div>
              <div style={{fontFamily: '"Noto Sans SC"', fontSize: 17, color: C.coralDeep, marginTop: 6, fontWeight: 700}}>几十秒 – 2 分钟</div>
            </div>
          </div>
        </div>
      </div>
      <div style={{position: 'absolute', right: 0, top: 6, width: 940, height: 656}}>
        <Card bg={C.white} padding={0} style={{width: '100%', height: '100%', overflow: 'hidden'}}>
          <div style={{height: 78, background: TONES.peach.soft, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <Glyph name="people" size={30} color={C.coralDeep} />
              <span style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 21, color: INK}}>身旁的人：护住头部，移开硬物</span>
            </div>
            <Tag color={C.white} rotate={1}>示意 · 非真实发作</Tag>
          </div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 80, bottom: 0}}>
            <LyingFigure frame={frame} phase={phase as 'lying' | 'tonic' | 'clonic'} />
          </div>
          <div style={{position: 'absolute', left: 30, bottom: 22, display: 'flex', gap: 10}}>
            <Tag color={C.teal} fg={C.white} rotate={-1}>保护，不控制</Tag>
            <Tag color={C.white} rotate={1}>不要按住他</Tag>
          </div>
        </Card>
      </div>
    </Content>
  );
};

const postSymptoms = [
  {icon: 'moon', label: '迷迷糊糊'},
  {icon: 'bolt', label: '头痛'},
  {icon: 'power', label: '疲惫'},
  {icon: 'question', label: '不记得'},
];

const S3: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 16, width: 650}}>
        <Reveal delay={4}>
          <Kicker color={C.tealDeep}>发作后状态 / POSTICTAL</Kicker>
          <Title size={72} style={{marginTop: 14}}>
            抽动停止
            <br />
            不等于恢复
          </Title>
        </Reveal>
        <Reveal delay={16}>
          <Body size={27} style={{marginTop: 22, width: 590}}>
            他可能迷迷糊糊、头痛、疲惫，甚至不记得刚才发生了什么。
          </Body>
        </Reveal>
        <div style={{marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 12, width: 600}}>
          {postSymptoms.map((s, i) => {
            const p = springIn(frame, T(1.2 + i * 0.9), 150, 13);
            return (
              <div key={s.label} style={{width: 282, padding: '14px 18px', borderRadius: 16, background: C.white, border: '2px solid rgba(28,43,58,0.1)', display: 'flex', alignItems: 'center', gap: 12, opacity: Math.min(1, p * 2), transform: `translateY(${(1 - p) * 14}px)`}}>
                <Glyph name={s.icon} size={30} color={C.tealDeep} />
                <span style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 20, color: INK}}>{s.label}</span>
              </div>
            );
          })}
        </div>
        <Reveal delay={T(3.6)} style={{position: 'absolute', left: 0, top: 570}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
            <Glyph name="clock" size={36} color={C.tealDeep} />
            <div style={{fontFamily: '"Noto Sans SC"', fontSize: 19, color: INK_SOFT}}>
              可能持续 <strong style={{color: INK, fontSize: 26}}>几分钟到几小时</strong>
            </div>
          </div>
        </Reveal>
      </div>
      <div style={{position: 'absolute', right: 0, top: 6, width: 940, height: 656}}>
        <Card bg={C.white} padding={0} style={{width: '100%', height: '100%', overflow: 'hidden'}}>
          <div style={{height: 78, background: TONES.mint.soft, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <Glyph name="moon" size={30} color={C.tealDeep} />
              <span style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 21, color: INK}}>发作后 · 陪伴、等清醒</span>
            </div>
            <Tag color={C.white} rotate={1}>示意 · 非真实发作</Tag>
          </div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 80, bottom: 0}}>
            <LyingFigure frame={frame} phase="recovery" />
          </div>
          <div style={{position: 'absolute', left: 30, bottom: 22}}>
            <Tag color={C.teal} fg={C.white} rotate={-1}>不要在他清醒前喂水喂药</Tag>
          </div>
        </Card>
      </div>
    </Content>
  );
};

const S4: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const p = Math.min(1, Math.max(0, (t - 2.2) / 7));
  const danger = t > 11.2;
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 20, width: 730}}>
        <Reveal delay={4}>
          <Kicker color={C.coralDeep}>急救 · 记住这个数字</Kicker>
          <div style={{display: 'flex', alignItems: 'flex-end', gap: 14, marginTop: 10}}>
            <span style={{fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 250, lineHeight: 0.8, color: C.coral}}>5</span>
            <span style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 96, color: INK, paddingBottom: 18}}>分钟</span>
          </div>
        </Reveal>
        <Reveal delay={16}>
          <Body size={28} style={{marginTop: 34, width: 740}}>
            大多数发作会在几分钟内自行停止。
            <br />
            但如果超过 5 分钟，或一次接一次、中间没有恢复，
            <br />
            就是<strong style={{color: C.coralDeep}}>癫痫持续状态</strong>。
          </Body>
        </Reveal>
        <div style={{marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', borderRadius: 14, background: TONES.mint.soft, width: 560}}>
            <Glyph name="shield" size={30} color={C.tealDeep} />
            <span style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 19, color: INK}}>大多数发作会自行停止</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', borderRadius: 14, background: C.coral, width: 560}}>
            <Glyph name="phone" size={30} color={C.white} />
            <span style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 19, color: C.white}}>超过 5 分钟 → 立刻叫救护车</span>
          </div>
        </div>
      </div>
      <div style={{position: 'absolute', right: 0, top: 36, width: 860}}>
        <Card bg={C.white} padding={32} style={{height: 560}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
            <div style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, letterSpacing: 3, fontSize: 19, color: danger ? C.coralDeep : C.tealDeep}}>SEIZURE TIMER</div>
            <div style={{fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 56, color: danger ? C.coral : INK}}>05:00</div>
          </div>
          <div style={{marginTop: 42, height: 26, borderRadius: 13, background: TONES.cream.soft, position: 'relative'}}>
            <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${p * 100}%`, borderRadius: 13, background: `linear-gradient(90deg, ${C.teal}, ${C.mustard} 58%, ${C.coral})`}} />
            {Array.from({length: 6}).map((_, i) => (
              <div key={i} style={{position: 'absolute', left: `${(i / 5) * 100}%`, top: -10, width: 3, height: 46, background: i === 5 ? C.coral : 'rgba(28,43,58,0.18)'}} />
            ))}
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 14, fontFamily: '"Noto Sans SC"', fontSize: 17, color: INK_SOFT}}>
            <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span style={{color: C.coral, fontWeight: 700}}>5 分钟</span>
          </div>
          <div style={{display: 'flex', gap: 18, marginTop: 38}}>
            <div style={{width: 96, height: 96, borderRadius: 48, background: TONES.sky.soft, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Glyph name="clock" size={54} color={C.blueDeep} />
            </div>
            <div style={{fontFamily: '"Noto Sans SC"', fontSize: 21, lineHeight: 1.6, color: INK_SOFT}}>
              计时，是为了识别危险。
              <br />
              如果超过 5 分钟，立即呼叫 120。
            </div>
          </div>
          <div style={{marginTop: 30, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 22px', borderRadius: 16, background: danger ? C.coral : TONES.cream.bg}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
              <Glyph name="phone" size={38} color={danger ? C.white : C.coralDeep} />
              <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 34, color: danger ? C.white : INK}}>120</div>
            </div>
            <Tag color={danger ? C.white : C.coralSoft} rotate={-1}>{danger ? '急症 · 立刻拨打' : '必要时拨打'}</Tag>
          </div>
        </Card>
      </div>
    </Content>
  );
};

export const Ch04: React.FC = () => (
  <MGFrame chapter={chapter} accent={C.coral}>
    <Scene from={0} to={8.14} tone="peach">
      <S0 />
    </Scene>
    <Scene from={8.14} to={23.14} tone="peach">
      <S1 />
    </Scene>
    <Scene from={23.14} to={43.14} tone="cream">
      <S2 />
    </Scene>
    <Scene from={43.14} to={58.14} tone="mint">
      <S3 />
    </Scene>
    <Scene from={58.14} to={75.255} tone="butter">
      <S4 />
    </Scene>
  </MGFrame>
);
