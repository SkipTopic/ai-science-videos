import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {
  Caption,
  Halftone,
  Kicker,
  PaperBG,
  Reconstruction,
} from '../components';
import {FloppyDisk, MagazineCover} from '../objects';
import {C, FPS, PIXEL, SANS, SERIF, clamp} from '../theme';

export const Magazine1977: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const codeIn = interpolate(t, [4.2, 5.2], [0, 1], clamp);
  const namesIn = interpolate(t, [8.0, 8.8], [0, 1], clamp);
  const rows = [
    {letter: 'A', code: '1000001 / 65'},
    {letter: 'S', code: '1010011 / 83'},
    {letter: 'C', code: '1000011 / 67'},
    {letter: 'I', code: '1001001 / 73'},
    {letter: 'I', code: '1001001 / 73'},
  ];
  return (
    <div style={{position: 'absolute', inset: 0, background: '#17120e', overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 30% 38%, rgba(218,166,98,0.26) 0%, rgba(24,17,12,0.96) 64%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 260,
          background: 'linear-gradient(to top, rgba(8,6,4,1), rgba(8,6,4,0))',
        }}
      />
      <div style={{position: 'absolute', left: 150, top: 108, transform: 'rotate(-1.5deg)'}}>
        <MagazineCover
          left={0}
          top={0}
          width={600}
          height={800}
          title="月刊 ASCII"
          issue="1977 年 6 月号 / 创刊号"
          price="40 页"
          headline={'个人电脑\n新时代'}
          sublines={['从硬件到软件', '日本第一本电脑杂志', '定价 680 日元']}
          dark={false}
          label="封面复原"
        />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 880,
          top: 148,
          width: 880,
          opacity: codeIn,
        }}
      >
        <Kicker color="rgba(236,231,218,0.42)">AMERICAN STANDARD CODE FOR INFORMATION INTERCHANGE</Kicker>
        <div
          style={{
            marginTop: 20,
            fontFamily: SERIF,
            fontWeight: 900,
            fontSize: 108,
            letterSpacing: 8,
            color: C.cream,
            lineHeight: 1.1,
          }}
        >
          ASCII
        </div>
        <div
          style={{
            marginTop: 14,
            fontFamily: SANS,
            fontSize: 25,
            letterSpacing: 2,
            color: 'rgba(236,231,218,0.56)',
          }}
        >
          美国信息交换标准代码
        </div>
        <div style={{marginTop: 38, borderTop: '1px solid rgba(236,231,218,0.18)'}}>
          {rows.map((row, index) => {
            const reveal = interpolate(t, [5.0 + index * 0.5, 5.4 + index * 0.5], [0, 1], clamp);
            return (
              <div
                key={`${row.letter}-${index}`}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 24,
                  padding: '10px 0',
                  borderBottom: '1px solid rgba(236,231,218,0.1)',
                  opacity: reveal,
                }}
              >
                <span style={{fontFamily: PIXEL, fontSize: 22, color: '#d9b25f', width: 44}}>
                  {row.letter}
                </span>
                <span style={{fontFamily: 'monospace', fontSize: 22, letterSpacing: 3, color: 'rgba(236,231,218,0.65)'}}>
                  {row.code}
                </span>
                <span style={{marginLeft: 'auto', fontFamily: SANS, fontSize: 15, color: 'rgba(236,231,218,0.32)'}}>
                  {index === 4 ? '...' : ''}
                </span>
              </div>
            );
          })}
        </div>
        <div
          style={{
            marginTop: 36,
            display: 'flex',
            gap: 40,
            fontFamily: SERIF,
            fontSize: 34,
            lineHeight: 1.6,
            color: 'rgba(236,231,218,0.78)',
            opacity: namesIn,
          }}
        >
          <div>
            一个听起来
            <br />
            跟游戏毫无关系
            <br />
            的名字。
          </div>
          <div style={{width: 1, background: 'rgba(236,231,218,0.16)'}} />
          <div style={{fontFamily: SANS, fontSize: 19, letterSpacing: 1.5, color: 'rgba(236,231,218,0.42)'}}>
            那时候，他们想做的
            <br />
            根本不是游戏。
          </div>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          right: 120,
          top: 100,
          fontFamily: SANS,
          fontSize: 18,
          letterSpacing: 4,
          color: 'rgba(236,231,218,0.32)',
        }}
      >
        1977 / 月刊 ASCII 创刊号
      </div>
      <Halftone opacity={0.1} size={5} color="255,230,190" />
      <Reconstruction text="杂志封面复原示意" />
      <Caption>《月刊 ASCII》创刊号 / 1977</Caption>
    </div>
  );
};

export const BackTo1988: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const enter = interpolate(t, [0.2, 1.2], [0, 1], clamp);
  const line = interpolate(t, [1.0, 2.4], [0, 1], clamp);
  return (
    <PaperBG>
      <div
        style={{
          position: 'absolute',
          left: 150,
          top: 0,
          bottom: 0,
          width: 1100,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          opacity: enter,
        }}
      >
        <div style={{fontFamily: SANS, fontSize: 22, letterSpacing: 6, color: 'rgba(28,26,22,0.42)'}}>
          REWIND / 1988
        </div>
        <div
          style={{
            marginTop: 18,
            fontFamily: SERIF,
            fontWeight: 900,
            fontSize: 300,
            letterSpacing: 6,
            lineHeight: 0.95,
            color: C.ink,
          }}
        >
          1988
        </div>
        <div
          style={{
            marginTop: 28,
            width: `${line * 70}%`,
            height: 4,
            background: C.red,
          }}
        />
        <div
          style={{
            marginTop: 30,
            fontFamily: SERIF,
            fontWeight: 600,
            fontSize: 48,
            lineHeight: 1.55,
            color: 'rgba(28,26,22,0.76)',
            opacity: line,
          }}
        >
          时间倒回。
          <br />
          一本杂志的附录里，
          <br />
          藏着一个小程序。
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          right: 220,
          top: 300,
          transform: 'rotate(7deg)',
          opacity: Math.min(1, Math.max(0, (t - 1.0) / 0.8)),
        }}
      >
        <FloppyDisk left={0} top={0} size={360} rotate={-6} label={'1988\n附录软盘'} />
      </div>
      <div
        style={{
          position: 'absolute',
          right: 140,
          bottom: 100,
          fontFamily: SANS,
          fontSize: 18,
          letterSpacing: 3,
          color: 'rgba(28,26,22,0.35)',
        }}
      >
        1988 / 月刊 ASCII 附录
      </div>
      <Reconstruction text="软盘复原示意" dark />
    </PaperBG>
  );
};
