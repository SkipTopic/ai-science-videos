import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {
  BrowserFrame,
  ForumPost2004,
  GameStoreShelf,
  NetworkMap,
  SplitPanels,
} from '../archive';
import {Caption, Reconstruction} from '../components';
import {
  DreamBedroom,
  DreamCorridor,
  DreamForest,
  DreamRedRoom,
  DreamSnow,
  DreamStairs,
  IbGallery,
  OmoriWhite,
  ToTheMoon,
  WitchCorridor,
  Balcony,
} from '../pixel';
import {DiscCase, SoftwareBox} from '../objects';
import {C, FPS, PIXEL, SANS, SERIF, clamp, hash} from '../theme';

const rm2000Palette = {bg: '#1a2c52', ink: '#ece7da', accent: '#d9b25f'};

const DormRoom: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  return (
    <div style={{position: 'absolute', inset: 0, background: '#080c13', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 62% 38%, rgba(88,120,150,0.22), rgba(6,9,14,1) 68%)'}} />
      <svg width="100%" height="100%" viewBox="0 0 960 1080" preserveAspectRatio="xMidYMid slice" style={{position: 'absolute', inset: 0}}>
        <rect width="960" height="1080" fill="#080c13" />
        <rect x="600" y="120" width="270" height="360" fill="#12202c" stroke="#2a3b48" strokeWidth="2" />
        <rect x="620" y="140" width="230" height="320" fill="#1c3342" />
        {Array.from({length: 42}, (_, index) => (
          <circle
            key={index}
            cx={630 + hash(index * 3) * 210}
            cy={150 + hash(index * 7) * 300}
            r={1 + hash(index * 11) * 2}
            fill="#d8e2e8"
            opacity={0.18 + hash(index * 13) * 0.5}
          />
        ))}
        <rect x="120" y="640" width="720" height="26" fill="#1c232a" />
        <rect x="160" y="666" width="40" height="180" fill="#161c22" />
        <rect x="760" y="666" width="40" height="180" fill="#161c22" />
        <rect x="330" y="480" width="300" height="160" fill="#202830" stroke="#3a4650" strokeWidth="2" />
        <rect x="348" y="496" width="264" height="126" fill="#2e4c5a" opacity={0.55} />
        <text x="480" y="560" textAnchor="middle" fontFamily="monospace" fontSize="26" fill="#b8d0d8" opacity="0.6">
          RPG MAKER 2000
        </text>
        <g fill="#05080b">
          <circle cx="270" cy="420" r="42" />
          <path d="M200 466 Q240 448 270 448 Q308 448 342 466 L370 700 L170 700 Z" />
        </g>
        <g fill="#0c1117">
          <rect x="80" y="240" width="170" height="220" />
          <rect x="100" y="260" width="130" height="180" fill="#18232c" />
        </g>
      </svg>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 240, background: 'linear-gradient(to top, rgba(4,6,9,1), rgba(4,6,9,0))'}} />
      <div style={{position: 'absolute', left: 60, top: 74, fontFamily: SANS, fontSize: 18, letterSpacing: 4, color: 'rgba(200,220,230,0.4)'}}>
        RUSSIA / 2000 / A STUDENT ROOM
      </div>
    </div>
  );
};

export const TwoThings2000: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  return (
    <SplitPanels
      leftLabel="JAPAN / 2000.03.17"
      rightLabel="RUSSIA / 2000"
      left={
        <div style={{position: 'absolute', inset: 0, background: '#08090c'}}>
          <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 44% 46%, rgba(94,112,142,0.25), rgba(7,8,10,1) 68%)'}} />
          <div style={{position: 'absolute', left: 80, top: 150, width: 620, height: 760}}>
            <SoftwareBox
              left={0}
              top={0}
              width={520}
              height={700}
              title={'RPG\nMAKER\n2000'}
              subtitle="WINDOWS 95 / 98"
              year="2000.03.17"
              platform="ASCII"
              palette={rm2000Palette}
              art="map"
              rotate={-2}
              label="包装复原"
            />
          </div>
          <div style={{position: 'absolute', left: 84, bottom: 100, fontFamily: SERIF, fontWeight: 900, fontSize: 44, color: C.cream}}>
            第一件：
            <br />
            它在日本发售。
          </div>
          <div style={{position: 'absolute', left: 84, top: 88, fontFamily: PIXEL, fontSize: 13, letterSpacing: 2, color: 'rgba(236,231,218,0.35)'}}>
            RPG MAKER 2000
          </div>
        </div>
      }
      right={
        <div style={{position: 'absolute', inset: 0}}>
          <DormRoom />
          <div style={{position: 'absolute', left: 60, bottom: 100, fontFamily: SERIF, fontWeight: 900, fontSize: 44, color: '#dfe8ee', textShadow: '0 6px 30px rgba(0,0,0,0.7)'}}>
            第二件：
            <br />
            一个学生把它翻了。
          </div>
        </div>
      }
    />
  );
};

export const DonMiguel: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const letter = interpolate(t, [4.6, 5.8], [0, 1], clamp);
  const stamp = interpolate(t, [5.4, 6.2], [0, 1], clamp);
  const closed = interpolate(t, [5.2, 6.0], [0, 1], clamp);
  const leaked = interpolate(t, [8.9, 9.7], [0, 1], clamp);
  return (
    <div style={{position: 'absolute', inset: 0, background: '#0c0a08', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 38% 38%, rgba(196,155,100,0.2), rgba(8,7,6,1) 68%)'}} />
      <div style={{position: 'absolute', left: 120, top: 140, width: 600, height: 720, background: '#d9ccb4', transform: 'rotate(-2deg)', boxShadow: '0 34px 70px rgba(0,0,0,0.5)', padding: '34px 38px', boxSizing: 'border-box'}}>
        <div style={{fontFamily: SANS, fontSize: 16, letterSpacing: 4, color: 'rgba(30,24,18,0.45)'}}>
          DON MIGUEL / 2000
        </div>
        <div style={{marginTop: 20, display: 'flex', gap: 26}}>
          <div style={{width: 170, height: 220, background: 'linear-gradient(155deg,#7c7161,#39342c)', position: 'relative', overflow: 'hidden'}}>
            <div style={{position: 'absolute', left: 48, top: 44, width: 74, height: 86, borderRadius: '50%', background: '#1c1915', opacity: 0.7}} />
            <div style={{position: 'absolute', left: 26, top: 130, width: 118, height: 90, background: '#1c1915', opacity: 0.75}} />
          </div>
          <div style={{flex: 1}}>
            <div style={{fontFamily: SERIF, fontWeight: 900, fontSize: 52, color: '#221d17', lineHeight: 1.2}}>
              Don Miguel
            </div>
            <div style={{marginTop: 14, fontFamily: SANS, fontSize: 17, lineHeight: 2, color: 'rgba(34,29,23,0.62)'}}>
              翻译了 RPG Maker 2000
              <br />
              免费传到网上
              <br />
              没有得到授权
            </div>
          </div>
        </div>
        <div style={{marginTop: 26, fontFamily: SANS, fontSize: 15, lineHeight: 1.9, color: 'rgba(34,29,23,0.55)'}}>
          档案 001 / 一个非官方的英文版
          <br />
          文件在俄罗斯、北美、欧洲的论坛之间流传。
        </div>
        <div style={{marginTop: 24, borderTop: '1px solid rgba(34,29,23,0.24)', paddingTop: 16, fontFamily: 'monospace', fontSize: 13, color: 'rgba(34,29,23,0.5)'}}>
          RPGMaker2000_English.zip / 22.4 MB
        </div>
        <div style={{position: 'absolute', right: 38, bottom: 52, padding: '10px 16px', border: '3px solid rgba(143,47,42,0.5)', color: 'rgba(143,47,42,0.62)', fontFamily: PIXEL, fontSize: 13, letterSpacing: 2, transform: 'rotate(-7deg)'}}>
          UNAUTHORIZED
          <div style={{marginTop: 6, fontFamily: SANS, fontSize: 16, letterSpacing: 4}}>非官方版本</div>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          right: 130,
          top: 260,
          width: 620,
          background: '#efe6d2',
          border: '1px solid rgba(34,29,23,0.3)',
          boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
          transform: `rotate(2deg) translateY(${(1 - letter) * 30}px)`,
          opacity: letter,
          padding: '34px 38px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{fontFamily: PIXEL, fontSize: 10, letterSpacing: 2, color: '#8f2f2a'}}>
          ASCII CORPORATION / LEGAL
        </div>
        <div style={{marginTop: 20, fontFamily: SERIF, fontWeight: 900, fontSize: 40, color: '#241f18', lineHeight: 1.4}}>
          律师函
        </div>
        <div style={{marginTop: 16, fontFamily: SANS, fontSize: 17, lineHeight: 2, color: 'rgba(36,31,24,0.65)'}}>
          要求立即停止分发
          <br />
          并关闭相关网站。
        </div>
        <div
          style={{
            marginTop: 30,
            display: 'inline-block',
            padding: '10px 20px',
            border: '3px solid #8f2f2a',
            color: '#8f2f2a',
            fontFamily: SERIF,
            fontWeight: 900,
            fontSize: 26,
            letterSpacing: 4,
            transform: 'rotate(-7deg)',
            opacity: stamp,
          }}
        >
          CEASE &amp; DESIST
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          right: 150,
          bottom: 220,
          fontFamily: SERIF,
          fontWeight: 900,
          fontSize: 48,
          color: '#f0e4d2',
          textAlign: 'right',
          lineHeight: 1.5,
        }}
      >
        <span style={{opacity: closed}}>他关了网站。</span>
        <br />
        <span style={{opacity: leaked}}>但文件已经传出去了。</span>
      </div>
      <Reconstruction text="人物页与信件为复原示意" />
      <Caption>Don Miguel / 非官方英文版 / 2000</Caption>
    </div>
  );
};

export const AgetecShelf: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const box = interpolate(t, [0.4, 1.4], [0, 1], clamp);
  return (
    <div style={{position: 'absolute', inset: 0, background: '#0a0a0b'}}>
      <GameStoreShelf />
      <div style={{position: 'absolute', inset: 0, background: 'rgba(5,5,6,0.28)'}} />
      <div style={{position: 'absolute', left: 100, top: 100}}>
        <div style={{fontFamily: PIXEL, fontSize: 13, letterSpacing: 2, color: 'rgba(236,231,218,0.45)'}}>
          NORTH AMERICA / 2000.10.02
        </div>
        <div style={{marginTop: 18, fontFamily: SERIF, fontWeight: 900, fontSize: 76, color: C.cream, lineHeight: 1.3}}>
          电视上的
          <br />
          第一个官方英文版。
        </div>
        <div style={{marginTop: 22, fontFamily: SANS, fontSize: 21, letterSpacing: 2, color: 'rgba(236,231,218,0.55)'}}>
          Agetec / PlayStation / 2000
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          right: 150,
          bottom: 110,
          width: 430,
          border: '1px solid rgba(236,231,218,0.24)',
          background: 'rgba(8,8,10,0.78)',
          padding: '22px 26px',
          opacity: box,
        }}
      >
        <div style={{fontFamily: PIXEL, fontSize: 10, color: '#d9b25f', letterSpacing: 2}}>RPG MAKER / PS1</div>
        <div style={{marginTop: 10, fontFamily: SERIF, fontWeight: 900, fontSize: 42, color: C.cream}}>
          比 PC 官方英文版
          <br />
          早了五年。
        </div>
      </div>
    </div>
  );
};

export const PirateVsOfficial: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  return (
    <SplitPanels
      leftLabel="THE PIRATE / PC"
      rightLabel="THE OFFICIAL / PLAYSTATION"
      left={
        <div style={{position: 'absolute', inset: 0, background: '#0c0b09'}}>
          <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 44% 44%, rgba(120,140,110,0.14), rgba(8,8,7,1) 68%)'}} />
          <div style={{position: 'absolute', left: 120, top: 250, width: 540, height: 420, border: '1px solid rgba(190,210,190,0.25)', background: 'rgba(15,24,16,0.7)', padding: 34, boxSizing: 'border-box'}}>
            <div style={{fontFamily: 'monospace', fontSize: 22, color: 'rgba(170,210,170,0.6)'}}>
              RPGMaker2000_English.zip
            </div>
            <div style={{marginTop: 20, fontFamily: SANS, fontSize: 15, color: 'rgba(170,210,170,0.45)', lineHeight: 2}}>
              FILE SIZE 22.4 MB
              <br />
              NO LICENSE
              <br />
              SHARED ON FORUMS
            </div>
            <div style={{marginTop: 30, height: 8, background: 'rgba(170,210,170,0.12)'}}>
              <div style={{width: `${Math.min(1, 0.25 + t * 0.08) * 100}%`, height: '100%', background: '#6fa47a'}} />
            </div>
          </div>
          <div style={{position: 'absolute', left: 124, bottom: 150, fontFamily: SERIF, fontWeight: 900, fontSize: 58, color: '#e6e2d4'}}>
            一个盗版。
          </div>
        </div>
      }
      right={
        <div style={{position: 'absolute', inset: 0, background: '#0a0a0c'}}>
          <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 52% 46%, rgba(140,120,160,0.18), rgba(8,8,10,1) 68%)'}} />
          <div style={{position: 'absolute', left: 220, top: 120}}>
            <DiscCase left={0} top={0} width={330} rotate={-3} title="RPG MAKER" subtitle="AGETEC / 2000" year="PLAYSTATION" />
          </div>
          <div style={{position: 'absolute', left: 90, bottom: 150, fontFamily: SERIF, fontWeight: 900, fontSize: 58, color: '#e6e2d4'}}>
            一个正版。
          </div>
        </div>
      }
    />
  );
};

export const YumePost: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const reveal = interpolate(t, [4.8, 8.2], [0, 1], clamp);
  const dark = interpolate(t, [7.4, 8.4], [0, 0.45], clamp);
  return (
    <div style={{position: 'absolute', inset: 0, background: '#07090a'}}>
      <BrowserFrame
        title="Internet Explorer"
        url="http://www2.2ch.net/dream/"
        left={140}
        top={70}
        width={1640}
        height={940}
        scroll={80}
        pageHeight={1400}
        status={reveal >= 1 ? 'Download complete' : 'Downloading…'}
      >
        <ForumPost2004 reveal={reveal} />
      </BrowserFrame>
      <div style={{position: 'absolute', inset: 0, background: `rgba(0,0,0,${dark})`}} />
      <div
        style={{
          position: 'absolute',
          left: 120,
          top: 105,
          padding: '14px 22px',
          background: 'rgba(5,7,8,0.82)',
          border: '1px solid rgba(236,231,218,0.22)',
          fontFamily: PIXEL,
          fontSize: 12,
          letterSpacing: 2,
          color: 'rgba(220,235,225,0.65)',
          opacity: 1 - dark * 2,
        }}
      >
        2004.06.26 / A FORUM POST / 22.4 MB
      </div>
      {t > 7.2 ? (
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 190, textAlign: 'center', fontFamily: SERIF, fontWeight: 900, fontSize: 50, color: C.cream, opacity: Math.min(1, (t - 7.2) / 0.7)}}>
          一个压缩包。
        </div>
      ) : null}
    </div>
  );
};

export const DreamNoGoal: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const scene = Math.min(3, Math.floor(t / 1.6));
  const statement = interpolate(t, [5.6, 6.4], [0, 1], clamp);
  return (
    <div style={{position: 'absolute', inset: 0, background: '#050607'}}>
      {[
        <DreamSnow key="snow" />,
        <DreamStairs key="stairs" />,
        <DreamForest key="forest" />,
        <DreamRedRoom key="red" />,
      ].map((node, index) => (
        <div key={index} style={{position: 'absolute', inset: 0, opacity: index === scene && t < 6.4 ? 1 : 0}}>
          {node}
        </div>
      ))}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(3,4,5,0.55)',
          opacity: statement,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <div style={{fontFamily: SERIF, fontWeight: 900, fontSize: 62, lineHeight: 1.6, color: C.cream}}>
          没有战斗。没有对话。没有目标。
          <br />
          甚至没有 Game Over。
        </div>
        <div style={{marginTop: 24, fontFamily: SERIF, fontWeight: 600, fontSize: 38, color: 'rgba(236,231,218,0.62)'}}>
          你要做的，只是走。
        </div>
      </div>
    </div>
  );
};

export const CollectThenBalcony: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const balcony = interpolate(t, [4.2, 5.0], [0, 1], clamp);
  const count = Math.min(24, Math.floor(t * 6));
  return (
    <div style={{position: 'absolute', inset: 0, background: '#050607'}}>
      <div style={{position: 'absolute', inset: 0, opacity: 1 - balcony}}>
        <div style={{position: 'absolute', left: 160, top: 120, fontFamily: SANS, fontSize: 20, letterSpacing: 4, color: 'rgba(236,231,218,0.4)'}}>
          EFFECTS / 24
        </div>
        <div style={{position: 'absolute', left: 160, top: 190, display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 22, width: 1200}}>
          {Array.from({length: 24}, (_, index) => (
            <div
              key={index}
              style={{
                height: 150,
                background: index < count ? 'rgba(90,80,120,0.26)' : 'rgba(236,231,218,0.03)',
                border: '1px solid rgba(236,231,218,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: PIXEL,
                fontSize: 13,
                color: index < count ? 'rgba(230,220,240,0.7)' : 'rgba(236,231,218,0.12)',
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </div>
          ))}
        </div>
        <div style={{position: 'absolute', right: 200, bottom: 170, fontFamily: PIXEL, fontSize: 58, color: C.cream}}>
          {String(count).padStart(2, '0')} / 24
        </div>
      </div>
      <div style={{position: 'absolute', inset: 0, opacity: balcony}}>
        <Balcony />
      </div>
    </div>
  );
};

export const YumeTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const page = interpolate(t, [3.8, 5.0], [0, 1], clamp);
  const alive = interpolate(t, [14.6, 15.4], [0, 1], clamp);
  return (
    <div style={{position: 'absolute', inset: 0, background: '#050506', overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 44%, rgba(80,60,96,0.22), rgba(5,5,6,1) 68%)',
          opacity: 1 - page,
        }}
      />
      <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 1 - page}}>
        <div style={{fontFamily: SERIF, fontWeight: 900, fontSize: 120, color: '#e8e1d6', letterSpacing: 10}}>
          梦日记
        </div>
        <div style={{marginTop: 16, fontFamily: PIXEL, fontSize: 18, letterSpacing: 3, color: 'rgba(200,180,210,0.55)'}}>
          YUME NIKKI / 2004
        </div>
        <div style={{marginTop: 34, width: 300, height: 1, background: 'rgba(236,231,218,0.18)'}} />
      </div>
      <div style={{position: 'absolute', inset: 0, background: '#f0eee8', opacity: page}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 72, background: '#e2dfd6', borderBottom: '1px solid #c9c5b8', display: 'flex', alignItems: 'center', padding: '0 40px', justifyContent: 'space-between'}}>
          <div style={{fontFamily: SANS, fontSize: 16, letterSpacing: 3, color: 'rgba(30,30,28,0.55)'}}>
            AUTHOR PAGE / 2004
          </div>
          <div style={{fontFamily: PIXEL, fontSize: 10, color: 'rgba(30,30,28,0.35)'}}>
            YUMENIKKI.NET
          </div>
        </div>
        <div style={{position: 'absolute', left: 160, top: 190, width: 640}}>
          <div style={{display: 'flex', gap: 34, alignItems: 'flex-start'}}>
            <div style={{width: 190, height: 230, background: '#d8d4c9', border: '1px solid #b8b4a8', position: 'relative', overflow: 'hidden'}}>
              <div style={{position: 'absolute', left: 60, top: 50, width: 70, height: 80, borderRadius: '50%', background: '#c2beb2'}} />
              <div style={{position: 'absolute', left: 36, top: 136, width: 118, height: 94, background: '#c2beb2'}} />
              <div style={{position: 'absolute', left: 12, bottom: 10, fontFamily: SANS, fontSize: 12, letterSpacing: 2, color: 'rgba(30,30,28,0.4)'}}>
                写真なし
              </div>
            </div>
            <div>
              <div style={{fontFamily: SERIF, fontWeight: 900, fontSize: 64, color: '#222222'}}>
                Kikiyama
              </div>
              <div style={{marginTop: 16, fontFamily: SANS, fontSize: 17, lineHeight: 2, color: 'rgba(30,30,28,0.6)'}}>
                作者
                <br />
                作品：梦日记
                <br />
                除此之外，空白。
              </div>
            </div>
          </div>
          <div style={{marginTop: 48, borderTop: '1px solid #c9c5b8', paddingTop: 24, fontFamily: SANS, fontSize: 17, lineHeight: 2.2, color: 'rgba(30,30,28,0.68)'}}>
            2004 / 上传了游戏
            <br />
            2004 之后 / 消失
            <br />
            2011 — 2018 / 没有任何回应
            <br />
            <span style={{color: 'rgba(30,30,28,0.5)'}}>地震の噂 / 未确认</span>
          </div>
        </div>
        <div style={{position: 'absolute', right: 160, top: 250, width: 620, transform: `translateY(${(1 - alive) * 20}px)`, opacity: alive}}>
          <div style={{fontFamily: PIXEL, fontSize: 11, letterSpacing: 2, color: '#8f2f2a'}}>
            KADOKAWA / CONFIRMED
          </div>
          <div style={{marginTop: 18, fontFamily: SERIF, fontWeight: 900, fontSize: 54, lineHeight: 1.5, color: '#242424'}}>
            他还活着。
            <br />
            但他没有出来
            <br />
            说过一句话。
          </div>
        </div>
        <div style={{position: 'absolute', right: 60, bottom: 40, fontFamily: SANS, fontSize: 12, letterSpacing: 2, color: 'rgba(30,30,28,0.3)'}}>
          作者页 / 根据公开资料复原
        </div>
      </div>
    </div>
  );
};

export const RPGErase: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const erase = [0.9, 2.7, 4.5];
  const labels = ['Role', 'Playing', 'Game'];
  const recenter = interpolate(t, [3.2, 4.2], [0, -380], clamp);
  return (
    <div style={{position: 'absolute', inset: 0, background: '#050506', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 80, transform: `translateX(${recenter}px)`}}>
        {['R', 'P', 'G'].map((letter, index) => {
          const wipe = interpolate(t, [erase[index], erase[index] + 0.8], [0, 100], clamp);
          return (
            <div key={letter} style={{position: 'relative', width: 300, height: 380, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <div style={{fontFamily: SERIF, fontWeight: 900, fontSize: 330, lineHeight: 1, color: '#e8e2d4'}}>
                {letter}
              </div>
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: `${wipe}%`,
                  height: '100%',
                  background: '#050506',
                  borderRight: wipe > 0 && wipe < 100 ? '3px solid rgba(217,178,95,0.7)' : 'none',
                }}
              />
              <div style={{position: 'absolute', bottom: -10, fontFamily: PIXEL, fontSize: 14, color: 'rgba(236,231,218,0.3)', opacity: 1 - wipe / 100}}>
                {labels[index]}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 180, textAlign: 'center', fontFamily: SANS, fontSize: 20, letterSpacing: 5, color: 'rgba(236,231,218,0.32)'}}>
        ROLE / PLAYING / GAME
      </div>
    </div>
  );
};

export const NexusDoor: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const scale = 1.04 + Math.min(0.08, t * 0.006);
  return (
    <div style={{position: 'absolute', inset: 0, background: '#030304', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${scale})`}}>
        <div style={{width: 300, height: 520, background: '#d8d4c9', position: 'relative', boxShadow: '0 0 120px rgba(220,215,200,0.18)'}}>
          <div style={{position: 'absolute', inset: 22, background: '#0a0a0b'}} />
          <div style={{position: 'absolute', left: '50%', top: '50%', width: 5, height: 5, background: '#c7a36c', transform: 'translate(-50%,-50%)'}} />
        </div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 120, textAlign: 'center', fontFamily: SANS, fontSize: 18, letterSpacing: 5, color: 'rgba(236,231,218,0.25)'}}>
        NEXUS / ONE DOOR
      </div>
    </div>
  );
};

export const TheMoon: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  return (
    <div style={{position: 'absolute', inset: 0, background: '#05070a', overflow: 'hidden'}}>
      <ToTheMoon label="" caption="" />
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(3,5,8,0.9) 0%, rgba(3,5,8,0.55) 30%, rgba(3,5,8,0) 54%)'}} />
      <div style={{position: 'absolute', left: 0, top: 0, right: 0, height: 260, background: 'linear-gradient(180deg, rgba(3,5,8,0.85), rgba(3,5,8,0))'}} />
      <div style={{position: 'absolute', left: 84, top: 70}}>
        <div style={{fontFamily: PIXEL, fontSize: 13, letterSpacing: 2, color: 'rgba(236,231,218,0.45)'}}>
          TO THE MOON / 2011 / CANADA
        </div>
        <div style={{marginTop: 14, fontFamily: SERIF, fontWeight: 900, fontSize: 74, color: C.cream}}>
          去月球
        </div>
      </div>
      <div style={{position: 'absolute', left: 84, bottom: 170, fontFamily: SANS, fontSize: 21, lineHeight: 2.1, letterSpacing: 2, color: 'rgba(236,231,218,0.6)'}}>
        没有战斗系统。
        <br />
        没有装备。没有升级。
        <br />
        只有两个医生，走进一个将死的人的记忆。
        <br />
        <span style={{color: 'rgba(236,231,218,0.35)'}}>它卖的是一段你没法跳过的人生。</span>
      </div>
      <div style={{position: 'absolute', right: 110, bottom: 150, fontFamily: PIXEL, fontSize: 13, letterSpacing: 2, color: 'rgba(217,178,95,0.5)', opacity: Math.min(1, t / 1.2)}}>
        PLAYER / A MEMORY
      </div>
    </div>
  );
};

export const IbWitch: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const statement = interpolate(t, [9.0, 10.0], [0, 1], clamp);
  return (
    <div style={{position: 'absolute', inset: 0, background: '#050506'}}>
      <SplitPanels
        leftLabel="IB / 2012 / JAPAN"
        rightLabel="THE WITCH'S HOUSE / 2012"
        left={<IbGallery width={960} height={1080} label="" caption="" />}
        right={<WitchCorridor width={960} height={1080} label="" caption="" />}
      />
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 200, display: 'flex', justifyContent: 'center', opacity: statement}}>
        <div style={{fontFamily: SERIF, fontWeight: 900, fontSize: 54, color: C.cream, textAlign: 'center', lineHeight: 1.5, textShadow: '0 6px 30px rgba(0,0,0,0.8)'}}>
          没有战斗。
          <br />
          你能做的，只有跑，和躲。
        </div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 110, textAlign: 'center', fontFamily: SANS, fontSize: 18, letterSpacing: 5, color: 'rgba(236,231,218,0.3)'}}>
        当引擎给不了你光影，你只能靠“不给你看”来吓人。
      </div>
    </div>
  );
};

export const OmoriSales: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const enter = interpolate(t, [6.0, 7.2], [0, 1], clamp);
  return (
    <div style={{position: 'absolute', inset: 0, background: '#f0eee8', overflow: 'hidden'}}>
      <OmoriWhite />
      <div style={{position: 'absolute', left: 84, top: 76, fontFamily: PIXEL, fontSize: 13, letterSpacing: 2, color: 'rgba(20,20,22,0.45)'}}>
        2020.12.25 / OMORI
      </div>
      <div style={{position: 'absolute', left: 84, top: 120, fontFamily: SERIF, fontWeight: 900, fontSize: 68, color: '#161618'}}>
        OMORI
      </div>
      <div style={{position: 'absolute', left: 84, bottom: 160, fontFamily: SANS, fontSize: 20, lineHeight: 2, letterSpacing: 1, color: 'rgba(20,20,22,0.55)'}}>
        RPG Maker MV / 一个可以在浏览器里跑的引擎
        <br />
        两年后，它卖出了一百万份。
      </div>
      <div style={{position: 'absolute', right: 90, top: 330, textAlign: 'right', opacity: enter}}>
        <div style={{fontFamily: SANS, fontSize: 19, letterSpacing: 4, color: 'rgba(20,20,22,0.45)'}}>
          SALES / 2 YEARS
        </div>
        <div style={{fontFamily: PIXEL, fontSize: 76, color: '#161618', letterSpacing: 2, marginTop: 12}}>
          1,000,000
        </div>
        <div style={{marginTop: 20, fontFamily: SERIF, fontWeight: 900, fontSize: 32, color: 'rgba(20,20,22,0.65)'}}>
          让一百万人不敢关灯。
        </div>
      </div>
      <div style={{position: 'absolute', right: 80, bottom: 60, fontFamily: SANS, fontSize: 13, letterSpacing: 2, color: 'rgba(20,20,22,0.3)'}}>
        白色空间 / 复原示意
      </div>
    </div>
  );
};

export const WorksMontage: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const black = interpolate(t, [2.6, 3.6], [0, 1], clamp);
  return (
    <div style={{position: 'absolute', inset: 0, background: '#050506', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', opacity: 1 - black}}>
        {[
          {node: <DreamBedroom width={960} height={540} label="" caption="" />, label: '梦日记 / 2004'},
          {node: <IbGallery width={960} height={540} label="" caption="" />, label: 'Ib / 2012'},
          {node: <ToTheMoon width={960} height={540} label="" caption="" />, label: '去月球 / 2011'},
          {node: <OmoriWhite width={960} height={540} label="" caption="" />, label: 'OMORI / 2020'},
        ].map((cell, index) => (
          <div key={index} style={{position: 'relative', border: '1px solid rgba(236,231,218,0.12)', overflow: 'hidden'}}>
            {cell.node}
            <div style={{position: 'absolute', left: 24, bottom: 20, fontFamily: SANS, fontSize: 15, letterSpacing: 2, color: 'rgba(236,231,218,0.55)'}}>
              {cell.label}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#050506',
          opacity: black,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <div style={{fontFamily: SERIF, fontWeight: 900, fontSize: 82, lineHeight: 1.5, color: C.cream}}>
          它们都不是 RPG。
        </div>
        <div style={{marginTop: 6, fontFamily: SERIF, fontWeight: 900, fontSize: 82, lineHeight: 1.5, color: C.cream}}>
          它们只是借了 RPG 的壳，
          <br />
          装了自己的东西。
        </div>
        <div style={{marginTop: 40, width: 460, height: 2, background: C.red, opacity: 0.7}} />
        <div style={{marginTop: 30, fontFamily: PIXEL, fontSize: 13, letterSpacing: 2, color: 'rgba(236,231,218,0.3)'}}>
          RPG MAKER / 2000 — 2020
        </div>
      </div>
    </div>
  );
};
