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
  Tag,
  Title,
} from './mgKit';
import {C, FPS, INK, INK_SOFT, TONES, springIn} from './theme';

const chapter = getChapter('07');
const T = (seconds: number) => Math.round(seconds * FPS);

const SideLying: React.FC<{width?: number; style?: React.CSSProperties; showMat?: boolean; showPillow?: boolean}> = ({width = 620, style, showMat = true, showPillow = true}) => (
  <svg width={width} height={width * 0.48} viewBox="0 0 620 300" style={style}>
    <ellipse cx="310" cy="270" rx="280" ry="14" fill="rgba(28,43,58,0.09)" />
    {showMat ? (
      <>
        <rect x="30" y="234" width="560" height="44" rx="22" fill={C.white} stroke={INK} strokeWidth="3" />
        <rect x="30" y="234" width="560" height="12" rx="6" fill={C.tealSoft} />
      </>
    ) : null}
    {showPillow ? <rect x="54" y="192" width="118" height="48" rx="24" fill={C.mustardSoft} stroke={INK} strokeWidth="3" /> : null}
    <circle cx="142" cy="176" r="38" fill={C.skin} />
    <path d="M106 174c0-26 16-40 40-40 26 0 40 16 40 38-16-2-28-9-35-21-8 13-25 22-45 20v3Z" fill="#25313E" />
    <path d="M110 180c5-4 10-4 15 0" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M176 176l10 4-8 7" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M124 198c8 3 15 3 22 0" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M166 168c50-24 120-20 176 8 26 14 30 34 12 44H166v-52Z" fill={C.teal} stroke={INK} strokeWidth="3" />
    <path d="M330 194c48-14 100-8 136 12 18 10 24 22 18 34H330v-46Z" fill={C.blue} stroke={INK} strokeWidth="3" />
    <path d="M330 220c44 2 86 2 120-4" stroke={INK} strokeWidth="3" strokeLinecap="round" opacity="0.25" />
    <path d="M168 198c-14 16-16 32-4 48M224 190c-8 16-6 30 6 42" stroke={C.skin} strokeWidth="14" strokeLinecap="round" fill="none" />
    <path d="M166 200c22 10 40 26 44 44" stroke={C.skin} strokeWidth="13" strokeLinecap="round" fill="none" opacity="0.95" />
    <path d="M146 166c-4 14 2 26 16 34" stroke={C.tealDeep} strokeWidth="4" fill="none" opacity="0.25" strokeLinecap="round" />
  </svg>
);

const RecoveryFigure: React.FC<{width?: number}> = ({width = 680}) => (
  <svg width={width} height={width * 0.366} viewBox="0 0 820 300">
    <ellipse cx="410" cy="284" rx="380" ry="12" fill="rgba(28,43,58,0.08)" />
    <rect x="24" y="254" width="772" height="38" rx="19" fill={C.white} stroke={INK} strokeWidth="3" />
    <rect x="24" y="254" width="772" height="10" rx="5" fill={C.tealSoft} />
    <rect x="74" y="198" width="132" height="54" rx="27" fill={C.mustardSoft} stroke={INK} strokeWidth="3" />
    <circle cx="154" cy="172" r="40" fill={C.skin} />
    <path d="M114 170c0-28 17-43 42-43 28 0 43 17 43 40-17-2-30-10-37-23-8 14-26 24-48 22v4Z" fill="#25313E" />
    <circle cx="156" cy="166" r="4" fill={INK} />
    <path d="M190 174l10 4-9 6" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M146 194c8 3 15 3 22 0" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M190 150c58-18 132-8 190 34 18 14 22 32 4 44H190v-78Z" fill={C.teal} stroke={INK} strokeWidth="3" />
    <path d="M198 198c22 10 42 24 54 44" stroke={C.skin} strokeWidth="14" strokeLinecap="round" fill="none" />
    <path d="M382 186c48-22 104-18 136 12 18 16 18 30-2 40H382v-52Z" fill={C.blue} stroke={INK} strokeWidth="3" />
    <path d="M514 198c44 6 62 28 44 52l-40 14-30-34" fill={C.blueDeep} stroke={INK} strokeWidth="3" />
    <rect x="534" y="248" width="46" height="22" rx="11" fill={C.blueDeep} stroke={INK} strokeWidth="3" />
    <path d="M386 220c44 2 84 2 118-6" stroke={INK} strokeWidth="3" strokeLinecap="round" opacity="0.25" />
    <g>
      <circle cx="690" cy="142" r="30" fill={C.skin} />
      <path d="M660 140c0-22 13-34 32-34 22 0 33 13 33 32-13-2-23-8-29-18-7 11-19 18-36 17v3Z" fill="#25313E" />
      <path d="M676 144c4-3 8-3 12 0M700 144c4-3 8-3 12 0" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M680 158c7 4 14 4 21 0" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M646 284c0-58 18-98 44-98s44 40 44 98" fill={C.coral} stroke={INK} strokeWidth="3" />
      <path d="M654 210c-26 8-48 20-64 38" stroke={C.skin} strokeWidth="16" strokeLinecap="round" fill="none" />
      <path d="M600 284h156v18H600z" fill={C.coralDeep} />
    </g>
  </svg>
);

const Subway: React.FC<{frame: number}> = ({frame}) => {
  const t = frame / FPS;
  const secs = Math.max(0, Math.floor(t - 3));
  return (
    <div style={{position: 'relative', width: 1000, height: 600, borderRadius: 26, overflow: 'hidden', background: '#EDF3F7', border: '2px solid rgba(28,43,58,0.12)', boxShadow: '0 12px 0 rgba(28,43,58,0.07)'}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 90, background: '#D9E7F2'}} />
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 210, background: '#D9D0BF'}} />
      {[60, 390, 720].map((x, i) => (
        <div key={x} style={{position: 'absolute', left: x, top: 24, width: 230, height: 120, borderRadius: 16, background: '#6E93B4', border: `3px solid ${INK}`, overflow: 'hidden'}}>
          <div style={{position: 'absolute', right: 26, top: 16, width: 30, height: 30, borderRadius: 15, background: '#F4E5B5'}} />
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 44, background: '#547796'}} />
          {[14, 38, 66, 100, 128, 160, 188].map((bx, j) => (
            <div key={j} style={{position: 'absolute', left: bx, bottom: 0, width: 20 + (j % 3) * 8, height: 22 + (j % 4) * 12, background: '#3B5A78', opacity: 0.9}} />
          ))}
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 14, height: 2, background: '#B6D1E4', opacity: 0.6}} />
        </div>
      ))}
      <div style={{position: 'absolute', left: 40, top: 148, right: 40, height: 5, background: '#B7C5D0', borderRadius: 3}} />
      {[150, 420, 680, 900].map((x) => (
        <div key={x} style={{position: 'absolute', left: x, top: 150, width: 4, height: 100, background: '#9FB0BD'}}>
          <div style={{position: 'absolute', left: -24, bottom: 0, width: 52, height: 26, border: '4px solid #9FB0BD', borderTop: 'none', borderRadius: '0 0 24px 24px'}} />
        </div>
      ))}
      <div style={{position: 'absolute', left: 30, top: 330, width: 280, height: 90, borderRadius: 20, background: C.coral, opacity: 0.8}} />
      <div style={{position: 'absolute', right: 30, top: 330, width: 280, height: 90, borderRadius: 20, background: C.teal, opacity: 0.85}} />
      {[{x: 58, c: C.blue}, {x: 830, c: C.mustardDeep}, {x: 900, c: C.lilacDeep}].map((b, i) => (
        <React.Fragment key={i}>
          <div style={{position: 'absolute', left: b.x, top: 250 + (i % 2) * 10, width: 34, height: 34, borderRadius: 17, background: C.skin, border: `2px solid ${INK}`}} />
          <div style={{position: 'absolute', left: b.x - 8, top: 286 + (i % 2) * 10, width: 50, height: 96, borderRadius: '22px 22px 8px 8px', background: b.c}} />
          <div style={{position: 'absolute', left: b.x + 4, top: 378 + (i % 2) * 10, width: 8, height: 62, background: INK, opacity: 0.6}} />
          <div style={{position: 'absolute', left: b.x + 24, top: 378 + (i % 2) * 10, width: 8, height: 62, background: INK, opacity: 0.6}} />
        </React.Fragment>
      ))}
      <div style={{position: 'absolute', left: 330, top: 384, width: 390, transform: 'rotate(-1deg)'}}>
        <SideLying width={430} showMat={false} showPillow={false} />
      </div>
      <div style={{position: 'absolute', left: 700, top: 160, padding: '14px 18px', borderRadius: 14, background: C.white, border: '2px solid rgba(28,43,58,0.12)', boxShadow: '0 6px 0 rgba(28,43,58,0.06)', display: 'flex', alignItems: 'center', gap: 12}}>
        <div style={{width: 42, height: 42, borderRadius: 21, background: C.mustardSoft, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Glyph name="clock" size={26} color={C.mustardDeep} />
        </div>
        <div>
          <div style={{fontFamily: 'Georgia, serif', fontSize: 30, fontWeight: 700, color: INK}}>00:{secs.toString().padStart(2, '0')}</div>
          <div style={{fontFamily: '"Noto Sans SC"', fontSize: 13, color: INK_SOFT}}>从发作开始计时</div>
        </div>
      </div>
      <div style={{position: 'absolute', right: 26, top: 22}}>
        <Tag color={C.white} rotate={1}>非真实事件</Tag>
      </div>
    </div>
  );
};

const S0: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 20, width: 580}}>
        <Reveal delay={4}>
          <Kicker color={C.coralDeep}>07 · 旁人怎么做</Kicker>
          <Title size={78} style={{marginTop: 16}}>
            地铁里
            <br />
            有人倒下
          </Title>
        </Reveal>
        <Reveal delay={14}>
          <Body size={27} style={{marginTop: 22, width: 540}}>
            第一件事：保持冷静，掏出手机，记下发作开始的时间。
          </Body>
        </Reveal>
        <div style={{display: 'flex', gap: 10, marginTop: 24}}>
          <Tag color={C.coral} fg={C.white} rotate={-1}>保持冷静</Tag>
          <Tag color={C.mustard} rotate={1}>记下时间</Tag>
        </div>
        <div style={{position: 'absolute', left: 0, top: 470, display: 'flex', alignItems: 'center', gap: 18}}>
          <NumBadge n="01" color={C.coral} size={70} />
          <div style={{fontFamily: '"Noto Sans SC"', fontSize: 20, lineHeight: 1.55, color: INK_SOFT}}>
            先看时间，再看人
            <br />
            <span style={{fontWeight: 700, color: C.coralDeep}}>不要急着把他拉起来</span>
          </div>
        </div>
      </div>
      <div style={{position: 'absolute', right: 0, top: 20}}>
        <Subway frame={frame} />
      </div>
    </Content>
  );
};

const S1: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const move = Math.min(1, Math.max(0, (t - 1) / 1.4));
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 18, width: 620}}>
        <Reveal delay={4}>
          <Kicker color={C.tealDeep}>第二步 / 保护，不控制</Kicker>
          <Title size={74} style={{marginTop: 16}}>
            移开硬物
            <br />
            护住头部
          </Title>
        </Reveal>
        <Body size={26} style={{marginTop: 22, width: 570}}>
          不要按住他。把周围的风险移走，让他在发作中不受伤。
        </Body>
        <div style={{marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12}}>
          {[
            {n: '1', text: '移开周围的硬物、尖锐物', icon: 'no'},
            {n: '2', text: '在头下垫一件衣服或包', icon: 'shield'},
            {n: '3', text: '解开领口，让呼吸顺畅', icon: 'heart'},
          ].map((s) => (
            <div key={s.n} style={{display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', borderRadius: 14, background: C.white, border: '2px solid rgba(28,43,58,0.1)', width: 560}}>
              <NumBadge n={s.n} color={C.teal} size={38} />
              <Glyph name={s.icon} size={28} color={C.tealDeep} />
              <span style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 19, color: INK}}>{s.text}</span>
            </div>
          ))}
        </div>
        <div style={{marginTop: 20}}>
          <Tag color={C.teal} fg={C.white} rotate={-1}>保护，不控制</Tag>
        </div>
      </div>
      <div style={{position: 'absolute', right: 0, top: 16, width: 960, height: 640}}>
        <Card bg={C.white} padding={0} style={{width: '100%', height: '100%', overflow: 'hidden'}}>
          <div style={{height: 74, background: TONES.mint.soft, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px'}}>
            <span style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 21, color: INK}}>现场保护 · 先把危险移开</span>
            <Tag color={C.white} rotate={1}>示意</Tag>
          </div>
          <div style={{position: 'relative', height: 566, background: TONES.cream.bg, overflow: 'hidden'}}>
            <div style={{position: 'absolute', left: 90, top: 70, width: 780, height: 420, borderRadius: 30, background: C.white, border: '2px dashed rgba(28,43,58,0.15)'}} />
            <div style={{position: 'absolute', left: 220, top: 200, width: 500, transform: 'rotate(-8deg)'}}>
              <SideLying width={500} />
            </div>
            {[{x: 70, y: 90, icon: 'work', label: '包'}, {x: 760, y: 90, icon: 'umbrella', label: '伞'}, {x: 70, y: 400, icon: 'drop', label: '瓶子'}].map((o, i) => (
              <div key={o.label} style={{position: 'absolute', left: o.x + move * (i === 1 ? 60 : -30), top: o.y + move * 30, opacity: 1 - move * 0.65, transform: `rotate(${i * 8 - 8}deg)`}}>
                <div style={{width: 82, height: 82, borderRadius: 18, background: C.white, border: '2px solid rgba(28,43,58,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Glyph name={o.icon} size={40} color={C.coral} />
                </div>
                <div style={{textAlign: 'center', fontFamily: '"Noto Sans SC"', fontSize: 14, color: INK_SOFT, marginTop: 4}}>{o.label}</div>
              </div>
            ))}
            <div style={{position: 'absolute', left: 300, top: 224, opacity: move, padding: '12px 14px', borderRadius: 14, background: C.white, border: '2px solid rgba(28,43,58,0.1)'}}>
              <Glyph name="shield" size={34} color={C.tealDeep} />
              <div style={{fontFamily: '"Noto Sans SC"', fontSize: 14, color: INK, fontWeight: 700, marginTop: 2}}>垫住头部</div>
            </div>
            <div style={{position: 'absolute', left: 546, top: 300, opacity: move, padding: '10px 14px', borderRadius: 12, background: C.white, border: '2px solid rgba(28,43,58,0.1)', fontFamily: '"Noto Sans SC"', fontSize: 14, fontWeight: 700, color: C.tealDeep}}>解开领口</div>
            <div style={{position: 'absolute', left: 36, top: 24, fontFamily: '"Noto Sans SC"', fontSize: 15, letterSpacing: 2, color: INK_SOFT, opacity: 0.65}}>保护头部 · 解开领口 · 不按住</div>
          </div>
        </Card>
      </div>
    </Content>
  );
};

const DONT = [
  {title: '塞东西', sub: '勺子、毛巾、手指', icon: 'no'},
  {title: '按住他', sub: '强行压制身体', icon: 'hand'},
  {title: '喂水喂药', sub: '会呛咳、窒息', icon: 'coffee'},
  {title: '掐人中 / 泼冷水', sub: '不能终止发作', icon: 'sun'},
];

const S2: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  return (
    <Content>
      <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between'}}>
        <Reveal delay={4}>
          <Kicker color={C.coralDeep}>第三步 / 不要做的事</Kicker>
          <Title size={62} style={{marginTop: 8}}>这些动作，不要做</Title>
        </Reveal>
        <Tag color={C.white} rotate={-1}>保护，不控制</Tag>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 146, display: 'flex', gap: 18}}>
        {DONT.map((d, i) => {
          const p = springIn(frame, T(0.8 + i * 0.9), 150, 14);
          return (
            <div key={d.title} style={{flex: 1, height: 300, borderRadius: 22, background: C.white, border: '2px solid rgba(28,43,58,0.12)', boxShadow: '0 8px 0 rgba(28,43,58,0.06)', padding: '24px 22px', opacity: Math.min(1, p * 2), transform: `translateY(${(1 - p) * 20}px)`, position: 'relative', overflow: 'hidden'}}>
              <div style={{position: 'absolute', right: 16, top: 14, width: 48, height: 48, borderRadius: 24, background: C.coral, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <svg width="26" height="26" viewBox="0 0 26 26"><path d="M6 6 20 20M20 6 6 20" stroke={C.white} strokeWidth="4" strokeLinecap="round" /></svg>
              </div>
              <div style={{width: 72, height: 72, borderRadius: 20, background: TONES.peach.soft, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Glyph name={d.icon} size={42} color={C.coral} />
              </div>
              <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 34, color: INK, marginTop: 18}}>{d.title}</div>
              <div style={{fontFamily: '"Noto Sans SC"', fontSize: 18, color: INK_SOFT, marginTop: 6}}>{d.sub}</div>
            </div>
          );
        })}
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 470, display: 'flex', gap: 18}}>
        <div style={{flex: 1.35, height: 130, borderRadius: 20, background: C.coral, color: C.white, display: 'flex', alignItems: 'center', gap: 20, padding: '0 26px'}}>
          <Glyph name="shield" size={42} color={C.white} />
          <div>
            <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 28}}>抽搐时，也不要去做心肺复苏</div>
            <div style={{fontFamily: '"Noto Sans SC"', fontSize: 17, marginTop: 4, opacity: 0.9}}>抽搐停止后仍无呼吸，才需要心肺复苏。</div>
          </div>
        </div>
        <div style={{flex: 0.65, height: 130, borderRadius: 20, background: C.mustardSoft, display: 'flex', alignItems: 'center', gap: 16, padding: '0 24px'}}>
          <div style={{fontFamily: 'Georgia, serif', fontSize: 54, color: C.mustardDeep}}>≠</div>
          <div style={{fontFamily: '"Noto Sans SC"', fontSize: 18, lineHeight: 1.5, color: INK}}>
            他不会把舌头吞下去；
            <br />
            强行撬嘴反而危险。
          </div>
        </div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center'}}>
        <Tag color={C.white} rotate={-1}>不要为了“做点什么”，增加新的风险</Tag>
      </div>
    </Content>
  );
};

const S3: React.FC = () => (
  <Content>
    <div style={{position: 'absolute', left: 0, top: 18, width: 620}}>
      <Reveal delay={4}>
        <Kicker color={C.tealDeep}>发作后 / 恢复体位</Kicker>
        <Title size={76} style={{marginTop: 16}}>
          侧卧
          <br />
          陪伴
        </Title>
      </Reveal>
      <Body size={26} style={{marginTop: 20, width: 560}}>
        抽搐停止后，把他轻轻翻向一侧，让口水流出来。陪着他，直到完全清醒。
      </Body>
      <div style={{marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10}}>
        {[
          {n: '1', text: '轻轻翻向一侧'},
          {n: '2', text: '让口水流出来'},
          {n: '3', text: '陪着他，直到完全清醒'},
        ].map((s) => (
          <div key={s.n} style={{display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', borderRadius: 14, background: C.white, border: '2px solid rgba(28,43,58,0.1)'}}>
            <NumBadge n={s.n} color={C.teal} size={38} />
            <span style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 20, color: INK}}>{s.text}</span>
          </div>
        ))}
      </div>
      <div style={{marginTop: 18}}>
        <Tag color={C.coral} fg={C.white} rotate={-1}>不要在他清醒前喂水喂药</Tag>
      </div>
    </div>
    <div style={{position: 'absolute', right: 0, top: 10, width: 960, height: 650}}>
      <Card bg={C.white} padding={0} style={{width: '100%', height: '100%', overflow: 'hidden'}}>
        <div style={{height: 74, background: TONES.mint.soft, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px'}}>
          <span style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 21, color: INK}}>侧卧 · 头略后仰 · 让口水流出</span>
          <Tag color={C.white} rotate={1}>示意</Tag>
        </div>
        <div style={{position: 'relative', height: 576, background: TONES.cream.bg, overflow: 'hidden'}}>
          <div style={{position: 'absolute', left: 50, top: 120, width: 840, height: 380, borderRadius: 30, background: C.white, border: '2px solid rgba(28,43,58,0.1)'}} />
          <div style={{position: 'absolute', left: 80, top: 180, width: 680}}>
            <RecoveryFigure width={680} />
          </div>
          <div style={{position: 'absolute', left: 70, top: 90, opacity: 0.9}}>
            <Tag color={C.tealSoft} rotate={-2}>头偏向一侧</Tag>
          </div>
          <div style={{position: 'absolute', right: 80, top: 120, width: 100, height: 100, borderRadius: 50, background: C.white, border: '2px solid rgba(28,43,58,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Glyph name="clock" size={54} color={C.tealDeep} />
          </div>
          <div style={{position: 'absolute', right: 66, top: 230, fontFamily: '"Noto Sans SC"', fontSize: 16, color: INK_SOFT}}>陪着他</div>
        </div>
      </Card>
    </div>
  </Content>
);

const CONDITIONS = [
  {icon: 'clock', text: '超过 5 分钟'},
  {icon: 'eeg', text: '一次接一次'},
  {icon: 'heart', text: '呼吸困难 / 叫不醒'},
  {icon: 'drop', text: '发作时受伤'},
  {icon: 'swim', text: '发生在水里'},
  {icon: 'person', text: '第一次发作'},
  {icon: 'pregnancy', text: '怀孕'},
  {icon: 'pill', text: '糖尿病 + 意识丧失'},
];

const S4: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 18, width: 600}}>
        <Reveal delay={4}>
          <Kicker color={C.coralDeep}>急救 / 何时拨打 120</Kicker>
          <Title size={72} style={{marginTop: 16}}>
            什么时候
            <br />
            必须叫救护车？
          </Title>
        </Reveal>
        <div style={{marginTop: 30, width: 470, height: 360, borderRadius: 30, background: C.coral, color: C.white, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 0 rgba(28,43,58,0.1)'}}>
          <Glyph name="phone" size={84} color={C.white} />
          <div style={{fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 110, lineHeight: 1, marginTop: 8}}>120</div>
          <div style={{fontFamily: '"Noto Sans SC"', fontSize: 22, letterSpacing: 3, marginTop: 4}}>立即呼叫急救</div>
        </div>
      </div>
      <div style={{position: 'absolute', right: 0, top: 30, width: 980, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14}}>
        {CONDITIONS.map((c, i) => {
          const p = springIn(frame, T(0.7 + i * 0.55), 150, 14);
          return (
            <div key={c.text} style={{display: 'flex', alignItems: 'center', gap: 16, padding: '14px 22px', borderRadius: 16, background: C.white, border: '2px solid rgba(28,43,58,0.1)', opacity: Math.min(1, p * 2), transform: `translateX(${(1 - p) * 20}px)`}}>
              <div style={{width: 50, height: 50, borderRadius: 15, background: TONES.peach.soft, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Glyph name={c.icon} size={28} color={C.coralDeep} />
              </div>
              <span style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 21, color: INK}}>{c.text}</span>
              <div style={{marginLeft: 'auto', width: 26, height: 26, borderRadius: 13, background: C.coralSoft, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <span style={{fontFamily: 'Georgia, serif', fontSize: 18, color: C.coralDeep}}>!</span>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{position: 'absolute', right: 0, bottom: 0}}>
        <Tag color={C.mustard} rotate={-1}>拿不准时，宁可拨打</Tag>
      </div>
    </Content>
  );
};

const S5: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Content>
      <div style={{position: 'absolute', left: 0, top: 22, width: 760}}>
        <Reveal delay={4}>
          <Kicker color={C.coralDeep}>最后一步 / 没有呼吸</Kicker>
          <Title size={64} style={{marginTop: 14}}>
            抽搐停止后
            <br />
            仍然没有呼吸
          </Title>
        </Reveal>
        <div style={{display: 'flex', gap: 16, marginTop: 26}}>
          <Card bg={C.white} padding={22} style={{flex: 1}}>
            <Glyph name="phone" size={38} color={C.coral} />
            <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 28, color: INK, marginTop: 10}}>立即呼叫急救</div>
            <div style={{fontFamily: '"Noto Sans SC"', fontSize: 17, color: INK_SOFT, marginTop: 6}}>开免提，按调度员指示做。</div>
          </Card>
          <Card bg={C.white} padding={22} style={{flex: 1}}>
            <Glyph name="heart" size={38} color={C.coral} />
            <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 28, color: INK, marginTop: 10}}>开始心肺复苏</div>
            <div style={{fontFamily: '"Noto Sans SC"', fontSize: 17, color: INK_SOFT, marginTop: 6}}>只在他没有呼吸时。</div>
          </Card>
        </div>
        <div style={{marginTop: 22, padding: '16px 20px', borderRadius: 14, background: C.mustardSoft, fontFamily: '"Noto Sans SC"', fontSize: 18, color: INK}}>
          抽搐时不做心肺复苏；抽搐停止、仍无呼吸，才做。
        </div>
      </div>
      <div style={{position: 'absolute', right: 0, top: 40, width: 780, height: 520}}>
        <Card bg={C.white} padding={0} style={{width: '100%', height: '100%', overflow: 'hidden'}}>
          <div style={{height: 74, background: TONES.peach.soft, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 26px'}}>
            <span style={{fontFamily: '"Noto Sans SC"', fontWeight: 700, fontSize: 21, color: INK}}>保护，不控制</span>
            <Tag color={C.white} rotate={1}>示意</Tag>
          </div>
          <div style={{position: 'relative', height: 446, background: TONES.cream.bg, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <svg width="500" height="420" viewBox="0 0 500 420">
              <circle cx="250" cy="100" r="52" fill={C.skin} />
              <path d="M202 98c0-34 22-52 50-52 30 0 48 20 48 48-20-2-36-12-44-28-10 20-30 30-54 28v4Z" fill="#25313E" />
              <path d="M190 160c0-26 26-44 60-44s60 18 60 44v110H190V160Z" fill={C.teal} />
              <path d="M190 238h120v110c0 26-18 44-60 44s-60-18-60-44V238Z" fill={C.teal} opacity="0.85" />
              <path d="M224 276h52" stroke={C.tealDeep} strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M232 208c10 16 10 30 0 42M268 208c10 16 10 30 0 42" stroke={C.skin} strokeWidth="20" strokeLinecap="round" fill="none" />
              <path d="M206 250c-24 10-38 22-44 40M294 250c24 10 38 22 44 40" stroke={C.skin} strokeWidth="18" strokeLinecap="round" fill="none" />
              <rect x="224" y="360" width="52" height="36" rx="14" fill={C.blue} />
              <text x="250" y="384" textAnchor="middle" fontFamily="'Noto Sans SC'" fontWeight="700" fontSize="16" fill={C.white}>CPR</text>
            </svg>
            <div style={{position: 'absolute', left: 24, top: 20}}>
              <Tag color={C.coralSoft} rotate={-2}>双手按压胸骨</Tag>
            </div>
            <div style={{position: 'absolute', right: 24, bottom: 20}}>
              <Tag color={C.white} rotate={1}>等急救人员到达</Tag>
            </div>
          </div>
        </Card>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: '20px 28px', borderRadius: 16, background: C.coral, color: C.white, opacity: Math.min(1, frame / 30)}}>
        <div style={{fontFamily: '"Noto Serif SC"', fontWeight: 900, fontSize: 28}}>你不需要“止住”发作。</div>
        <div style={{fontFamily: '"Noto Sans SC"', fontSize: 19, marginTop: 6, opacity: 0.95}}>你能做的，是让他在最危险的几分钟里，不受到额外的伤害。</div>
      </div>
    </Content>
  );
};

export const Ch07: React.FC = () => (
  <MGFrame chapter={chapter} accent={C.coral}>
    <Scene from={0} to={11.04} tone="sky">
      <S0 />
    </Scene>
    <Scene from={11.04} to={26.04} tone="mint">
      <S1 />
    </Scene>
    <Scene from={26.04} to={51.22} tone="peach">
      <S2 />
    </Scene>
    <Scene from={51.22} to={61.04} tone="mint">
      <S3 />
    </Scene>
    <Scene from={61.04} to={76.04} tone="cream">
      <S4 />
    </Scene>
    <Scene from={76.04} to={90.227} tone="peach">
      <S5 />
    </Scene>
  </MGFrame>
);
