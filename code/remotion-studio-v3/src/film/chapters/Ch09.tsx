import React from 'react';
import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import {Beat, ChapterFrame, ChapterStamp} from '../ChapterBase';
import {getChapter} from '../data';
import {EditorShell} from '../editor';
import {FoundersDoor1977} from '../illustrations';
import {WhaleNpc} from '../../rpg00/game/Whale';
import {PlayerSprite} from '../../rpg00/game/PlayerSprite';
import {FPS, PIXEL, SANS, SERIF, clamp, sec} from '../theme';

const chapter = getChapter('09');

const FoundersEnd: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const doc = interpolate(t, [12.0, 13.0], [0, 1], clamp);
  return (
    <div style={{position: 'absolute', inset: 0, background: '#0b0906'}}>
      <FoundersDoor1977 />
      <div
        style={{
          position: 'absolute',
          right: 120,
          top: 210,
          width: 500,
          padding: '26px 30px',
          background: 'rgba(235,226,208,0.94)',
          border: '1px solid rgba(60,45,25,0.35)',
          transform: `rotate(-2deg) translateY(${(1 - doc) * 24}px)`,
          opacity: doc,
          boxShadow: '0 30px 60px rgba(0,0,0,0.45)',
        }}
      >
        <div style={{fontFamily: PIXEL, fontSize: 10, letterSpacing: 2, color: '#8f2f2a'}}>
          2023 / LEGAL NOTICE
        </div>
        <div style={{marginTop: 16, fontFamily: SERIF, fontWeight: 900, fontSize: 38, lineHeight: 1.45, color: '#241f18'}}>
          破产程序
        </div>
        <div style={{marginTop: 14, fontFamily: SANS, fontSize: 15, lineHeight: 2, color: 'rgba(36,31,24,0.6)'}}>
          公司没了。标准没了。
          <br />
          连他本人，也在走程序。
        </div>
        <div style={{marginTop: 18, width: 120, height: 3, background: '#8f2f2a', opacity: 0.75}} />
        <div style={{marginTop: 10, fontFamily: SANS, fontSize: 12, letterSpacing: 2, color: 'rgba(36,31,24,0.4)'}}>
          公开资料 / 复原示意
        </div>
      </div>
    </div>
  );
};

const NewProject: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const dialog = interpolate(t, [0, 0.4, 2.0, 2.5], [0, 1, 1, 0], clamp);
  const whale = interpolate(t, [7.4, 8.2], [0, 1], clamp);
  const hero = interpolate(t, [10.0, 10.8], [0, 1], clamp);
  const black = interpolate(t, [11.8, 12.3], [0, 1], clamp);
  const cursor = Math.floor(frame / 18) % 2 === 0;
  return (
    <div style={{position: 'absolute', inset: 0, background: '#07080a'}}>
      <EditorShell
        title="RPG Maker 2000 - 新建工程"
        tree={
          <div style={{fontSize: 13, color: '#2a2822'}}>
            {['项目 1', '地图', '地图 001 (20 × 15)', '事件', '开关', '变量'].map((row, index) => (
              <div key={row} style={{height: 31, display: 'flex', alignItems: 'center', paddingLeft: 16 + (index > 0 ? 18 : 0) + (index > 2 ? 18 : 0), borderBottom: '1px solid rgba(90,80,60,0.16)'}}>
                <span style={{fontSize: 10, opacity: 0.5, marginRight: 8}}>▸</span>
                {row}
              </div>
            ))}
          </div>
        }
        right={
          <div style={{padding: 16, fontFamily: SANS, fontSize: 12, color: '#4a4439', lineHeight: 2}}>
            <div style={{fontWeight: 700, marginBottom: 8}}>图块素材</div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, opacity: 0.35}}>
              {Array.from({length: 16}, (_, index) => (
                <div key={index} style={{aspectRatio: '1', background: '#8f8a7d', border: '1px solid #6b665a'}} />
              ))}
            </div>
          </div>
        }
        bottom={
          <div style={{padding: '12px 16px', fontFamily: SANS, fontSize: 12, color: '#6b6455', lineHeight: 2}}>
            事件：无 / 开关：无 / 变量：无
          </div>
        }
        center={
          <div style={{position: 'absolute', inset: 22, background: '#20241f', border: '1px solid #8f8a7d', overflow: 'hidden'}}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage:
                  'linear-gradient(rgba(140,160,135,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(140,160,135,0.12) 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
            />
            <div style={{position: 'absolute', left: '55%', top: '46%', width: 120, height: 120, opacity: whale, transform: 'translate(-50%,-50%)'}}>
              <WhaleNpc frame={frame} />
            </div>
            <div style={{position: 'absolute', left: '42%', top: '56%', width: 64, height: 80, opacity: hero, transform: 'translate(-50%,-50%)'}}>
              <PlayerSprite direction="down" step={0} />
            </div>
            <div style={{position: 'absolute', left: '55%', top: '62%', width: 16, height: 2, background: 'rgba(217,178,95,0.4)', opacity: whale}} />
            <svg width="30" height="38" viewBox="0 0 22 28" style={{position: 'absolute', left: '48%', top: '48%', opacity: 1 - black, filter: 'drop-shadow(0 3px 2px rgba(0,0,0,0.5))'}}>
              <path d="M2 1 L2 21 L7 16 L11 25 L15 23 L11 14 L19 14 Z" fill="#f6f2e6" stroke="#111" strokeWidth="1.2" />
            </svg>
            <div style={{position: 'absolute', left: '50%', top: '54%', width: 2, height: 28, background: cursor ? '#f6f2e6' : 'transparent'}} />
          </div>
        }
        status="新建工程 / 地图 001 / 20 × 15 / 缩放 300%"
      />
      <div
        style={{
          position: 'absolute',
          left: 660,
          top: 330,
          width: 620,
          background: '#cfcabd',
          border: '2px solid #4b463c',
          boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
          opacity: dialog,
          transform: `translateY(${(1 - dialog) * 16}px)`,
        }}
      >
        <div style={{height: 32, background: 'linear-gradient(90deg,#0b2a6b,#1a4a9c)', color: '#fff', display: 'flex', alignItems: 'center', padding: '0 12px', fontSize: 14}}>
          新建工程
        </div>
        <div style={{padding: 26, fontFamily: SANS, fontSize: 14, color: '#2a2822', lineHeight: 2}}>
          <div style={{display: 'flex', gap: 10, alignItems: 'center'}}>
            <span style={{width: 100}}>工程名称</span>
            <span style={{flex: 1, height: 26, background: '#fff', border: '1px solid #8f8a7d', padding: '2px 8px'}}>我的游戏</span>
          </div>
          <div style={{display: 'flex', gap: 10, alignItems: 'center', marginTop: 10}}>
            <span style={{width: 100}}>地图尺寸</span>
            <span style={{flex: 1}}>20 × 15</span>
          </div>
          <div style={{display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 18}}>
            <span style={{padding: '5px 20px', background: '#e8e4d7', border: '1px solid #8f8a7d', boxShadow: 'inset 2px 2px 0 #f3efe3, inset -2px -2px 0 #8f8a7d'}}>确定</span>
            <span style={{padding: '5px 20px', background: '#cfcabd', border: '1px solid #8f8a7d'}}>取消</span>
          </div>
        </div>
      </div>
      <div style={{position: 'absolute', inset: 0, background: '#000', opacity: black}} />
    </div>
  );
};

export const Ch09: React.FC = () => {
  const frame = useCurrentFrame();
  const videoOpacity = Math.min(
    interpolate(frame, [0, sec(0.35)], [0, 1], clamp),
    interpolate(frame, [sec(8.35), sec(8.7)], [1, 0], clamp),
  );
  const sfx = [
    {at: 0.10, file: 'whoosh.wav', volume: 0.25},
    {at: 2.20, file: 'punch.wav', volume: 0.35},
    {at: 3.70, file: 'dialog.wav', volume: 0.25},
    {at: 8.70, file: 'whoosh.wav', volume: 0.3},
    {at: 17.66, file: 'paper.wav', volume: 0.28},
    {at: 24.29, file: 'whoosh.wav', volume: 0.3},
    {at: 24.66, file: 'click.wav', volume: 0.22},
    {at: 31.11, file: 'cursor.wav', volume: 0.2},
    {at: 34.19, file: 'cursor.wav', volume: 0.2},
    {at: 35.12, file: 'cursor.wav', volume: 0.2},
  ];
  return (
    <ChapterFrame chapter={chapter} mood="night" sfx={sfx} background="#040605" vignette={0.6}>
      <Sequence from={0} durationInFrames={sec(8.7)}>
        <AbsoluteFill style={{opacity: videoOpacity}}>
          <OffthreadVideo
            src={staticFile('video/crt_pullback_v3.mp4')}
            muted
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(1.18)',
            }}
          />
        </AbsoluteFill>
      </Sequence>
      <ChapterStamp chapter={chapter} />
      <Beat from={8.70} to={24.29} scale={1.2830} fadeIn={0.4} fadeOut={0.4}>
        <FoundersEnd />
      </Beat>
      <Beat from={24.29} to={36.05} scale={1.0708} fadeIn={0.35} fadeOut={0.2}>
        <NewProject />
      </Beat>
    </ChapterFrame>
  );
};
