import React from 'react';
import {Easing, interpolate, spring} from 'remotion';
import {FPS, T, clamp, sec} from '../theme';
import {WhalePortrait, WhaleExpression} from './Whale';

const WIN_BORDER = '4px solid #f2eee2';

const Window: React.FC<{
  left: number;
  top: number;
  width: number;
  height: number;
  opacity: number;
  children: React.ReactNode;
}> = ({left, top, width, height, opacity, children}) => (
  <div
    style={{
      position: 'absolute',
      left,
      top,
      width,
      height,
      opacity,
      background:
        'linear-gradient(180deg, #334f9f 0%, #1c2e71 38%, #0e1a45 100%)',
      border: WIN_BORDER,
      boxShadow: '0 0 0 4px #0a1028, 0 8px 24px rgba(0,0,0,0.55)',
      padding: 14,
      boxSizing: 'border-box',
      fontFamily: '"Noto Sans SC", sans-serif',
      color: '#f4f0e5',
    }}
  >
    {children}
  </div>
);

const hpFade = (frame: number) => {
  const inn = interpolate(frame, [sec(10.0), sec(10.6)], [0, 1], clamp);
  const out = interpolate(frame, [sec(31.0), sec(31.7)], [1, 0], clamp);
  return Math.min(inn, out);
};

const EnemyHp: React.FC<{frame: number}> = ({frame}) => {
  const hp = interpolate(
    frame,
    [sec(T.damage5), sec(T.damage5 + 0.45)],
    [100, 95],
    clamp,
  );
  return (
    <Window left={40} top={24} width={380} height={120} opacity={hpFade(frame)}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 28,
          letterSpacing: 1,
        }}
      >
        <span>小鲸鱼</span>
        <span style={{fontSize: 20, opacity: 0.8}}>Lv.1</span>
      </div>
      <div
        style={{
          marginTop: 10,
          height: 18,
          background: '#0a1028',
          border: '2px solid #e8e2d4',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            width: `${hp}%`,
            height: '100%',
            background: 'linear-gradient(180deg, #8adf7a, #3f9b4a)',
          }}
        />
      </div>
      <div style={{fontSize: 19, marginTop: 5, opacity: 0.9}}>
        HP {Math.round(hp)} / 100
      </div>
    </Window>
  );
};

const PlayerHp: React.FC<{frame: number}> = ({frame}) => {
  const hp = interpolate(
    frame,
    [sec(T.hpDrain), sec(T.hpDrain + 0.55)],
    [100, 0],
    clamp,
  );
  const flash = interpolate(
    frame,
    [sec(T.hpDrain), sec(T.hpDrain + 0.15), sec(T.hpDrain + 0.5)],
    [0, 1, 0],
    clamp,
  );
  return (
    <Window left={40} top={660} width={380} height={116} opacity={hpFade(frame)}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 28,
          letterSpacing: 1,
        }}
      >
        <span>我</span>
        <span style={{fontSize: 20, opacity: 0.8}}>Lv.1</span>
      </div>
      <div
        style={{
          marginTop: 9,
          height: 18,
          background: '#0a1028',
          border: '2px solid #e8e2d4',
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: `${hp}%`,
            height: '100%',
            background: 'linear-gradient(180deg, #8adf7a, #3f9b4a)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#ff4a3c',
            opacity: flash * 0.8,
          }}
        />
      </div>
      <div style={{fontSize: 19, marginTop: 4, opacity: 0.9}}>
        HP {Math.round(hp)} / 100
      </div>
    </Window>
  );
};

const Dialog: React.FC<{
  start: number;
  end: number;
  text: string;
  frame: number;
}> = ({start, end, text, frame}) => {
  const inSpring = spring({
    frame: Math.max(0, frame - sec(start)),
    fps: FPS,
    config: {damping: 15, stiffness: 170},
  });
  const out =
    frame > sec(end) ? 1 - interpolate(frame, [sec(end), sec(end + 0.2)], [0, 1], clamp) : 1;
  const progress = Math.min(inSpring, out);
  if (frame < sec(start) || frame > sec(end + 0.25)) {
    return null;
  }
  const blink = Math.floor(frame / 16) % 2 === 0;
  return (
    <div
      style={{
        position: 'absolute',
        left: 32,
        top: 792,
        width: 1216,
        height: 144,
        transform: `translateY(${(1 - progress) * 170}px)`,
        opacity: Math.max(0, progress),
        background:
          'linear-gradient(180deg, #314b9a 0%, #16245b 55%, #0b1437 100%)',
        border: WIN_BORDER,
        boxShadow: '0 0 0 4px #0a1028, 0 10px 30px rgba(0,0,0,0.55)',
        boxSizing: 'border-box',
        fontFamily: '"Noto Sans SC", sans-serif',
        color: '#f7f3e8',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 18,
          top: -22,
          padding: '3px 20px',
          background: '#1b2a6b',
          border: '3px solid #f2eee2',
          fontSize: 26,
          letterSpacing: 2,
        }}
      >
        小鲸鱼
      </div>
      <div style={{padding: '30px 36px', fontSize: 36, letterSpacing: 1}}>
        {text}
      </div>
      <div
        style={{
          position: 'absolute',
          right: 26,
          bottom: 18,
          width: 0,
          height: 0,
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderTop: '14px solid #f2eee2',
          opacity: blink ? 0.9 : 0,
        }}
      />
    </div>
  );
};

const DamageFive: React.FC<{frame: number}> = ({frame}) => {
  if (frame < sec(T.damage5) || frame > sec(T.damage5 + 0.85)) {
    return null;
  }
  const local = frame - sec(T.damage5);
  const pop = spring({
    frame: local,
    fps: FPS,
    config: {damping: 10, stiffness: 220},
  });
  const opacity = interpolate(local, [0, 6, 30, 48], [0, 1, 1, 0], clamp);
  const rise = interpolate(local, [0, 48], [0, -70], clamp);
  return (
    <div
      style={{
        position: 'absolute',
        left: 640,
        top: 420 + rise,
        transform: `translate(-50%, -50%) scale(${0.7 + pop * 0.3})`,
        fontFamily: '"Press Start 2P", monospace',
        fontSize: 64,
        color: '#ffffff',
        opacity,
        WebkitTextStroke: '4px #12141a',
        paintOrder: 'stroke fill',
        textShadow: '0 6px 0 #12141a',
      }}
    >
      5
    </div>
  );
};

const DamageNine: React.FC<{frame: number}> = ({frame}) => {
  if (frame < sec(T.damage999) || frame > sec(T.damage999 + 1.7)) {
    return null;
  }
  const local = frame - sec(T.damage999);
  const slam = spring({
    frame: local,
    fps: FPS,
    config: {damping: 8, stiffness: 200, mass: 0.7},
  });
  const opacity = interpolate(local, [0, 3, 36, 48], [0, 1, 1, 0], clamp);
  const burst = interpolate(local, [0, 4, 12], [0.4, 1.15, 1.5], clamp);
  const burstOpacity = interpolate(local, [0, 3, 14], [0, 1, 0], clamp);
  const scale = 2.6 - slam * 1.6;
  const rotate = interpolate(slam, [0, 1], [-12, 0]);
  return (
    <>
      <svg
        width={520}
        height={520}
        viewBox="0 0 520 520"
        style={{
          position: 'absolute',
          left: 640 - 260,
          top: 450 - 260,
          opacity: burstOpacity,
          transform: `scale(${burst})`,
        }}
      >
        {Array.from({length: 12}, (_, index) => {
          const angle = (index / 12) * Math.PI * 2;
          const inner = 86;
          const outer = 190 + (index % 3) * 24;
          return (
            <line
              key={index}
              x1={260 + Math.cos(angle) * inner}
              y1={260 + Math.sin(angle) * inner}
              x2={260 + Math.cos(angle) * outer}
              y2={260 + Math.sin(angle) * outer}
              stroke={index % 2 === 0 ? '#ffe6a8' : '#ff7a3c'}
              strokeWidth={index % 2 === 0 ? 9 : 5}
              strokeLinecap="square"
            />
          );
        })}
        <circle
          cx={260}
          cy={260}
          r={92}
          fill="none"
          stroke="#fff1c4"
          strokeWidth={6}
          opacity={0.8}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          left: 640,
          top: 450,
          transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotate}deg)`,
          fontFamily: '"Press Start 2P", monospace',
          fontSize: 150,
          color: '#ffd24a',
          opacity,
          WebkitTextStroke: '8px #6b170f',
          paintOrder: 'stroke fill',
          textShadow:
            '0 10px 0 #6b170f, 0 0 42px rgba(255,90,40,0.85), 0 0 90px rgba(255,140,50,0.45)',
          whiteSpace: 'nowrap',
        }}
      >
        999
      </div>
    </>
  );
};

const Slash: React.FC<{frame: number}> = ({frame}) => {
  if (frame < sec(T.slash) || frame > sec(T.slash + 0.3)) {
    return null;
  }
  const local = frame - sec(T.slash);
  const p = interpolate(local, [0, 4, 9], [0, 1, 1], clamp);
  const opacity = interpolate(local, [0, 2, 6, 9], [0, 1, 1, 0], clamp);
  const left = 300 + p * 380;
  const top = 240 + p * 300;
  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width: 560,
        height: 18,
        transform: 'rotate(-32deg)',
        transformOrigin: '0 50%',
        opacity,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(255,255,255,0) 0%, #ffffff 18%, #ffffff 78%, rgba(255,255,255,0) 100%)',
          boxShadow: '0 0 20px rgba(255,255,255,0.85)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 36,
          top: 24,
          width: 450,
          height: 4,
          background: '#ffffff',
          opacity: 0.6,
          boxShadow: '0 0 16px #ffffff',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 110,
          top: -14,
          width: 380,
          height: 3,
          background: '#dff4ff',
          opacity: 0.55,
          boxShadow: '0 0 14px #bde9ff',
        }}
      />
    </div>
  );
};

const FistSvg: React.FC = () => (
  <svg
    width="256"
    height="256"
    viewBox="0 0 64 64"
    shapeRendering="crispEdges"
    style={{filter: 'drop-shadow(0 0 26px rgba(255,110,50,0.55))'}}
  >
    <rect x="16" y="34" width="30" height="24" fill="#0a0e1a" />
    <rect x="10" y="14" width="44" height="34" fill="#0a0e1a" />
    <rect x="8" y="20" width="8" height="20" fill="#0a0e1a" />
    <rect x="18" y="8" width="8" height="16" fill="#0a0e1a" />
    <rect x="26" y="6" width="8" height="18" fill="#0a0e1a" />
    <rect x="34" y="8" width="8" height="16" fill="#0a0e1a" />
    <rect x="42" y="12" width="8" height="14" fill="#0a0e1a" />

    <rect x="18" y="36" width="26" height="20" fill="#31466f" />
    <rect x="12" y="16" width="40" height="30" fill="#3a4f7a" />
    <rect x="10" y="22" width="6" height="16" fill="#2b3f6b" />
    <rect x="20" y="10" width="6" height="14" fill="#43598c" />
    <rect x="28" y="8" width="6" height="16" fill="#4d65a0" />
    <rect x="36" y="10" width="6" height="14" fill="#43598c" />
    <rect x="44" y="14" width="5" height="12" fill="#2b3f6b" />
    <rect x="12" y="16" width="40" height="4" fill="#7d93c7" />
    <rect x="20" y="10" width="6" height="2" fill="#9bb0dc" />
    <rect x="28" y="8" width="6" height="2" fill="#aec1e8" />
    <rect x="36" y="10" width="6" height="2" fill="#9bb0dc" />
    <rect x="18" y="38" width="26" height="3" fill="#6b82b5" />
    <rect x="22" y="48" width="18" height="4" fill="#22324f" />
    <rect x="10" y="44" width="8" height="8" fill="#2b3f6b" />
  </svg>
);

const Fist: React.FC<{frame: number}> = ({frame}) => {
  if (frame < sec(T.fist) || frame > sec(T.slam + 0.1)) {
    return null;
  }
  const local = frame - sec(T.fist);
  const total = sec(T.slam) - sec(T.fist);
  const p = interpolate(local, [0, total], [0, 1], {
    ...clamp,
    easing: Easing.in(Easing.cubic),
  });
  const left = interpolate(p, [0, 1], [1080, 640]);
  const top = interpolate(p, [0, 1], [-200, 410]);
  const scale = interpolate(p, [0, 1], [1.55, 1.0]);
  const rotate = interpolate(p, [0, 1], [-22, -4]);
  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotate}deg)`,
        opacity: interpolate(local, [0, 5], [0, 1], clamp),
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 40,
          top: 40,
          width: 220,
          height: 220,
          background:
            'repeating-linear-gradient(135deg, rgba(255,255,255,0.5) 0 6px, transparent 6px 30px)',
          opacity: 0.5,
        }}
      />
      <FistSvg />
    </div>
  );
};

const GameOver: React.FC<{frame: number}> = ({frame}) => {
  if (frame < sec(T.gameOver) || frame > sec(28.5)) {
    return null;
  }
  const local = frame - sec(T.gameOver);
  const opacity = interpolate(local, [0, 10, 55, 66], [0, 1, 1, 0], clamp);
  const scale = spring({
    frame: local,
    fps: FPS,
    config: {damping: 14, stiffness: 130},
  });
  const blink = Math.floor(frame / 18) % 2 === 0;
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'linear-gradient(180deg, rgba(6,6,8,0.76) 0%, rgba(6,6,8,0.9) 100%)',
        opacity,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Noto Sans SC", sans-serif',
      }}
    >
      <div
        style={{
          fontFamily: '"Press Start 2P", monospace',
          fontSize: 92,
          color: '#b63a33',
          letterSpacing: 8,
          transform: `scale(${scale})`,
          textShadow: '0 8px 0 #140b0a, 0 0 36px rgba(200,60,50,0.45)',
        }}
      >
        GAME OVER
      </div>
      <div
        style={{
          marginTop: 34,
          width: 620,
          height: 2,
          background: 'rgba(226,220,205,0.35)',
        }}
      />
      <div style={{marginTop: 24, fontSize: 34, color: '#ded8ca'}}>
        小鲸鱼 胜利了
      </div>
      <div
        style={{
          marginTop: 26,
          fontFamily: '"Press Start 2P", monospace',
          fontSize: 22,
          color: '#8e887c',
          opacity: blink ? 0.9 : 0.15,
        }}
      >
        PRESS ENTER
      </div>
    </div>
  );
};

export const BattleLayer: React.FC<{frame: number}> = ({frame}) => {
  const portraitIn = spring({
    frame: Math.max(0, frame - sec(T.whalePop)),
    fps: FPS,
    config: {damping: 13, stiffness: 130},
  });
  const portraitOut = interpolate(
    frame,
    [sec(36.4), sec(38.4)],
    [1, 0],
    clamp,
  );
  const portraitVisible =
    frame >= sec(T.whalePop) ? Math.min(portraitIn, portraitOut) : 0;

  let expression: WhaleExpression = 'normal';
  if (frame >= sec(13.7) && frame < sec(14.3)) {
    expression = 'hurt';
  }
  if (frame >= sec(T.whaleTilt) && frame < sec(20.85)) {
    expression = 'tilt';
  }
  if (frame >= sec(20.7) && frame < sec(20.85)) {
    expression = 'blink';
  }
  if (frame >= sec(T.damage999)) {
    expression = 'smug';
  }

  const tilt = interpolate(
    frame,
    [sec(T.whaleTilt), sec(T.whaleTilt + 0.4), sec(20.0), sec(20.4)],
    [0, 5, 5, 0],
    clamp,
  );
  const victoryHop =
    frame >= sec(T.slam + 0.2) && frame < sec(T.slam + 0.9)
      ? Math.sin(((frame - sec(T.slam + 0.2)) / (0.7 * FPS)) * Math.PI) * 26
      : 0;
  const hurtNudge =
    frame >= sec(13.7) && frame < sec(14.1)
      ? Math.sin(((frame - sec(13.7)) / (0.4 * FPS)) * Math.PI) * 18
      : 0;

  return (
    <div style={{position: 'absolute', inset: 0}}>
      <div
        style={{
          position: 'absolute',
          left: 410,
          top: 760,
          width: 460,
          height: 40,
          borderRadius: '50%',
          background: 'rgba(0,0,0,0.35)',
          opacity: portraitVisible * 0.8,
          filter: 'blur(8px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 320,
          top: 276,
          width: 640,
          height: 500,
          opacity: portraitVisible,
          transform: `translateY(${(1 - portraitIn) * 70 - victoryHop + hurtNudge}px) rotate(${tilt}deg)`,
          transformOrigin: '50% 80%',
        }}
      >
        <WhalePortrait expression={expression} frame={frame} scale={10} />
      </div>

      <EnemyHp frame={frame} />
      <PlayerHp frame={frame} />

      <Dialog start={T.whalePop} end={13.3} text="出现了！" frame={frame} />
      <Dialog
        start={T.whaleTilt}
        end={20.0}
        text="歪了歪头。"
        frame={frame}
      />
      <Dialog
        start={20.4}
        end={22.0}
        text="使用了 拳击！"
        frame={frame}
      />

      <Slash frame={frame} />
      <DamageFive frame={frame} />
      <Fist frame={frame} />
      <DamageNine frame={frame} />
      <GameOver frame={frame} />
    </div>
  );
};
