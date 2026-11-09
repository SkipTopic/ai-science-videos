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
  Portrait,
  Tag,
  Title,
} from './mgKit';
import {C, FPS, INK, INK_SOFT, TONES, springIn} from './theme';

const chapter = getChapter('06');
const T = (seconds: number) => Math.round(seconds * FPS);

const Gauge70: React.FC<{frame: number}> = ({frame}) => {
  const t = frame / FPS;
  const p = Math.min(1, Math.max(0, (t - 1) / 2.2));
  return (
    <div style={{position: 'relative', width: 620, height: 400}}>
      <svg width="620" height="400" viewBox="0 0 620 400">
        <path d="M70 320a240 240 0 0 1 480 0" fill="none" stroke={C.white} strokeWidth="58" strokeLinecap="round" />
        <path d="M70 320a240 240 0 0 1 480 0" fill="none" stroke={C.teal} strokeWidth="58" strokeLinecap="round" pathLength="100" strokeDasharray={`${p * 70} 100`} />
        <text x="310" y="284" textAnchor="middle" fontFamily="'Noto Serif SC'" fontWeight="900" fontSize="150" fill={INK}>70%</text>
        <text x="310" y="334" textAnchor="middle" fontFamily="'Noto Sans SC'" fontSize="22" letterSpacing="2" fill={INK_SOFT}>规范治疗后 · 零发作</text>
      </svg>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', gap: 8}}>
        {Array.from({length: 10}).map((_, i) => (
          <div key={i} style={{width: 34, height: 34, borderRadius: 17, background: i < 7 ? C.teal : C.white, border: `2px solid ${i < 7 ? C.teal : 'rgba(28,43,58,0.15)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: Math.min(1, Math.max(0, (t - 2.6 - i * 0.08) / 0.5))}}>
            <Glyph name="person" size={18} color={i < 7 ? C.white : INK_SOFT} stroke={3} />
          </div>
        ))}
      </div>
    </div>
  );
};

const S0: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 20, width: 650}}>
        <Reveal delay={4}>
          <Kicker color={C.tealDeep}>06 · 能治吗</Kicker>
          <Title size={92} style={{marginTop: 18}}>
            大多数
            <br />
            可以<Highlight color={C.mustardSoft}>控制</Highlight>
          </Title>
        </Reveal>
        <Reveal delay={16}>
          <Body size={29} style={{marginTop: 26, width: 620}}>
            规范使用抗癫痫发作药物，大约 <strong style={{color: C.tealDeep}}>70%</strong> 的患者可以实现零发作。
          </Body>
        </Reveal>
        <div style={{display: 'flex', gap: 10, marginTop: 24}}>
          <Tag color={C.teal} fg={C.white} rotate={-1}>WHO 数据</Tag>
          <Tag color={C.white} rotate={1}>规范治疗</Tag>
          <Tag color={C.mustard} rotate={-0.6}>不是“根治”</Tag>
        </div>
        <div style={{position: 'absolute', left: 0, top: 520, display: 'flex', alignItems: 'center', gap: 14, fontFamily: '"Noto Sans SC"', fontSize: 17, color: INK_SOFT}}>
          <Glyph name="people" size={38} color={C.tealDeep} />
          每 10 位患者，约 7 位可以达到零发作
        </div>
      </div>
      <div style={{position: 'absolute', left: 0, bottom: 0, fontFamily: '"Noto Sans SC"', fontSize: 14, color: INK_SOFT, opacity: 0.6}}>群体统计数据 · 个体情况需医生评估</div>
      <div style={{position: 'absolute', right: 0, top: 40}}>
        <Gauge70 frame={frame} />
      </div>
      <div style={{position: 'absolute', right: 26, bottom: 0}}>
        <Tag color={C.coralSoft} rotate={1}>治疗目标：不发作，也能生活</Tag>
      </div>
    </Content>
  );
};

const S1: React.FC = () => {
  const frame = useCurrentFrame();
  const myths = [
    {icon: 'no', text: '不是镇静剂', color: C.coral},
    {icon: 'brain', text: '不会让所有人变笨', color: C.blue},
    {icon: 'phone', text: '副作用 → 和医生沟通', color: C.teal},
  ];
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 18, width: 590}}>
        <Reveal delay={4}>
          <Kicker color={C.blueDeep}>治疗第一步 / 药物</Kicker>
          <Title size={78} style={{marginTop: 16}}>
            先别被
            <br />
            “药”吓到
          </Title>
        </Reveal>
        <Reveal delay={14}>
          <Body size={26} style={{marginTop: 20, width: 560}}>
            这些药不是“镇静剂”，也不会让所有人变笨。但不同药物确实可能有副作用，需要和医生沟通。
          </Body>
        </Reveal>
        <div style={{marginTop: 22, display: 'flex', flexDirection: 'column', gap: 10}}>
          {myths.map((m, i) => {
            const p = springIn(frame, T(1 + i * 0.8), 150, 13);
            return (
              <div key={m.text} style={{display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 14, background: C.white, border: '2px solid rgba(28,43,58,0.1)', opacity: Math.min(1, p * 2), transform: `translateY(${(1 - p) * 12}px)`}}>
                <Glyph name={m.icon} size={26} color={m.color} />
                <span style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 19, color: INK}}>{m.text}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{position: 'absolute', right: 0, top: 20, width: 1000, height: 630}}>
        <Card bg={C.white} padding={0} style={{width: '100%', height: '100%', overflow: 'hidden'}}>
          <div style={{height: 80, background: TONES.sky.soft, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <Glyph name="calendar" size={30} color={C.blueDeep} />
              <span style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 21, color: INK}}>每天同一时间 · 按医嘱服用</span>
            </div>
            <Tag color={C.white} rotate={1}>无品牌名</Tag>
          </div>
          <div style={{position: 'absolute', left: 40, top: 120, right: 40, height: 300, borderRadius: 24, background: TONES.cream.bg, border: '2px solid rgba(28,43,58,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '26px 24px'}}>
            {['一', '二', '三', '四', '五', '六', '日'].map((d, i) => (
              <div key={d} style={{width: 112, height: 240, borderRadius: 18, background: C.white, border: '2px solid rgba(28,43,58,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '14px 8px'}}>
                <div style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 18, color: INK_SOFT}}>周{d}</div>
                <div style={{width: 58, height: 58, borderRadius: 29, background: i === 2 ? C.mustardSoft : TONES.mint.soft, marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Glyph name="pill" size={32} color={i === 2 ? C.mustardDeep : C.tealDeep} />
                </div>
                <div style={{marginTop: 18, fontSize: 16, color: i === 2 ? C.mustardDeep : C.tealDeep, fontFamily: '"Noto Sans SC"', fontWeight: 700}}>{i === 2 ? '今天' : '已服'}</div>
              </div>
            ))}
          </div>
          <div style={{position: 'absolute', left: 40, right: 40, bottom: 40, display: 'flex', alignItems: 'center', gap: 20}}>
            <div style={{width: 74, height: 74, borderRadius: 37, background: TONES.sky.soft, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Glyph name="clock" size={42} color={C.blueDeep} />
            </div>
            <div style={{fontFamily: '"Noto Sans SC"', fontSize: 20, lineHeight: 1.6, color: INK_SOFT}}>
              固定时间、固定剂量。
              <br />
              漏服或不适，先问医生，不自己改。
            </div>
            <div style={{marginLeft: 'auto'}}>
              <Tag color={C.coralSoft} rotate={-1}>个体差异</Tag>
            </div>
          </div>
        </Card>
      </div>
    </Content>
  );
};

const S2a: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 20, width: 670}}>
        <Reveal delay={4}>
          <Kicker color={C.tealDeep}>常用药物 / 通用名</Kicker>
          <Title size={68} style={{marginTop: 18}}>
            左乙拉西坦
            <br />
            <span style={{fontSize: 40, color: INK_SOFT, fontFamily: '"Noto Sans SC"', fontWeight: 700}}>常用的一种抗癫痫发作药物</span>
          </Title>
        </Reveal>
        <Reveal delay={16}>
          <Body size={26} style={{marginTop: 20, width: 620}}>
            它属于广谱药：局灶性发作和全面性发作，都可能用到。具体用不用、怎么用，要由医生评估。
          </Body>
        </Reveal>
        <div style={{display: 'flex', gap: 10, marginTop: 24}}>
          <Tag color={C.teal} fg={C.white} rotate={-1}>广谱</Tag>
          <Tag color={C.white} rotate={1}>局灶性发作</Tag>
          <Tag color={C.white} rotate={-0.8}>全面性发作</Tag>
        </div>
        <div style={{position: 'absolute', left: 0, top: 530, display: 'flex', alignItems: 'center', gap: 14, fontFamily: '"Noto Sans SC"', fontSize: 17, color: INK_SOFT}}>
          <Glyph name="book" size={38} color={C.tealDeep} />
          药名是通用名，不是品牌推荐
        </div>
      </div>
      <div style={{position: 'absolute', right: 0, top: 30, width: 900}}>
        <Card bg={C.white} padding={36} style={{height: 610, transform: 'rotate(0.8deg)'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
            <div style={{fontFamily: '"Noto Sans SC"', fontSize: 22, letterSpacing: 3, color: C.tealDeep}}>GENERIC NAME / 通用名</div>
            <Tag color={C.coral} fg={C.white} rotate={2}>处方药</Tag>
          </div>
          <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 88, color: INK, marginTop: 22, letterSpacing: 4}}>左乙拉西坦</div>
          <div style={{fontFamily: '"Noto Sans SC"', fontSize: 24, color: INK_SOFT, marginTop: 8}}>Levetiracetam</div>
          <div style={{display: 'flex', gap: 12, marginTop: 28}}>
            <Tag color={C.mustard} rotate={-1}>广谱</Tag>
            <Tag color={TONES.mint.soft} rotate={1}>医生评估后使用</Tag>
          </div>
          <div style={{height: 2, background: 'rgba(28,43,58,0.1)', marginTop: 32}} />
          <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 26}}>
            <div>
              <div style={{fontFamily: '"Noto Sans SC"', fontSize: 17, letterSpacing: 2, color: INK_SOFT}}>局灶性发作</div>
              <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 30, color: C.tealDeep, marginTop: 4}}>可能用到</div>
            </div>
            <div>
              <div style={{fontFamily: '"Noto Sans SC"', fontSize: 17, letterSpacing: 2, color: INK_SOFT}}>全面性发作</div>
              <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 30, color: C.tealDeep, marginTop: 4}}>可能用到</div>
            </div>
            <div style={{width: 150, height: 100, borderRadius: 20, background: TONES.mint.soft, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Glyph name="pill" size={64} color={C.tealDeep} />
            </div>
          </div>
          <div style={{position: 'absolute', right: 60, bottom: 20, transform: 'rotate(-5deg)', opacity: 0.55}}>
            <div style={{border: `3px solid ${C.coral}`, borderRadius: 8, color: C.coral, fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 18, padding: '4px 10px'}}>遵医嘱</div>
          </div>
        </Card>
      </div>
    </Content>
  );
};

const S2b: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const tilts = Math.min(1, t / 2);
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 20, width: 690}}>
        <Reveal delay={4}>
          <Kicker color={C.blueDeep}>耐受性 / 不是“零副作用”</Kicker>
          <Title size={76} style={{marginTop: 16}}>
            总体耐受性
            <br />
            比较好
          </Title>
        </Reveal>
        <Reveal delay={16}>
          <Body size={27} style={{marginTop: 22, width: 640}}>
            在常用药物里，它的总体耐受性比较好，对认知的影响相对小。但每个人不一样，副作用需要被认真对待。
          </Body>
        </Reveal>
        <div style={{marginTop: 26, display: 'flex', gap: 10, flexWrap: 'wrap', width: 620}}>
          {['嗜睡', '乏力', '头晕', '情绪变化'].map((s, i) => (
            <Tag key={s} color={i % 2 === 0 ? C.white : TONES.sky.soft} rotate={i % 2 === 0 ? -1 : 1}>{s}</Tag>
          ))}
        </div>
        <div style={{marginTop: 24, display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', borderRadius: 14, background: C.white, width: 600}}>
          <Glyph name="phone" size={28} color={C.coral} />
          <span style={{fontFamily: '"Noto Sans SC"', fontSize: 19, color: INK}}>出现不适，和医生沟通，不自己停药</span>
        </div>
      </div>
      <div style={{position: 'absolute', right: 20, top: 60, width: 840}}>
        <Card bg={C.white} padding={30} style={{height: 540}}>
          <div style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 22, color: INK}}>治疗获益 vs 副作用</div>
          <div style={{position: 'absolute', left: 90, top: 150, width: 660, height: 10, borderRadius: 5, background: INK, transform: `rotate(${(tilts - 0.5) * 4}deg)`}} />
          <div style={{position: 'absolute', left: 400, top: 100, width: 8, height: 120, background: INK}} />
          <div style={{position: 'absolute', left: 120, top: 170, width: 240, height: 160, borderRadius: 80, background: TONES.mint.soft, border: '3px solid rgba(28,43,58,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
            <Glyph name="shield" size={44} color={C.tealDeep} />
            <div style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 22, color: INK, marginTop: 8}}>治疗获益</div>
          </div>
          <div style={{position: 'absolute', right: 120, top: 170, width: 240, height: 160, borderRadius: 80, background: TONES.peach.soft, border: '3px solid rgba(28,43,58,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
            <Glyph name="heart" size={44} color={C.coral} />
            <div style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 22, color: INK, marginTop: 8}}>副作用</div>
          </div>
          <div style={{position: 'absolute', left: 40, right: 40, bottom: 40, padding: '16px 20px', borderRadius: 14, background: TONES.cream.bg, fontFamily: '"Noto Sans SC"', fontSize: 19, lineHeight: 1.6, color: INK_SOFT}}>
            “相对小”不等于“没有”。
            <br />
            是否适合你，需要医生结合具体情况判断。
          </div>
        </Card>
      </div>
    </Content>
  );
};

const S2c: React.FC = () => (
  <Content>
    <div style={{position: 'absolute', left: 0, top: 16, width: 720}}>
      <Reveal delay={4}>
        <Kicker color={C.lilacDeep}>育龄期 / 孕期</Kicker>
        <Title size={70} style={{marginTop: 16}}>
          相对更安全的
          <br />
          选择之一
        </Title>
      </Reveal>
      <Reveal delay={16}>
        <Body size={27} style={{marginTop: 22, width: 660}}>
          对育龄期和孕期女性来说，它也是相对更安全的选择之一。但“相对安全”不等于“完全没有风险”。
        </Body>
      </Reveal>
      <div style={{display: 'flex', gap: 10, marginTop: 22, flexWrap: 'wrap', width: 640}}>
        <Tag color={C.mustard} rotate={-1}>相对更安全</Tag>
        <Tag color={C.coralSoft} rotate={1}>≠ 没有风险</Tag>
        <Tag color={C.white} rotate={-0.6}>需医生评估</Tag>
      </div>
      <div style={{marginTop: 24, padding: '18px 22px', borderRadius: 18, background: C.coral, color: C.white, width: 640}}>
        <div style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 22}}>必须在神经科 + 产科医生指导下使用</div>
        <div style={{fontFamily: '"Noto Sans SC"', fontSize: 17, marginTop: 6, opacity: 0.92}}>不能自己加量、减量或停药。</div>
      </div>
    </div>
    <div style={{position: 'absolute', right: 0, top: 20, width: 880, height: 630}}>
      <Card bg={C.white} padding={0} style={{width: '100%', height: '100%', overflow: 'hidden'}}>
        <div style={{height: 74, background: TONES.lilac.soft, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 26px'}}>
          <span style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 21, color: INK}}>孕前 · 一起规划用药</span>
          <Tag color={C.white} rotate={1}>示意</Tag>
        </div>
        <div style={{position: 'absolute', left: 40, top: 120, width: 360, height: 500}}>
          <div style={{position: 'absolute', left: 50, top: 0, width: 280, height: 280, borderRadius: 140, background: TONES.peach.soft}} />
          <div style={{position: 'absolute', left: 100, top: 50}}>
            <Glyph name="pregnancy" size={190} color={C.coralDeep} stroke={4} />
          </div>
          <div style={{position: 'absolute', left: 40, bottom: 0, right: 0}}>
            <Tag color={C.white} rotate={-1}>患者 / 家庭</Tag>
          </div>
        </div>
        <div style={{position: 'absolute', right: 40, top: 110, width: 390}}>
          <div style={{display: 'flex', gap: 16}}>
            <Card bg={TONES.sky.soft} padding={16} style={{width: 180, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Portrait size={100} shirt={C.blue} mood="calm" bg={C.white} />
              <div style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 18, color: INK, marginTop: 8}}>神经科</div>
            </Card>
            <Card bg={TONES.mint.soft} padding={16} style={{width: 180, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Portrait size={100} shirt={C.teal} mood="calm" bg={C.white} />
              <div style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 18, color: INK, marginTop: 8}}>产科</div>
            </Card>
          </div>
          <div style={{marginTop: 24, padding: '18px 20px', borderRadius: 16, background: TONES.cream.bg, fontFamily: '"Noto Sans SC"', fontSize: 18, lineHeight: 1.6, color: INK_SOFT}}>
            孕前就把用药计划说清楚；
            <br />
            孕期按时复查，不自行调整。
          </div>
          <div style={{marginTop: 18, display: 'flex', alignItems: 'center', gap: 12}}>
            <Glyph name="shield" size={38} color={C.tealDeep} />
            <span style={{fontFamily: '"Noto Sans SC"', fontSize: 18, color: INK, fontWeight: 700}}>大多数可以在医生指导下安全度过孕期</span>
          </div>
        </div>
      </Card>
    </div>
  </Content>
);

const S2d: React.FC = () => (
  <Content>
    <div style={{position: 'absolute', left: 0, right: 0, top: 20, textAlign: 'center'}}>
      <Reveal delay={4}>
        <Kicker color={C.coralDeep} style={{justifyContent: 'center'}}>用药安全 / 三条红线</Kicker>
        <Title size={70} style={{marginTop: 12}}>
          不自己加量 · 不减量 · 不擅自停药
        </Title>
      </Reveal>
    </div>
    <div style={{position: 'absolute', left: 0, right: 0, top: 230, display: 'flex', justifyContent: 'center', gap: 26}}>
      {['自己加量', '自己减量', '自己停药'].map((item, i) => (
        <div key={item} style={{width: 440, height: 260, borderRadius: 24, background: C.white, border: `3px solid ${C.coral}`, boxShadow: '0 10px 0 rgba(28,43,58,0.07)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `rotate(${(i - 1) * 1.4}deg)`}}>
          <div style={{width: 82, height: 82, borderRadius: 41, background: C.coralSoft, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Glyph name="no" size={48} color={C.coralDeep} />
          </div>
          <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 40, color: INK, marginTop: 18}}>{item}</div>
        </div>
      ))}
    </div>
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 4, display: 'flex', justifyContent: 'center'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '16px 28px', borderRadius: 16, background: C.mustard, color: INK, fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 24, transform: 'rotate(-0.5deg)'}}>
        <Glyph name="shield" size={30} color={INK} />
        任何调整，都先问神经科和产科医生
      </div>
    </div>
  </Content>
);

const S3: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 18, width: 650}}>
        <Reveal delay={4}>
          <Kicker color={C.mustardDeep}>依从性 / 长期主义</Kicker>
          <Title size={82} style={{marginTop: 16}}>
            按时
            <br />
            按量
            <br />
            长期
          </Title>
        </Reveal>
        <div style={{marginTop: 26, padding: '20px 22px', borderRadius: 18, background: C.coral, color: C.white, width: 560}}>
          <div style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 23}}>不要因为“最近没发作”就擅自停</div>
          <div style={{fontFamily: '"Noto Sans SC"', fontSize: 17, marginTop: 6, opacity: 0.9}}>突然停药，可能让发作反弹。</div>
        </div>
        <div style={{marginTop: 20, padding: '18px 22px', borderRadius: 16, background: C.white, width: 560, display: 'flex', gap: 14, alignItems: 'center'}}>
          <Glyph name="book" size={38} color={C.mustardDeep} />
          <div style={{fontFamily: '"Noto Sans SC"', fontSize: 18, lineHeight: 1.6, color: INK_SOFT}}>
            有的人在多年无发作后，
            <br />
            可以在医生指导下逐渐减停。
          </div>
        </div>
      </div>
      <div style={{position: 'absolute', right: 0, top: 30, width: 930}}>
        <Card bg={C.white} padding={30} style={{height: 600}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 22, color: INK}}>这一周的药</div>
            <Tag color={TONES.mint.soft} rotate={1}>按时 · 按量</Tag>
          </div>
          <div style={{display: 'flex', gap: 14, marginTop: 30}}>
            {['一', '二', '三', '四', '五', '六', '日'].map((d, i) => {
              const done = i <= Math.min(6, Math.floor(t * 0.7));
              return (
                <div key={d} style={{flex: 1, height: 240, borderRadius: 18, background: done ? TONES.mint.soft : TONES.cream.bg, border: '2px solid rgba(28,43,58,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 22}}>
                  <div style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 19, color: INK_SOFT}}>周{d}</div>
                  <div style={{width: 62, height: 62, borderRadius: 31, background: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 18}}>
                    <Glyph name="pill" size={34} color={done ? C.tealDeep : INK_SOFT} />
                  </div>
                  <div style={{marginTop: 18, fontFamily: '"Noto Sans SC"', fontSize: 15, fontWeight: 700, color: done ? C.tealDeep : INK_SOFT, opacity: done ? 1 : 0.45}}>{done ? '已服' : '待服'}</div>
                </div>
              );
            })}
          </div>
          <div style={{display: 'flex', gap: 18, marginTop: 28, alignItems: 'center'}}>
            <div style={{width: 76, height: 76, borderRadius: 38, background: TONES.butter.soft, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Glyph name="clock" size={44} color={C.mustardDeep} />
            </div>
            <div style={{fontFamily: '"Noto Sans SC"', fontSize: 20, lineHeight: 1.6, color: INK_SOFT}}>
              固定时间、固定剂量。
              <br />
              把药盒放在每天都会看到的地方。
            </div>
          </div>
          <div style={{position: 'absolute', right: 30, bottom: 28, display: 'flex', alignItems: 'center', gap: 12}}>
            <Tag color={C.white} rotate={-1}>不漏服</Tag>
            <Tag color={C.white} rotate={1}>不乱停</Tag>
          </div>
        </Card>
      </div>
    </Content>
  );
};

const S4: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const p = Math.min(1, Math.max(0, (t - 1) / 1.2));
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 18, width: 640}}>
        <Reveal delay={4}>
          <Kicker color={C.blueDeep}>难治性癫痫 / 约三分之一</Kicker>
          <div style={{display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 10}}>
            <span style={{fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 150, lineHeight: 0.9, color: C.coral}}>1/3</span>
            <span style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 54, color: INK}}>的人</span>
          </div>
          <Title size={36} style={{marginTop: 24}}>两种合适的药物规范治疗后<br />仍控制不住</Title>
        </Reveal>
        <Reveal delay={18}>
          <Body size={25} style={{marginTop: 22, width: 590}}>
            这叫药物难治性癫痫。但他们并不是“没救了”。
          </Body>
        </Reveal>
        <div style={{display: 'flex', gap: 10, marginTop: 24}}>
          <Tag color={C.coralSoft} rotate={-1}>不是“没救了”</Tag>
          <Tag color={C.white} rotate={1}>需要系统评估</Tag>
        </div>
      </div>
      <div style={{position: 'absolute', right: 0, top: 30, width: 960, height: 620}}>
        <div style={{position: 'absolute', left: 360, top: 210, width: 240, height: 170, borderRadius: 24, background: C.coral, color: C.white, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 0 rgba(28,43,58,0.1)'}}>
          <Glyph name="brain" size={48} color={C.white} />
          <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 27, marginTop: 8}}>难治性癫痫</div>
        </div>
        {[{x: 20, y: 40, label: '手术', icon: 'mri', color: C.blue, bg: TONES.sky.soft}, {x: 700, y: 40, label: '生酮饮食', icon: 'coffee', color: C.mustardDeep, bg: TONES.butter.soft}, {x: 20, y: 400, label: '神经调控', icon: 'bolt', color: C.tealDeep, bg: TONES.mint.soft}].map((item, i) => (
          <div key={item.label} style={{position: 'absolute', left: item.x, top: item.y, width: 240, height: 160, borderRadius: 22, background: C.white, border: '2px solid rgba(28,43,58,0.12)', boxShadow: '0 8px 0 rgba(28,43,58,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: p, transform: `translateY(${(1 - p) * 18}px)`}}>
            <div style={{width: 62, height: 62, borderRadius: 18, background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Glyph name={item.icon} size={36} color={item.color} />
            </div>
            <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 28, color: INK, marginTop: 8}}>{item.label}</div>
            <Tag color={C.white} rotate={i % 2 === 0 ? -1 : 1}>专科评估</Tag>
          </div>
        ))}
        <svg width="960" height="620" style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
          <path d="M360 295H260V120H260" stroke={C.coral} strokeWidth="3" fill="none" strokeDasharray="8 8" opacity={p * 0.6} />
          <path d="M600 295H700V120" stroke={C.coral} strokeWidth="3" fill="none" strokeDasharray="8 8" opacity={p * 0.6} />
          <path d="M480 380V480H260" stroke={C.coral} strokeWidth="3" fill="none" strokeDasharray="8 8" opacity={p * 0.6} />
        </svg>
        <div style={{position: 'absolute', right: 20, bottom: 0, padding: '14px 22px', borderRadius: 14, background: C.blue, color: C.white, fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 20, opacity: p}}>
          到癫痫中心做系统评估
        </div>
      </div>
    </Content>
  );
};

const S5a: React.FC = () => (
  <Content>
    <div style={{position: 'absolute', left: 0, top: 20, width: 650}}>
      <Reveal delay={4}>
        <Kicker color={C.coralDeep}>怀孕 / 不是绝对禁忌</Kicker>
        <Title size={82} style={{marginTop: 18}}>
          可以规划
          <br />
          不必放弃
        </Title>
      </Reveal>
      <Reveal delay={16}>
        <Body size={27} style={{marginTop: 24, width: 610}}>
          大多数癫痫女性可以在医生指导下安全度过孕期。但需要在孕前就和神经科、产科医生一起规划用药。
        </Body>
      </Reveal>
      <div style={{display: 'flex', gap: 10, marginTop: 24}}>
        <Tag color={C.teal} fg={C.white} rotate={-1}>大多数可以</Tag>
        <Tag color={C.white} rotate={1}>孕前规划</Tag>
        <Tag color={C.mustard} rotate={-0.6}>医生指导</Tag>
      </div>
    </div>
    <div style={{position: 'absolute', right: 0, top: 10, width: 940, height: 650}}>
      <Card bg={C.white} padding={0} style={{width: '100%', height: '100%', overflow: 'hidden'}}>
        <div style={{height: 76, background: TONES.peach.soft, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px'}}>
          <span style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 21, color: INK}}>孕前讨论 · 用药计划</span>
          <Tag color={C.white} rotate={1}>示意</Tag>
        </div>
        <div style={{position: 'absolute', left: 30, top: 110, display: 'flex', alignItems: 'flex-start', gap: 24}}>
          {[
            {size: 168, shirt: C.coral, bg: TONES.peach.soft, label: '患者 / 家庭'},
            {size: 142, shirt: C.blue, bg: TONES.sky.soft, label: '神经科'},
            {size: 142, shirt: C.teal, bg: TONES.mint.soft, label: '产科'},
          ].map((p) => (
            <div key={p.label} style={{textAlign: 'center'}}>
              <Portrait size={p.size} shirt={p.shirt} mood="calm" bg={p.bg} />
              <div style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 18, color: INK_SOFT, marginTop: 6}}>{p.label}</div>
            </div>
          ))}
        </div>
        <div style={{position: 'absolute', left: 30, top: 340, width: 860, padding: '20px 24px', borderRadius: 18, background: TONES.cream.bg, border: '2px solid rgba(28,43,58,0.1)'}}>
          <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 28, color: INK}}>孕前计划</div>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 26px', marginTop: 12}}>
            {['用药方案', '复查时间', '产科随访', '发作应急预案'].map((item) => (
              <div key={item} style={{display: 'flex', alignItems: 'center', gap: 12}}>
                <div style={{width: 24, height: 24, borderRadius: 12, background: C.teal, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <svg width="14" height="14" viewBox="0 0 14 14"><path d="m3 7 3 3 5-6" stroke={C.white} strokeWidth="2.5" fill="none" strokeLinecap="round" /></svg>
                </div>
                <span style={{fontFamily: '"Noto Sans SC"', fontSize: 20, color: INK}}>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{position: 'absolute', left: 30, bottom: 24, display: 'flex', gap: 10}}>
          <Tag color={C.white} rotate={-1}>神经科</Tag>
          <Tag color={C.white} rotate={1}>产科</Tag>
          <Tag color={C.teal} fg={C.white} rotate={-0.6}>一起决策</Tag>
        </div>
      </Card>
    </div>
  </Content>
);

const S5b: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const p = Math.min(1, t / 1.4);
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, right: 0, top: 10, textAlign: 'center'}}>
        <Kicker color={C.coralDeep} style={{justifyContent: 'center'}}>治疗目标 / 不只是不发作</Kicker>
        <Title size={80} style={{marginTop: 10}}>
          还要回到
          <span style={{color: C.coral}}>生活</span>
        </Title>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 300, display: 'flex', justifyContent: 'center', gap: 24, opacity: p}}>
        {[
          {icon: 'school', label: '上学', color: C.blue, bg: TONES.sky.soft},
          {icon: 'work', label: '工作', color: C.tealDeep, bg: TONES.mint.soft},
          {icon: 'heart', label: '恋爱', color: C.coral, bg: TONES.peach.soft},
          {icon: 'child', label: '生育', color: C.mustardDeep, bg: TONES.butter.soft},
        ].map((item, i) => (
          <div key={item.label} style={{width: 330, height: 230, borderRadius: 24, background: C.white, border: '2px solid rgba(28,43,58,0.12)', boxShadow: '0 9px 0 rgba(28,43,58,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `translateY(${(1 - p) * 20}px) rotate(${(i - 1.5) * 1.2}deg)`}}>
            <div style={{width: 84, height: 84, borderRadius: 42, background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Glyph name={item.icon} size={50} color={item.color} />
            </div>
            <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 38, color: INK, marginTop: 16}}>{item.label}</div>
          </div>
        ))}
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, textAlign: 'center', fontFamily: '"Noto Sans SC"', fontSize: 26, letterSpacing: 2, color: INK_SOFT, opacity: p}}>
        治疗的目标，不只是“不发作”。
      </div>
    </Content>
  );
};

export const Ch06: React.FC = () => (
  <MGFrame chapter={chapter} accent={C.teal}>
    <Scene from={0} to={11.39} tone="mint">
      <S0 />
    </Scene>
    <Scene from={11.39} to={22.67} tone="sky">
      <S1 />
    </Scene>
    <Scene from={22.67} to={32.9} tone="mint">
      <S2a />
    </Scene>
    <Scene from={32.9} to={44.5} tone="sky">
      <S2b />
    </Scene>
    <Scene from={44.5} to={55.5} tone="peach">
      <S2c />
    </Scene>
    <Scene from={55.5} to={61.54} tone="butter">
      <S2d />
    </Scene>
    <Scene from={61.54} to={74.44} tone="butter">
      <S3 />
    </Scene>
    <Scene from={74.44} to={92.02} tone="sky">
      <S4 />
    </Scene>
    <Scene from={92.02} to={104.8} tone="peach">
      <S5a />
    </Scene>
    <Scene from={104.8} to={112.94} tone="butter">
      <S5b />
    </Scene>
  </MGFrame>
);
