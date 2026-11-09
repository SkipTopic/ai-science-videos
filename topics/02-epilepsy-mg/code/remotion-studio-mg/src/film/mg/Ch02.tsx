import React from 'react';
import {useCurrentFrame} from 'remotion';
import {getChapter} from '../data';
import {Content, MGFrame, PopIn, Reveal, Scene} from './MGFrame';
import {
  Body,
  BrainNetwork,
  Card,
  Glyph,
  Highlight,
  Kicker,
  Portrait,
  Tag,
  Title,
  WaveLine,
} from './mgKit';
import {C, FPS, INK, INK_SOFT, TONES, easeOut, springIn} from './theme';

const chapter = getChapter('02');
const T = (seconds: number) => Math.round(seconds * FPS);

const StripFrame: React.FC<{
  n: string;
  title: string;
  tag: string;
  color: string;
  soft: string;
  delay: number;
  children: React.ReactNode;
}> = ({n, title, tag, color, soft, delay, children}) => {
  const frame = useCurrentFrame();
  const p = springIn(frame, delay, 150, 14);
  return (
    <div style={{width: 336, height: 470, borderRadius: 18, background: C.white, border: `2px solid rgba(28,43,58,0.14)`, padding: 18, opacity: Math.min(1, p * 2), transform: `translateY(${(1 - p) * 28}px) rotate(${(Number(n) % 2 === 0 ? 1 : -1) * 1.2}deg)`, boxShadow: '0 9px 0 rgba(28,43,58,0.07)', display: 'flex', flexDirection: 'column'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <span style={{fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 30, color}}>{n}</span>
        <span style={{fontFamily: '"Noto Sans SC"', fontSize: 16, fontWeight: 700, padding: '4px 10px', borderRadius: 6, background: soft, color: INK}}>{tag}</span>
      </div>
      <div style={{flex: 1, borderRadius: 12, background: soft, marginTop: 14, position: 'relative', overflow: 'hidden'}}>{children}</div>
      <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 31, color: INK, marginTop: 16}}>{title}</div>
    </div>
  );
};

const S0: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const group = Math.min(1, Math.max(0, (t - 8.4) / 1.2));
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 18, width: 520}}>
        <Reveal delay={4}>
          <Kicker color={C.coralDeep}>02 · 一组病</Kicker>
          <Title size={100} style={{marginTop: 18}}>
            癫痫
            <br />
            不止
            <Highlight color={C.coralSoft}>一种</Highlight>
          </Title>
        </Reveal>
        <Reveal delay={14}>
          <Body size={28} style={{marginTop: 26, width: 500}}>
            很多人以为，癫痫就是“倒地、抽搐、口吐白沫”。这只是其中一种。
          </Body>
        </Reveal>
        <div style={{opacity: group, transform: `translateY(${(1 - group) * 18}px)`, marginTop: 26}}>
          <Tag color={C.mustard} rotate={-1}>它是一组疾病的总称</Tag>
          <div style={{fontFamily: '"Noto Sans SC"', fontSize: 20, lineHeight: 1.7, color: INK_SOFT, marginTop: 18}}>
            发作的样子，取决于异常电活动
            <br />
            <span style={{color: C.coral, fontWeight: 700}}>从哪里开始</span>，又
            <span style={{color: C.coral, fontWeight: 700}}>传到了哪里</span>。
          </div>
        </div>
      </div>
      <div style={{position: 'absolute', left: 555, top: 30, width: 1093, height: 600}}>
        <div style={{position: 'absolute', left: 0, top: 28, width: 1093, height: 510, borderRadius: 26, background: C.teal, opacity: 0.96, transform: 'rotate(-0.5deg)'}}>
          {Array.from({length: 18}).map((_, i) => (
            <React.Fragment key={i}>
              <div style={{position: 'absolute', left: 14, top: 18 + i * 27, width: 10, height: 12, borderRadius: 2, background: C.mustardSoft}} />
              <div style={{position: 'absolute', right: 14, top: 18 + i * 27, width: 10, height: 12, borderRadius: 2, background: C.mustardSoft}} />
            </React.Fragment>
          ))}
        </div>
        <div style={{position: 'absolute', left: 24, top: 52, display: 'flex', gap: 20}}>
          <StripFrame n="01" title="全面强直-阵挛" tag="影视化 · 示意" color={C.coral} soft={TONES.peach.soft} delay={T(1.5)}>
            <div style={{position: 'absolute', left: 16, top: 16, fontFamily: '"Noto Sans SC"', fontSize: 13, letterSpacing: 2, color: C.coralDeep}}>TAKE 01 / DRAMA</div>
            <div style={{position: 'absolute', left: 26, top: 72}}>
              <svg width="282" height="250" viewBox="0 0 282 250">
                <line x1="16" y1="218" x2="266" y2="218" stroke={INK} strokeWidth="3" opacity="0.2" strokeLinecap="round" />
                <ellipse cx="150" cy="236" rx="112" ry="8" fill="rgba(28,43,58,0.10)" />
                <rect x="28" y="184" width="58" height="20" rx="10" fill={C.tealDeep} stroke={INK} strokeWidth="4" transform="rotate(-4 57 194)" />
                <rect x="28" y="214" width="62" height="20" rx="10" fill={C.tealDeep} stroke={INK} strokeWidth="4" transform="rotate(4 59 224)" />
                <rect x="78" y="172" width="114" height="60" rx="26" fill={C.teal} stroke={INK} strokeWidth="4" />
                <circle cx="217" cy="192" r="32" fill={C.skin} stroke={INK} strokeWidth="4" />
                <path d="M186 190c0-24 13-36 32-36 22 0 34 13 34 34-14-2-25-8-30-18-8 12-21 18-36 17v3Z" fill="#25313E" />
                <path d="M204 192h12M228 192h12" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
                <path d="M212 208c8 3 16 3 24 0" stroke={INK} strokeWidth="3.5" fill="none" strokeLinecap="round" />
                <path d="M140 188c-8 12-6 22 6 30" stroke={C.skin} strokeWidth="14" strokeLinecap="round" fill="none" />
                <path d="M96 158c12-12 28-14 42-6" stroke={C.teal} strokeWidth="16" strokeLinecap="round" fill="none" />
                <path d="M150 88c14-6 28 2 30 16M172 116c12 2 20 10 20 22M110 104c-14 2-22 12-22 24" stroke={C.coral} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.8" />
                <circle cx="256" cy="74" r="20" fill={C.coral} />
                <text x="256" y="82" textAnchor="middle" fontFamily="'Noto Sans SC'" fontWeight="700" fontSize="24" fill={C.white}>!</text>
              </svg>
            </div>
            <div style={{position: 'absolute', right: 12, top: 44, transform: 'rotate(8deg)'}}>
              <Tag color={C.coral} fg={C.white} rotate={8}>影视化</Tag>
            </div>
          </StripFrame>
          <StripFrame n="02" title="局灶性发作" tag="常见" color={C.teal} soft={TONES.mint.soft} delay={T(5.4)}>
            <div style={{position: 'absolute', left: 24, top: 30, fontFamily: '"Noto Sans SC"', fontSize: 13, letterSpacing: 2, color: C.tealDeep}}>FOCAL / 局部</div>
            <div style={{position: 'absolute', left: 95, top: 66}}>
              <Glyph name="hand" size={150} color={INK} />
              <div style={{position: 'absolute', left: 78, top: 8, width: 18, height: 18, borderRadius: 9, background: C.coral}} />
              <svg width="190" height="190" viewBox="0 0 190 190" style={{position: 'absolute', left: 40, top: 20}}>
                <path d="M26 134c-14-6-20-18-14-30M14 146c-18-2-26-12-24-26M44 158c-12 4-24 0-30-10" stroke={C.coral} strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.8" />
              </svg>
            </div>
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 16, textAlign: 'center', fontFamily: '"Noto Sans SC"', fontSize: 15, color: INK_SOFT}}>手指不自觉地抽动</div>
          </StripFrame>
          <StripFrame n="03" title="失神发作" tag="容易漏诊" color={C.blue} soft={TONES.sky.soft} delay={T(6.6)}>
            <div style={{position: 'absolute', left: 30, top: 38, width: 180, height: 230, borderRadius: 90, background: C.white, opacity: 0.65}} />
            <div style={{position: 'absolute', left: 78, top: 72}}>
              <Portrait size={170} shirt={C.blue} mood="absent" glasses={false} bg="transparent" />
            </div>
            <div style={{position: 'absolute', right: 20, top: 28, fontFamily: 'Georgia, serif', fontSize: 50, color: C.blueDeep}}>3s</div>
            <div style={{position: 'absolute', left: 20, bottom: 16, fontFamily: '"Noto Sans SC"', fontSize: 15, color: INK_SOFT}}>突然愣住，几秒后接上</div>
          </StripFrame>
        </div>
        <div style={{position: 'absolute', left: 30, top: 548, width: 1030, display: 'flex', alignItems: 'center', gap: 16, opacity: group}}>
          <div style={{flex: 1, height: 3, background: C.coral, borderRadius: 2}} />
          <Tag color={C.white} rotate={-1}>同一个名字，很多种样子</Tag>
          <div style={{flex: 1, height: 3, background: C.coral, borderRadius: 2}} />
        </div>
      </div>
    </Content>
  );
};

const S1: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const symptoms = [
    {icon: 'drop', text: '怪味', delay: 2.4},
    {icon: 'sun', text: '一闪的光', delay: 3.6},
    {icon: 'heart', text: '莫名恐惧', delay: 4.8},
    {icon: 'hand', text: '手指抽动', delay: 6.0},
  ];
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 22, width: 600}}>
        <Reveal delay={4}>
          <Kicker color={C.tealDeep}>局灶性发作 / FOCAL</Kicker>
          <Title size={92} style={{marginTop: 20}}>
            只影响
            <br />
            一小片脑区
          </Title>
        </Reveal>
        <Reveal delay={16}>
          <Body size={28} style={{marginTop: 26, width: 530}}>
            人可能只是闻到一股怪味、看到一闪的光、感到莫名的恐惧，或者手指不自觉地抽动。
          </Body>
        </Reveal>
        <Reveal delay={30} style={{marginTop: 26, display: 'flex', gap: 10}}>
          <Tag color={C.teal} fg={C.white} rotate={-1}>局部放电</Tag>
          <Tag color={C.white} rotate={1}>不一定倒地</Tag>
        </Reveal>
        <div style={{position: 'absolute', left: 0, top: 510, display: 'flex', alignItems: 'center', gap: 16}}>
          <div style={{width: 100, height: 100, borderRadius: 24, background: C.white, border: `2px solid rgba(28,43,58,0.12)`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Glyph name="brain" size={58} color={C.teal} />
          </div>
          <div style={{fontFamily: '"Noto Sans SC"', fontSize: 19, lineHeight: 1.55, color: INK_SOFT}}>
            异常电活动只从一个局部开始
            <br />
            <span style={{color: C.tealDeep, fontWeight: 700}}>不一定扩散到全脑</span>
          </div>
        </div>
      </div>
      <div style={{position: 'absolute', left: 620, top: 20, width: 1028, height: 632}}>
        <Card bg={C.white} padding={0} style={{width: '100%', height: '100%', overflow: 'hidden'}}>
          <div style={{height: 100, background: TONES.mint.soft, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 30px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
              <div style={{width: 42, height: 42, borderRadius: 21, background: C.teal, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Glyph name="work" size={24} color={C.white} />
              </div>
              <div style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 20, color: INK}}>办公室 · 下午 3:12</div>
            </div>
            <Tag color={C.white} rotate={1}>旁人可能看不出</Tag>
          </div>
          <div style={{position: 'absolute', left: 48, top: 170, width: 460, height: 320}}>
            <svg width="460" height="320" viewBox="0 0 460 320">
              <rect x="10" y="230" width="440" height="22" rx="11" fill={C.mustard} />
              <rect x="60" y="252" width="26" height="60" fill={C.mustardDeep} opacity="0.45" />
              <rect x="370" y="252" width="26" height="60" fill={C.mustardDeep} opacity="0.45" />
              <rect x="108" y="168" width="245" height="65" rx="10" fill={INK} opacity="0.9" />
              <rect x="120" y="180" width="220" height="38" rx="6" fill={C.tealSoft} opacity="0.2" />
              <circle cx="250" cy="92" r="52" fill={C.skin} />
              <path d="M199 90c0-36 21-56 53-56 34 0 54 21 54 54-22-2-38-11-47-27-13 17-34 26-60 24v5Z" fill="#25313E" />
              <circle cx="230" cy="94" r="4" fill={INK} />
              <circle cx="268" cy="94" r="4" fill={INK} />
              <path d="M238 116c8 4 16 4 24 0" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M190 176c-16 14-24 34-22 56M310 176c16 14 24 34 22 56" stroke={C.teal} strokeWidth="22" strokeLinecap="round" fill="none" />
              <path d="M330 220c20 4 34 16 38 32" stroke={C.skin} strokeWidth="18" strokeLinecap="round" fill="none" />
              <path d="M370 238c12 2 22 8 28 16" stroke={C.skin} strokeWidth="14" strokeLinecap="round" fill="none" />
              <circle cx="404" cy="258" r="9" fill={C.coral} />
              {[0, 1, 2].map((i) => (
                <path key={i} d={`M${382 + i * 10} ${222 - i * 6}q10-8 20 0`} stroke={C.coral} strokeWidth="3" fill="none" strokeLinecap="round" opacity={0.55 + i * 0.15} />
              ))}
            </svg>
          </div>
          <div style={{position: 'absolute', right: 40, top: 154, width: 410, height: 300}}>
            <div style={{position: 'relative', width: '100%', height: '100%', borderRadius: 22, background: TONES.cream.bg, border: `2px solid rgba(28,43,58,0.1)`, overflow: 'hidden'}}>
              <div style={{position: 'absolute', left: 20, top: 16, fontFamily: '"Noto Sans SC"', fontSize: 14, letterSpacing: 2, color: INK_SOFT}}>脑内小窗口 / 示意</div>
              <div style={{position: 'absolute', left: 40, top: 58}}>
                <svg width="330" height="200" viewBox="0 0 330 200">
                  <path d="M165 20c-26 0-46 10-58 26-22 4-40 21-40 44 0 14 6 26 15 34-4 11-3 24 4 33 8 12 22 18 36 16 9 11 24 17 39 15 18 14 44 9 55-8 18 2 34-8 39-22 7-19 0-35-15-45 2-18-8-34-24-40-8-22-27-35-47-35Z" fill="none" stroke={INK} strokeWidth="3" opacity="0.4" />
                  <circle cx="150" cy="102" r="10" fill={C.coral} />
                  <circle cx="150" cy="102" r="20" fill="none" stroke={C.coral} strokeWidth="2" opacity="0.45" />
                  <circle cx="150" cy="102" r="30" fill="none" stroke={C.coral} strokeWidth="2" opacity="0.22" />
                  <path d="M162 102h40l8-12 8 22 8-10h38" stroke={C.teal} strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </div>
              <div style={{position: 'absolute', left: 22, bottom: 16, fontFamily: '"Noto Sans SC"', fontSize: 15, color: C.tealDeep, fontWeight: 700}}>局灶性放电 · 只点亮一小块</div>
            </div>
          </div>
          <div style={{position: 'absolute', left: 40, right: 40, bottom: 76, display: 'flex', justifyContent: 'center', gap: 12}}>
            {symptoms.map((s) => {
              const p = springIn(frame, T(s.delay), 150, 13);
              return (
                <div key={s.text} style={{display: 'flex', alignItems: 'center', gap: 10, background: C.white, border: `2px solid rgba(28,43,58,0.1)`, borderRadius: 16, padding: '10px 16px', boxShadow: '0 5px 0 rgba(28,43,58,0.06)', opacity: Math.min(1, p * 2), transform: `translateY(${(1 - p) * 16}px)`}}>
                  <Glyph name={s.icon} size={30} color={C.coral} />
                  <span style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 19, color: INK}}>{s.text}</span>
                </div>
              );
            })}
          </div>
          <div style={{position: 'absolute', left: 26, bottom: 24, display: 'flex', alignItems: 'center', gap: 10, fontFamily: '"Noto Sans SC"', fontSize: 17, color: INK_SOFT}}>
            <Glyph name="eye" size={26} color={C.teal} />
            别人可能以为他只是走神
          </div>
        </Card>
      </div>
    </Content>
  );
};

const S2: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const freeze = Math.min(1, Math.max(0, (t - 5) / 1));
  const resume = Math.min(1, Math.max(0, (t - 7.4) / 1));
  return (
    <Content>
      <Reveal delay={4}>
        <Kicker color={C.blueDeep}>失神发作 / ABSENCE</Kicker>
        <Title size={82} style={{marginTop: 10}}>
          几秒钟的<span style={{color: C.blue}}>“断电”</span>
        </Title>
      </Reveal>
      <div style={{position: 'absolute', left: 0, top: 200, width: 720}}>
        <Card bg={C.white} padding={0} style={{height: 390, overflow: 'hidden'}}>
          <div style={{height: 62, background: TONES.mint.soft, display: 'flex', alignItems: 'center', padding: '0 24px', justifyContent: 'space-between'}}>
            <span style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 21, color: INK}}>看起来像：走神</span>
            <span style={{fontFamily: '"Noto Sans SC"', fontSize: 15, color: INK_SOFT}}>表面现象</span>
          </div>
          <div style={{position: 'relative', height: 328}}>
            <div style={{position: 'absolute', left: 44, top: 48}}>
              <Portrait size={250} shirt={C.teal} mood="calm" bg={TONES.mint.soft} />
            </div>
            <div style={{position: 'absolute', left: 300, top: 54, width: 330}}>
              <div style={{background: C.white, border: `3px solid ${INK}`, borderRadius: '24px 24px 24px 4px', padding: '18px 22px', fontFamily: '"Noto Sans SC"', fontSize: 22, color: INK, boxShadow: '0 6px 0 rgba(28,43,58,0.08)'}}>
                想到昨晚的游戏……
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div style={{position: 'absolute', left: 928, top: 200, width: 720}}>
        <Card bg={C.white} padding={0} style={{height: 390, overflow: 'hidden'}}>
          <div style={{height: 62, background: TONES.sky.soft, display: 'flex', alignItems: 'center', padding: '0 24px', justifyContent: 'space-between'}}>
            <span style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 21, color: INK}}>失神发作</span>
            <span style={{fontFamily: '"Noto Sans SC"', fontSize: 15, color: INK_SOFT}}>突然中断，几秒后接上</span>
          </div>
          <div style={{position: 'relative', height: 328}}>
            <div style={{position: 'absolute', left: 44, top: 48}}>
              <Portrait size={250} shirt={C.blue} mood="absent" glasses bg={TONES.sky.soft} />
            </div>
            <div style={{position: 'absolute', left: 300, top: 54, width: 330}}>
              <div style={{background: C.white, border: `3px solid ${C.blue}`, borderRadius: '24px 24px 24px 4px', padding: '18px 22px', fontFamily: 'Georgia, serif', fontSize: 34, letterSpacing: 6, color: C.blueDeep, boxShadow: '0 6px 0 rgba(28,43,58,0.08)'}}>
                ……
              </div>
              <div style={{marginTop: 18, display: 'flex', gap: 10, alignItems: 'center'}}>
                <Tag color={C.blue} fg={C.white} rotate={-1}>几秒</Tag>
                {freeze > 0.5 ? <Tag color={C.mustard} rotate={1}>突然停住</Tag> : null}
              </div>
            </div>
            <div style={{position: 'absolute', right: 16, top: 16, width: 90, height: 90, borderRadius: 45, background: C.white, border: `2px solid rgba(28,43,58,0.12)`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.9}}>
              <Glyph name="clock" size={52} color={C.blue} />
            </div>
          </div>
        </Card>
      </div>
      <div style={{position: 'absolute', left: 720, top: 330, width: 208, textAlign: 'center', opacity: freeze}}>
        <div style={{width: 126, height: 126, margin: '0 auto', borderRadius: 63, background: C.white, border: `2px solid rgba(28,43,58,0.12)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 7px 0 rgba(28,43,58,0.07)'}}>
          <span style={{fontFamily: 'Georgia, serif', fontSize: 82, lineHeight: 1, color: C.coral}}>≈</span>
        </div>
        <div style={{fontFamily: '"Noto Sans SC"', fontSize: 17, letterSpacing: 2, color: INK_SOFT, marginTop: 8}}>看起来很像</div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', gap: 26}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 8, flex: 1}}>
          {['正在说话', '突然停住', '几秒钟', '接上刚才的话'].map((step, i) => (
            <React.Fragment key={step}>
              <div style={{padding: '10px 16px', borderRadius: 10, background: i === 1 ? C.blue : i === 2 ? C.mustard : C.white, color: i === 1 ? C.white : INK, fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 17, border: '1.5px solid rgba(28,43,58,0.12)', opacity: i === 2 ? 0.3 + resume * 0.7 : 1}}>{step}</div>
              {i < 3 ? <div style={{flex: 1, height: 2, background: 'rgba(28,43,58,0.18)'}} /> : null}
            </React.Fragment>
          ))}
        </div>
        <Tag color={C.coralSoft} rotate={-1}>常被误认为走神</Tag>
      </div>
    </Content>
  );
};

const S3a: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 18, width: 700}}>
        <Reveal delay={4}>
          <Kicker color={C.lilacDeep}>查理的那一天</Kicker>
          <Title size={66} style={{marginTop: 16}}>
            一动不动，眼前发白
            <br />
            可能是哪一种？
          </Title>
        </Reveal>
        <Reveal delay={16}>
          <Body size={27} style={{marginTop: 20, width: 650}}>
            可能是局灶性发作，也可能是失神发作。具体是哪一种，需要医生根据发作表现和脑电图判断。
          </Body>
        </Reveal>
        <div style={{marginTop: 28, display: 'flex', gap: 12}}>
          <Tag color={C.white} rotate={-1}>不是自我诊断</Tag>
          <Tag color={C.mustard} rotate={1}>需要脑电图</Tag>
        </div>
        <div style={{position: 'absolute', left: 0, top: 476, width: 660}}>
          <Card bg={C.white} padding={22} style={{display: 'flex', alignItems: 'center', gap: 22}}>
            <div style={{width: 70, height: 70, borderRadius: 35, background: TONES.sky.soft, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Glyph name="eeg" size={42} color={C.blue} />
            </div>
            <div>
              <div style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 23, color: INK}}>发作表现 + 脑电图</div>
              <div style={{fontFamily: '"Noto Sans SC"', fontSize: 17, color: INK_SOFT, marginTop: 4}}>医生来判断，不是靠猜</div>
            </div>
            <div style={{marginLeft: 'auto', width: 90, opacity: 0.9}}>
              <WaveLine width={90} height={50} color={C.teal} frame={frame} amplitude={10} stroke={3} />
            </div>
          </Card>
        </div>
      </div>
      <div style={{position: 'absolute', right: 10, top: 20, width: 900, height: 640}}>
        <div style={{position: 'absolute', left: 230, top: 0, width: 460, height: 460, borderRadius: 230, background: TONES.lilac.soft, opacity: 0.72}} />
        <div style={{position: 'absolute', left: 340, top: 110}}>
          <Portrait size={240} shirt={C.teal} mood="worried" glasses bg={C.white} />
        </div>
        <div style={{position: 'absolute', left: 600, top: 30}}>
          <Tag color={C.white} rotate={2}>情景再现 · 非诊断</Tag>
        </div>
        <div style={{position: 'absolute', left: 230, top: 30, opacity: Math.min(1, t / 1.4)}}>
          <div style={{width: 58, height: 58, borderRadius: 29, background: C.coral, color: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Georgia, serif', fontSize: 38, boxShadow: '0 6px 0 rgba(28,43,58,0.12)'}}>?</div>
        </div>
        <div style={{position: 'absolute', left: 20, bottom: 0, width: 400}}>
          <Card bg={C.white} padding={20} style={{transform: 'rotate(-1.5deg)'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <Glyph name="hand" size={38} color={C.teal} />
              <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 28, color: INK}}>局灶性发作</div>
            </div>
            <div style={{fontFamily: '"Noto Sans SC"', fontSize: 17, color: INK_SOFT, marginTop: 8}}>只影响一小片脑区</div>
          </Card>
        </div>
        <div style={{position: 'absolute', right: 20, bottom: 0, width: 400}}>
          <Card bg={C.white} padding={20} style={{transform: 'rotate(1.5deg)'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <Glyph name="clock" size={38} color={C.blue} />
              <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 28, color: INK}}>失神发作</div>
            </div>
            <div style={{fontFamily: '"Noto Sans SC"', fontSize: 17, color: INK_SOFT, marginTop: 8}}>几秒钟的突然“断电”</div>
          </Card>
        </div>
      </div>
    </Content>
  );
};

const S3b: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const p = Math.min(1, t / 1.2);
  const dots = Array.from({length: 22}, (_, i) => i);
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 30, right: 0, display: 'flex', gap: 24}}>
        <Reveal delay={4} style={{flex: 1}}>
          <Card bg={C.white} padding={26} style={{display: 'flex', alignItems: 'center', gap: 22, height: 160}}>
            <div style={{width: 82, height: 82, borderRadius: 41, background: TONES.mint.soft, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Glyph name="eye" size={46} color={C.teal} />
            </div>
            <div>
              <div style={{fontFamily: '"Noto Sans SC"', fontSize: 17, letterSpacing: 2, color: C.tealDeep}}>看到一个人“发呆”</div>
              <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 34, color: INK, marginTop: 4}}>别急着下结论</div>
            </div>
          </Card>
        </Reveal>
        <Reveal delay={14} style={{flex: 1}}>
          <Card bg={C.white} padding={26} style={{display: 'flex', alignItems: 'center', gap: 22, height: 160}}>
            <div style={{width: 82, height: 82, borderRadius: 41, background: TONES.peach.soft, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Glyph name="no" size={46} color={C.coral} />
            </div>
            <div>
              <div style={{fontFamily: '"Noto Sans SC"', fontSize: 17, letterSpacing: 2, color: C.coralDeep}}>看到一个人抽搐</div>
              <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 34, color: INK, marginTop: 4}}>别急着说“羊癫疯”</div>
            </div>
          </Card>
        </Reveal>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 280, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Title size={100} style={{textAlign: 'center', opacity: p, transform: `translateY(${(1 - p) * 20}px)`}}>
          癫痫的边界
          <br />
          比想象中<span style={{color: C.coral}}>宽得多</span>
        </Title>
      </div>
      <div style={{position: 'absolute', left: 70, right: 70, bottom: 18}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: '"Noto Sans SC"', fontSize: 16, color: INK_SOFT, marginBottom: 10}}>
          <span>只是“发呆”</span>
          <span style={{color: C.coral, fontWeight: 700}}>癫痫的边界</span>
          <span>全身抽搐</span>
        </div>
        <div style={{position: 'relative', height: 42, borderRadius: 21, background: C.white, border: '2px solid rgba(28,43,58,0.1)'}}>
          <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${p * 100}%`, borderRadius: 21, background: 'linear-gradient(90deg, rgba(196,231,223,0.9), rgba(249,226,168,0.9) 52%, rgba(248,198,182,0.9))'}} />
          {dots.map((i) => (
            <div key={i} style={{position: 'absolute', left: `${3 + (i / (dots.length - 1)) * 94}%`, top: 9, width: 24, height: 24, borderRadius: 12, background: i % 4 === 0 ? C.coral : i % 4 === 1 ? C.teal : i % 4 === 2 ? C.mustard : C.blue, opacity: Math.min(1, Math.max(0, (t - i * 0.12) / 0.8)), transform: `scale(${0.6 + Math.min(1, Math.max(0, (t - i * 0.12) / 0.8)) * 0.4})`}} />
          ))}
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 10, fontFamily: '"Noto Sans SC"', fontSize: 16, color: INK_SOFT}}>
          <span>局灶性 · 失神 · 全面性 · 未知起源</span>
          <span>同一个名字，很多种样子</span>
        </div>
      </div>
    </Content>
  );
};

export const Ch02: React.FC = () => (
  <MGFrame chapter={chapter} accent={C.coral}>
    <Scene from={0} to={16.64} tone="peach">
      <S0 />
    </Scene>
    <Scene from={16.64} to={28.56} tone="mint">
      <S1 />
    </Scene>
    <Scene from={28.56} to={48.56} tone="sky">
      <S2 />
    </Scene>
    <Scene from={48.56} to={59.6} tone="lilac">
      <S3a />
    </Scene>
    <Scene from={59.6} to={70.302} tone="butter">
      <S3b />
    </Scene>
  </MGFrame>
);
