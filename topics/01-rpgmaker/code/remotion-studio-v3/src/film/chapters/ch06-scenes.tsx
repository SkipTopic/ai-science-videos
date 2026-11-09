import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {BrowserFrame, Forum66RPG} from '../archive';
import {Caption, Reconstruction} from '../components';
import {EditorShell} from '../editor';
import {DarkHolySword} from '../pixel';
import {StudentAtPC} from '../illustrations';
import {C, FPS, PIXEL, SANS, SERIF, clamp, hash} from '../theme';

export const ChinaRoom: React.FC<{
  statement?: string;
  statementAt?: number;
  zoom?: boolean;
  plain?: boolean;
}> = ({statement, statementAt = 0.5, zoom = false, plain = false}) => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const opacity = interpolate(t, [statementAt, statementAt + 0.8], [0, 1], clamp);
  return (
    <div style={{position: 'absolute', inset: 0, background: '#050608', overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: zoom ? 'scale(1.22) translate(-5%, -3%)' : 'scale(1)',
          transformOrigin: '58% 46%',
        }}
      >
        <StudentAtPC china chrome={false} />
      </div>
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(4,6,8,0.72) 0%, rgba(4,6,8,0) 46%)'}} />
      {plain ? null : (
        <div style={{position: 'absolute', left: 84, top: 92}}>
          <div style={{fontFamily: PIXEL, fontSize: 13, letterSpacing: 2, color: 'rgba(200,220,230,0.45)'}}>
            2005 / CHINA / ONE ROOM
          </div>
          <div style={{marginTop: 18, fontFamily: SERIF, fontWeight: 900, fontSize: 76, color: C.cream, lineHeight: 1.35}}>
            一台家用电脑，
            <br />
            一个玩家。
          </div>
          {statement ? (
            <div
              style={{
                marginTop: 34,
                fontFamily: SERIF,
                fontWeight: 600,
                fontSize: 36,
                lineHeight: 1.6,
                color: 'rgba(236,231,218,0.72)',
                opacity,
              }}
            >
              {statement}
            </div>
          ) : null}
        </div>
      )}
      {plain ? null : (
        <div style={{position: 'absolute', right: 60, bottom: 42, fontFamily: SANS, fontSize: 14, letterSpacing: 2, color: 'rgba(236,231,218,0.3)'}}>
          房间 / 复原示意
        </div>
      )}
    </div>
  );
};

export const HolySwordScene: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const panel = interpolate(t, [4.8, 5.8], [0, 1], clamp);
  return (
    <div style={{position: 'absolute', inset: 0, background: '#060606'}}>
      <DarkHolySword
        label="黑暗圣剑传说 / 2005 / RPG MAKER XP"
        caption="十小时剧情 / 工程文件于次年公开"
      />
      <div
        style={{
          position: 'absolute',
          right: 90,
          top: 120,
          width: 520,
          padding: '24px 28px',
          background: 'rgba(8,8,9,0.82)',
          border: '1px solid rgba(217,178,95,0.25)',
          opacity: panel,
        }}
      >
        <div style={{fontFamily: PIXEL, fontSize: 10, letterSpacing: 2, color: 'rgba(217,178,95,0.6)'}}>
          ENGINE / RGSS
        </div>
        <div style={{marginTop: 14, fontFamily: SERIF, fontWeight: 900, fontSize: 38, color: C.cream, lineHeight: 1.45}}>
          底层，全部改了一遍。
        </div>
        <div style={{marginTop: 18, fontFamily: 'monospace', fontSize: 12, lineHeight: 1.9, color: 'rgba(180,210,190,0.55)'}}>
          # Window_Menu
          <br />
          # Scene_Battle
          <br />
          # Game_Switches
          <br />
          # 10 hours of story
        </div>
        <div style={{marginTop: 18, fontFamily: SANS, fontSize: 13, letterSpacing: 2, color: 'rgba(236,231,218,0.35)'}}>
          柳柳 / 2005
        </div>
      </div>
      <Reconstruction text="游戏画面复原示意" />
      <Caption>《黑暗圣剑传说》/ 2005</Caption>
    </div>
  );
};

const treeRows = [
  {label: '黑暗圣剑传说', depth: 0},
  {label: 'Data', depth: 1},
  {label: 'Actors.rxdata', depth: 2},
  {label: 'Classes.rxdata', depth: 2},
  {label: 'Map001.rxdata', depth: 2},
  {label: 'Map002.rxdata', depth: 2},
  {label: 'Scripts.rxdata', depth: 2},
  {label: 'Graphics', depth: 1},
  {label: 'Audio', depth: 1},
  {label: 'Game.exe', depth: 1},
];

export const ProjectTree: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const select = Math.min(9, Math.floor(t * 0.6));
  const stamp = interpolate(t, [3.2, 4.2], [0, 1], clamp);
  const files = [
    ['Map001.rxdata', '地图', '2.4 MB'],
    ['Map002.rxdata', '地图', '1.8 MB'],
    ['Scripts.rxdata', '脚本', '428 KB'],
    ['Actors.rxdata', '角色', '64 KB'],
    ['Classes.rxdata', '职业', '52 KB'],
    ['Game.exe', '执行文件', '3.1 MB'],
  ];
  return (
    <div style={{position: 'absolute', inset: 0, background: '#08090b'}}>
      <EditorShell
        title="RPG Maker XP / 黑暗圣剑传说"
        tree={
          <div>
            {treeRows.map((row, index) => (
              <div
                key={row.label}
                style={{
                  height: 31,
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: 16 + row.depth * 20,
                  fontSize: 13,
                  color: index === select ? '#fff' : '#2a2822',
                  background: index === select ? '#1f4f9c' : 'transparent',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <span style={{fontSize: 10, marginRight: 8, opacity: 0.6}}>▸</span>
                {row.label}
              </div>
            ))}
          </div>
        }
        right={
          <div style={{padding: 16, fontSize: 12, color: '#2a2822', lineHeight: 2}}>
            <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 13, marginBottom: 8}}>开关 / 变量</div>
            {['0001 序章开始', '0002 得到圣剑', '0003 同伴加入', '0004 城门打开'].map((item, index) => (
              <div key={item} style={{display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(60,55,45,0.16)', padding: '4px 0'}}>
                <span>{item}</span>
                <span style={{fontFamily: PIXEL, fontSize: 9}}>{index < 2 ? 'ON' : 'OFF'}</span>
              </div>
            ))}
          </div>
        }
        bottom={
          <div style={{padding: '10px 16px', fontFamily: SANS, fontSize: 12, color: '#4a4439', lineHeight: 2}}>
            工程目录：C:\\Game\\DarkHolySword\\ / 2,146 个文件 / 公开于 2006
          </div>
        }
        center={
          <div style={{position: 'absolute', inset: 20, background: '#f3efe2', border: '1px solid #8f8a7d', boxShadow: 'inset 2px 2px 0 #fff'}}>
            <div style={{height: 34, background: '#e2ddd0', borderBottom: '1px solid #b3aea1', display: 'flex', alignItems: 'center', padding: '0 12px', justifyContent: 'space-between', fontSize: 12, color: '#2a2822'}}>
              <span>资源管理器 / 工程文件</span>
              <span style={{fontFamily: PIXEL, fontSize: 9, opacity: 0.5}}>OPEN SOURCE / 2006</span>
            </div>
            {files.map((row, index) => (
              <div key={row[0]} style={{display: 'flex', padding: '9px 16px', borderBottom: '1px solid rgba(90,80,60,0.14)', fontSize: 13, color: '#332e26', background: index === 0 ? '#d8e4f0' : 'transparent'}}>
                <span style={{flex: 1}}>{row[0]}</span>
                <span style={{width: 120, opacity: 0.55}}>{row[1]}</span>
                <span style={{width: 100, textAlign: 'right', opacity: 0.5}}>{row[2]}</span>
              </div>
            ))}
            <div
              style={{
                position: 'absolute',
                right: 34,
                bottom: 30,
                width: 260,
                height: 140,
                border: `3px solid ${C.red}`,
                color: C.red,
                fontFamily: SERIF,
                fontWeight: 900,
                fontSize: 36,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'rotate(-8deg)',
                opacity: stamp * 0.7,
              }}
            >
              工程公开
              <div style={{fontSize: 18, fontFamily: SANS, letterSpacing: 3, marginTop: 8}}>2006</div>
            </div>
          </div>
        }
        status="工程 / 2,146 个文件 / RGSS"
      />
      <Reconstruction text="工程界面复原示意" />
    </div>
  );
};

export const StudentMoment: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const thought = interpolate(t, [8.0, 9.2], [0, 1], clamp);
  return (
    <div style={{position: 'absolute', inset: 0, background: '#050608'}}>
      <ChinaRoom zoom plain />
      <div style={{position: 'absolute', inset: 0, background: 'rgba(4,6,8,0.08)'}} />
      <div style={{position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 58% 42%, rgba(150,190,210,0.16) 0%, rgba(0,0,0,0) 44%)'}} />
      <div style={{position: 'absolute', left: 110, bottom: 160, maxWidth: 1180}}>
        <div style={{fontFamily: PIXEL, fontSize: 13, letterSpacing: 2, color: 'rgba(200,220,230,0.45)'}}>
          A MIDDLE SCHOOL STUDENT / 2006
        </div>
        <div style={{marginTop: 18, fontFamily: SERIF, fontWeight: 900, fontSize: 82, lineHeight: 1.45, color: C.cream, textShadow: '0 6px 30px rgba(0,0,0,0.75)'}}>
          第一次看见——
          <br />
          <span style={{color: '#d9b25f', opacity: thought}}>原来门是这么做出来的。</span>
        </div>
        <div style={{marginTop: 26, fontFamily: SANS, fontSize: 20, lineHeight: 2, letterSpacing: 1, color: 'rgba(236,231,218,0.62)'}}>
          下载它。打开它。
          <br />
          那不是盗版资源。那是一本教材。
        </div>
      </div>
      <div style={{position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 60% 45%, rgba(0,0,0,0) 44%, rgba(0,0,0,0.34) 100%)'}} />
    </div>
  );
};

export const Forum66Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const scroll = interpolate(t, [0, 12], [0, 110], clamp);
  const ending = interpolate(t, [11.5, 12.5], [0, 1], clamp);
  return (
    <div style={{position: 'absolute', inset: 0, background: '#07090b'}}>
      <BrowserFrame
        title="Internet Explorer"
        url="http://bbs.66rpg.com/"
        left={140}
        top={70}
        width={1640}
        height={940}
        scroll={scroll}
        pageHeight={1500}
        status="66RPG / 中文 RPG 制作论坛"
      >
        <Forum66RPG scroll={scroll} />
      </BrowserFrame>
      <div style={{position: 'absolute', inset: 0, background: '#030405', opacity: ending * 0.86}} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: ending,
          textAlign: 'center',
        }}
      >
        <div style={{fontFamily: SERIF, fontWeight: 900, fontSize: 76, lineHeight: 1.6, color: C.cream}}>
          在中国，RPG Maker
          <br />
          从来不是开发工具。
        </div>
        <div style={{marginTop: 26, fontFamily: SERIF, fontWeight: 900, fontSize: 92, color: '#d9b25f'}}>
          它是表达工具。
        </div>
      </div>
      <div style={{position: 'absolute', left: 80, top: 50, fontFamily: PIXEL, fontSize: 12, letterSpacing: 2, color: 'rgba(220,235,245,0.45)', opacity: 1 - ending}}>
        66RPG / 2005 — 2006
      </div>
    </div>
  );
};
