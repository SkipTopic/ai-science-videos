import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {
  BrowserFrame,
  CorporateTimeline,
  Enterbrain2001Page,
} from '../archive';
import {Reconstruction} from '../components';
import {GameConsole} from '../objects';
import {C, FPS, PIXEL, SANS, SERIF, clamp, hash} from '../theme';

export const EnterbrainArchive: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  let highlight = -1;
  if (t >= 7.4 && t < 13.0) highlight = 0;
  else if (t >= 13.0 && t < 16.8) highlight = 3;
  else if (t >= 16.8 && t < 20.3) highlight = 4;
  else if (t >= 24.4 && t < 28.4) highlight = 2;
  const scroll = interpolate(t, [0, 20], [0, 120], clamp);
  const dim = interpolate(t, [27.5, 28.8], [0, 0.78], clamp);
  const one = interpolate(t, [28.2, 29.0], [0, 1], clamp);
  const notTool = interpolate(t, [31.2, 32.0], [0, 1], clamp);
  const media = interpolate(t, [34.5, 35.3], [0, 1], clamp);
  return (
    <div style={{position: 'absolute', inset: 0, background: '#090a0c', overflow: 'hidden'}}>
      <BrowserFrame
        title="Internet Explorer"
        url="http://www.enterbrain.co.jp/"
        left={150}
        top={74}
        width={1620}
        height={930}
        scroll={scroll}
        pageHeight={1700}
        status="Enterbrain / 2001.11.30"
      >
        <Enterbrain2001Page highlight={highlight} />
      </BrowserFrame>
      <div style={{position: 'absolute', inset: 0, background: `rgba(4,5,7,${dim})`}} />
      <div style={{position: 'absolute', left: 150, top: 210, width: 900}}>
        <div style={{fontFamily: PIXEL, fontSize: 12, letterSpacing: 2, color: 'rgba(217,178,95,0.65)'}}>
          ENTERBRAIN / 2001.11.30
        </div>
        <div style={{marginTop: 24, fontFamily: SERIF, fontWeight: 900, fontSize: 82, lineHeight: 1.45, color: C.cream, opacity: one, textShadow: '0 6px 30px rgba(0,0,0,0.75)'}}>
          RPG Maker
          <br />
          只是货架上的一格。
        </div>
        <div style={{marginTop: 20, fontFamily: SERIF, fontWeight: 700, fontSize: 46, lineHeight: 1.5, color: 'rgba(236,231,218,0.7)', opacity: notTool}}>
          这家公司，从来就不是
          <br />
          “做游戏工具的”。
        </div>
        <div style={{marginTop: 18, fontFamily: SERIF, fontWeight: 900, fontSize: 96, color: '#d9b25f', opacity: media}}>
          它是一个媒体集团。
        </div>
      </div>
      <div style={{position: 'absolute', right: 90, bottom: 60, fontFamily: SANS, fontSize: 16, letterSpacing: 3, color: 'rgba(236,231,218,0.35)'}}>
        2001 / enterbrain 首页 / 复原页面
      </div>
    </div>
  );
};

export const CorporateBeat: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const entries = [
    {year: '1991', name: '两位创始人辞职'},
    {year: '1992', name: '负债，股价崩盘'},
    {year: '1997', name: '卖给世嘉的母公司 CSK'},
    {year: '2000', name: '拆出 enterbrain'},
    {year: '2002', name: 'ASCII 改名 MediaLeaves'},
    {year: '2004', name: '进入角川'},
    {year: '2013', name: 'enterbrain 并入 KADOKAWA'},
  ];
  const gone = interpolate(t, [24.4, 25.4], [0, 1], clamp);
  const logo = interpolate(t, [28.1, 29.2], [0, 1], clamp);
  const listOut = interpolate(t, [23.9, 25.2], [0, 1], clamp);
  return (
    <div style={{position: 'absolute', inset: 0, background: '#050607', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 42% 46%, rgba(42,46,54,0.4), rgba(5,6,7,1) 70%)'}} />
      <div style={{position: 'absolute', left: 120, top: 90}}>
        <div style={{fontFamily: PIXEL, fontSize: 12, letterSpacing: 2, color: 'rgba(236,231,218,0.32)'}}>
          THE COMPANY / 1991 — 2013
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 1 - listOut * 0.88,
          transform: `translateY(${listOut * -30}px)`,
        }}
      >
        <CorporateTimeline entries={entries} startAt={3.5} interval={3.3} strikeStart={3.95} />
      </div>
      <div
        style={{
          position: 'absolute',
          right: 180,
          top: '46%',
          transform: `translateY(-50%) scale(${0.94 + logo * 0.06})`,
          opacity: logo,
          textAlign: 'center',
        }}
      >
        <div style={{fontFamily: PIXEL, fontSize: 16, letterSpacing: 4, color: 'rgba(217,178,95,0.6)'}}>
          SOFTWARE / STILL HERE
        </div>
        <div style={{marginTop: 18, fontFamily: SERIF, fontWeight: 900, fontSize: 78, color: C.cream, lineHeight: 1.2, letterSpacing: 2}}>
          RPG
          <br />
          MAKER
        </div>
        <div style={{marginTop: 18, width: 240, height: 2, background: C.red, marginLeft: 'auto', marginRight: 'auto', opacity: 0.7}} />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 160,
          bottom: 150,
          fontFamily: SERIF,
          fontWeight: 900,
          fontSize: 54,
          color: 'rgba(236,231,218,0.82)',
          opacity: gone,
        }}
      >
        1977 年那家公司，没有了。
        <div style={{marginTop: 12, color: '#d9b25f', opacity: logo}}>但是软件还在。</div>
      </div>
    </div>
  );
};

export const GGGIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  return (
    <div style={{position: 'absolute', inset: 0, background: '#06080b', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 42%, rgba(80,110,140,0.22), rgba(5,7,10,1) 68%)'}} />
      <svg width="100%" height="100%" viewBox="0 0 1920 1080" style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 7}, (_, index) => (
          <g key={index}>
            <rect x={110 + index * 260} y={680} width={170} height={20} fill="#1a232c" />
            <rect x={124 + index * 260} y={700} width={8} height={120} fill="#111820" />
            <rect x={250 + index * 260} y={700} width={8} height={120} fill="#111820" />
            <rect x={140 + index * 260} y={640} width={42} height={34} fill="#233442" opacity="0.7" />
          </g>
        ))}
        <g fill="#0e141b">
          <rect x="0" y="0" width="1920" height="160" />
          <rect x="0" y="900" width="1920" height="180" />
          <rect x="60" y="200" width="260" height="420" />
          <rect x="1600" y="220" width="260" height="380" />
        </g>
        {Array.from({length: 5}, (_, index) => (
          <line key={index} x1={200 + index * 330} y1={120} x2={200 + index * 330} y2={640} stroke="rgba(120,160,190,0.08)" strokeWidth="1" />
        ))}
      </svg>
      <div style={{position: 'absolute', left: 120, top: 110}}>
        <div style={{fontFamily: PIXEL, fontSize: 13, letterSpacing: 2, color: 'rgba(190,210,230,0.5)'}}>
          KADOKAWA / 2020.09
        </div>
        <div style={{marginTop: 20, fontFamily: SERIF, fontWeight: 900, fontSize: 120, letterSpacing: 3, lineHeight: 1.2, color: C.cream}}>
          Gotcha
          <br />
          Gotcha Games
        </div>
        <div style={{marginTop: 26, fontFamily: SANS, fontSize: 24, letterSpacing: 2, color: 'rgba(236,231,218,0.55)'}}>
          它接手了 RPG Maker。
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          right: 150,
          bottom: 180,
          fontFamily: PIXEL,
          fontSize: 16,
          letterSpacing: 3,
          color: 'rgba(217,178,95,0.7)',
          opacity: interpolate(t, [2.6, 3.4], [0, 1], clamp),
        }}
      >
        RPG MAKER →
      </div>
    </div>
  );
};

export const HandheldLineup: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const ds = interpolate(t, [0.8, 1.8], [0, 1], clamp);
  const fes = interpolate(t, [4.2, 5.2], [0, 1], clamp);
  const modern = interpolate(t, [8.4, 9.4], [0, 1], clamp);
  const withIn = interpolate(t, [14.0, 15.2], [0, 1], clamp);
  const fesOut = interpolate(t, [12.4, 13.2], [1, 0], clamp);
  const together = interpolate(t, [22.0, 23.0], [0, 1], clamp);
  return (
    <div style={{position: 'absolute', inset: 0, background: '#07090b', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 38%, rgba(96,116,140,0.24), rgba(7,9,11,1) 70%)'}} />
      <div style={{position: 'absolute', left: 110, top: 90}}>
        <div style={{fontFamily: PIXEL, fontSize: 13, letterSpacing: 2, color: 'rgba(236,231,218,0.35)'}}>
          THE OTHER BATTLEFIELD / 2010 — 2025
        </div>
        <div style={{marginTop: 14, fontFamily: SERIF, fontWeight: 900, fontSize: 64, color: C.cream}}>
          掌机线，一直没停。
        </div>
      </div>
      <div style={{position: 'absolute', left: 120, top: 480, width: 250, opacity: ds}}>
        <GameConsole kind="ds" left={0} top={0} scale={0.95} />
        <div style={{position: 'absolute', left: 0, top: 322, fontFamily: SANS, fontSize: 16, letterSpacing: 2, color: 'rgba(236,231,218,0.6)'}}>
          RPG ツクール DS / 2010
        </div>
      </div>
      <div style={{position: 'absolute', left: 410, top: 480, width: 250, opacity: ds}}>
        <GameConsole kind="3ds" left={0} top={0} scale={0.95} />
        <div style={{position: 'absolute', left: 0, top: 322, fontFamily: SANS, fontSize: 16, letterSpacing: 2, color: 'rgba(236,231,218,0.6)'}}>
          RPG Maker Fes / 2016
        </div>
      </div>
      <div style={{position: 'absolute', left: 700, top: 650, width: 340, opacity: modern}}>
        <GameConsole kind="switch" left={0} top={0} scale={1.0} />
        <div style={{position: 'absolute', left: 0, top: 170, fontFamily: SANS, fontSize: 16, letterSpacing: 2, color: 'rgba(236,231,218,0.6)'}}>
          RPG Maker With / 2024
        </div>
      </div>
      <div style={{position: 'absolute', left: 1110, top: 420, width: 170, opacity: modern}}>
        <GameConsole kind="ps5" left={0} top={0} scale={1.0} />
        <div style={{position: 'absolute', left: 0, top: 432, fontFamily: SANS, fontSize: 16, letterSpacing: 2, color: 'rgba(236,231,218,0.6)'}}>
          PS4 / PS5 / 2025
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 120,
          top: 266,
          opacity: fes * fesOut,
        }}
      >
        <div style={{fontFamily: SERIF, fontWeight: 900, fontSize: 40, color: C.cream}}>
          Fes：做完，可以上传。
        </div>
        <div style={{marginTop: 14, display: 'flex', alignItems: 'center', gap: 16, fontFamily: PIXEL, fontSize: 13, color: 'rgba(217,178,95,0.8)'}}>
          <span>UPLOAD</span>
          <span style={{fontFamily: SANS, fontSize: 26}}>→</span>
          <span>DOWNLOAD</span>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          right: 100,
          top: 120,
          width: 520,
          padding: '28px 34px',
          background: 'rgba(10,13,17,0.86)',
          border: '1px solid rgba(217,178,95,0.22)',
          opacity: withIn,
        }}
      >
        <div style={{fontFamily: PIXEL, fontSize: 11, letterSpacing: 2, color: 'rgba(217,178,95,0.7)'}}>
          RPG MAKER WITH
        </div>
        <div style={{marginTop: 14, fontFamily: SERIF, fontWeight: 900, fontSize: 74, color: C.cream, lineHeight: 1.2}}>
          WITH
        </div>
        <div style={{marginTop: 10, fontFamily: SANS, fontSize: 19, letterSpacing: 2, color: 'rgba(236,231,218,0.58)'}}>
          是“和”的意思。
          <br />
          这一次，它想让你和别人一起做。
        </div>
        <div style={{marginTop: 22, position: 'relative', height: 120, border: '1px solid rgba(236,231,218,0.12)'}}>
          <div style={{position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(120,150,130,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(120,150,130,0.08) 1px, transparent 1px)', backgroundSize: '24px 24px'}} />
          <div style={{position: 'absolute', left: 150, top: 40, width: 16, height: 22, background: '#4a7fb5'}} />
          <div style={{position: 'absolute', left: 390, top: 60, width: 16, height: 22, background: '#b35a4a'}} />
          <div style={{position: 'absolute', left: 166, top: 48, width: 224, height: 1, background: 'rgba(217,178,95,0.6)', opacity: together}} />
        </div>
      </div>
      <Reconstruction text="主机与包装复原示意" />
    </div>
  );
};
