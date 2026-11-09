import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Caption} from '../components';
import {NightDesk} from '../illustrations';
import {DreamBedroom} from '../pixel';
import {FloppyDisk, SoftwareBox} from '../objects';
import {C, FPS, PIXEL, SANS, SERIF, clamp, hash} from '../theme';

const PROMPT =
  '做一个 RPG。主角是一个女孩。\n她住在一间不能出门的房间里，\n只能睡觉。';

export const AIPrompt: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const chars = Math.floor(
    interpolate(t, [3.2, 10.0], [0, PROMPT.length], clamp),
  );
  return (
    <div style={{position: 'absolute', inset: 0, background: '#050608'}}>
      <NightDesk mode="ai" promptChars={chars} />
      <div style={{position: 'absolute', left: 84, bottom: 160, fontFamily: SERIF, fontWeight: 900, fontSize: 64, lineHeight: 1.45, color: C.cream, textShadow: '0 6px 30px rgba(0,0,0,0.8)'}}>
        现在，你可以
        <br />
        对一个 AI 说：
      </div>
    </div>
  );
};

export const AIGenerate: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const build = interpolate(t, [1.2, 7.0], [0, 1], clamp);
  const play = interpolate(t, [7.4, 8.2], [0, 1], clamp);
  const modules = [
    ['MAP', 1.2],
    ['ACTOR', 2.6],
    ['DIALOG', 3.8],
    ['BATTLE', 5.0],
    ['SAVE', 6.2],
  ];
  return (
    <div style={{position: 'absolute', inset: 0, background: '#040506', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, background: `rgba(4,5,6,${1 - Math.min(1, build * 2)})`}} />
      <div style={{position: 'absolute', inset: 0, opacity: Math.min(1, build * 1.4)}}>
        <DreamBedroom construct={build} label="GENERATED WORLD / 2026" caption="女孩的房间 / 生成结果" />
      </div>
      {Array.from({length: 22}, (_, index) => {
        const left = hash(index * 7) > 0.5;
        const x = left ? 80 + hash(index * 11) * 260 : 1570 + hash(index * 11) * 260;
        const y = 120 + ((index * 57 + frame * (0.4 + hash(index) * 0.8)) % 840);
        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              fontFamily: 'monospace',
              fontSize: 11,
              color: 'rgba(120,170,190,0.32)',
              opacity: 0.35 + hash(index * 3) * 0.5,
              whiteSpace: 'nowrap',
            }}
          >
            {['map.add', 'actor.load', 'dialog.create', 'battle.init', 'save.write'][index % 5]}(
            {Math.floor(hash(index * 13) * 999)})
          </div>
        );
      })}
      <div style={{position: 'absolute', right: 90, top: 120, width: 360, background: 'rgba(5,10,14,0.8)', border: '1px solid rgba(140,180,200,0.22)', padding: '22px 24px'}}>
        <div style={{fontFamily: PIXEL, fontSize: 10, letterSpacing: 2, color: 'rgba(150,190,210,0.6)'}}>
          BUILD / 2026
        </div>
        {modules.map(([name, at]) => {
          const on = t >= Number(at);
          return (
            <div key={String(name)} style={{display: 'flex', justifyContent: 'space-between', marginTop: 12, fontFamily: 'monospace', fontSize: 13, color: on ? 'rgba(190,230,230,0.8)' : 'rgba(160,180,190,0.2)'}}>
              <span>{name}</span>
              <span>{on ? '✓' : '…'}</span>
            </div>
          );
        })}
      </div>
      <div style={{position: 'absolute', left: 84, top: 86, fontFamily: PIXEL, fontSize: 12, letterSpacing: 2, color: 'rgba(236,231,218,0.35)'}}>
        GENERATING A WORLD / 2026
      </div>
      <div
        style={{
          position: 'absolute',
          left: 84,
          bottom: 170,
          fontFamily: SERIF,
          fontWeight: 900,
          fontSize: 64,
          lineHeight: 1.45,
          color: C.cream,
          opacity: play,
          textShadow: '0 6px 30px rgba(0,0,0,0.8)',
        }}
      >
        几分钟后，
        <br />
        它给你一个能玩的东西。
      </div>
      <div style={{position: 'absolute', right: 90, bottom: 130, opacity: play, display: 'flex', alignItems: 'center', gap: 18}}>
        <div style={{width: 64, height: 64, border: '2px solid #d9b25f', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{width: 0, height: 0, borderLeft: '18px solid #d9b25f', borderTop: '11px solid transparent', borderBottom: '11px solid transparent', marginLeft: 6}} />
        </div>
        <div style={{fontFamily: PIXEL, fontSize: 12, letterSpacing: 2, color: 'rgba(217,178,95,0.7)'}}>PLAY</div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 200, background: 'linear-gradient(to top, rgba(4,5,6,0.85), rgba(4,5,6,0))'}} />
    </div>
  );
};

export const DanteFlashback: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const promise = interpolate(t, [0.7, 1.5], [0, 1], clamp);
  const promise2 = interpolate(t, [3.4, 4.2], [0, 1], clamp);
  return (
    <div style={{position: 'absolute', inset: 0, background: '#08090b', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 42% 44%, rgba(120,104,80,0.2), rgba(7,8,9,1) 68%)'}} />
      <div style={{position: 'absolute', left: 140, top: 160}}>
        <SoftwareBox
          left={0}
          top={0}
          width={380}
          height={510}
          title={'RPG ツクール\nDante 98'}
          subtitle="PC-9801"
          year="1992.12.17"
          platform="ASCII"
          palette={{bg: '#24211d', ink: '#ece7da', accent: '#b33a2f'}}
          art="dante"
          rotate={-2}
          label="包装复原"
        />
      </div>
      <div style={{position: 'absolute', left: 700, top: 320, width: 900}}>
        <div style={{fontFamily: PIXEL, fontSize: 13, letterSpacing: 2, color: 'rgba(217,178,95,0.55)'}}>
          1992 / THE SAME PROMISE
        </div>
        <div style={{marginTop: 22, fontFamily: SERIF, fontWeight: 900, fontSize: 86, lineHeight: 1.45, color: C.cream, opacity: promise}}>
          这个承诺，
          <br />
          1992 年就有人许下。
        </div>
        <div style={{marginTop: 26, fontFamily: SERIF, fontWeight: 600, fontSize: 46, color: 'rgba(236,231,218,0.65)', opacity: promise2}}>
          不用编程，也能做游戏。
        </div>
      </div>
      <div style={{position: 'absolute', right: 120, bottom: 120, fontFamily: SANS, fontSize: 16, letterSpacing: 3, color: 'rgba(236,231,218,0.3)'}}>
        1992 / PC-9801
      </div>
    </div>
  );
};

export const SplitEras: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const black = interpolate(t, [6.0, 7.0], [0, 1], clamp);
  const one = interpolate(t, [6.4, 7.4], [0, 1], clamp);
  const two = interpolate(t, [8.8, 9.8], [0, 1], clamp);
  return (
    <div style={{position: 'absolute', inset: 0, background: '#050607', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, display: 'flex', opacity: 1 - black}}>
        <div style={{width: '50%', position: 'relative', overflow: 'hidden', borderRight: '1px solid rgba(236,231,218,0.2)'}}>
          <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 48% 44%, rgba(200,170,120,0.18), rgba(7,7,6,1) 68%)'}} />
          <div style={{position: 'absolute', left: 220, top: 340}}>
            <FloppyDisk left={0} top={0} size={400} rotate={-8} label={'1988 / 1992\n附录软盘'} />
          </div>
          <div style={{position: 'absolute', left: 90, top: 110, fontFamily: SANS, fontSize: 19, letterSpacing: 4, color: 'rgba(236,231,218,0.4)'}}>
            1992 / 软盘
          </div>
        </div>
        <div style={{width: '50%', position: 'relative', overflow: 'hidden'}}>
          <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 44%, rgba(96,140,170,0.18), rgba(6,8,10,1) 68%)'}} />
          <div style={{position: 'absolute', left: 110, top: 260, width: 700, height: 430, background: '#101820', border: '1px solid rgba(150,190,210,0.22)', padding: 36, boxSizing: 'border-box'}}>
            <div style={{fontFamily: 'monospace', fontSize: 14, color: 'rgba(150,190,210,0.55)', letterSpacing: 2}}>PROMPT / 2026</div>
            <div style={{marginTop: 22, fontFamily: SANS, fontSize: 24, lineHeight: 1.8, color: 'rgba(220,232,240,0.78)', whiteSpace: 'pre-wrap'}}>
              {PROMPT}
            </div>
            <div style={{marginTop: 30, fontFamily: PIXEL, fontSize: 11, color: 'rgba(150,190,210,0.4)'}}>GENERATING…</div>
          </div>
          <div style={{position: 'absolute', right: 90, top: 110, fontFamily: SANS, fontSize: 19, letterSpacing: 4, color: 'rgba(200,220,235,0.4)'}}>
            2026 / 对话框
          </div>
        </div>
      </div>
      <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 1 - black, pointerEvents: 'none'}}>
        <div style={{fontFamily: PIXEL, fontSize: 15, letterSpacing: 3, color: 'rgba(236,231,218,0.4)', background: 'rgba(5,6,7,0.72)', padding: '10px 18px'}}>
          1992 ——— 2026
        </div>
      </div>
      <div style={{position: 'absolute', inset: 0, background: '#040505', opacity: black}} />
      <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
        <div style={{fontFamily: SERIF, fontWeight: 900, fontSize: 84, lineHeight: 1.5, color: C.cream, opacity: one}}>
          变的只是工具。
        </div>
        <div style={{marginTop: 36, fontFamily: SERIF, fontWeight: 600, fontSize: 46, lineHeight: 1.7, color: 'rgba(236,231,218,0.62)', opacity: two}}>
          AI 可以生成一万个世界。
          <br />
          但总有人，会为其中一个，
          <br />
          熬到凌晨三点。
        </div>
        <div style={{marginTop: 40, width: 220, height: 3, background: C.red, opacity: two * 0.75}} />
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 60, textAlign: 'center', fontFamily: SANS, fontSize: 16, letterSpacing: 4, color: 'rgba(236,231,218,0.25)', opacity: 1 - black}}>
        三十四年 / 从软盘到对话框
      </div>
      <Caption dark={false}>1992 / 2026</Caption>
    </div>
  );
};
