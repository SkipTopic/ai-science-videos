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
} from './mgKit';
import {C, FPS, INK, INK_SOFT, TONES, springIn} from './theme';

const chapter = getChapter('03');
const T = (seconds: number) => Math.round(seconds * FPS);

const MythFact: React.FC<{frame: number}> = ({frame}) => {
  const t = frame / FPS;
  const x = Math.min(1, Math.max(0, (t - 1) / 0.7));
  return (
    <div style={{display: 'flex', gap: 24, alignItems: 'stretch'}}>
      <Card bg={C.white} padding={26} style={{width: 360, opacity: 0.95}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <Glyph name="no" size={40} color={C.coral} />
          <span style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 22, color: C.coralDeep}}>不是中邪</span>
        </div>
        <div style={{position: 'relative', height: 150, marginTop: 12, borderRadius: 18, background: TONES.sand.soft, overflow: 'hidden'}}>
          <div style={{position: 'absolute', left: 84, top: 22, width: 110, height: 110, borderRadius: 55, border: `4px solid ${INK}`, opacity: 0.8}} />
          <div style={{position: 'absolute', left: 136, top: 48, width: 6, height: 60, borderRadius: 3, background: INK, opacity: 0.7}} />
          <div style={{position: 'absolute', left: 122, top: 32, width: 34, height: 34, borderRadius: 17, border: `4px solid ${INK}`, opacity: 0.7}} />
          <div style={{position: 'absolute', left: 34, top: 50, transform: `scaleX(${x})`, transformOrigin: 'left center', width: 230, height: 8, background: C.coral, borderRadius: 4}} />
        </div>
        <div style={{fontFamily: '"Noto Sans SC"', fontSize: 17, color: INK_SOFT, marginTop: 12}}>不是报应，也不是“邪气”</div>
      </Card>
      <Card bg={C.white} padding={26} style={{width: 360}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <Glyph name="people" size={40} color={C.teal} />
          <span style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 22, color: C.tealDeep}}>不传染</span>
        </div>
        <div style={{position: 'relative', height: 150, marginTop: 12, borderRadius: 18, background: TONES.mint.soft, overflow: 'hidden'}}>
          <div style={{position: 'absolute', left: 38, top: 40}}>
            <svg width="290" height="110" viewBox="0 0 290 110">
              <rect x="8" y="50" width="76" height="36" rx="18" fill={C.teal} />
              <rect x="206" y="50" width="76" height="36" rx="18" fill={C.blue} />
              <path d="M84 60c18-6 36-2 48 10" stroke={C.skin} strokeWidth="18" strokeLinecap="round" fill="none" />
              <path d="M206 60c-18-6-36-2-48 10" stroke={C.skin} strokeWidth="18" strokeLinecap="round" fill="none" />
              <path d="M128 66c8-8 18-8 26 0M136 76c5-5 13-5 18 0" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
              <circle cx="145" cy="30" r="19" fill={C.teal} />
              <path d="m137 30 6 6 11-12" stroke={C.white} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div style={{fontFamily: '"Noto Sans SC"', fontSize: 17, color: INK_SOFT, marginTop: 12}}>一起吃饭、工作、握手，都不会传染</div>
      </Card>
    </div>
  );
};

const S0: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 18, width: 780}}>
        <Reveal delay={4}>
          <Kicker color={C.mustardDeep}>03 · 为什么会得癫痫</Kicker>
          <Title size={92} style={{marginTop: 18}}>
            不是中邪
            <br />
            也不是<Highlight color={C.coralSoft}>报应</Highlight>
          </Title>
        </Reveal>
        <Reveal delay={16}>
          <Body size={28} style={{marginTop: 26, width: 700}}>
            癫痫是一种脑部疾病，不传染。和癫痫患者一起吃饭、工作、握手，不会让你得癫痫。
          </Body>
        </Reveal>
        <Reveal delay={26} style={{marginTop: 26, display: 'flex', gap: 12}}>
          <Tag color={C.teal} fg={C.white} rotate={-1}>不传染</Tag>
          <Tag color={C.white} rotate={1}>不是邪气</Tag>
          <Tag color={C.mustard} rotate={-0.6}>不是报应</Tag>
        </Reveal>
      </div>
      <div style={{position: 'absolute', right: 0, top: 150}}>
        <MythFact frame={frame} />
      </div>
      <div style={{position: 'absolute', right: 0, top: 508, display: 'flex', gap: 12}}>
        {[
          {icon: 'coffee', label: '一起吃饭'},
          {icon: 'work', label: '一起工作'},
          {icon: 'hand', label: '握手'},
        ].map((item) => (
          <Card key={item.label} bg={C.white} padding={16} style={{width: 240, display: 'flex', alignItems: 'center', gap: 12}}>
            <div style={{width: 42, height: 42, borderRadius: 12, background: TONES.mint.soft, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Glyph name={item.icon} size={24} color={C.tealDeep} />
            </div>
            <span style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 18, color: INK}}>{item.label}</span>
            <div style={{marginLeft: 'auto', width: 24, height: 24, borderRadius: 12, background: C.teal, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <svg width="14" height="14" viewBox="0 0 14 14"><path d="m3 7 3 3 5-6" stroke={C.white} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
          </Card>
        ))}
      </div>
      <div style={{position: 'absolute', left: 0, bottom: 6, right: 0, display: 'flex', alignItems: 'center', gap: 16}}>
        <div style={{flex: 1, height: 2, background: 'rgba(28,43,58,0.14)'}} />
        <span style={{fontFamily: '"Noto Sans SC"', fontSize: 19, letterSpacing: 3, color: INK_SOFT}}>把“病”还给病，把“人”还给人</span>
        <div style={{flex: 1, height: 2, background: 'rgba(28,43,58,0.14)'}} />
      </div>
    </Content>
  );
};

const CAUSES = [
  {n: '01', title: '结构', icon: 'brain', color: C.coral, bg: TONES.peach.soft, detail: '出生缺氧、脑外伤、卒中、肿瘤', mini: ['drop', 'bolt', 'brain', 'mri']},
  {n: '02', title: '基因', icon: 'dna', color: C.blue, bg: TONES.sky.soft, detail: '有些癫痫综合征有遗传基础', mini: ['dna', 'people']},
  {n: '03', title: '感染', icon: 'virus', color: C.lilacDeep, bg: TONES.lilac.soft, detail: '颅内感染等', mini: ['virus']},
  {n: '04', title: '代谢', icon: 'drop', color: C.mustardDeep, bg: TONES.butter.soft, detail: '血糖、电解质等异常', mini: ['drop']},
  {n: '05', title: '免疫', icon: 'immune', color: C.tealDeep, bg: TONES.mint.soft, detail: '免疫相关脑炎等', mini: ['immune']},
  {n: '06', title: '未知', icon: 'question', color: INK_SOFT, bg: TONES.sand.soft, detail: '约一半患者仍找不到明确原因', mini: ['question']},
];

const S1: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const active = t > 16.6 ? 4 : t > 12.1 ? 1 : t > 3.8 ? 0 : -1;
  return (
    <Content>
      <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between'}}>
        <Reveal delay={4}>
          <Kicker color={C.blueDeep}>病因分类 · 不是单一答案</Kicker>
          <Title size={60} style={{marginTop: 8}}>
            医学上，大致分几类
          </Title>
        </Reveal>
        <Reveal delay={18}>
          <Tag color={C.white} rotate={-1}>病因 ≠ 诱因</Tag>
        </Reveal>
      </div>
      <div style={{position: 'absolute', left: 0, top: 140, width: 1648, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20}}>
        {CAUSES.map((cause, i) => {
          const p = springIn(frame, T(0.7 + i * 0.55), 150, 14);
          const isActive = active === i || (i === 5 && t > 18);
          return (
            <div key={cause.title} style={{height: 238, borderRadius: 24, background: C.white, border: isActive ? `3px solid ${cause.color}` : '2px solid rgba(28,43,58,0.12)', boxShadow: isActive ? `0 9px 0 ${cause.bg}` : '0 6px 0 rgba(28,43,58,0.06)', padding: '22px 26px', opacity: Math.min(1, p * 2), transform: `translateY(${(1 - p) * 22}px)`, position: 'relative', overflow: 'hidden'}}>
              <div style={{position: 'absolute', right: 22, top: 18, fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 26, color: cause.color, opacity: 0.55}}>{cause.n}</div>
              <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                <div style={{width: 66, height: 66, borderRadius: 20, background: cause.bg, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Glyph name={cause.icon} size={38} color={cause.color} />
                </div>
                <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 40, color: INK}}>{cause.title}</div>
              </div>
              <div style={{fontFamily: '"Noto Sans SC"', fontSize: 19, lineHeight: 1.55, color: INK_SOFT, marginTop: 14, minHeight: 58}}>{cause.detail}</div>
              <div style={{display: 'flex', gap: 8, marginTop: 10}}>
                {cause.mini.map((m, j) => (
                  <span key={j} style={{width: 34, height: 34, borderRadius: 10, background: cause.bg, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Glyph name={m} size={20} color={cause.color} />
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{position: 'absolute', right: 0, bottom: 2, fontFamily: '"Noto Sans SC"', fontSize: 17, letterSpacing: 2, color: INK_SOFT, opacity: 0.7}}>示意 · 不是全部病因清单</div>
    </Content>
  );
};

const Donut: React.FC<{frame: number}> = ({frame}) => {
  const t = frame / FPS;
  const p = Math.min(1, Math.max(0, (t - 0.6) / 2.2));
  return (
    <svg width="520" height="520" viewBox="0 0 520 520">
      <circle cx="260" cy="260" r="200" fill="none" stroke={C.white} strokeWidth="64" />
      <circle cx="260" cy="260" r="200" fill="none" stroke={C.coral} strokeWidth="64" strokeLinecap="round" pathLength="100" strokeDasharray={`${p * 50} 100`} transform="rotate(-90 260 260)" />
      <text x="260" y="248" textAnchor="middle" fontFamily="'Noto Serif SC'" fontWeight="900" fontSize="74" fill={INK}>约一半</text>
      <text x="260" y="292" textAnchor="middle" fontFamily="'Noto Sans SC'" fontSize="20" letterSpacing="3" fill={INK_SOFT}>病因仍不明确</text>
      <text x="260" y="502" textAnchor="middle" fontFamily="'Noto Sans SC'" fontSize="15" letterSpacing="3" fill={INK_SOFT}>全球范围 · 示意</text>
    </svg>
  );
};

const S2a: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const p = Math.min(1, Math.max(0, (t - 1) / 1.2));
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 12, width: 620}}>
        <Reveal delay={4}>
          <Kicker color={C.lilacDeep}>原因不明，也是一种答案</Kicker>
          <Title size={72} style={{marginTop: 16}}>
            一半，暂时
            <br />
            找不到原因
          </Title>
        </Reveal>
        <Reveal delay={16}>
          <Body size={26} style={{marginTop: 22, width: 580}}>
            找不到原因，不代表没有原因，更不代表是“想出来的”。医学还在寻找答案。
          </Body>
        </Reveal>
        <div style={{display: 'flex', gap: 12, marginTop: 24}}>
          <Tag color={C.coralSoft} rotate={-1}>不是“装病”</Tag>
          <Tag color={C.white} rotate={1}>不是“想出来”</Tag>
        </div>
      </div>
      <div style={{position: 'absolute', left: 610, top: 20}}>
        <Donut frame={frame} />
      </div>
      <div style={{position: 'absolute', right: -40, top: 60, width: 400, height: 560, borderRadius: 200, background: TONES.lilac.soft, opacity: 0.55}} />
      <div style={{position: 'absolute', right: -10, top: 120, opacity: 0.82}}>
        <BrainNetwork size={500} color={INK} accent={C.coral} frame={frame} />
      </div>
      <div style={{position: 'absolute', right: 80, top: 280, opacity: p}}>
        <div style={{fontFamily: 'Georgia, serif', fontSize: 120, lineHeight: 1, color: C.coral}}>?</div>
      </div>
      <div style={{position: 'absolute', right: 10, bottom: 0, fontFamily: '"Noto Sans SC"', fontSize: 16, letterSpacing: 2, color: INK_SOFT, opacity: 0.65}}>大脑网络 · 示意</div>
    </Content>
  );
};

const S2b: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const neq = Math.min(1, Math.max(0, (t - 3.2) / 0.8));
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 4, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20}}>
        <Title size={76}>诱因</Title>
        <div style={{fontFamily: 'Georgia, serif', fontSize: 76, color: C.coral, opacity: neq}}>≠</div>
        <Title size={76}>病因</Title>
        <Tag color={C.mustard} rotate={-1} style={{marginLeft: 18}}>别把它们混为一谈</Tag>
      </div>
      <div style={{position: 'absolute', left: 0, top: 160, width: 760}}>
        <Card bg={C.white} padding={30} style={{height: 380}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
            <div style={{width: 62, height: 62, borderRadius: 18, background: TONES.mint.soft, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Glyph name="bolt" size={34} color={C.teal} />
            </div>
            <div>
              <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 36, color: INK}}>诱因 / TRIGGER</div>
              <div style={{fontFamily: '"Noto Sans SC"', fontSize: 18, color: INK_SOFT, marginTop: 2}}>可能让发作更容易出现</div>
            </div>
          </div>
          <div style={{display: 'flex', gap: 12, marginTop: 26, flexWrap: 'wrap'}}>
            {[{icon: 'moon', label: '熬夜'}, {icon: 'heart', label: '压力'}, {icon: 'laptop', label: '屏幕'}].map((item) => (
              <div key={item.label} style={{display: 'flex', alignItems: 'center', gap: 10, padding: '12px 18px', borderRadius: 14, background: TONES.mint.soft}}>
                <Glyph name={item.icon} size={28} color={C.tealDeep} />
                <span style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 22, color: INK}}>{item.label}</span>
              </div>
            ))}
          </div>
          <div style={{marginTop: 28, padding: '16px 20px', borderRadius: 14, background: TONES.cream.bg, fontFamily: '"Noto Sans SC"', fontSize: 20, lineHeight: 1.6, color: INK_SOFT}}>
            它们不会“制造”癫痫。
            <br />
            对已经患病的人，可能诱发发作。
          </div>
        </Card>
      </div>
      <div style={{position: 'absolute', right: 0, top: 160, width: 760}}>
        <Card bg={C.white} padding={30} style={{height: 380}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
            <div style={{width: 62, height: 62, borderRadius: 18, background: TONES.peach.soft, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Glyph name="brain" size={34} color={C.coral} />
            </div>
            <div>
              <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 36, color: INK}}>病因 / CAUSE</div>
              <div style={{fontFamily: '"Noto Sans SC"', fontSize: 18, color: INK_SOFT, marginTop: 2}}>大脑本身的异常</div>
            </div>
          </div>
          <div style={{display: 'flex', gap: 10, marginTop: 26, flexWrap: 'wrap'}}>
            {['结构', '基因', '感染', '代谢', '免疫'].map((label) => (
              <span key={label} style={{padding: '10px 14px', borderRadius: 10, background: TONES.peach.soft, fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 20, color: INK}}>{label}</span>
            ))}
          </div>
          <div style={{marginTop: 28, padding: '16px 20px', borderRadius: 14, background: TONES.cream.bg, fontFamily: '"Noto Sans SC"', fontSize: 20, lineHeight: 1.6, color: INK_SOFT}}>
            病因是“为什么会有癫痫”。
            <br />
            诱因是“这一次为什么发作”。
          </div>
        </Card>
      </div>
    </Content>
  );
};

const S2c: React.FC = () => (
  <Content>
    <div style={{position: 'absolute', left: 0, top: 20, width: 720}}>
      <Reveal delay={4}>
        <Kicker color={C.tealDeep}>遗传 · 只是众多因素之一</Kicker>
        <Title size={76} style={{marginTop: 16}}>
          大多数患者的子女
          <br />
          并不会患癫痫
        </Title>
      </Reveal>
      <Reveal delay={18}>
        <Body size={27} style={{marginTop: 24, width: 640}}>
          遗传只是众多因素之一，不是命运。
        </Body>
      </Reveal>
      <div style={{display: 'flex', gap: 12, marginTop: 24}}>
        <Tag color={C.white} rotate={-1}>不是“一定会遗传”</Tag>
        <Tag color={C.mustard} rotate={1}>需要遗传咨询时问医生</Tag>
      </div>
    </div>
    <div style={{position: 'absolute', right: 30, top: 20, width: 800, height: 620, borderRadius: 36, background: C.white, border: `2px solid rgba(28,43,58,0.1)`, overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 100, background: TONES.mint.soft, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 30px'}}>
        <span style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 21, color: INK}}>一个家庭 · 示意</span>
        <Glyph name="dna" size={42} color={C.tealDeep} />
      </div>
      <div style={{position: 'absolute', left: 70, top: 130, display: 'flex', alignItems: 'flex-end', gap: 20}}>
        <Portrait size={190} shirt={C.blue} mood="calm" bg={TONES.sky.soft} />
        <Portrait size={190} shirt={C.coral} mood="calm" hair="#4A3B2F" bg={TONES.peach.soft} />
        <Portrait size={130} shirt={C.mustard} mood="calm" hair="#4A3B2F" bg={TONES.butter.soft} />
      </div>
      <div style={{position: 'absolute', left: 60, right: 60, top: 390, height: 2, background: 'rgba(28,43,58,0.12)'}} />
      <div style={{position: 'absolute', left: 60, right: 60, top: 420, fontFamily: '"Noto Sans SC"', fontSize: 24, lineHeight: 1.6, color: INK_SOFT}}>
        遗传因素可能存在，
        <br />
        但它不是命运。
      </div>
      <div style={{position: 'absolute', right: 40, bottom: 34}}>
        <Tag color={C.teal} fg={C.white} rotate={-1}>大多数孩子是健康的</Tag>
      </div>
    </div>
  </Content>
);

const S3: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  return (
    <Content>
      <Reveal delay={4}>
        <Kicker color={C.mustardDeep}>年龄 · 不是某一个人的病</Kicker>
        <Title size={78} style={{marginTop: 8}}>
          任何年龄，都可能发生
        </Title>
      </Reveal>
      <div style={{position: 'absolute', left: 0, top: 200, width: 790}}>
        <Card bg={C.white} padding={0} style={{height: 420, overflow: 'hidden'}}>
          <div style={{height: 70, background: TONES.peach.soft, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px'}}>
            <span style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 32, color: INK}}>儿童 · 热性惊厥</span>
            <Tag color={C.white} rotate={1}>常见 · 多数良性</Tag>
          </div>
          <div style={{display: 'flex', gap: 22, padding: '26px 28px'}}>
            <div style={{width: 180, height: 180, borderRadius: 90, background: TONES.peach.soft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
              <Glyph name="child" size={100} color={C.coralDeep} />
            </div>
            <div style={{fontFamily: '"Noto Sans SC"', fontSize: 22, lineHeight: 1.65, color: INK_SOFT}}>
              孩子发高烧时抽搐，叫热性惊厥。
              <br />
              <strong style={{color: INK}}>大多数是良性的，不等于癫痫。</strong>
              <div style={{marginTop: 18, display: 'flex', alignItems: 'center', gap: 12}}>
                <div style={{width: 56, height: 56, borderRadius: 16, background: TONES.butter.soft, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Glyph name="sun" size={30} color={C.mustardDeep} />
                </div>
                <span style={{fontSize: 18, color: INK_SOFT}}>发热时出现 · 儿童常见</span>
              </div>
            </div>
          </div>
          <div style={{position: 'absolute', left: 28, bottom: 24, right: 28, padding: '12px 18px', borderRadius: 12, background: TONES.cream.bg, fontFamily: '"Noto Sans SC"', fontSize: 18, color: INK_SOFT}}>
            第一次发生，应该让医生评估。
          </div>
        </Card>
      </div>
      <div style={{position: 'absolute', right: 0, top: 200, width: 790}}>
        <Card bg={C.white} padding={0} style={{height: 420, overflow: 'hidden'}}>
          <div style={{height: 70, background: TONES.sky.soft, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px'}}>
            <span style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 32, color: INK}}>老年人 · 尤其常见</span>
            <Tag color={C.white} rotate={-1}>也要重视</Tag>
          </div>
          <div style={{display: 'flex', gap: 22, padding: '26px 28px'}}>
            <div style={{width: 180, height: 180, borderRadius: 90, background: TONES.sky.soft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
              <Glyph name="elder" size={100} color={C.blueDeep} />
            </div>
            <div style={{fontFamily: '"Noto Sans SC"', fontSize: 22, lineHeight: 1.65, color: INK_SOFT}}>
              癫痫可以发生在任何年龄。
              <br />
              <strong style={{color: INK}}>儿童和老年人尤其常见。</strong>
              <div style={{marginTop: 18, display: 'flex', alignItems: 'center', gap: 12}}>
                <div style={{width: 56, height: 56, borderRadius: 16, background: TONES.mint.soft, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Glyph name="brain" size={30} color={C.tealDeep} />
                </div>
                <span style={{fontSize: 18, color: INK_SOFT}}>任何年龄 · 规范评估</span>
              </div>
            </div>
          </div>
          <div style={{position: 'absolute', left: 28, bottom: 24, right: 28, padding: '12px 18px', borderRadius: 12, background: TONES.cream.bg, fontFamily: '"Noto Sans SC"', fontSize: 18, color: INK_SOFT}}>
            任何年龄的首次发作，都值得规范评估。
          </div>
        </Card>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center'}}>
        <Tag color={C.mustard} rotate={-1}>不是“老了才会” · 也不是“小孩才会”</Tag>
      </div>
    </Content>
  );
};

export const Ch03: React.FC = () => (
  <MGFrame chapter={chapter} accent={C.mustardDeep}>
    <Scene from={0} to={9.9} tone="sand">
      <S0 />
    </Scene>
    <Scene from={9.9} to={30.76} tone="mint">
      <S1 />
    </Scene>
    <Scene from={30.76} to={40.9} tone="sky">
      <S2a />
    </Scene>
    <Scene from={40.9} to={49} tone="peach">
      <S2b />
    </Scene>
    <Scene from={49} to={55.15} tone="lilac">
      <S2c />
    </Scene>
    <Scene from={55.15} to={70.28} tone="butter">
      <S3 />
    </Scene>
  </MGFrame>
);
