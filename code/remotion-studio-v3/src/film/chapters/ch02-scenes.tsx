import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {EditorChrome} from '../../rpg00/game/EditorChrome';
import {BrowserFrame} from '../archive';
import {
  Caption,
  Halftone,
  PaperBG,
  Reconstruction,
  Scanlines,
} from '../components';
import {LivingRoom1995} from '../illustrations';
import {CorpseParty, Mamirin} from '../pixel';
import {
  Cartridge,
  DiscCase,
  FloppyDisk,
  GameConsole,
  MagazineCover,
  RetroComputer,
  SoftwareBox,
} from '../objects';
import {
  C,
  FPS,
  PIXEL,
  SANS,
  SERIF,
  clamp,
  hash,
} from '../theme';

const dantePalette = {bg: '#1b2b4a', ink: '#ece7da', accent: '#d9b25f'};
const dante98Palette = {bg: '#23211e', ink: '#f0e6d2', accent: '#b33a2f'};
const superPalette = {bg: '#4a2422', ink: '#f4e8d2', accent: '#e0b070'};

export const Desk1988: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const push = 1 + Math.min(0.05, t * 0.004);
  const noteIn = interpolate(t, [6.4, 7.2], [0, 1], clamp);
  const diskMove = interpolate(t, [10.2, 12.6], [0, 1], clamp);
  return (
    <div style={{position: 'absolute', inset: 0, background: '#22170f', overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 28% 30%, rgba(224,176,104,0.3) 0%, rgba(30,20,12,0.95) 62%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${push})`,
          transformOrigin: '60% 55%',
        }}
      >
        <div style={{position: 'absolute', left: 160, top: 120, width: 680, height: 820}}>
          <MagazineCover
            left={0}
            top={0}
            width={600}
            height={790}
            title="月刊 ASCII"
            issue="1988 年 6 月号"
            price="680 日元"
            headline={'个人电脑\n特集'}
            sublines={['读者投稿程序', '附录：3.5 英寸软盘']}
            rotate={-3.2}
            dark={false}
            label="封面复原"
          />
        </div>
        <FloppyDisk left={950} top={220} size={250} rotate={8} label={'1988\n附录软盘'} />
        <FloppyDisk left={1190} top={420} size={250} rotate={-6} label={'读者投稿\n程序集'} />
        <FloppyDisk left={960} top={560} size={250} rotate={3} label={'MAMIRIN\n1988'} />
        <div
          style={{
            position: 'absolute',
            right: 140,
            top: 140,
            width: 400,
            height: 280,
            background: '#d8c8a8',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            transform: 'rotate(4deg)',
            padding: 26,
            boxSizing: 'border-box',
            opacity: noteIn,
          }}
        >
          <div style={{fontFamily: SANS, fontSize: 17, letterSpacing: 3, color: 'rgba(40,30,18,0.5)'}}>
            編集部 / 1988.06
          </div>
          <div style={{marginTop: 16, fontFamily: SERIF, fontWeight: 900, fontSize: 36, color: '#2b241b', lineHeight: 1.45}}>
            今月の
            <br />
            付録ディスク
          </div>
          <div style={{marginTop: 14, fontFamily: SANS, fontSize: 15, color: 'rgba(40,30,18,0.6)'}}>
            読者投稿の小さなプログラムを
            <br />
            一枚のフロッピーに。
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            left: 700,
            top: 690,
            width: 300,
            padding: '18px 22px',
            background: 'rgba(18,12,8,0.72)',
            border: '1px solid rgba(230,200,150,0.24)',
            opacity: noteIn,
            transform: `translateY(${(1 - diskMove) * 34}px)`,
          }}
        >
          <div style={{fontFamily: SANS, fontSize: 15, letterSpacing: 3, color: 'rgba(236,231,218,0.45)'}}>
            附录软盘 / 3.5"
          </div>
          <div style={{marginTop: 8, fontFamily: SERIF, fontWeight: 600, fontSize: 30, color: '#e8d7ba'}}>
            读者投稿的小程序
          </div>
        </div>
      </div>
      <Halftone opacity={0.14} size={5} color="30,18,8" />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 220,
          background: 'linear-gradient(to top, rgba(15,10,6,1), rgba(15,10,6,0))',
        }}
      />
      <div style={{position: 'absolute', left: 120, top: 90, fontFamily: SANS, fontSize: 19, letterSpacing: 4, color: 'rgba(236,231,218,0.42)'}}>
        1988 / 編集部の机
      </div>
      <Reconstruction text="书桌与软盘复原示意" />
      <Caption>1988 年 6 月 / 月刊 ASCII 附录</Caption>
    </div>
  );
};

export const FloppyBoot: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const insert = interpolate(t, [0.6, 2.6], [0, 1], clamp);
  const screenOn = interpolate(t, [2.8, 3.5], [0.1, 1], clamp);
  return (
    <div style={{position: 'absolute', inset: 0, background: '#080a0c', overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 48% 46%, rgba(96,132,110,0.14) 0%, rgba(8,10,12,1) 66%)',
        }}
      />
      <div style={{position: 'absolute', inset: 0, transform: `scale(${1.02 + Math.min(0.05, t * 0.004)})`}}>
        <RetroComputer
          left={430}
          top={120}
          scale={1.45}
          screen={
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg,#0e1c14,#07100a)',
                padding: 22,
                boxSizing: 'border-box',
                fontFamily: 'monospace',
                fontSize: 15,
                lineHeight: 2,
                color: '#7fcf8b',
                opacity: screenOn,
                textShadow: '0 0 8px rgba(120,220,140,0.5)',
              }}
            >
              <div>月刊ASCII 1988.06</div>
              <div>APPENDIX DISK</div>
              <div>----------------</div>
              <div>LOADING...</div>
              <div style={{opacity: Math.floor(t * 3) % 2 ? 1 : 0.3}}>READY.</div>
              <div style={{color: '#d8c07a'}}>MAMIRIN</div>
            </div>
          }
        />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 1260,
          top: 620 - insert * 320,
          transform: `rotate(${-8 + insert * 4}deg) scale(${1 - insert * 0.4})`,
          opacity: 1 - insert * 0.75,
        }}
      >
        <FloppyDisk left={0} top={0} size={280} rotate={0} label={'1988\n附录软盘'} />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 170,
          top: 120,
          fontFamily: PIXEL,
          fontSize: 13,
          letterSpacing: 2,
          color: 'rgba(160,200,170,0.5)',
        }}
      >
        PC-9801 / 1988
      </div>
      <Scanlines opacity={0.12} />
      <Halftone opacity={0.1} size={4} color="180,220,180" />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 200,
          background: 'linear-gradient(to top, rgba(5,7,6,1), rgba(5,7,6,0))',
        }}
      />
      <Caption>软盘插入驱动器 / 读盘</Caption>
    </div>
  );
};

export const MamirinScene: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const band = interpolate(t, [0.2, 1.0], [0, 1], clamp);
  return (
    <div style={{position: 'absolute', inset: 0, background: '#050706'}}>
      <Mamirin />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: 132,
          background:
            'linear-gradient(180deg, rgba(3,9,5,0.94) 0%, rgba(3,9,5,0.7) 62%, rgba(3,9,5,0) 100%)',
          opacity: band,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '34px 84px',
          boxSizing: 'border-box',
        }}
      >
        <div>
          <div style={{fontFamily: SANS, fontSize: 19, letterSpacing: 3, color: 'rgba(220,240,220,0.66)'}}>
            署名栏：空栏 / 没有人知道作者是谁
          </div>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 84,
          bottom: 190,
          fontFamily: SERIF,
          fontWeight: 900,
          fontSize: 56,
          color: '#e6efdc',
          lineHeight: 1.45,
          textShadow: '0 4px 30px rgba(0,0,0,0.8)',
          opacity: interpolate(t, [3.4, 4.4], [0, 1], clamp),
        }}
      >
        它是 RPG Maker 真正的祖先。
      </div>
      <div style={{position: 'absolute', left: 84, bottom: 96, fontFamily: SANS, fontSize: 15, letterSpacing: 2, color: 'rgba(220,240,220,0.28)'}}>Mamirin 画面 / 根据资料复原</div>
    </div>
  );
};

export const DanteHistory: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const box1 = interpolate(t, [0.1, 0.9], [0, 1], clamp);
  const box2 = interpolate(t, [4.7, 5.6], [0, 1], clamp);
  const pc = interpolate(t, [9.9, 10.9], [0, 1], clamp);
  const res = interpolate(t, [12.8, 13.7], [0, 1], clamp);
  const birthday = interpolate(t, [15.8, 16.9], [0, 1], clamp);
  return (
    <div style={{position: 'absolute', inset: 0, background: '#0a0a0c', overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 42% 42%, rgba(90,90,110,0.2) 0%, rgba(8,8,10,1) 68%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 170,
          top: 130,
          opacity: box1,
          transform: `translateY(${(1 - box1) * 24}px)`,
        }}
      >
        <SoftwareBox
          left={0}
          top={0}
          width={430}
          height={570}
          title="Dante"
          subtitle="RPG ツクール"
          year="1990"
          platform="MSX2"
          palette={dantePalette}
          art="dante"
          rotate={-1.5}
          label="包装复原"
        />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 590,
          top: 150,
          opacity: box2,
          transform: `translateY(${(1 - box2) * 24}px)`,
        }}
      >
        <SoftwareBox
          left={0}
          top={0}
          width={470}
          height={610}
          title={'RPG ツクール\nDante 98'}
          subtitle="PC-9801"
          year="1992.12.17"
          platform="ASCII"
          palette={dante98Palette}
          art="dante"
          rotate={1}
          label="包装复原"
        />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 1280,
          top: 420,
          opacity: pc,
          transform: `translateY(${(1 - pc) * 26}px)`,
        }}
      >
        <RetroComputer
          left={0}
          top={0}
          scale={0.92}
          label="PC-9801"
          screen={
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: '#081008',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: PIXEL,
                fontSize: 13,
                color: '#7fcf8b',
                gap: 16,
              }}
            >
              <div>RPG TSUKUURU</div>
              <div style={{fontSize: 22}}>DANTE 98</div>
              <div style={{fontFamily: 'monospace', fontSize: 11, color: '#4d7f55'}}>320 × 240</div>
            </div>
          }
        />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 120,
          bottom: 120,
          opacity: res,
          display: 'flex',
          alignItems: 'baseline',
          gap: 24,
        }}
      >
        <span style={{fontFamily: SANS, fontSize: 20, letterSpacing: 4, color: 'rgba(236,231,218,0.4)'}}>
          RESOLUTION
        </span>
        <span style={{fontFamily: PIXEL, fontSize: 54, color: C.cream, letterSpacing: 2}}>320 × 240</span>
      </div>
      <div
        style={{
          position: 'absolute',
          right: 120,
          top: 130,
          opacity: birthday,
          transform: 'rotate(-8deg)',
          border: `4px solid ${C.red}`,
          borderRadius: '50%',
          width: 290,
          height: 290,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: C.red,
          fontFamily: SERIF,
          fontWeight: 900,
          fontSize: 36,
          lineHeight: 1.3,
          textAlign: 'center',
        }}
      >
        1992.12.17
        <div style={{fontSize: 25, marginTop: 8}}>RPG Maker 的生日</div>
      </div>
      <div style={{position: 'absolute', left: 120, top: 100, fontFamily: SANS, fontSize: 18, letterSpacing: 4, color: 'rgba(236,231,218,0.35)'}}>
        1992 / PC-9801
      </div>
      <Reconstruction text="包装与主机复原示意" />
      <Caption>1990 MSX2 Dante / 1992 Dante 98</Caption>
    </div>
  );
};

export const MagazineSpread: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const number = interpolate(t, [7.2, 8.4], [0, 1], clamp);
  return (
    <PaperBG>
      <div
        style={{
          position: 'absolute',
          inset: '7% 9%',
          background: 'linear-gradient(90deg,#f4ecda 0%,#efe6d2 49%,#e8ddc7 50%,#f3ebd9 100%)',
          boxShadow: '0 30px 60px rgba(0,0,0,0.2)',
          display: 'flex',
          transform: 'rotate(-1deg)',
        }}
      >
        <div style={{width: '50%', padding: 44, borderRight: '1px solid rgba(80,60,35,0.2)'}}>
          <div style={{fontFamily: SERIF, fontWeight: 900, fontSize: 72, color: '#8f2f2a', letterSpacing: 2}}>
            LOGIN
            <div style={{fontSize: 32, color: '#2d2a24', letterSpacing: 5}}>Sofcom</div>
          </div>
          <div style={{marginTop: 12, fontFamily: SANS, fontSize: 15, letterSpacing: 3, color: 'rgba(30,26,20,0.45)'}}>
            1988 — 1996 / 読者投稿ゲーム
          </div>
          <div style={{marginTop: 34, fontFamily: SERIF, fontWeight: 900, fontSize: 38, lineHeight: 1.5, color: '#2d2a24'}}>
            読者がつくった
            <br />
            RPG の一覧。
          </div>
          <div style={{marginTop: 24, columnCount: 2, columnGap: 22, fontFamily: SANS, fontSize: 11, lineHeight: 1.9, color: 'rgba(30,26,20,0.58)'}}>
            投稿された作品は、誌面で紹介され、読者同士で遊ばれた。ダンジョンの構造、イベントの組み方、物語の長さ。ひとつのソフトから、無数の世界が生まれた。
            <br />
            <br />
            ここに載っているのは、そのごく一部である。1995 年、日本でつくられた RPG は三千本を超えた。
          </div>
        </div>
        <div style={{width: '50%', padding: 44}}>
          <div style={{fontFamily: SANS, fontSize: 14, letterSpacing: 3, color: 'rgba(30,26,20,0.45)'}}>
            1995 / JAPAN
          </div>
          <div style={{marginTop: 12, fontFamily: SANS, fontSize: 18, color: 'rgba(30,26,20,0.6)'}}>
            日本でつくられた RPG の数
          </div>
          <div style={{marginTop: 6, display: 'flex', alignItems: 'baseline', gap: 18, opacity: number}}>
            <span style={{fontFamily: PIXEL, fontSize: 92, color: '#8f2f2a', letterSpacing: 1}}>
              {Math.round(3000 * number).toLocaleString('en-US')}
            </span>
            <span style={{fontFamily: SERIF, fontWeight: 900, fontSize: 52, color: '#2d2a24'}}>本+</span>
          </div>
          <div style={{marginTop: 20, width: 460, height: 4, background: 'rgba(143,47,42,0.7)'}} />
          <div style={{marginTop: 26, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
            {['DANTE 98', 'RPG ツクール', 'LOGIN Sofcom', '読者投稿'].map((item) => (
              <div key={item} style={{border: '1px solid rgba(60,45,25,0.24)', padding: 12, fontFamily: SANS, fontSize: 13, color: 'rgba(30,26,20,0.62)'}}>
                {item}
              </div>
            ))}
          </div>
          <div style={{marginTop: 30, fontFamily: SERIF, fontSize: 24, lineHeight: 1.8, color: 'rgba(30,26,20,0.7)'}}>
            一个做游戏的工具，
            <br />
            开始造星了。
          </div>
        </div>
      </div>
      <Caption dark>《LOGIN Sofcom》读者投稿栏目 / 杂志内页复原</Caption>
      <Reconstruction text="杂志内页复原示意" dark />
    </PaperBG>
  );
};

export const CorpseAward: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const award = interpolate(t, [8.0, 9.0], [0, 1], clamp);
  return (
    <div style={{position: 'absolute', inset: 0, background: '#050607'}}>
      <CorpseParty />
      <div
        style={{
          position: 'absolute',
          right: 130,
          top: 220,
          width: 520,
          padding: '28px 32px',
          background: 'rgba(12,8,10,0.9)',
          border: '1px solid rgba(180,80,80,0.35)',
          opacity: award,
          transform: `translateY(${(1 - award) * 24}px)`,
        }}
      >
        <div style={{fontFamily: SANS, fontSize: 16, letterSpacing: 4, color: 'rgba(220,160,150,0.5)'}}>
          ASCII CONTEST / 1997
        </div>
        <div style={{marginTop: 18, fontFamily: SERIF, fontWeight: 900, fontSize: 44, color: '#ecd8d0', lineHeight: 1.45}}>
          第二名
          <br />
          奖金 500 万日元
        </div>
        <div style={{marginTop: 18, fontFamily: SANS, fontSize: 17, lineHeight: 1.8, color: 'rgba(236,220,210,0.55)'}}>
          一个 22 岁的大学生，
          <br />
          用一个暑假做的恐怖游戏。
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 130,
          bottom: 140,
          fontFamily: SERIF,
          fontWeight: 900,
          fontSize: 60,
          color: '#e8dcd0',
          opacity: award,
        }}
      >
        祁答院慎
      </div>
    </div>
  );
};

export const CorpseTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const editorIn = interpolate(t, [4.2, 5.2], [0, 1], clamp);
  const cursorX = 950 + Math.sin(t * 0.7) * 60;
  const cursorY = 890 + Math.cos(t * 0.5) * 8;
  return (
    <div style={{position: 'absolute', inset: 0, background: '#050506', overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(100,30,32,0.22) 0%, rgba(5,5,6,1) 68%)',
          opacity: 1 - editorIn,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 1 - editorIn,
        }}
      >
        <div style={{fontFamily: SERIF, fontWeight: 900, fontSize: 132, letterSpacing: 10, color: '#e8dcd2'}}>
          Corpse Party
        </div>
        <div style={{marginTop: 24, fontFamily: SERIF, fontWeight: 900, fontSize: 84, letterSpacing: 18, color: '#b33a2f'}}>
          尸体派对
        </div>
        <div style={{marginTop: 32, fontFamily: PIXEL, fontSize: 14, color: 'rgba(236,231,218,0.35)', letterSpacing: 2}}>
          PC-98 / 1996
        </div>
      </div>
      <div style={{position: 'absolute', inset: 0, opacity: editorIn}}>
        <EditorChrome staticMode />
        <div style={{position: 'absolute', inset: 0, background: 'rgba(5,7,10,0.72)'}} />
        <div
          style={{
            position: 'absolute',
            left: 120,
            top: 120,
            fontFamily: SERIF,
            fontWeight: 900,
            fontSize: 58,
            lineHeight: 1.45,
            color: C.cream,
            textShadow: '0 6px 30px rgba(0,0,0,0.8)',
          }}
        >
          一个做游戏的工具，
          <br />
          开始造星了。
        </div>
        <svg
          width="24"
          height="30"
          viewBox="0 0 22 28"
          style={{position: 'absolute', left: cursorX, top: cursorY, filter: 'drop-shadow(0 3px 2px rgba(0,0,0,0.6))'}}
        >
          <path d="M2 1 L2 21 L7 16 L11 25 L15 23 L11 14 L19 14 Z" fill="#f6f2e6" stroke="#111" strokeWidth="1.4" />
        </svg>
      </div>
    </div>
  );
};

export const ConsoleTimeline: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const g1 = interpolate(t, [0.6, 1.5], [0, 1], clamp);
  const g2 = interpolate(t, [3.6, 4.5], [0, 1], clamp);
  const g3 = interpolate(t, [6.8, 7.8], [0, 1], clamp);
  return (
    <div style={{position: 'absolute', inset: 0, background: '#08090b', overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 34%, rgba(96,110,140,0.24) 0%, rgba(8,9,11,1) 68%)',
        }}
      />
      <div style={{position: 'absolute', left: 100, right: 100, top: 800, height: 2, background: 'rgba(236,231,218,0.18)'}} />
      <div style={{position: 'absolute', left: 110, top: 470, opacity: g1, transform: `translateY(${(1 - g1) * 20}px)`}}>
        <SoftwareBox
          left={0}
          top={0}
          width={330}
          height={330}
          title={'SUPER\nDANTE'}
          subtitle="SUPER FAMICOM"
          year="1995.3.31"
          platform="ASCII"
          palette={superPalette}
          art="map"
          rotate={-2}
          label="包装复原"
        />
        <div style={{marginTop: 18, fontFamily: SANS, fontSize: 15, letterSpacing: 3, color: 'rgba(236,231,218,0.45)'}}>
          超级任天堂 / 1995
        </div>
      </div>
      <div style={{position: 'absolute', left: 650, top: 560, opacity: g2, transform: `translateY(${(1 - g2) * 20}px)`}}>
        <div style={{position: 'relative', width: 420, height: 260}}>
          <GameConsole kind="sfc" left={0} top={80} scale={0.9} />
          <Cartridge left={190} top={-2} width={250} rotate={-4} title="RPG ツクール 2" platform="SUPER FAMICOM" />
        </div>
        <div style={{marginTop: 10, fontFamily: SANS, fontSize: 15, letterSpacing: 3, color: 'rgba(236,231,218,0.45)'}}>
          第二代 / 1996.1.31
        </div>
      </div>
      <div style={{position: 'absolute', right: 120, top: 430, opacity: g3, transform: `translateY(${(1 - g3) * 20}px)`}}>
        <div style={{position: 'relative', width: 470, height: 390}}>
          <GameConsole kind="ps1" left={0} top={210} scale={0.92} />
          <DiscCase left={40} top={0} width={220} rotate={-5} title={'RPG ツクール 3'} subtitle="PLAYSTATION" year="1997" />
          <DiscCase left={240} top={20} width={220} rotate={4} title={'RPG ツクール 4'} subtitle="PLAYSTATION" year="2000" />
        </div>
        <div style={{marginTop: 8, fontFamily: SANS, fontSize: 15, letterSpacing: 3, color: 'rgba(236,231,218,0.45)'}}>
          PlayStation / 1997 / 2000
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 120,
          top: 110,
          fontFamily: SERIF,
          fontWeight: 900,
          fontSize: 70,
          letterSpacing: 4,
          color: C.cream,
        }}
      >
        插卡带，接电视
      </div>
      <div style={{position: 'absolute', left: 124, top: 200, fontFamily: SANS, fontSize: 20, letterSpacing: 2, color: 'rgba(236,231,218,0.5)'}}>
        一个小孩就能做游戏。不需要买电脑。
      </div>
      <Caption>Super Dante / RPG ツクール 2 / 3 / 4</Caption>
      <Reconstruction text="包装与主机复原示意" />
    </div>
  );
};

export const AloneRoom: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const flicker = 0.76 + Math.sin(frame * 0.9) * 0.04;
  return (
    <div style={{position: 'absolute', inset: 0, background: '#07080a', overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 56% 46%, rgba(118,146,170,0.17) 0%, rgba(7,8,10,1) 70%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 520,
          top: 260,
          width: 780,
          height: 470,
          background: '#11161a',
          border: '2px solid rgba(236,231,218,0.12)',
          boxShadow: '0 0 120px rgba(140,180,200,0.12)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 26,
            background: 'linear-gradient(180deg,#2e4148,#142226)',
            opacity: flicker,
            fontFamily: PIXEL,
            fontSize: 14,
            color: 'rgba(208,226,226,0.35)',
            padding: 28,
            lineHeight: 2.2,
          }}
        >
          GAME OVER
          <div style={{fontFamily: SANS, fontSize: 15, marginTop: 12}}>PRESS ENTER</div>
        </div>
      </div>
      <svg width="100%" height="100%" viewBox="0 0 1920 1080" style={{position: 'absolute', inset: 0}}>
        <g fill="#050607">
          <circle cx="860" cy="640" r="54" />
          <path d="M760 700 Q820 682 860 682 Q906 682 958 700 L1000 960 L724 960 Z" />
          <rect x="700" y="930" width="340" height="70" rx="34" />
        </g>
        <g fill="#0d1012">
          <rect x="80" y="160" width="260" height="560" />
          <rect x="110" y="190" width="200" height="480" fill="#14181b" />
          <rect x="1540" y="300" width="300" height="440" />
        </g>
        <g fill="#151a1d">
          <rect x="480" y="760" width="1000" height="80" />
          <rect x="540" y="840" width="60" height="200" />
          <rect x="1380" y="840" width="60" height="200" />
        </g>
      </svg>
      <div
        style={{
          position: 'absolute',
          left: 120,
          top: 120,
          fontFamily: SANS,
          fontSize: 19,
          letterSpacing: 4,
          color: 'rgba(236,231,218,0.35)',
        }}
      >
        ONE ROOM / ONE PLAYER
      </div>
      <div
        style={{
          position: 'absolute',
          left: 120,
          bottom: 130,
          fontFamily: SERIF,
          fontWeight: 900,
          fontSize: 62,
          lineHeight: 1.4,
          color: 'rgba(236,231,218,0.82)',
        }}
      >
        自己做的游戏，
        <br />
        自己玩。
      </div>
      <Caption>客厅 / 夜里</Caption>
    </div>
  );
};

export const CartridgeCloseup: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const pull = interpolate(t, [6.2, 8.4], [0, 1], clamp);
  const a1 = interpolate(t, [1.6, 2.4], [0, 1], clamp);
  const a2 = interpolate(t, [7.0, 7.8], [0, 1], clamp);
  const a3 = interpolate(t, [10.4, 11.2], [0, 1], clamp);
  const a4 = interpolate(t, [14.2, 15.0], [0, 1], clamp);
  const a5 = interpolate(t, [18.0, 18.8], [0, 1], clamp);
  return (
    <div style={{position: 'absolute', inset: 0, background: '#0b0a08', overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 42%, rgba(180,142,92,0.18) 0%, rgba(10,9,7,1) 68%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 940,
          transform: `scale(${1 - pull * 0.28}) translateY(${pull * 90}px)`,
          transformOrigin: '50% 100%',
        }}
      >
        <div style={{position: 'absolute', left: 640, top: 230 - pull * 60}}>
          <Cartridge left={0} top={0} width={570} rotate={-3} title="Super Dante" platform="SUPER FAMICOM" />
        </div>
        <div style={{position: 'absolute', left: 960, top: 590, opacity: pull}}>
          <GameConsole kind="sfc" left={0} top={0} scale={0.85} label="SUPER FAMICOM" />
        </div>
        <svg width="100%" height="100%" viewBox="0 0 1920 1080" style={{position: 'absolute', inset: 0, opacity: pull * 0.7}}>
          <path d="M1280 760 C1450 820, 1540 880, 1640 1000" stroke="#3a3025" strokeWidth="10" fill="none" />
          <path d="M1100 770 C1000 850, 860 900, 720 1010" stroke="#3a3025" strokeWidth="10" fill="none" />
          <path d="M1400 780 C1520 820, 1580 860, 1660 920" stroke="#2f271f" strokeWidth="6" fill="none" />
        </svg>
      </div>
      <div style={{position: 'absolute', left: 110, top: 470, opacity: a1}}>
        <div style={{fontFamily: PIXEL, fontSize: 15, letterSpacing: 2, color: '#d9b25f'}}>SAVE DATA</div>
        <div style={{marginTop: 12, fontFamily: SERIF, fontWeight: 900, fontSize: 66, lineHeight: 1.4, color: C.cream}}>
          存档。进度。
          <br />
          你的一切。
        </div>
      </div>
      <div style={{position: 'absolute', left: 110, bottom: 180, opacity: a2}}>
        <div style={{fontFamily: SERIF, fontWeight: 900, fontSize: 56, color: C.cream}}>
          想让别人玩，
          <br />
          得把整台机器搬过去。
        </div>
      </div>
      <div style={{position: 'absolute', right: 100, top: 180, opacity: a3, textAlign: 'right'}}>
        <div style={{fontFamily: SERIF, fontWeight: 900, fontSize: 42, color: 'rgba(236,231,218,0.75)'}}>
          或者，把游戏机借给他。
          <br />
          连同存档一起。
        </div>
      </div>
      <div style={{position: 'absolute', right: 100, bottom: 260, opacity: a4, textAlign: 'right'}}>
        <div style={{fontFamily: SERIF, fontWeight: 900, fontSize: 42, color: 'rgba(236,231,218,0.75)'}}>
          如果他家没有这台机器，
          <br />
          那就更没办法了。
        </div>
      </div>
      <div style={{position: 'absolute', left: 120, bottom: 110, opacity: a5}}>
        <div style={{fontFamily: SANS, fontSize: 19, letterSpacing: 4, color: 'rgba(236,231,218,0.45)'}}>
          1995 — 2003 / SHARING
        </div>
      </div>
      <Reconstruction text="卡带与主机复原示意" />
      <Caption>一盒卡带 / 一台主机 / 一根电源线</Caption>
    </div>
  );
};

const Forum2003Page: React.FC = () => (
  <div style={{background: '#e8ecf1', minHeight: 1400, fontFamily: SANS, fontSize: 14, color: '#26323d'}}>
    <div style={{background: '#253e57', color: '#e8f0f8', padding: '18px 28px', display: 'flex', alignItems: 'center', gap: 16}}>
      <div style={{fontFamily: SERIF, fontWeight: 900, fontSize: 29}}>RPG Maker Community</div>
      <div style={{fontSize: 11, letterSpacing: 3, opacity: 0.55}}>FORUM / 2003</div>
      <div style={{marginLeft: 'auto', fontSize: 11, opacity: 0.6}}>
        2,104 members
      </div>
    </div>
    <div style={{display: 'flex', gap: 18, padding: 22}}>
      <div style={{flex: 1}}>
        <div style={{display: 'flex', background: '#d5dfe8', border: '1px solid #a9b8c4', fontSize: 12, fontWeight: 700, padding: '8px 12px'}}>
          <span style={{flex: 1}}>Thread</span>
          <span style={{width: 140}}>Author</span>
          <span style={{width: 80}}>Replies</span>
          <span style={{width: 120}}>Last post</span>
        </div>
        {[
          ['[RELEASE] The Lost Room - a short RPG', 'dawn_light', '42', 'Today 02:14'],
          ['[DEMO] My first game - need feedback', 'kite', '17', 'Today 01:03'],
          ['How do I make a door that needs a key?', 'newbie2003', '9', 'Yesterday'],
          ['[RESOURCE] Free tileset for RM2k', 'mori', '88', 'Yesterday'],
          ['[RELEASE] A game about a whale', 'smallboat', '126', '2003-08-11'],
          ['Screenshot thread', 'pixelcat', '304', '2003-08-10'],
        ].map(([title, author, replies, date], index) => (
          <div
            key={title}
            style={{
              display: 'flex',
              padding: '11px 12px',
              border: '1px solid #c5d1dc',
              borderTop: 'none',
              background: index === 0 ? '#f7fbff' : '#fff',
              alignItems: 'center',
            }}
          >
            <span style={{flex: 1, color: index === 0 ? '#1d5c8f' : '#2a3b4a', fontWeight: index === 0 ? 700 : 400}}>
              {title}
            </span>
            <span style={{width: 140, color: '#677a89', fontSize: 12}}>{author}</span>
            <span style={{width: 80, color: '#677a89', fontSize: 12}}>{replies}</span>
            <span style={{width: 120, color: '#8a99a6', fontSize: 11}}>{date}</span>
          </div>
        ))}
        <div style={{marginTop: 16, border: '1px solid #a9b8c4', background: '#f8fbfd', padding: 16}}>
          <div style={{fontSize: 12, color: '#5f7180', marginBottom: 8}}>REPLY</div>
          <div style={{height: 74, border: '1px solid #b8c6d2', background: '#fff'}} />
          <div style={{marginTop: 10, display: 'flex', gap: 8}}>
            <div style={{padding: '6px 18px', background: '#2e5c84', color: '#fff', fontSize: 12}}>Post Reply</div>
            <div style={{padding: '6px 18px', border: '1px solid #a9b8c4', fontSize: 12}}>Preview</div>
          </div>
        </div>
      </div>
      <div style={{width: 260}}>
        <div style={{background: '#f8fbfd', border: '1px solid #a9b8c4', padding: 14, fontSize: 12, lineHeight: 2}}>
          <div style={{fontWeight: 700, marginBottom: 8}}>STATISTICS</div>
          Threads: 4,281
          <br />
          Posts: 61,204
          <br />
          Members: 2,104
          <br />
          Newest: player_one
        </div>
        <div style={{marginTop: 12, background: '#f8fbfd', border: '1px solid #a9b8c4', padding: 14, fontSize: 12, lineHeight: 2, color: '#5f7180'}}>
          <div style={{fontWeight: 700, color: '#2a3b4a', marginBottom: 8}}>ANNOUNCEMENT</div>
          The archive is open.
          <br />
          Share your game.
          <br />
          Someone, somewhere,
          <br />
          will play it.
        </div>
        <div style={{marginTop: 12, background: '#253e57', color: '#e8f0f8', padding: 14}}>
          <div style={{fontSize: 11, letterSpacing: 3, opacity: 0.55}}>DOWNLOAD</div>
          <div style={{fontFamily: PIXEL, fontSize: 22, marginTop: 8}}>1,204</div>
          <div style={{fontSize: 11, opacity: 0.6, marginTop: 2}}>this month</div>
        </div>
      </div>
    </div>
  </div>
);

export const DialUpForum: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const online = interpolate(t, [3.6, 4.6], [0, 1], clamp);
  const scroll = interpolate(t, [4.8, 14], [0, 90], clamp);
  return (
    <div style={{position: 'absolute', inset: 0, background: '#06080a', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, opacity: 1 - online}}>
        <div style={{position: 'absolute', inset: 0, background: '#050607'}} />
        <div style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{fontFamily: PIXEL, fontSize: 18, letterSpacing: 3, color: 'rgba(120,180,150,0.65)'}}>
            DIAL-UP / 56K
          </div>
          <svg width="1100" height="220" viewBox="0 0 1100 220" style={{marginTop: 20}}>
            {Array.from({length: 110}, (_, index) => {
              const h = 10 + Math.abs(Math.sin(index * 0.7 + t * 4)) * (40 + hash(index) * 120);
              return (
                <rect
                  key={index}
                  x={index * 10}
                  y={110 - h / 2}
                  width={4}
                  height={h}
                  fill="#6aa886"
                  opacity={0.25 + hash(index * 3) * 0.6}
                />
              );
            })}
          </svg>
          <div style={{fontFamily: 'monospace', fontSize: 20, letterSpacing: 3, color: 'rgba(160,210,180,0.55)', marginTop: 22}}>
            CONNECTING…
          </div>
          <div style={{marginTop: 20, fontFamily: SANS, fontSize: 17, letterSpacing: 3, color: 'rgba(236,231,218,0.3)'}}>
            拨号上网 / 2003
          </div>
        </div>
      </div>
      <div style={{position: 'absolute', inset: 0, opacity: online}}>
        <BrowserFrame
          title="Internet Explorer"
          url="http://www.rpgmakercommunity.net/forum/"
          left={140}
          top={70}
          width={1640}
          height={940}
          scroll={scroll}
          pageHeight={1400}
          status="Loading complete"
        >
          <Forum2003Page />
        </BrowserFrame>
      </div>
      <div style={{position: 'absolute', left: 80, bottom: 56, fontFamily: SANS, fontSize: 17, letterSpacing: 3, color: 'rgba(236,231,218,0.35)'}}>
        2003 / 论坛与下载
      </div>
    </div>
  );
};

export const TwoWordsEnd: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const dim = interpolate(t, [0, 0.6], [0, 0.72], clamp);
  const text = interpolate(t, [0.6, 1.6], [0, 1], clamp);
  const fade = interpolate(t, [7.5, 8.2], [0, 1], clamp);
  return (
    <div style={{position: 'absolute', inset: 0, background: '#050506'}}>
      <EditorChrome />
      <div style={{position: 'absolute', inset: 0, background: `rgba(4,6,9,${dim})`}} />
      <div
        style={{
          position: 'absolute',
          left: 120,
          top: 120,
          fontFamily: SANS,
          fontSize: 19,
          letterSpacing: 4,
          color: 'rgba(236,231,218,0.4)',
          opacity: text,
        }}
      >
        RPG MAKER 2000 / EVENT
      </div>
      <div
        style={{
          position: 'absolute',
          left: 120,
          top: '42%',
          fontFamily: SERIF,
          fontWeight: 900,
          fontSize: 84,
          lineHeight: 1.5,
          color: C.cream,
          opacity: text,
        }}
      >
        而这件东西，
        <br />
        到底是怎么做出来的？
        <div style={{marginTop: 26, fontFamily: SERIF, fontWeight: 600, fontSize: 48, color: 'rgba(236,231,218,0.62)'}}>
          秘密，只有两个词。
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 1060,
          top: 520,
          width: 640,
          height: 2,
          background: 'rgba(236,231,218,0.22)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 1060,
          top: 540,
          fontFamily: PIXEL,
          fontSize: 20,
          letterSpacing: 4,
          color: C.redBright,
          opacity: Math.floor(frame / 16) % 2 === 0 ? 0.9 : 0.2,
        }}
      >
        ■ ■
      </div>
      <div style={{position: 'absolute', inset: 0, background: '#000', opacity: fade}} />
    </div>
  );
};


export const LivingRoomSuperDante: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const boxIn = interpolate(t, [7.0, 8.0], [0, 1], clamp);
  const cartIn = interpolate(t, [9.4, 10.2], [0, 1], clamp);
  return (
    <div style={{position: 'absolute', inset: 0}}>
      <LivingRoom1995 />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(8,7,6,0.74) 0%, rgba(8,7,6,0.34) 44%, rgba(8,7,6,0.16) 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 120,
          top: 170,
          width: 640,
          opacity: boxIn,
          transform: `translateY(${(1 - boxIn) * 26}px)`,
        }}
      >
        <SoftwareBox
          left={0}
          top={0}
          width={370}
          height={440}
          title={'SUPER\nDANTE'}
          subtitle="SUPER FAMICOM"
          year="1995.3.31"
          platform="ASCII"
          palette={superPalette}
          art="map"
          rotate={-2.5}
          label="包装复原"
        />
        <div style={{position: 'absolute', right: -20, bottom: 0, opacity: cartIn, transform: 'rotate(6deg)'}}>
          <Cartridge left={0} top={0} width={310} rotate={4} title="Super Dante" platform="SUPER FAMICOM" />
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 120,
          bottom: 150,
          fontFamily: SERIF,
          fontWeight: 900,
          fontSize: 62,
          lineHeight: 1.5,
          color: '#f0e2cc',
          textShadow: '0 6px 30px rgba(0,0,0,0.65)',
        }}
      >
        插卡带，接电视。
        <br />
        一个小孩，
        <br />
        就能做游戏。
      </div>
    </div>
  );
};
