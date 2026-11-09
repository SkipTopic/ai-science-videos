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
  WaveLine,
} from './mgKit';
import {C, FPS, INK, INK_SOFT, TONES, springIn} from './theme';

const chapter = getChapter('08');
const T = (seconds: number) => Math.round(seconds * FPS);

const LIFE = [
  {icon: 'school', label: '教室', color: C.blue, bg: TONES.sky.soft},
  {icon: 'work', label: '办公室', color: C.tealDeep, bg: TONES.mint.soft},
  {icon: 'city', label: '地铁', color: C.mustardDeep, bg: TONES.butter.soft},
  {icon: 'swim', label: '游泳池', color: C.blue, bg: TONES.sky.soft},
  {icon: 'moon', label: '深夜卧室', color: C.lilacDeep, bg: TONES.lilac.soft},
  {icon: 'sun', label: '旅行', color: C.coral, bg: TONES.peach.soft},
];

const S0: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 16, width: 620}}>
        <Reveal delay={4}>
          <Kicker color={C.lilacDeep}>08 · 一起生活</Kicker>
          <Title size={72} style={{marginTop: 16}}>
            生活，不只
            <br />
            发生在医院里
          </Title>
        </Reveal>
        <Reveal delay={14}>
          <div style={{display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 26}}>
            <span style={{fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 130, lineHeight: 0.9, color: C.coral}}>900</span>
            <span style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 46, color: INK}}>万</span>
          </div>
          <Body size={25} style={{marginTop: 8, width: 520}}>
            在我国，大约有 900 万癫痫患者。它不是只发生在医院里的病。
          </Body>
        </Reveal>
        <div style={{marginTop: 24, display: 'flex', gap: 8, flexWrap: 'wrap', width: 560}}>
          {['上学', '工作', '运动', '旅行', '恋爱', '生育'].map((item, i) => (
            <Tag key={item} color={i % 2 === 0 ? C.white : TONES.lilac.soft} rotate={i % 2 === 0 ? -1 : 1}>{item}</Tag>
          ))}
        </div>
      </div>
      <div style={{position: 'absolute', right: 0, top: 20, width: 980, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18}}>
        {LIFE.map((item, i) => {
          const p = springIn(frame, T(0.4 + i * 0.55), 150, 14);
          return (
            <div key={item.label} style={{height: 255, borderRadius: 22, background: C.white, border: '2px solid rgba(28,43,58,0.12)', boxShadow: '0 8px 0 rgba(28,43,58,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: Math.min(1, p * 2), transform: `translateY(${(1 - p) * 20}px)`}}>
              <div style={{width: 90, height: 90, borderRadius: 26, background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Glyph name={item.icon} size={52} color={item.color} />
              </div>
              <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 32, color: INK, marginTop: 16}}>{item.label}</div>
              <div style={{fontFamily: '"Noto Sans SC"', fontSize: 16, color: INK_SOFT, marginTop: 4}}>生活可以继续</div>
            </div>
          );
        })}
      </div>
      <div style={{position: 'absolute', right: 0, bottom: 0}}>
        <Tag color={C.mustardSoft} rotate={-1}>不是“只能待在家里”</Tag>
      </div>
    </Content>
  );
};

const S1: React.FC = () => {
  const frame = useCurrentFrame();
  const triggers = [
    {icon: 'moon', label: '熬夜', sub: '睡眠不足'},
    {icon: 'power', label: '过度疲劳', sub: '身体透支'},
    {icon: 'pill', label: '漏服药物', sub: '血药浓度波动'},
    {icon: 'wine', label: '大量饮酒', sub: '增加发作风险'},
  ];
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 18, width: 560}}>
        <Reveal delay={4}>
          <Kicker color={C.lilacDeep}>第一 / 睡眠与诱因</Kicker>
          <Title size={84} style={{marginTop: 16}}>
            有些夜晚
            <br />
            需要认真对待
          </Title>
        </Reveal>
        <Reveal delay={14}>
          <Body size={26} style={{marginTop: 22, width: 520}}>
            熬夜、过度疲劳、漏服药物、大量饮酒，都是常见的诱因。它们不是“病因”，但可能让发作更容易出现。
          </Body>
        </Reveal>
        <div style={{marginTop: 24}}>
          <Tag color={C.coralSoft} rotate={-1}>诱因 ≠ 病因</Tag>
        </div>
        <div style={{marginTop: 28, width: 390, padding: '20px 24px', borderRadius: 22, background: INK, color: C.white, transform: 'rotate(-1deg)', display: 'flex', alignItems: 'center', gap: 18}}>
          <Glyph name="phone" size={44} color={C.mustardSoft} />
          <div>
            <div style={{fontFamily: 'Georgia, serif', fontSize: 42, fontWeight: 700}}>2:47</div>
            <div style={{fontFamily: '"Noto Sans SC"', fontSize: 16, opacity: 0.8}}>别让屏幕替你熬夜</div>
          </div>
        </div>
      </div>
      <div style={{position: 'absolute', right: 0, top: 20, width: 1000, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18}}>
        {triggers.map((item, i) => {
          const p = springIn(frame, T(0.6 + i * 0.7), 150, 14);
          return (
            <div key={item.label} style={{height: 245, borderRadius: 22, background: C.white, border: '2px solid rgba(28,43,58,0.12)', boxShadow: '0 8px 0 rgba(28,43,58,0.06)', padding: '24px 26px', opacity: Math.min(1, p * 2), transform: `translateY(${(1 - p) * 18}px)`}}>
              <div style={{width: 70, height: 70, borderRadius: 20, background: TONES.lilac.soft, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Glyph name={item.icon} size={40} color={C.lilacDeep} />
              </div>
              <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 34, color: INK, marginTop: 16}}>{item.label}</div>
              <div style={{fontFamily: '"Noto Sans SC"', fontSize: 18, color: INK_SOFT, marginTop: 4}}>{item.sub}</div>
            </div>
          );
        })}
      </div>
      <div style={{position: 'absolute', right: 0, bottom: 0, display: 'flex', alignItems: 'center', gap: 12, fontFamily: '"Noto Sans SC"', fontSize: 17, color: INK_SOFT}}>
        <Glyph name="clock" size={30} color={C.lilacDeep} />
        规律作息，是治疗的一部分
      </div>
    </Content>
  );
};

const S2: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Content>
      <Reveal delay={4}>
        <Kicker color={C.tealDeep}>第二 / 安全</Kicker>
        <Title size={76} style={{marginTop: 10}}>运动可以，安全第一</Title>
      </Reveal>
      <div style={{position: 'absolute', left: 0, right: 0, top: 160, display: 'flex', gap: 22}}>
        {[
          {icon: 'swim', title: '游泳', sub: '要有同伴，不去无人看护的水域', color: C.blue, bg: TONES.sky.soft},
          {icon: 'bike', title: '骑车', sub: '戴好头盔，遵守交通规则', color: C.tealDeep, bg: TONES.mint.soft},
          {icon: 'work', title: '开车 / 机械', sub: '按当地法规和医生评估', color: C.mustardDeep, bg: TONES.butter.soft},
        ].map((item, i) => {
          const p = springIn(frame, T(0.6 + i * 0.8), 150, 14);
          return (
            <div key={item.title} style={{flex: 1, height: 430, borderRadius: 24, background: C.white, border: '2px solid rgba(28,43,58,0.12)', boxShadow: '0 9px 0 rgba(28,43,58,0.06)', overflow: 'hidden', opacity: Math.min(1, p * 2), transform: `translateY(${(1 - p) * 20}px)`}}>
              <div style={{height: 230, background: item.bg, position: 'relative', overflow: 'hidden'}}>
                {i === 0 ? (
                  <>
                    {[0, 1, 2].map((w) => (
                      <div key={w} style={{position: 'absolute', left: 20, right: 20, top: 70 + w * 44, height: 10, borderRadius: 5, borderTop: `4px solid ${C.blue}`, opacity: 0.35}} />
                    ))}
                    <div style={{position: 'absolute', left: 90, top: 88}}>
                      <Glyph name="swim" size={120} color={C.blue} />
                    </div>
                    <div style={{position: 'absolute', left: 270, top: 150, fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 16, color: C.blueDeep}}>同伴在场</div>
                  </>
                ) : i === 1 ? (
                  <div style={{position: 'absolute', left: 120, top: 50}}>
                    <Glyph name="bike" size={170} color={C.tealDeep} />
                    <div style={{position: 'absolute', left: 130, top: -18}}>
                      <div style={{width: 70, height: 46, borderRadius: '36px 36px 10px 10px', background: C.white, border: `3px solid ${INK}`}} />
                      <div style={{width: 40, height: 5, background: INK, margin: '8px auto 0'}} />
                    </div>
                  </div>
                ) : (
                  <div style={{position: 'absolute', left: 90, top: 62, display: 'flex', alignItems: 'center', gap: 26}}>
                    <Glyph name="key" size={110} color={C.mustardDeep} />
                    <div style={{width: 120, height: 110, borderRadius: 12, background: C.white, border: `3px solid ${INK}`, padding: 12}}>
                      {[0, 1, 2].map((l) => <div key={l} style={{height: 5, background: 'rgba(28,43,58,0.2)', marginTop: 12, width: l === 2 ? '60%' : '100%'}} />)}
                    </div>
                  </div>
                )}
              </div>
              <div style={{padding: '24px 26px'}}>
                <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 36, color: INK}}>{item.title}</div>
                <div style={{fontFamily: '"Noto Sans SC"', fontSize: 19, color: INK_SOFT, marginTop: 8, lineHeight: 1.5}}>{item.sub}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center'}}>
        <Tag color={C.teal} fg={C.white} rotate={-1}>不是“什么都不能做”，而是“知道怎么做”</Tag>
      </div>
    </Content>
  );
};

const S3: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const p = Math.min(1, Math.max(0, (t - 1) / 1.2));
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 20, width: 680}}>
        <Reveal delay={4}>
          <Kicker color={C.mustardDeep}>第三 / 光敏性</Kicker>
          <Title size={82} style={{marginTop: 16}}>
            只有少数人
            <br />
            对闪光敏感
          </Title>
        </Reveal>
        <Reveal delay={14}>
          <div style={{display: 'flex', alignItems: 'flex-end', gap: 12, marginTop: 24}}>
            <span style={{fontFamily: '"Noto Sans SC"', fontSize: 22, color: INK_SOFT, paddingBottom: 24}}>约</span>
            <span style={{fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 190, lineHeight: 0.9, color: C.mustardDeep}}>3%</span>
          </div>
          <Body size={26} style={{marginTop: 16, width: 610}}>
            只有少数癫痫患者对闪光敏感，大约占 3%。如果你知道自己属于这一类，就要避开特定频率的闪烁画面和灯光。
          </Body>
        </Reveal>
        <div style={{display: 'flex', gap: 10, marginTop: 22}}>
          <Tag color={C.mustard} rotate={-1}>不是所有患者</Tag>
          <Tag color={C.white} rotate={1}>避开特定频率</Tag>
        </div>
      </div>
      <div style={{position: 'absolute', right: 0, top: 20, width: 900, height: 620}}>
        <Card bg={C.white} padding={0} style={{width: '100%', height: '100%', overflow: 'hidden'}}>
          <div style={{height: 74, background: TONES.butter.soft, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 26px'}}>
            <span style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 21, color: INK}}>电影院 · 光敏场景</span>
            <Tag color={C.white} rotate={1}>示意 · 不实拍闪烁</Tag>
          </div>
          <div style={{position: 'absolute', left: 40, top: 120, right: 40, height: 300, borderRadius: 24, background: INK, padding: 18}}>
            <div style={{position: 'relative', width: '100%', height: '100%', borderRadius: 12, background: C.mustardSoft, overflow: 'hidden'}}>
              <div style={{position: 'absolute', left: 30, top: 40, width: 620, height: 180, background: 'repeating-linear-gradient(90deg, rgba(28,43,58,0.12) 0 18px, transparent 18px 40px)', opacity: 0.5}} />
              <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 70, background: 'linear-gradient(to top, rgba(28,43,58,0.3), transparent)'}} />
              <div style={{position: 'absolute', right: 22, top: 20}}>
                <Tag color={C.white} rotate={2}>低频示意</Tag>
              </div>
            </div>
          </div>
          <div style={{position: 'absolute', left: 40, top: 450, display: 'flex', alignItems: 'center', gap: 16}}>
            <div style={{width: 92, height: 92, borderRadius: 46, background: TONES.mint.soft, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Glyph name="shield" size={52} color={C.tealDeep} />
            </div>
            <div style={{fontFamily: '"Noto Sans SC"', fontSize: 19, lineHeight: 1.6, color: INK_SOFT}}>
              知道自己敏感的人
              <br />
              <span style={{fontWeight: 700, color: INK}}>避开即可，不必恐慌</span>
            </div>
          </div>
          <div style={{position: 'absolute', right: 30, bottom: 26, opacity: p}}>
            <Tag color={C.coralSoft} rotate={-1}>不测试自己</Tag>
          </div>
        </Card>
      </div>
    </Content>
  );
};

const S4: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 18, width: 660}}>
        <Reveal delay={4}>
          <Kicker color={C.coralDeep}>第四 / 心理</Kicker>
          <Title size={82} style={{marginTop: 16}}>
            情绪
            <br />
            也值得被看见
          </Title>
        </Reveal>
        <Reveal delay={14}>
          <Body size={27} style={{marginTop: 24, width: 600}}>
            癫痫患者更容易出现焦虑、抑郁。这不是“矫情”，而是需要被看见和治疗的共病。
          </Body>
        </Reveal>
        <div style={{display: 'flex', gap: 10, marginTop: 24}}>
          <Tag color={C.coralSoft} rotate={-1}>不是“矫情”</Tag>
          <Tag color={C.white} rotate={1}>可以治疗</Tag>
          <Tag color={C.tealSoft} rotate={-0.8}>可以求助</Tag>
        </div>
        <div style={{marginTop: 26, padding: '18px 22px', borderRadius: 18, background: C.white, width: 560, display: 'flex', alignItems: 'center', gap: 16, opacity: Math.min(1, frame / 30)}}>
          <Glyph name="hand" size={38} color={C.coral} />
          <div style={{fontFamily: '"Noto Sans SC"', fontSize: 18, lineHeight: 1.55, color: INK_SOFT}}>
            向医生、家人或心理咨询师伸手，
            <br />
            不是软弱，是照顾自己。
          </div>
        </div>
      </div>
      <div style={{position: 'absolute', right: 0, top: 20, width: 900, height: 630}}>
        <Card bg={C.white} padding={0} style={{width: '100%', height: '100%', overflow: 'hidden'}}>
          <div style={{height: 74, background: TONES.peach.soft, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 26px'}}>
            <span style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 21, color: INK}}>诊室之外 · 情绪也需要照护</span>
            <Tag color={C.white} rotate={1}>示意</Tag>
          </div>
          <div style={{position: 'relative', height: 556, background: TONES.lilac.soft, overflow: 'hidden'}}>
            <div style={{position: 'absolute', left: 80, top: 100, width: 320, height: 320, borderRadius: 160, background: C.white, opacity: 0.7}} />
            <div style={{position: 'absolute', left: 130, top: 120}}>
              <Portrait size={220} shirt={C.blue} mood="sad" bg="transparent" />
            </div>
            <div style={{position: 'absolute', left: 420, top: 90, width: 330, padding: '18px 20px', borderRadius: '20px 20px 20px 4px', background: C.white, border: `3px solid ${INK}`, fontFamily: '"Noto Sans SC"', fontSize: 21, color: INK}}>
              最近总是很焦虑……
            </div>
            <div style={{position: 'absolute', left: 470, top: 210, width: 300, padding: '18px 20px', borderRadius: '20px 20px 4px 20px', background: C.white, border: `3px solid ${C.coral}`, fontFamily: '"Noto Sans SC"', fontSize: 21, color: INK}}>
              有时候，什么都不想做。
            </div>
            <div style={{position: 'absolute', left: 440, top: 360, display: 'flex', gap: 12}}>
              <Tag color={C.coral} fg={C.white} rotate={-1}>焦虑</Tag>
              <Tag color={C.blue} fg={C.white} rotate={1}>抑郁</Tag>
            </div>
            <div style={{position: 'absolute', right: 40, bottom: 30}}>
              <Glyph name="heart" size={70} color={C.coral} />
            </div>
          </div>
        </Card>
      </div>
    </Content>
  );
};

const S5: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const hush = Math.min(1, Math.max(0, (t - 5) / 1));
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 18, width: 660}}>
        <Reveal delay={4}>
          <Kicker color={C.lilacDeep}>第五 / 歧视</Kicker>
          <Title size={82} style={{marginTop: 16}}>
            偏见
            <br />
            有时更伤人
          </Title>
        </Reveal>
        <Reveal delay={14}>
          <Body size={27} style={{marginTop: 24, width: 600}}>
            很多人不怕癫痫发作，却怕别人知道自己有癫痫。就业、婚姻、社交中的偏见，有时比发作本身更伤人。
          </Body>
        </Reveal>
        <div style={{display: 'flex', gap: 10, marginTop: 24}}>
          <Tag color={C.white} rotate={-1}>不是传染病</Tag>
          <Tag color={C.white} rotate={1}>不是“羊癫疯”</Tag>
        </div>
        <div style={{marginTop: 26, display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', borderRadius: 16, background: C.coral, color: C.white, width: 580}}>
          <Glyph name="no" size={32} color={C.white} />
          <span style={{fontFamily: '"Noto Sans SC"', fontSize: 19, fontWeight: 700}}>疾病不是一个人的全部</span>
        </div>
      </div>
      <div style={{position: 'absolute', right: 0, top: 20, width: 900, height: 630}}>
        <Card bg={C.white} padding={0} style={{width: '100%', height: '100%', overflow: 'hidden'}}>
          <div style={{height: 74, background: TONES.lilac.soft, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 26px'}}>
            <span style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 21, color: INK}}>办公室茶水间 · 示意</span>
            <Tag color={C.white} rotate={1}>停下议论</Tag>
          </div>
          <div style={{position: 'relative', height: 556, background: TONES.cream.bg, overflow: 'hidden'}}>
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 150, background: '#E8DFCC'}} />
            <div style={{position: 'absolute', left: 760, top: 70, width: 130, height: 130, borderRadius: 65, background: C.white, border: '2px solid rgba(28,43,58,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Glyph name="clock" size={64} color={INK_SOFT} />
            </div>
            <div style={{position: 'absolute', left: 730, top: 270, width: 120, height: 170, borderRadius: 16, background: C.blueDeep}}>
              <div style={{position: 'absolute', left: 20, top: 20, width: 80, height: 44, borderRadius: 8, background: C.white, opacity: 0.9}} />
              <div style={{position: 'absolute', left: 34, top: 74, width: 52, height: 8, borderRadius: 4, background: C.tealSoft}} />
              <div style={{position: 'absolute', left: 26, top: 100, width: 68, height: 44, borderRadius: '0 0 12px 12px', background: C.mustardSoft}} />
            </div>
            <div style={{position: 'absolute', left: 40, top: 360, width: 640, height: 24, borderRadius: 12, background: C.mustard}} />
            <div style={{position: 'absolute', left: 40, top: 384, width: 640, height: 150, background: '#D8C29A'}} />
            {[{x: 370, shirt: C.blue, hair: '#25313E'}, {x: 550, shirt: C.coral, hair: '#4A3B2F'}].map((p, i) => (
              <React.Fragment key={i}>
                <div style={{position: 'absolute', left: p.x, top: 220, width: 74, height: 74, borderRadius: 37, background: C.skin, border: `2px solid ${INK}`}} />
                <div style={{position: 'absolute', left: p.x, top: 220, width: 74, height: 30, borderRadius: '37px 37px 0 0', background: p.hair}} />
                <div style={{position: 'absolute', left: p.x + 20, top: 244, width: 6, height: 6, borderRadius: 3, background: INK}} />
                <div style={{position: 'absolute', left: p.x + 48, top: 244, width: 6, height: 6, borderRadius: 3, background: INK}} />
                <div style={{position: 'absolute', left: p.x + 27, top: 262, width: 20, height: 5, borderRadius: 3, background: INK}} />
                <div style={{position: 'absolute', left: p.x - 20, top: 290, width: 114, height: 100, borderRadius: '44px 44px 10px 10px', background: p.shirt}} />
                <div style={{position: 'absolute', left: p.x + 14, top: 386, width: 12, height: 80, background: INK, opacity: 0.55}} />
                <div style={{position: 'absolute', left: p.x + 48, top: 386, width: 12, height: 80, background: INK, opacity: 0.55}} />
              </React.Fragment>
            ))}
            <div style={{position: 'absolute', left: 110, top: 300}}>
              <div style={{position: 'relative', width: 94, height: 94, borderRadius: 47, background: C.skin, border: `2px solid ${INK}`}}>
                <div style={{position: 'absolute', left: 0, top: 0, width: 94, height: 34, borderRadius: '47px 47px 0 0', background: '#25313E'}} />
                <div style={{position: 'absolute', left: 26, top: 42, width: 7, height: 7, borderRadius: 4, background: INK}} />
                <div style={{position: 'absolute', left: 58, top: 42, width: 7, height: 7, borderRadius: 4, background: INK}} />
                <div style={{position: 'absolute', left: 34, top: 64, width: 24, height: 5, borderRadius: 3, background: INK}} />
              </div>
              <div style={{width: 130, height: 160, borderRadius: '56px 56px 10px 10px', background: C.teal, marginLeft: -18, marginTop: 0}} />
              <div style={{width: 16, height: 90, background: INK, opacity: 0.6, marginLeft: 18, marginTop: 0}} />
              <div style={{width: 16, height: 90, background: INK, opacity: 0.6, marginLeft: 70, marginTop: -90}} />
            </div>
            <div style={{position: 'absolute', left: 360, top: 100, width: 330, padding: '14px 18px', borderRadius: 16, background: C.white, border: `2px solid ${INK}`, fontFamily: '"Noto Sans SC"', fontSize: 18, color: INK, opacity: 1 - hush}}>
              你听说了吗？他有癫痫……
            </div>
            <div style={{position: 'absolute', left: 520, top: 180, width: 260, padding: '14px 18px', borderRadius: 16, background: C.white, border: `2px solid ${INK}`, fontFamily: '"Noto Sans SC"', fontSize: 18, color: INK, opacity: 1 - hush}}>
              真的假的？
            </div>
            <div style={{position: 'absolute', left: 100, bottom: 36, opacity: hush, transform: `translateY(${(1 - hush) * 12}px)`}}>
              <Tag color={C.coralSoft} rotate={-2}>他来了，别说了</Tag>
            </div>
            <div style={{position: 'absolute', right: 40, bottom: 34, opacity: hush}}>
              <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 34, color: C.coralDeep, textDecoration: 'line-through', transform: 'rotate(-6deg)'}}>羊癫疯</div>
            </div>
          </div>
        </Card>
      </div>
    </Content>
  );
};

const NightBedroom: React.FC<{frame: number}> = ({frame}) => (
  <div style={{position: 'relative', width: 900, height: 560, borderRadius: 26, overflow: 'hidden', background: '#2E3A55'}}>
    <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 280, background: '#26324A'}} />
    <div style={{position: 'absolute', right: 70, top: 50, width: 220, height: 190, borderRadius: 18, background: '#1D2740', border: '3px solid #55658A'}}>
      <div style={{position: 'absolute', right: 46, top: 30, width: 58, height: 58, borderRadius: 29, background: '#F3D79C'}} />
      {[[30, 40], [100, 80], [160, 30], [80, 130], [160, 140]].map(([x, y], i) => (
        <div key={i} style={{position: 'absolute', left: x, top: y, width: 4, height: 4, borderRadius: 2, background: '#F3D79C', opacity: 0.7}} />
      ))}
    </div>
    <div style={{position: 'absolute', left: 80, top: 360, width: 600, height: 26, borderRadius: 13, background: '#F3D79C'}} />
    <div style={{position: 'absolute', left: 100, top: 386, width: 180, height: 50, borderRadius: 25, background: '#E6D7BB'}} />
    <div style={{position: 'absolute', left: 270, top: 375, width: 350, height: 80, borderRadius: 26, background: '#8FA7C9', opacity: 0.8}} />
    <div style={{position: 'absolute', left: 620, top: 320, width: 18, height: 130, background: '#C9B78D'}} />
    <div style={{position: 'absolute', left: 600, top: 300, width: 58, height: 40, borderRadius: '28px 28px 4px 4px', background: '#F3D79C'}} />
    <div style={{position: 'absolute', left: 180, top: 330, width: 340, height: 30, borderRadius: 15, background: '#D6C6AC'}} />
    <div style={{position: 'absolute', left: 200, top: 300, width: 280, height: 46, borderRadius: 23, background: '#8FA7C9', opacity: 0.4}} />
    <div style={{position: 'absolute', left: 168, top: 300, width: 86, height: 86, borderRadius: 43, background: '#F2C9A1', border: '2px solid #1D2740'}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: 86, height: 30, borderRadius: '43px 43px 0 0', background: '#25313E'}} />
      <div style={{position: 'absolute', left: 20, top: 42, width: 12, height: 3, borderRadius: 2, background: '#1D2740'}} />
      <div style={{position: 'absolute', left: 54, top: 42, width: 12, height: 3, borderRadius: 2, background: '#1D2740'}} />
      <div style={{position: 'absolute', left: 30, top: 60, width: 24, height: 4, borderRadius: 2, background: '#1D2740'}} />
    </div>
    <div style={{position: 'absolute', left: 238, top: 340, width: 390, height: 80, borderRadius: '40px 40px 18px 18px', background: '#8FA7C9', border: '2px solid #1D2740'}}>
      <div style={{position: 'absolute', left: 40, top: 18, width: 120, height: 4, borderRadius: 2, background: '#DCE4F4', opacity: 0.3}} />
      <div style={{position: 'absolute', left: 160, top: 40, width: 150, height: 4, borderRadius: 2, background: '#DCE4F4', opacity: 0.25}} />
    </div>
    <div style={{position: 'absolute', left: 770, top: 210, width: 90, height: 80, borderRadius: 12, background: '#1D2740', border: '2px solid #55658A'}}>
      <svg width="80" height="50" viewBox="0 0 80 50" style={{margin: '12px 5px'}}>
        <polyline points="2,30 20,30 26,16 32,40 38,30 50,30 58,22 66,34 78,30" fill="none" stroke={C.teal} strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
    <div style={{position: 'absolute', right: 60, top: 300, fontFamily: '"Noto Sans SC"', fontSize: 14, color: '#DCE4F4', opacity: 0.6}}>夜间 · 示意</div>
    <div style={{position: 'absolute', left: 30, bottom: 26, fontFamily: '"Noto Sans SC"', fontSize: 14, color: '#DCE4F4', opacity: 0.55}}>不是让你恐慌，而是提醒规范治疗</div>
  </div>
);

const S6: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 18, width: 620}}>
        <Reveal delay={4}>
          <Kicker color={C.lilacDeep}>少见，但严重</Kicker>
          <Title size={66} style={{marginTop: 16}}>
            还有一件
            <br />
            需要知道的事
          </Title>
        </Reveal>
        <Reveal delay={14}>
          <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 88, color: C.coral, marginTop: 20}}>癫痫猝死</div>
          <div style={{fontFamily: '"Noto Sans SC"', fontSize: 20, letterSpacing: 3, color: INK_SOFT, marginTop: 4}}>SUDEP</div>
        </Reveal>
        <Reveal delay={24}>
          <Body size={25} style={{marginTop: 20, width: 590}}>
            它最常发生在发作长期控制不佳的全面强直-阵挛发作患者身上。规范治疗、控制发作，是最重要的预防。
          </Body>
        </Reveal>
        <div style={{display: 'flex', gap: 10, marginTop: 22}}>
          <Tag color={C.coralSoft} rotate={-1}>少见但严重</Tag>
          <Tag color={C.white} rotate={1}>不是恐吓</Tag>
        </div>
      </div>
      <div style={{position: 'absolute', right: 0, top: 20}}>
        <NightBedroom frame={frame} />
      </div>
    </Content>
  );
};

const S7: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const p = Math.min(1, t / 1.2);
  return (
    <AbsoluteFill style={{background: TONES.peach.bg}}>
      <div style={{position: 'absolute', right: -100, top: -100, opacity: 0.9}}>
        <Sunburst size={900} color={C.mustard} rays={28} opacity={0.38} />
      </div>
      <div style={{position: 'absolute', left: 120, top: 140, width: 760}}>
        <Kicker color={C.coralDeep}>08 / 一起生活</Kicker>
        <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 82, lineHeight: 1.18, color: INK, marginTop: 24, opacity: p, transform: `translateY(${(1 - p) * 20}px)`}}>
          你不是“羊癫疯”
          <br />
          你是一个有癫痫的人
        </div>
        <div style={{fontFamily: '"Noto Sans SC"', fontSize: 34, lineHeight: 1.6, color: INK_SOFT, marginTop: 26, opacity: p}}>
          疾病只是你的一部分，
          <br />
          不是你的全部。
        </div>
        <div style={{marginTop: 34, display: 'flex', gap: 12, opacity: p}}>
          <Tag color={C.teal} fg={C.white} rotate={-1}>规范治疗</Tag>
          <Tag color={C.white} rotate={1}>规律生活</Tag>
          <Tag color={C.mustard} rotate={-0.6}>你值得被看见</Tag>
        </div>
      </div>
      <div style={{position: 'absolute', right: 150, top: 220}}>
        <div style={{width: 430, height: 430, borderRadius: 215, background: C.white, border: '3px solid rgba(28,43,58,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Portrait size={330} shirt={C.teal} mood="calm" glasses bg={TONES.mint.soft} />
        </div>
        <div style={{position: 'absolute', left: -16, bottom: 30}}>
          <Tag color={C.coral} fg={C.white} rotate={-2}>不是“羊癫疯”</Tag>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Ch08: React.FC = () => (
  <MGFrame chapter={chapter} accent={C.lilacDeep}>
    <Scene from={0} to={18.86} tone="lilac">
      <S0 />
    </Scene>
    <Scene from={18.86} to={29.77} tone="lilac">
      <S1 />
    </Scene>
    <Scene from={29.77} to={44.77} tone="sky">
      <S2 />
    </Scene>
    <Scene from={44.77} to={56.48} tone="butter">
      <S3 />
    </Scene>
    <Scene from={56.48} to={69.77} tone="peach">
      <S4 />
    </Scene>
    <Scene from={69.77} to={84.77} tone="lilac">
      <S5 />
    </Scene>
    <Scene from={84.77} to={99.77} tone="sky">
      <S6 />
    </Scene>
    <Scene from={99.77} to={110} full tone="peach">
      <S7 />
    </Scene>
  </MGFrame>
);
