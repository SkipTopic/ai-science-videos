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
  WaveLine,
} from './mgKit';
import {C, FPS, INK, INK_SOFT, TONES, springIn} from './theme';

const chapter = getChapter('05');
const T = (seconds: number) => Math.round(seconds * FPS);

const questions = [
  '发作前，在做什么？',
  '有没有先兆？',
  '意识清不清楚？',
  '肢体是双侧还是单侧？',
  '持续了多久？',
  '发作后是什么状态？',
];

const S0: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 20, width: 620}}>
        <Reveal delay={4}>
          <Kicker color={C.blueDeep}>05 · 怎么确诊</Kicker>
          <Title size={92} style={{marginTop: 18}}>
            最重要的
            <br />
            不是<Highlight color={C.mustardSoft}>机器</Highlight>
          </Title>
        </Reveal>
        <Reveal delay={16}>
          <Body size={29} style={{marginTop: 26, width: 590}}>
            而是“发作时到底发生了什么”。医生会详细询问发作前、发作中、发作后的每一个细节。
          </Body>
        </Reveal>
        <div style={{display: 'flex', gap: 10, marginTop: 26}}>
          <Tag color={C.blue} fg={C.white} rotate={-1}>病史</Tag>
          <Tag color={C.white} rotate={1}>目击者描述</Tag>
          <Tag color={C.mustard} rotate={-0.6}>手机录像</Tag>
        </div>
        <div style={{position: 'absolute', left: 0, top: 512, display: 'flex', alignItems: 'center', gap: 16}}>
          <div style={{width: 64, height: 64, borderRadius: 20, background: C.white, border: '2px solid rgba(28,43,58,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Glyph name="book" size={36} color={C.blue} />
          </div>
          <div style={{fontFamily: '"Noto Sans SC"', fontSize: 19, lineHeight: 1.55, color: INK_SOFT}}>
            诊断从“听你说”开始
            <br />
            <span style={{fontWeight: 700, color: C.blueDeep}}>再选择需要的检查</span>
          </div>
        </div>
      </div>
      <div style={{position: 'absolute', right: 0, top: 6, width: 980, height: 646}}>
        <div style={{position: 'absolute', left: 50, top: 70, width: 900, height: 540, borderRadius: 16, background: C.white, border: '2px solid rgba(28,43,58,0.12)', boxShadow: '0 14px 0 rgba(28,43,58,0.08)', transform: 'rotate(0.8deg)'}}>
          <div style={{position: 'absolute', left: 430, top: -34, width: 120, height: 54, borderRadius: 12, background: C.mustard, border: `3px solid ${INK}`}} />
          <div style={{position: 'absolute', left: 34, top: 26, right: 34, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 30, color: INK}}>发作记录 / HISTORY</div>
            <Tag color={C.blueSoft} rotate={1.5}>医生问诊</Tag>
          </div>
          <div style={{position: 'absolute', left: 34, right: 34, top: 88, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14}}>
            {questions.map((q, i) => {
              const p = springIn(frame, T(0.8 + i * 0.6), 150, 14);
              return (
                <div key={q} style={{height: 104, borderRadius: 14, background: TONES.sky.soft, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 12, opacity: Math.min(1, p * 2), transform: `translateY(${(1 - p) * 14}px)`}}>
                  <div style={{width: 30, height: 30, borderRadius: 8, background: C.white, border: `2px solid ${C.blue}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                    {i < Math.max(0, Math.floor((t - 0.8) / 0.6) + 1) ? (
                      <svg width="18" height="18" viewBox="0 0 18 18"><path d="m4 9 4 4 7-8" stroke={C.blue} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    ) : null}
                  </div>
                  <span style={{fontFamily: '"Noto Sans SC"', fontSize: 22, fontWeight: 700, color: INK, lineHeight: 1.3}}>{q}</span>
                </div>
              );
            })}
          </div>
          <div style={{position: 'absolute', left: 34, bottom: 26, display: 'flex', alignItems: 'center', gap: 16}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <Portrait size={68} shirt={C.blue} mood="calm" />
              <div style={{marginLeft: -16}}>
                <Portrait size={68} shirt={C.coral} mood="worried" bg={TONES.peach.soft} />
              </div>
            </div>
            <div style={{fontFamily: '"Noto Sans SC"', fontSize: 17, color: INK_SOFT}}>
              患者 + 目击者一起回忆
              <br />
              信息越具体，判断越准确
            </div>
            <div style={{marginLeft: 'auto'}}>
              <Glyph name="eeg" size={44} color={C.blue} />
            </div>
          </div>
        </div>
      </div>
    </Content>
  );
};

const PhoneMock: React.FC<{frame: number}> = ({frame}) => {
  const t = frame / FPS;
  const secs = 8 + Math.floor(t);
  const rec = 0.45 + 0.55 * (Math.sin(t * 4.2) > 0 ? 1 : 0);
  return (
    <div style={{width: 420, height: 650, borderRadius: 46, background: INK, padding: 12, transform: 'rotate(-3deg)', boxShadow: '0 18px 36px rgba(28,43,58,0.18)'}}>
      <div style={{position: 'relative', width: '100%', height: '100%', borderRadius: 36, background: C.white, overflow: 'hidden'}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 82, background: 'rgba(28,43,58,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
            <span style={{width: 13, height: 13, borderRadius: 7, background: C.coral, opacity: rec}} />
            <span style={{fontFamily: 'Consolas, monospace', fontSize: 17, color: C.white}}>REC 00:{secs.toString().padStart(2, '0')}</span>
          </div>
          <span style={{fontFamily: '"Noto Sans SC"', fontSize: 14, letterSpacing: 2, color: C.white, opacity: 0.8}}>仅记录关键信息</span>
        </div>
        <div style={{position: 'absolute', left: 20, top: 102, right: 20, bottom: 20, borderRadius: 18, background: TONES.sky.soft, overflow: 'hidden'}}>
          <svg width="100%" height="100%" viewBox="0 0 356 504" preserveAspectRatio="xMidYMid slice">
            <rect width="356" height="504" fill="#D7E4EA" />
            <rect y="136" width="356" height="368" fill="#D6C6AC" />
            <path d="M0 136h356" stroke="rgba(28,43,58,0.12)" strokeWidth="3" />
            <path d="M36 504 112 136M320 504 244 136" stroke="rgba(28,43,58,0.05)" strokeWidth="3" />
            <ellipse cx="190" cy="420" rx="150" ry="30" fill="rgba(28,43,58,0.10)" />
            <path d="M112 345c36-24 104-26 150-10 22 8 34 20 34 34 0 16-14 26-36 28H112v-52Z" fill={C.teal} stroke={INK} strokeWidth="3" />
            <path d="M260 366h64c20 0 32 8 32 20s-12 20-32 20h-64v-40Z" fill={C.tealDeep} stroke={INK} strokeWidth="3" />
            <path d="M84 352c-18-2-30-12-30-26s12-24 30-24" fill={C.skin} stroke={INK} strokeWidth="3" />
            <circle cx="80" cy="318" r="32" fill={C.skin} />
            <path d="M48 316c0-22 13-34 32-34 21 0 33 13 33 32-13-2-23-8-29-18-7 11-19 18-36 17v3Z" fill="#25313E" />
            <path d="M128 330c44-16 112-18 158-6" stroke={C.tealDeep} strokeWidth="3" fill="none" opacity="0.35" strokeLinecap="round" />
            <rect x="24" y="270" width="116" height="94" rx="18" fill="rgba(28,43,58,0.78)" />
            <circle cx="70" cy="308" r="13" fill="none" stroke={C.white} strokeWidth="3" />
            <rect x="63" y="308" width="14" height="12" rx="3" fill={C.white} />
            <text x="82" y="348" textAnchor="middle" fontFamily="'Noto Sans SC'" fontSize="13" fill={C.white} letterSpacing="1">面部不拍</text>
            <rect x="18" y="18" width="126" height="40" rx="10" fill={C.mustardSoft} />
            <text x="81" y="44" textAnchor="middle" fontFamily="'Noto Sans SC'" fontWeight="700" fontSize="15" fill={INK}>画面示意</text>
            <rect y="384" width="356" height="120" fill="rgba(28,43,58,0.35)" />
            <circle cx="32" cy="464" r="13" fill="none" stroke={C.white} strokeWidth="3" />
            <path d="M21 464h22" stroke={C.white} strokeWidth="3" strokeLinecap="round" />
            <text x="58" y="471" fontFamily="'Noto Sans SC'" fontWeight="700" fontSize="17" fill={C.white} letterSpacing="1">不拍脸 · 不传播</text>
          </svg>
        </div>
      </div>
    </div>
  );
};

const S1: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 20, width: 700}}>
        <Reveal delay={4}>
          <Kicker color={C.lilacDeep}>证据 / 目击者描述</Kicker>
          <Title size={82} style={{marginTop: 18}}>
            一段录像
            <br />
            可能是关键线索
          </Title>
        </Reveal>
        <Reveal delay={16}>
          <Body size={28} style={{marginTop: 24, width: 650}}>
            目击者的描述，甚至一段手机录像，往往能给医生提供关键线索。
          </Body>
        </Reveal>
        <Reveal delay={28}>
          <div style={{marginTop: 28, padding: '22px 24px', borderRadius: 20, background: C.white, border: '2px solid rgba(28,43,58,0.12)', width: 600, display: 'flex', alignItems: 'flex-start', gap: 16}}>
            <div style={{width: 52, height: 52, borderRadius: 16, background: TONES.mint.soft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
              <Glyph name="shield" size={30} color={C.tealDeep} />
            </div>
            <div>
              <div style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 22, color: INK}}>拍摄前：先确保安全</div>
              <div style={{fontFamily: '"Noto Sans SC"', fontSize: 18, lineHeight: 1.6, color: INK_SOFT, marginTop: 6}}>
                不要为了拍摄而耽误保护；不要拍摄面部和隐私部位。
              </div>
            </div>
          </div>
        </Reveal>
        <div style={{display: 'flex', gap: 10, marginTop: 22}}>
          <Tag color={C.teal} fg={C.white} rotate={-1}>先确保安全</Tag>
          <Tag color={C.white} rotate={1}>尊重隐私</Tag>
          <Tag color={C.coralSoft} rotate={-0.8}>不拍脸</Tag>
        </div>
      </div>
      <div style={{position: 'absolute', right: 60, top: 0}}>
        <PhoneMock frame={frame} />
      </div>
      <div style={{position: 'absolute', left: 900, top: 90, opacity: 0.9}}>
        <Tag color={C.mustard} rotate={-2}>记录时间：从发作开始计时</Tag>
      </div>
      <div style={{position: 'absolute', left: 890, bottom: 60, opacity: 0.9}}>
        <Tag color={C.coralSoft} rotate={2}>不要挡住施救</Tag>
      </div>
    </Content>
  );
};

const TestCard: React.FC<{
  n: string;
  title: string;
  subtitle: string;
  color: string;
  bg: string;
  delay: number;
  children: React.ReactNode;
  note: string;
}> = ({n, title, subtitle, color, bg, delay, children, note}) => {
  const frame = useCurrentFrame();
  const p = springIn(frame, delay, 150, 14);
  return (
    <div style={{flex: 1, height: 500, borderRadius: 26, background: C.white, border: '2px solid rgba(28,43,58,0.12)', boxShadow: '0 10px 0 rgba(28,43,58,0.06)', overflow: 'hidden', opacity: Math.min(1, p * 2), transform: `translateY(${(1 - p) * 24}px)`}}>
      <div style={{height: 90, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 26px'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
          <span style={{fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 24, color}}>{n}</span>
          <span style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 36, color: INK}}>{title}</span>
        </div>
        <Tag color={C.white} rotate={1}>示意</Tag>
      </div>
      <div style={{position: 'relative', height: 270, background: bg, overflow: 'hidden'}}>{children}</div>
      <div style={{padding: '22px 26px'}}>
        <div style={{fontFamily: '"Noto Sans SC"', fontSize: 21, lineHeight: 1.55, color: INK_SOFT}}>{subtitle}</div>
        <div style={{fontFamily: '"Noto Sans SC"', fontSize: 15, color: INK_SOFT, opacity: 0.6, marginTop: 8}}>{note}</div>
      </div>
    </div>
  );
};

const S2: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Content>
      <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between'}}>
        <Reveal delay={4}>
          <Kicker color={C.blueDeep}>检查 / 不是越多越好</Kicker>
          <Title size={62} style={{marginTop: 8}}>确诊，需要哪些检查？</Title>
        </Reveal>
        <Tag color={C.white} rotate={-1}>按需要选择</Tag>
      </div>
      <div style={{position: 'absolute', left: 0, top: 142, right: 0, display: 'flex', gap: 22}}>
        <TestCard n="01" title="脑电图" subtitle="记录大脑电活动。在发作间期或发作时，捕捉异常放电。" color={C.blue} bg={TONES.sky.soft} delay={T(0.7)} note="EEG · 需要贴电极，通常不痛">
          <div style={{position: 'absolute', left: 30, top: 24}}>
            <svg width="300" height="220" viewBox="0 0 300 220">
              <circle cx="120" cy="110" r="76" fill={C.white} stroke={INK} strokeWidth="4" />
              <path d="M54 92c8-52 40-76 76-76 40 0 70 26 76 74-24-6-42-20-52-42-16 24-48 40-100 44Z" fill="#25313E" />
              <circle cx="84" cy="108" r="6" fill={INK} />
              <circle cx="112" cy="108" r="6" fill={INK} />
              <path d="M88 138c14 6 28 6 42 0" stroke={INK} strokeWidth="4" fill="none" strokeLinecap="round" />
              {[[70, 58], [102, 46], [136, 48], [162, 66], [172, 100], [168, 136]].map(([x, y], i) => (
                <g key={i}>
                  <circle cx={x} cy={y} r="7" fill={C.coral} />
                  <path d={`M${x} ${y}v-12`} stroke={C.coral} strokeWidth="3" />
                </g>
              ))}
              <path d="M206 140h22l8-24 10 48 10-32 8 20h28" stroke={C.blue} strokeWidth="4" fill="none" strokeLinecap="round" />
            </svg>
          </div>
          <div style={{position: 'absolute', right: 20, bottom: 0}}>
            <WaveLine width={260} height={90} color={C.blue} frame={frame} amplitude={18} stroke={3.5} />
          </div>
        </TestCard>
        <TestCard n="02" title="磁共振" subtitle="帮助寻找大脑结构上的病因，比如结构性病灶。" color={C.tealDeep} bg={TONES.mint.soft} delay={T(1.7)} note="MRI · 按医生安排，部分人需注意禁忌">
          <div style={{position: 'absolute', left: 40, top: 40}}>
            <svg width="300" height="200" viewBox="0 0 300 200">
              <rect x="30" y="24" width="220" height="150" rx="75" fill={C.white} stroke={INK} strokeWidth="4" />
              <circle cx="140" cy="99" r="56" fill="none" stroke={C.teal} strokeWidth="3" opacity="0.5" />
              <circle cx="140" cy="99" r="40" fill="none" stroke={C.teal} strokeWidth="3" opacity="0.35" />
              <circle cx="140" cy="99" r="24" fill={C.tealSoft} />
              <path d="M140 78c-14 0-24 10-24 24 0 12 8 20 16 22 8 2 18-2 22-10 4-10 0-18-8-24-2-6-4-10-6-12Z" fill={C.teal} />
            </svg>
          </div>
          <div style={{position: 'absolute', right: 26, bottom: 18, fontFamily: '"Noto Sans SC"', fontSize: 14, color: C.tealDeep, opacity: 0.75}}>结构影像 · 示意</div>
        </TestCard>
        <TestCard n="03" title="血液检查" subtitle="用来排除代谢等问题。" color={C.mustardDeep} bg={TONES.butter.soft} delay={T(2.7)} note="抽血化验 · 具体项目由医生决定">
          <div style={{position: 'absolute', left: 70, top: 26}}>
            <svg width="200" height="220" viewBox="0 0 200 220">
              <rect x="72" y="20" width="56" height="160" rx="28" fill={C.white} stroke={INK} strokeWidth="4" />
              <rect x="82" y="94" width="36" height="74" rx="18" fill={C.coralSoft} />
              <rect x="72" y="20" width="56" height="26" rx="10" fill={C.mustard} stroke={INK} strokeWidth="3" />
              <rect x="88" y="0" width="24" height="24" rx="8" fill={C.white} stroke={INK} strokeWidth="3" />
              {[0, 1, 2].map((i) => (
                <circle key={i} cx={92 + i * 10} cy={110 + i * 18} r="3" fill={C.white} opacity="0.7" />
              ))}
              <path d="M150 64c-16 18-22 32-22 44 0 16 12 28 28 28s28-12 28-28c0-14-10-28-34-44Z" fill={C.coral} />
            </svg>
          </div>
        </TestCard>
      </div>
    </Content>
  );
};

const S3: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const q = Math.min(1, Math.max(0, (t - 1.6) / 1));
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 20, width: 740}}>
        <Reveal delay={4}>
          <Kicker color={C.coralDeep}>正常报告 ≠ 完全排除</Kicker>
          <Title size={76} style={{marginTop: 16}}>
            脑电图正常
            <br />
            也不能完全排除
          </Title>
        </Reveal>
        <Reveal delay={16}>
          <Body size={27} style={{marginTop: 22, width: 680}}>
            常规检查只有几十分钟，而发作可能几天才出现一次。一次“正常”，并不代表没有癫痫。
          </Body>
        </Reveal>
        <div style={{display: 'flex', gap: 12, marginTop: 24}}>
          <Tag color={C.white} rotate={-1}>检查时间有限</Tag>
          <Tag color={C.mustard} rotate={1}>发作可能很稀疏</Tag>
        </div>
      </div>
      <div style={{position: 'absolute', left: 20, top: 490, width: 660}}>
        <Card bg={C.white} padding={22} style={{display: 'flex', alignItems: 'center', gap: 24, transform: 'rotate(-1deg)'}}>
          <div style={{width: 110, height: 140, borderRadius: 10, background: C.white, border: `2px solid rgba(28,43,58,0.15)`, padding: 10}}>
            <div style={{width: '100%', height: 6, background: 'rgba(28,43,58,0.15)', borderRadius: 3}} />
            <div style={{width: '70%', height: 5, background: 'rgba(28,43,58,0.1)', borderRadius: 3, marginTop: 8}} />
            <div style={{width: '100%', height: 34, borderRadius: 4, border: '1.5px solid rgba(28,43,58,0.1)', marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <span style={{fontFamily: 'Georgia, serif', fontSize: 22, color: C.coral, transform: 'rotate(-12deg)', border: `2px solid ${C.coral}`, padding: '0 4px', borderRadius: 3}}>正常</span>
            </div>
            <div style={{width: '100%', height: 4, background: 'rgba(28,43,58,0.1)', marginTop: 12}} />
          </div>
          <div>
            <div style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 23, color: INK}}>报告写“正常”</div>
            <div style={{fontFamily: '"Noto Sans SC"', fontSize: 18, color: INK_SOFT, marginTop: 6}}>只说明：这段时间没有捕捉到异常。</div>
          </div>
          <div style={{marginLeft: 'auto', opacity: q}}>
            <div style={{width: 78, height: 78, borderRadius: 39, background: C.mustardSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Georgia, serif', fontSize: 52, color: C.mustardDeep}}>?</div>
          </div>
        </Card>
      </div>
      <div style={{position: 'absolute', right: 0, top: 100, width: 800}}>
        <Card bg={C.white} padding={30} style={{height: 520}}>
          <div style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 23, color: INK}}>时间尺度，差得很多</div>
          <div style={{marginTop: 28}}>
            <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: '"Noto Sans SC"', fontSize: 18, color: INK_SOFT}}>
              <span>常规脑电图</span><span style={{fontWeight: 700, color: C.blueDeep}}>20–30 分钟</span>
            </div>
            <div style={{height: 16, borderRadius: 8, background: TONES.cream.soft, marginTop: 8, overflow: 'hidden'}}>
              <div style={{height: '100%', width: '18%', background: C.blue, borderRadius: 8}} />
            </div>
          </div>
          <div style={{marginTop: 28}}>
            <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: '"Noto Sans SC"', fontSize: 18, color: INK_SOFT}}>
              <span>发作间隔</span><span style={{fontWeight: 700, color: C.coralDeep}}>可能几天一次</span>
            </div>
            <div style={{height: 16, borderRadius: 8, background: TONES.cream.soft, marginTop: 8, overflow: 'hidden'}}>
              <div style={{height: '100%', width: `${35 + q * 55}%`, background: C.coral, borderRadius: 8}} />
            </div>
          </div>
          <div style={{marginTop: 34, padding: '18px 20px', borderRadius: 14, background: TONES.butter.soft, fontFamily: '"Noto Sans SC"', fontSize: 19, lineHeight: 1.6, color: INK}}>
            一次正常，不等于永远正常；
            <br />
            也说明不了“没有癫痫”。
          </div>
          <div style={{marginTop: 26, display: 'flex', alignItems: 'center', gap: 14}}>
            <Glyph name="clock" size={44} color={C.mustardDeep} />
            <div style={{fontFamily: '"Noto Sans SC"', fontSize: 18, color: INK_SOFT}}>
              必要时，医生会安排更长时间的视频脑电图。
            </div>
          </div>
          <div style={{position: 'absolute', right: 28, bottom: 24}}>
            <Tag color={C.white} rotate={1}>示意</Tag>
          </div>
        </Card>
      </div>
    </Content>
  );
};

const diffs = [
  {title: '低血糖', icon: 'drop', color: C.mustardDeep, bg: TONES.butter.soft, note: '血糖异常'},
  {title: '晕厥', icon: 'moon', color: C.blue, bg: TONES.sky.soft, note: '短暂脑供血不足'},
  {title: '惊恐发作', icon: 'heart', color: C.coral, bg: TONES.peach.soft, note: '强烈的焦虑反应'},
  {title: '心因性非癫痫性发作', icon: 'brain', color: C.lilacDeep, bg: TONES.lilac.soft, note: '不是“装病”'},
];

const S4: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const strip = Math.min(1, Math.max(0, (t - 5.8) / 1));
  return (
    <Content>
      <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between'}}>
        <Reveal delay={4}>
          <Kicker color={C.coralDeep}>鉴别诊断 / 不是所有发作都是癫痫</Kicker>
          <Title size={60} style={{marginTop: 8}}>还有一些发作，其实不是癫痫</Title>
        </Reveal>
        <Tag color={C.white} rotate={-1}>需要专业评估</Tag>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 140, display: 'flex', gap: 18}}>
        {diffs.map((d, i) => {
          const p = springIn(frame, T(0.7 + i * 0.8), 150, 14);
          return (
            <div key={d.title} style={{flex: 1, height: 210, borderRadius: 22, background: C.white, border: '2px solid rgba(28,43,58,0.12)', boxShadow: '0 8px 0 rgba(28,43,58,0.06)', padding: '22px 22px', opacity: Math.min(1, p * 2), transform: `translateY(${(1 - p) * 22}px)`}}>
              <div style={{width: 64, height: 64, borderRadius: 18, background: d.bg, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Glyph name={d.icon} size={38} color={d.color} />
              </div>
              <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: i === 3 ? 27 : 32, lineHeight: 1.25, color: INK, marginTop: 16}}>{d.title}</div>
              <div style={{fontFamily: '"Noto Sans SC"', fontSize: 16, color: INK_SOFT, marginTop: 6}}>{d.note}</div>
            </div>
          );
        })}
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 370, opacity: strip, transform: `translateY(${(1 - strip) * 18}px)`}}>
        <Card bg={C.lilacSoft} padding={24} style={{display: 'flex', alignItems: 'center', gap: 24, border: '2px solid rgba(28,43,58,0.1)'}}>
          <div style={{padding: '10px 16px', borderRadius: 10, background: C.coral, color: C.white, fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 20, transform: 'rotate(-1.5deg)'}}>不是“装病”</div>
          <div style={{fontFamily: '"Noto Sans SC"', fontSize: 21, lineHeight: 1.6, color: INK}}>
            <strong>心因性非癫痫性发作</strong>是真实存在的发作，需要视频脑电图等专业评估，也需要心理治疗。
          </div>
          <div style={{marginLeft: 'auto', display: 'flex', gap: 10}}>
            <Tag color={C.white} rotate={1}>视频脑电图</Tag>
            <Tag color={C.white} rotate={-1}>心理治疗</Tag>
          </div>
        </Card>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, padding: '12px 24px', borderRadius: 14, background: C.coral, color: C.white, fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 22, transform: 'rotate(-0.5deg)'}}>
          <Glyph name="no" size={26} color={C.white} />
          别自己给自己下诊断
        </div>
      </div>
    </Content>
  );
};

export const Ch05: React.FC = () => (
  <MGFrame chapter={chapter} accent={C.blue}>
    <Scene from={0} to={16.06} tone="sky">
      <S0 />
    </Scene>
    <Scene from={16.06} to={31.06} tone="lilac">
      <S1 />
    </Scene>
    <Scene from={31.06} to={51.06} tone="sky">
      <S2 />
    </Scene>
    <Scene from={51.06} to={61.06} tone="butter">
      <S3 />
    </Scene>
    <Scene from={61.06} to={80.226} tone="peach">
      <S4 />
    </Scene>
  </MGFrame>
);
