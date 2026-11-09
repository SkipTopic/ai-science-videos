import React from 'react';
import {interpolate, spring} from 'remotion';
import {EditorChrome} from '../rpg00/game/EditorChrome';
import {C, FPS, PIXEL, SANS, SERIF, clamp, hash} from './theme';
import {Caption, Halftone, Scanlines} from './components';
import {useSceneFrame} from './sceneClock';

const PANEL = '#cfcabd';
const PANEL_DARK = '#b3aea1';
const PANEL_LIGHT = '#e8e4d7';
const INK = '#1d1d1b';
const BEVEL_TOP = 'inset 2px 2px 0 #f3efe3, inset -2px -2px 0 #8f8a7d';
const BEVEL_IN = 'inset 2px 2px 0 #8f8a7d, inset -2px -2px 0 #f3efe3';

const Bar: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({
  children,
  style,
}) => (
  <div
    style={{
      background: PANEL,
      border: '1px solid #8f8a7d',
      boxShadow: BEVEL_TOP,
      boxSizing: 'border-box',
      ...style,
    }}
  >
    {children}
  </div>
);

export const EditorShell: React.FC<{
  title: string;
  tree?: React.ReactNode;
  right?: React.ReactNode;
  bottom?: React.ReactNode;
  center: React.ReactNode;
  status?: string;
  dim?: number;
}> = ({title, tree, right, bottom, center, status = '地图 001 · 20 × 15 · 缩放 300%', dim = 0}) => (
  <div style={{position: 'absolute', inset: 0, background: '#17191d', overflow: 'hidden'}}>
    <div
      style={{
        position: 'absolute',
        left: 24,
        top: 20,
        width: 1872,
        height: 1044,
        background: PANEL,
        border: '1px solid #6b665a',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          height: 38,
          background: 'linear-gradient(90deg,#0b2a6b,#1a4a9c)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          fontFamily: SANS,
          fontSize: 17,
          letterSpacing: 1,
        }}
      >
        {title}
        <div style={{marginLeft: 'auto', display: 'flex', gap: 4}}>
          {['_', '□', '×'].map((item) => (
            <div
              key={item}
              style={{
                width: 28,
                height: 25,
                background: PANEL,
                color: INK,
                border: '1px solid #8f8a7d',
                boxShadow: BEVEL_TOP,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 15,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          height: 34,
          display: 'flex',
          alignItems: 'center',
          gap: 26,
          padding: '0 16px',
          borderBottom: '1px solid #a9a396',
          fontSize: 14,
          color: INK,
        }}
      >
        {['文件', '编辑', '视图', '插入', '工具', '游戏', '帮助'].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div
        style={{
          height: 44,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '0 12px',
          borderBottom: '1px solid #a9a396',
        }}
      >
        {['新建', '打开', '保存', '撤销', '播放', '测试'].map((item) => (
          <div
            key={item}
            style={{
              padding: '5px 12px',
              border: '1px solid #8f8a7d',
              boxShadow: BEVEL_TOP,
              background: PANEL_LIGHT,
              fontSize: 13,
              color: INK,
            }}
          >
            {item}
          </div>
        ))}
        <div style={{marginLeft: 16, fontSize: 13, color: '#4a4439'}}>{status}</div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 8,
          top: 124,
          width: 360,
          bottom: 20,
          border: '1px solid #8f8a7d',
          boxShadow: BEVEL_IN,
          overflow: 'hidden',
        }}
      >
        <div style={{padding: '8px 12px', fontSize: 13, background: PANEL_DARK, borderBottom: '1px solid #8f8a7d'}}>
          地图树
        </div>
        {tree}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 380,
          top: 124,
          right: 360,
          bottom: 196,
          border: '1px solid #8f8a7d',
          boxShadow: BEVEL_IN,
          overflow: 'hidden',
          background: '#1a1c1e',
        }}
      >
        {center}
      </div>
      <div
        style={{
          position: 'absolute',
          right: 8,
          top: 124,
          width: 340,
          bottom: 20,
          border: '1px solid #8f8a7d',
          boxShadow: BEVEL_IN,
          overflow: 'hidden',
          background: PANEL,
        }}
      >
        <div style={{padding: '8px 12px', fontSize: 13, background: PANEL_DARK, borderBottom: '1px solid #8f8a7d'}}>
          图块素材 / 数据库
        </div>
        {right}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 380,
          right: 8,
          bottom: 20,
          height: 160,
          border: '1px solid #8f8a7d',
          boxShadow: BEVEL_IN,
          overflow: 'hidden',
          background: PANEL,
        }}
      >
        {bottom}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 20,
          background: PANEL_DARK,
          borderTop: '1px solid #8f8a7d',
          fontSize: 12,
          color: '#4a4439',
          display: 'flex',
          alignItems: 'center',
          padding: '0 10px',
          gap: 22,
        }}
      >
        <span>图块 16 × 16 px</span>
        <span>光标 (15, 4)</span>
        <span>缩放 300%</span>
        <span style={{marginLeft: 'auto'}}>开关 3</span>
      </div>
    </div>
    {dim > 0 ? (
      <div style={{position: 'absolute', inset: 0, background: `rgba(6,8,12,${dim})`}} />
    ) : null}
  </div>
);

const TreeRows: React.FC<{rows: {label: string; depth?: number; active?: boolean}[]}> = ({rows}) => (
  <>
    {rows.map((row) => (
      <div
        key={`${row.depth}-${row.label}`}
        style={{
          height: 30,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          paddingLeft: 14 + (row.depth ?? 0) * 18,
          fontSize: 13,
          color: row.active ? '#fff' : INK,
          background: row.active ? '#1f4f9c' : 'transparent',
          borderBottom: '1px solid rgba(120,115,100,0.18)',
        }}
      >
        <span style={{fontSize: 10, opacity: 0.7}}>▸</span>
        {row.label}
      </div>
    ))}
  </>
);

const TilePalette: React.FC<{on?: number}> = ({on = 0}) => {
  const colors = [
    '#3f6b45',
    '#4f7c4f',
    '#2f4a62',
    '#b08a5a',
    '#5a4a3a',
    '#7a6a52',
    '#3f6b45',
    '#c7b06a',
    '#4f7c4f',
    '#2f4a62',
    '#b08a5a',
    '#7a6a52',
  ];
  return (
    <div style={{padding: 12, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6}}>
      {colors.map((color, index) => (
        <div
          key={index}
          style={{
            aspectRatio: '1',
            background: color,
            border: index === on ? '2px solid #d43a2c' : '1px solid #8f8a7d',
            boxShadow: BEVEL_IN,
            position: 'relative',
          }}
        >
          {index === 0 ? (
            <div style={{position: 'absolute', inset: '35%', background: '#6f9a58'}} />
          ) : null}
          {index === 3 ? (
            <div style={{position: 'absolute', inset: '20%', border: '2px solid #5b3a22'}} />
          ) : null}
          {index === 7 ? (
            <div style={{position: 'absolute', left: '40%', top: '20%', width: '20%', height: '60%', background: '#7b5a2e'}} />
          ) : null}
        </div>
      ))}
    </div>
  );
};

const EventTable: React.FC<{rows?: string[][]}> = ({
  rows = [
    ['001', '小鲸鱼', '并行处理', '开关 0002', 'ON'],
    ['002', '宝箱', '决定键', '开关 0001', 'OFF'],
    ['003', '门', '玩家接触', '——', 'ON'],
    ['004', '钥匙', '玩家接触', '——', 'OFF'],
  ],
}) => (
  <div>
    <div
      style={{
        display: 'flex',
        height: 28,
        alignItems: 'center',
        fontSize: 12,
        background: PANEL_DARK,
        borderBottom: '1px solid #8f8a7d',
      }}
    >
      {['ID', '名称', '触发', '条件', '状态'].map((label, index) => (
        <span
          key={label}
          style={{
            width: [64, 150, 120, 180, 80][index],
            paddingLeft: 10,
            borderRight: '1px solid #8f8a7d',
          }}
        >
          {label}
        </span>
      ))}
    </div>
    {rows.map((row, index) => (
      <div
        key={row[0]}
        style={{
          display: 'flex',
          height: 28,
          alignItems: 'center',
          fontSize: 12,
          background: index === 0 ? '#b9d2ef' : 'transparent',
          borderBottom: '1px solid rgba(120,115,100,0.25)',
          color: INK,
        }}
      >
        {row.map((cell, column) => (
          <span
            key={`${row[0]}-${column}`}
            style={{
              width: [64, 150, 120, 180, 80][column],
              paddingLeft: 10,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            {cell}
          </span>
        ))}
      </div>
    ))}
  </div>
);

const MapCanvas: React.FC<{
  painted: number;
  cursor?: {x: number; y: number};
  icons?: {x: number; y: number; kind: 'npc' | 'chest' | 'door' | 'key'; opacity: number}[];
  blank?: boolean;
}> = ({painted, cursor, icons = [], blank = false}) => {
  const cols = 26;
  const rows = 18;
  return (
    <div style={{position: 'absolute', inset: 20, overflow: 'hidden', background: '#101316'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {Array.from({length: cols * rows}, (_, index) => {
          const col = index % cols;
          const row = Math.floor(index / cols);
          const on = blank
            ? false
            : index / (cols * rows) < painted &&
              !(row < 2 || col < 2 || col > cols - 3 || row > rows - 3);
          return (
            <div
              key={index}
              style={{
                border: '1px solid rgba(0,0,0,0.18)',
                background: on
                  ? hash(index * 7) > 0.86
                    ? '#4d7a4a'
                    : hash(index * 13) > 0.7
                      ? '#3d6742'
                      : '#345a3a'
                  : '#1b2024',
                position: 'relative',
              }}
            >
              {on && hash(index * 17) > 0.9 ? (
                <div style={{position: 'absolute', left: '45%', top: '38%', width: 2, height: 5, background: '#c7b06a'}} />
              ) : null}
              {!on && !blank ? (
                <div style={{position: 'absolute', inset: 1, opacity: 0.2, background: 'repeating-linear-gradient(45deg,#000 0 2px,transparent 2px 8px)'}} />
              ) : null}
            </div>
          );
        })}
      </div>
      {icons.map((icon, index) => {
        const left = `${(icon.x / cols) * 100}%`;
        const top = `${(icon.y / rows) * 100}%`;
        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              left,
              top,
              width: '4.5%',
              height: '7%',
              transform: 'translate(-50%,-50%)',
              opacity: icon.opacity,
            }}
          >
            {icon.kind === 'door' ? (
              <div style={{width: '100%', height: '100%', background: '#6b4a2e', border: '1px solid #2b1c10'}}>
                <div style={{position: 'absolute', right: 3, top: '45%', width: 3, height: 3, background: '#d9b25f'}} />
              </div>
            ) : null}
            {icon.kind === 'chest' ? (
              <div style={{width: '100%', height: '80%', marginTop: '20%', background: '#9a6a32', border: '1px solid #3a2410'}}>
                <div style={{position: 'absolute', left: '20%', top: '30%', width: '60%', height: 2, background: '#e0c070'}} />
              </div>
            ) : null}
            {icon.kind === 'npc' ? (
              <div style={{position: 'relative', width: '100%', height: '100%'}}>
                <div style={{position: 'absolute', left: '30%', top: '10%', width: '40%', height: '34%', background: '#d8b08a', borderRadius: '50%'}} />
                <div style={{position: 'absolute', left: '22%', top: '40%', width: '56%', height: '50%', background: '#2e4b8a'}} />
              </div>
            ) : null}
            {icon.kind === 'key' ? (
              <div style={{position: 'relative', width: '100%', height: '100%'}}>
                <div style={{position: 'absolute', left: '20%', top: '35%', width: '34%', height: '30%', border: '2px solid #d9b25f', borderRadius: '50%'}} />
                <div style={{position: 'absolute', left: '52%', top: '46%', width: '32%', height: 2, background: '#d9b25f'}} />
                <div style={{position: 'absolute', left: '70%', top: '46%', width: 2, height: 6, background: '#d9b25f'}} />
              </div>
            ) : null}
          </div>
        );
      })}
      {cursor ? (
        <div
          style={{
            position: 'absolute',
            left: `${(cursor.x / cols) * 100}%`,
            top: `${(cursor.y / rows) * 100}%`,
            width: '4.5%',
            height: '7%',
            border: '2px solid #f4f0e5',
            boxShadow: '0 0 0 1px #000, 0 0 12px rgba(255,255,255,0.5)',
            transform: 'translate(-50%,-50%)',
          }}
        />
      ) : null}
    </div>
  );
};

const DatabaseWindow: React.FC<{opacity?: number; tab?: number}> = ({opacity = 1, tab = 0}) => {
  const tabs = ['角色', '职业', '技能', '物品', '敌人', '队伍'];
  return (
    <div
      style={{
        position: 'absolute',
        left: 1040,
        top: 120,
        width: 720,
        height: 660,
        background: PANEL,
        border: '2px solid #6b665a',
        boxShadow: '0 24px 60px rgba(0,0,0,0.55)',
        opacity,
        zIndex: 5,
      }}
    >
      <div style={{height: 32, background: 'linear-gradient(90deg,#0b2a6b,#1a4a9c)', color: '#fff', display: 'flex', alignItems: 'center', padding: '0 12px', fontSize: 15}}>
        数据库
      </div>
      <div style={{display: 'flex', gap: 2, padding: '8px 8px 0'}}>
        {tabs.map((item, index) => (
          <div
            key={item}
            style={{
              padding: '5px 14px',
              border: '1px solid #8f8a7d',
              borderBottom: 'none',
              background: index === tab ? PANEL_LIGHT : PANEL_DARK,
              fontSize: 12,
              color: INK,
            }}
          >
            {item}
          </div>
        ))}
      </div>
      <div style={{position: 'absolute', left: 10, top: 70, right: 10, bottom: 10, border: '1px solid #8f8a7d', boxShadow: BEVEL_IN, padding: 12}}>
        <div style={{display: 'grid', gridTemplateColumns: '150px 1fr', gap: 12}}>
          <div style={{border: '1px solid #8f8a7d', background: '#f2eee2'}}>
            {['001 亚历克斯', '002 小鲸鱼', '003 村民', '004 门卫'].map((name, index) => (
              <div
                key={name}
                style={{
                  padding: '5px 8px',
                  fontSize: 12,
                  background: index === 0 ? '#1f4f9c' : 'transparent',
                  color: index === 0 ? '#fff' : INK,
                }}
              >
                {name}
              </div>
            ))}
          </div>
          <div style={{fontSize: 12, color: INK}}>
            <div style={{display: 'flex', gap: 10, alignItems: 'center', borderBottom: '1px solid #a9a396', paddingBottom: 8}}>
              <div style={{width: 58, height: 58, background: '#1b2430', border: '2px solid #6b665a', position: 'relative'}}>
                <div style={{position: 'absolute', left: 16, top: 10, width: 26, height: 22, background: '#d8b08a'}} />
                <div style={{position: 'absolute', left: 12, top: 34, width: 34, height: 20, background: '#2e4b8a'}} />
              </div>
              <div style={{lineHeight: 1.7}}>
                名字：亚历克斯
                <br />
                职业：骑士 / 等级 1
                <br />
                初始 HP 100 / MP 20
              </div>
            </div>
            {['最大 HP', '最大 MP', '攻击力', '防御力', '敏捷'].map((label, index) => (
              <div key={label} style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 8}}>
                <span style={{width: 90}}>{label}</span>
                <div style={{flex: 1, height: 14, background: '#e6e1d3', border: '1px solid #8f8a7d', boxShadow: BEVEL_IN}}>
                  <div style={{width: `${38 + index * 9}%`, height: '100%', background: '#3f6b9c'}} />
                </div>
                <span style={{width: 34, textAlign: 'right'}}>{[100, 20, 18, 12, 14][index]}</span>
              </div>
            ))}
            <div style={{marginTop: 14, borderTop: '1px solid #a9a396', paddingTop: 8, fontSize: 11, color: '#5a5245'}}>
              技能：攻击 / 防御 / 治疗
              <br />
              装备：长剑 / 皮甲
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EditorOverview: React.FC<{
  mapAt?: number;
  eventsAt?: number;
  dbAt?: number;
}> = ({mapAt = 4.3, eventsAt = 6.0, dbAt = 8.0}) => {
  const frame = useSceneFrame();
  const t = frame / FPS;
  const mapOn = t >= mapAt;
  const eventsOn = t >= eventsAt;
  const dbOn = t >= dbAt;
  const pulse = 0.55 + 0.25 * Math.sin(frame / 10);
  const overlay = 0.48;
  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden'}}>
      <EditorChrome staticMode />
      <div style={{position: 'absolute', left: 480, top: 146, width: 966, height: 716}}>
        <MapCanvas
          painted={1}
          cursor={{x: 15, y: 4}}
          icons={[
            {x: 13, y: 4, kind: 'npc', opacity: 1},
            {x: 6, y: 10, kind: 'chest', opacity: 0.9},
            {x: 17, y: 11, kind: 'door', opacity: 0.9},
          ]}
        />
      </div>
      <div style={{position: 'absolute', inset: 0, background: `rgba(5,7,10,${overlay})`}} />
      {mapOn ? (
        <div
          style={{
            position: 'absolute',
            left: 480,
            top: 146,
            width: 966,
            height: 716,
            border: `3px solid rgba(217,178,95,${pulse})`,
            boxShadow: '0 0 0 9999px rgba(5,7,10,0.18)',
          }}
        >
          <div style={{position: 'absolute', left: 14, top: -34, fontFamily: SANS, fontSize: 17, letterSpacing: 3, color: '#e8dcc2'}}>
            01 / 地图编辑器
          </div>
        </div>
      ) : null}
      {eventsOn ? (
        <div
          style={{
            position: 'absolute',
            left: 460,
            top: 874,
            width: 990,
            height: 150,
            border: `3px solid rgba(217,178,95,${pulse})`,
          }}
        >
          <div style={{position: 'absolute', left: 12, top: -32, fontFamily: SANS, fontSize: 17, letterSpacing: 3, color: '#e8dcc2'}}>
            02 / 事件
          </div>
        </div>
      ) : null}
      {dbOn ? <DatabaseWindow opacity={Math.min(1, (t - dbAt) / 0.5)} /> : null}
      {dbOn ? (
        <div style={{position: 'absolute', left: 1000, top: 92, fontFamily: SANS, fontSize: 17, letterSpacing: 3, color: '#e8dcc2'}}>
          03 / 数据库
        </div>
      ) : null}
      <div
        style={{
          position: 'absolute',
          left: 120,
          bottom: 252,
          fontFamily: SERIF,
          fontWeight: 900,
          fontSize: 50,
          color: '#f0e6d2',
          opacity: 0.92,
          textShadow: '0 4px 24px rgba(0,0,0,0.8)',
        }}
      >
        一张格子纸。一堆事件。一个数据库。
      </div>
    </div>
  );
};

const PixelTileZoom: React.FC<{opacity: number}> = ({opacity}) => {
  const frame = useSceneFrame();
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(4,6,8,0.88)',
        opacity,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 90,
      }}
    >
      <div
        style={{
          width: 760,
          height: 760,
          display: 'grid',
          gridTemplateColumns: 'repeat(16, 1fr)',
          gridTemplateRows: 'repeat(16, 1fr)',
          border: '3px solid #d9b25f',
          boxShadow: '0 0 80px rgba(217,178,95,0.14)',
        }}
      >
        {Array.from({length: 256}, (_, index) => {
          const col = index % 16;
          const row = Math.floor(index / 16);
          return (
            <div
              key={index}
              style={{
                background: hash(index * 17 + 3) > 0.62 ? '#4f7c4a' : '#3d6742',
                border: '1px solid rgba(0,0,0,0.22)',
                position: 'relative',
              }}
            >
              {hash(index * 7) > 0.85 ? (
                <div
                  style={{
                    position: 'absolute',
                    left: `${20 + hash(index) * 40}%`,
                    top: `${20 + hash(index * 3) * 40}%`,
                    width: 4,
                    height: 10,
                    background: '#6f9d63',
                  }}
                />
              ) : null}
            </div>
          );
        })}
      </div>
      <div style={{width: 560}}>
        <div style={{fontFamily: SANS, fontSize: 20, letterSpacing: 5, color: 'rgba(236,231,218,0.45)'}}>
          TILE / 16 PX
        </div>
        <div style={{marginTop: 18, fontFamily: PIXEL, fontSize: 86, color: C.cream, letterSpacing: 2}}>
          16 × 16
        </div>
        <div style={{marginTop: 26, fontFamily: SANS, fontSize: 24, lineHeight: 1.9, color: 'rgba(236,231,218,0.55)'}}>
          每一个格子，叫一个图块。
          <br />
          你的整个游戏世界，
          <br />
          就是这些 16×16 的小方块拼出来的。
        </div>
        <div style={{marginTop: 40, width: 200, height: 2, background: C.red, opacity: 0.7}} />
      </div>
    </div>
  );
};

export const MapPaint: React.FC = () => {
  const frame = useSceneFrame();
  const t = frame / FPS;
  const painted = interpolate(t, [0.3, 7], [0, 1], clamp);
  const cursorCol = Math.min(23, 3 + Math.floor(t * 2.6));
  const cursorRow = Math.min(15, 4 + Math.floor(t * 0.8));
  const zoom = interpolate(t, [6.4, 7.4, 23.5, 24.4], [0, 1, 1, 0], clamp);
  const finalCursor = t < 6.5;
  return (
    <div style={{position: 'absolute', inset: 0}}>
      <EditorShell
        title="RPG Maker 2000 - 地图 002"
        tree={
          <TreeRows
            rows={[
              {label: '项目 1'},
              {label: '地图', depth: 1},
              {label: '地图 001 (20 × 15)', depth: 2},
              {label: '地图 002 (26 × 18)', depth: 2, active: true},
              {label: '事件', depth: 1},
              {label: '开关', depth: 1},
              {label: '变量', depth: 1},
            ]}
          />
        }
        right={<TilePalette on={0} />}
        bottom={<EventTable />}
        center={
          <MapCanvas
            painted={painted}
            cursor={finalCursor ? {x: cursorCol, y: cursorRow} : undefined}
            icons={[
              {x: 18, y: 8, kind: 'door', opacity: 0.9},
              {x: 7, y: 12, kind: 'chest', opacity: 0.85},
              {x: 12, y: 6, kind: 'npc', opacity: 0.85},
            ]}
          />
        }
        status="地图 002 · 26 × 18 · 缩放 300%"
      />
      {zoom > 0.01 ? <PixelTileZoom opacity={zoom} /> : null}
    </div>
  );
};

export const EventsDatabase: React.FC = () => {
  const frame = useSceneFrame();
  const t = frame / FPS;
  const dbIn = interpolate(t, [7.6, 8.4], [0, 1], clamp);
  const icons = [
    {x: 12, y: 9, kind: 'npc' as const, at: 0.5},
    {x: 18, y: 9, kind: 'chest' as const, at: 2.2},
    {x: 23, y: 9, kind: 'door' as const, at: 4.0},
  ];
  return (
    <div style={{position: 'absolute', inset: 0}}>
      <EditorShell
        title="RPG Maker 2000 - 地图 002"
        tree={
          <TreeRows
            rows={[
              {label: '项目 1'},
              {label: '地图', depth: 1},
              {label: '地图 002 (26 × 18)', depth: 2, active: true},
              {label: '事件', depth: 1},
              {label: '001 宝箱', depth: 2},
              {label: '002 门', depth: 2},
              {label: '003 NPC', depth: 2},
              {label: '开关', depth: 1},
            ]}
          />
        }
        right={<TilePalette on={1} />}
        bottom={<EventTable />}
        center={
          <MapCanvas
            painted={1}
            icons={icons.map((icon) => ({
              ...icon,
              opacity: interpolate(t, [icon.at, icon.at + 0.4], [0, 1], clamp),
            }))}
            cursor={{x: 20, y: 12}}
          />
        }
        status="地图 002 · 26 × 18 · 缩放 300%"
        dim={dbIn * 0.3}
      />
      {dbIn > 0 ? <DatabaseWindow opacity={dbIn} tab={0} /> : null}
      <div style={{position: 'absolute', left: 120, bottom: 92, fontFamily: SANS, fontSize: 20, letterSpacing: 3, color: 'rgba(236,231,218,0.7)', opacity: dbIn ? 0 : 1}}>
        事件，是地图上的一个点。
      </div>
    </div>
  );
};

export const TwoWords: React.FC = () => {
  const frame = useSceneFrame();
  const t = frame / FPS;
  const enter = (delay: number) => spring({frame: frame - delay * FPS, fps: FPS, config: {damping: 16, stiffness: 120}});
  return (
    <div style={{position: 'absolute', inset: 0, background: '#07080a', overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 46%, rgba(54,58,72,0.35) 0%, rgba(7,8,10,1) 70%)',
        }}
      />
      <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 150}}>
        {[
          {word: '开关', en: 'SWITCH', value: 'ON / OFF', delay: 0.2, color: '#d9b25f'},
          {word: '变量', en: 'VARIABLE', value: '0001 → 0002', delay: 1.1, color: '#7fa3c7'},
        ].map((item) => {
          const s = enter(item.delay);
          return (
            <div
              key={item.word}
              style={{
                textAlign: 'center',
                transform: `translateY(${(1 - s) * 30}px)`,
                opacity: s,
              }}
            >
              <div style={{fontFamily: SANS, fontSize: 19, letterSpacing: 6, color: 'rgba(236,231,218,0.38)'}}>
                {item.en}
              </div>
              <div
                style={{
                  marginTop: 16,
                  fontFamily: SERIF,
                  fontWeight: 900,
                  fontSize: 190,
                  lineHeight: 1.1,
                  letterSpacing: 10,
                  color: item.color,
                }}
              >
                {item.word}
              </div>
              <div style={{marginTop: 22, fontFamily: PIXEL, fontSize: 18, letterSpacing: 2, color: 'rgba(236,231,218,0.55)'}}>
                {item.value}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 230, display: 'flex', justifyContent: 'center', gap: 220}}>
        <div style={{width: 150, height: 6, background: 'rgba(236,231,218,0.12)', position: 'relative'}}>
          <div style={{position: 'absolute', left: t > 3 ? '62%' : '4%', top: -9, width: 24, height: 24, background: '#d9b25f', transition: undefined}} />
        </div>
        <div style={{fontFamily: PIXEL, fontSize: 22, color: 'rgba(236,231,218,0.65)', letterSpacing: 3}}>
          {Math.floor(interpolate(t, [0, 8], [0, 12], clamp))
            .toString()
            .padStart(2, '0')}
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 120,
          textAlign: 'center',
          fontFamily: SERIF,
          fontWeight: 900,
          fontSize: 54,
          color: C.cream,
          opacity: interpolate(t, [8.2, 9.0], [0, 1], clamp),
        }}
      >
        我做给你看。
      </div>
      <Scanlines opacity={0.08} />
    </div>
  );
};

type Command = {text: string; sub?: string; indent?: number; at: number; color?: string};

const EventEditorWindow: React.FC<{
  title: string;
  commands: Command[];
  t: number;
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  page?: number;
}> = ({title, commands, t, left = 320, top = 150, width = 1080, height = 700, page = 0}) => {
  const frame = useSceneFrame();
  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width,
        height,
        background: PANEL,
        border: '2px solid #4b463c',
        boxShadow: '0 40px 90px rgba(0,0,0,0.65)',
      }}
    >
      <div style={{height: 34, background: 'linear-gradient(90deg,#0b2a6b,#1a4a9c)', color: '#fff', display: 'flex', alignItems: 'center', padding: '0 12px', fontSize: 15}}>
        {title}
      </div>
      <div style={{display: 'flex', gap: 2, padding: '7px 8px 0'}}>
        {['1', '2', '3', '4'].map((tab, index) => (
          <div
            key={tab}
            style={{
              width: 36,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: index === page ? PANEL_LIGHT : PANEL_DARK,
              border: '1px solid #8f8a7d',
              borderBottom: 'none',
              fontSize: 12,
              color: INK,
            }}
          >
            {tab}
          </div>
        ))}
        <div style={{marginLeft: 18, display: 'flex', alignItems: 'center', gap: 12, fontSize: 11, color: '#4a4439'}}>
          <span>条件开关：0001 钥匙</span>
          <span>触发：玩家接触</span>
        </div>
      </div>
      <div style={{position: 'absolute', left: 10, top: 66, right: 10, height: 44, border: '1px solid #8f8a7d', boxShadow: BEVEL_IN, display: 'flex', alignItems: 'center', gap: 10, padding: '0 10px', background: PANEL_LIGHT}}>
        <span style={{fontFamily: SANS, fontSize: 12, color: '#5a5245'}}>事件名称</span>
        <div style={{flex: 1, height: 26, background: '#fff', border: '1px solid #8f8a7d', boxShadow: BEVEL_IN, display: 'flex', alignItems: 'center', paddingLeft: 8, fontSize: 13, color: INK}}>
          {title.includes('钥匙') ? '钥匙' : '门'}
        </div>
        <div style={{width: 100, height: 26, background: PANEL, border: '1px solid #8f8a7d', boxShadow: BEVEL_TOP, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', color: INK}}>
          玩家接触
        </div>
      </div>
      <div style={{position: 'absolute', left: 10, top: 120, right: 10, bottom: 48, background: '#fff', border: '1px solid #8f8a7d', boxShadow: BEVEL_IN, overflow: 'hidden'}}>
        {commands.map((command, index) => {
          const show = t >= command.at;
          if (!show) return null;
          const opacity = interpolate(t, [command.at, command.at + 0.22], [0, 1], clamp);
          return (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 8,
                padding: `${command.sub ? 4 : 7}px 14px`,
                paddingLeft: 14 + (command.indent ?? 0) * 34,
                borderBottom: '1px solid rgba(120,115,100,0.16)',
                fontFamily: SANS,
                fontSize: 15,
                lineHeight: 1.5,
                color: command.color ?? INK,
                opacity,
                background: index === commands.filter((item) => item.at <= t).length - 1 ? 'rgba(74,111,156,0.12)' : 'transparent',
              }}
            >
              <span style={{fontSize: 11, color: '#2f5f9c'}}>◆</span>
              <div>
                <div>{command.text}</div>
                {command.sub ? (
                  <div style={{fontSize: 12, color: '#6a6255', marginTop: 2}}>{command.sub}</div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{position: 'absolute', left: 10, right: 10, bottom: 8, display: 'flex', alignItems: 'center', gap: 8}}>
        {['确定', '取消', '插入', '删除'].map((item) => (
          <div
            key={item}
            style={{
              minWidth: 70,
              height: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: PANEL,
              border: '1px solid #8f8a7d',
              boxShadow: BEVEL_TOP,
              fontSize: 12,
              color: INK,
            }}
          >
            {item}
          </div>
        ))}
        <div style={{marginLeft: 'auto', fontFamily: PIXEL, fontSize: 9, color: 'rgba(60,55,45,0.5)'}}>
          frame {Math.floor(frame)}
        </div>
      </div>
    </div>
  );
};

const ConditionPopup: React.FC<{opacity: number; selected?: number}> = ({opacity, selected = 0}) => (
  <div
    style={{
      position: 'absolute',
      left: 980,
      top: 300,
      width: 470,
      background: PANEL,
      border: '2px solid #4b463c',
      boxShadow: '0 24px 50px rgba(0,0,0,0.6)',
      opacity,
      zIndex: 4,
    }}
  >
    <div style={{height: 30, background: 'linear-gradient(90deg,#0b2a6b,#1a4a9c)', color: '#fff', display: 'flex', alignItems: 'center', padding: '0 10px', fontSize: 13}}>
      条件分支
    </div>
    <div style={{padding: 12, fontSize: 12, color: INK}}>
      <div style={{marginBottom: 6}}>条件类型</div>
      <div style={{display: 'flex', gap: 4, marginBottom: 10}}>
        {['开关', '变量', '独立开关', '计时器'].map((item, index) => (
          <div
            key={item}
            style={{
              padding: '4px 8px',
              border: '1px solid #8f8a7d',
              background: index === 0 ? PANEL_LIGHT : PANEL_DARK,
              boxShadow: index === 0 ? BEVEL_IN : BEVEL_TOP,
            }}
          >
            {item}
          </div>
        ))}
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
        <div style={{flex: 1, height: 24, background: '#fff', border: '1px solid #8f8a7d', display: 'flex', alignItems: 'center', paddingLeft: 8}}>
          0001 钥匙
        </div>
        <div style={{padding: '4px 10px', background: '#fff', border: '1px solid #8f8a7d'}}>为 ON</div>
      </div>
      <div style={{marginTop: 10, display: 'flex', flexDirection: 'column', gap: 2, border: '1px solid #8f8a7d', background: '#fff'}}>
        {['0001 钥匙', '0002 见到小鲸鱼', '0003 门已打开'].map((item, index) => (
          <div
            key={item}
            style={{
              padding: '4px 8px',
              background: index === selected ? '#1f4f9c' : 'transparent',
              color: index === selected ? '#fff' : INK,
            }}
          >
            {item}
          </div>
        ))}
      </div>
      <div style={{marginTop: 12, display: 'flex', justifyContent: 'flex-end', gap: 8}}>
        <div style={{padding: '4px 14px', border: '1px solid #8f8a7d', boxShadow: BEVEL_TOP}}>确定</div>
        <div style={{padding: '4px 14px', border: '1px solid #8f8a7d', boxShadow: BEVEL_TOP}}>取消</div>
      </div>
    </div>
  </div>
);

const InsertMenu: React.FC<{opacity: number; selected?: number}> = ({opacity, selected = 1}) => (
  <div
    style={{
      position: 'absolute',
      right: 160,
      top: 260,
      width: 360,
      background: '#fbf8ee',
      border: '1px solid #4b463c',
      boxShadow: '0 18px 40px rgba(0,0,0,0.45)',
      opacity,
      zIndex: 3,
    }}
  >
    {['显示文字', '条件分支', '播放 SE', '暂时消除本事件', '开关操作', '等待'].map((item, index) => (
      <div
        key={item}
        style={{
          padding: '10px 14px',
          fontSize: 13,
          background: index === selected ? '#1f4f9c' : 'transparent',
          color: index === selected ? '#fff' : INK,
          borderBottom: '1px solid rgba(120,115,100,0.2)',
        }}
      >
        ◆ {item}
      </div>
    ))}
  </div>
);

export const EventBuild: React.FC = () => {
  const frame = useSceneFrame();
  const t = frame / FPS;
  const popup = interpolate(t, [3.8, 4.3, 6.6, 7.0], [0, 1, 1, 0], clamp);
  const insert = interpolate(t, [2.2, 2.6, 3.9, 4.3], [0, 1, 1, 0], clamp);
  const keyWindow = t > 15.2;
  const commands: Command[] = [
    {text: '条件分支：开关「钥匙」为 ON', sub: '条件类型：开关 / 0001 钥匙 / 为 ON', at: 4.5, color: '#1d3563'},
    {text: '播放 SE：开门', at: 8.6, indent: 1},
    {text: '暂时消除本事件', at: 10.2, indent: 1},
    {text: '否则', at: 13.1, color: '#6b4a2e'},
    {text: '显示文字：「门锁着。」', at: 14.1, indent: 1},
  ];
  const keyCommands: Command[] = [
    {text: '开关操作：「钥匙」= ON', at: 0.4},
    {text: '暂时消除本事件', at: 3.2},
  ];
  const testPulse = 0.5 + 0.5 * Math.sin(frame / 8);
  const backToMap = t > 22.4;
  return (
    <div style={{position: 'absolute', inset: 0, background: '#17191d', overflow: 'hidden'}}>
      <EditorShell
        title="RPG Maker 2000 - 地图 002"
        tree={
          <TreeRows
            rows={[
              {label: '项目 1'},
              {label: '地图', depth: 1},
              {label: '地图 002 (26 × 18)', depth: 2, active: true},
              {label: '事件', depth: 1},
              {label: '001 门', depth: 2, active: keyWindow ? false : true},
              {label: '002 钥匙', depth: 2, active: keyWindow},
              {label: '开关', depth: 1},
              {label: '0001 钥匙', depth: 2},
            ]}
          />
        }
        right={<TilePalette on={0} />}
        bottom={<EventTable rows={[['001', '门', '玩家接触', '开关 0001', 'ON'], ['002', '钥匙', '玩家接触', '——', 'OFF'], ['003', '宝箱', '决定键', '——', 'ON'], ['004', 'NPC', '并行处理', '——', 'ON']]} />}
        center={
          <MapCanvas
            painted={1}
            icons={[
              {x: 22, y: 8, kind: 'door', opacity: 1},
              {x: 8, y: 12, kind: 'key', opacity: t < 21 ? 1 : 0},
            ]}
            cursor={{x: 22, y: 8}}
          />
        }
        status="地图 002 · 26 × 18 · 缩放 300%"
        dim={backToMap ? 0 : 0.55}
      />
      {!backToMap ? (
        <>
          <EventEditorWindow
            title={keyWindow ? '事件编辑器 - 钥匙' : '事件编辑器 - 门'}
            commands={keyWindow ? keyCommands : commands}
            t={keyWindow ? t - 15.2 : t}
            page={keyWindow ? 1 : 0}
          />
          {!keyWindow ? <ConditionPopup opacity={popup} /> : null}
          {!keyWindow ? <InsertMenu opacity={insert} selected={1} /> : null}
          <Scanlines opacity={0.05} />
        </>
      ) : (
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 220, display: 'flex', justifyContent: 'center'}}>
          <div
            style={{
              padding: '14px 36px',
              background: '#cfcabd',
              border: '2px solid #4b463c',
              boxShadow: BEVEL_TOP,
              fontFamily: SANS,
              fontSize: 18,
              letterSpacing: 3,
              color: '#1d1d1b',
              opacity: 0.5 + testPulse * 0.5,
            }}
          >
            ▶ 测试游戏
          </div>
        </div>
      )}
    </div>
  );
};

const PlaytestMap: React.FC<{heroX: number; heroY: number; doorOpen: boolean; keyVisible: boolean; dialog: string | null; switchOn: boolean}> = ({
  heroX,
  heroY,
  doorOpen,
  keyVisible,
  dialog,
  switchOn,
}) => (
  <div style={{position: 'absolute', inset: 0, background: '#050607'}}>
    <div style={{position: 'absolute', inset: 26, border: '1px solid rgba(236,231,218,0.16)', overflow: 'hidden'}}>
      <svg viewBox="0 0 320 180" width="100%" height="100%" shapeRendering="crispEdges" preserveAspectRatio="xMidYMid slice">
        <rect width="320" height="180" fill="#1a2418" />
        {Array.from({length: 15}, (_, row) =>
          Array.from({length: 20}, (_, col) => {
            const wall = row < 2 || col < 2 || col > 17 || row > 13 || (row > 4 && row < 8 && col > 10);
            return (
              <g key={`${row}-${col}`}>
                <rect x={col * 16} y={row * 16} width={16} height={16} fill={wall ? '#2a2822' : '#2c4430'} />
                {wall ? <rect x={col * 16 + 1} y={row * 16 + 1} width={14} height={14} fill="#3b352b" /> : <rect x={col * 16 + 4} y={row * 16 + 9} width={1} height={3} fill="#4f7048" opacity="0.7" />}
              </g>
            );
          }),
        )}
        <g>
          <rect x={288} y={80} width={22} height={42} fill="#6b4a2e" stroke="#2b1c10" strokeWidth="1" />
          <rect x={doorOpen ? 288 : 290} y={82} width={doorOpen ? 22 : 18} height={38} fill={doorOpen ? '#0a0d09' : '#8f6238'} />
          <rect x={300} y={98} width={2} height={2} fill="#d9b25f" />
        </g>
        {keyVisible ? (
          <g>
            <rect x={60} y={112} width={10} height={4} fill="#d9b25f" />
            <rect x={66} y={109} width={4} height={4} fill="#f0d080" />
            <rect x={60} y={109} width={4} height={4} fill="none" stroke="#f0d080" />
          </g>
        ) : null}
        <g>
          <rect x={heroX} y={heroY} width={10} height={16} fill="#3f5fa0" />
          <rect x={heroX + 2} y={heroY - 7} width={6} height={6} fill="#d8b08a" />
          <rect x={heroX + 1} y={heroY - 8} width={8} height={3} fill="#5a3b25" />
          <rect x={heroX} y={heroY + 4} width={10} height={2} fill="#a83a32" />
          <rect x={heroX + 2} y={heroY + 16} width={3} height={2} fill="#20242c" />
          <rect x={heroX + 6} y={heroY + 16} width={3} height={2} fill="#20242c" />
        </g>
        <g>
          <rect x={10} y={10} width={100} height={18} fill="rgba(10,16,30,0.8)" />
          <rect x={10} y={10} width={100} height={18} fill="none" stroke="#c9c3b4" opacity="0.5" />
          <text x={18} y={23} fontFamily="'Noto Sans SC',sans-serif" fontSize={9} fill="#ece7da">
            开关 0001 钥匙：
            <tspan fill={switchOn ? '#8adf7a' : '#c9c3b4'}>{switchOn ? ' ON' : ' OFF'}</tspan>
          </text>
        </g>
        {dialog ? (
          <g>
            <rect x={10} y={140} width={300} height={32} fill="#12204f" />
            <rect x={10} y={140} width={300} height={32} fill="#2e4b95" opacity="0.45" />
            <rect x={10} y={140} width={300} height={1} fill="#e8e2d4" />
            <rect x={10} y={171} width={300} height={1} fill="#e8e2d4" />
            <rect x={10} y={140} width={1} height={32} fill="#e8e2d4" />
            <rect x={309} y={140} width={1} height={32} fill="#e8e2d4" />
            <text x={26} y={162} fontFamily="'Noto Sans SC',sans-serif" fontSize={11} fill="#f4f0e5">
              {dialog}
            </text>
          </g>
        ) : null}
      </svg>
      <div style={{position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.22) 0 1px, transparent 1px 4px)', opacity: 0.4}} />
    </div>
    <div style={{position: 'absolute', left: 52, top: 40, fontFamily: PIXEL, fontSize: 12, letterSpacing: 2, color: 'rgba(236,231,218,0.6)'}}>
      RPG MAKER 2000 / TEST PLAY
    </div>
    <div style={{position: 'absolute', left: 52, bottom: 36, fontFamily: SANS, fontSize: 18, letterSpacing: 2, color: 'rgba(236,231,218,0.45)'}}>
      试玩窗口 / 门与钥匙
    </div>
  </div>
);

export const DoorPlaytest: React.FC = () => {
  const frame = useSceneFrame();
  const t = frame / FPS;
  const doorX = 250;
  const keyX = 58;
  let heroX = 110;
  if (t < 5.4) {
    heroX = interpolate(t, [0, 4.7], [110, doorX - 18], clamp);
  } else if (t < 8.0) {
    heroX = interpolate(t, [5.4, 7.8], [doorX - 18, keyX + 14], clamp);
  } else if (t < 11.0) {
    heroX = interpolate(t, [8.0, 10.6], [keyX + 14, doorX - 18], clamp);
  } else {
    heroX = doorX - 18;
  }
  const doorOpen = t >= 10.8;
  const keyVisible = t < 7.8;
  const switchOn = t >= 7.8;
  const dialog = t >= 4.6 && t < 8.4 ? '门锁着。' : t >= 11.0 && t < 15.2 ? '门开了。' : null;
  const heroY = 104;
  const camX = interpolate(t, [0, 5, 8, 11, 15], [0, -8, 10, 6, 0], clamp);
  return (
    <div style={{position: 'absolute', inset: 0, background: '#050607', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, transform: `translateX(${camX}px)`}}>
        <PlaytestMap heroX={heroX} heroY={heroY} doorOpen={doorOpen} keyVisible={keyVisible} dialog={dialog} switchOn={switchOn} />
      </div>
      <div style={{position: 'absolute', inset: 0, pointerEvents: 'none', boxShadow: 'inset 0 0 120px rgba(0,0,0,0.8)'}} />
    </div>
  );
};

export const EventConstellation: React.FC = () => {
  const frame = useSceneFrame();
  const t = frame / FPS;
  const black = interpolate(t, [6.2, 7.2], [0, 1], clamp);
  const points = Array.from({length: 72}, (_, index) => ({
    x: 100 + hash(index * 7) * 1720,
    y: 120 + hash(index * 13 + 4) * 760,
    at: 0.3 + hash(index * 17) * 6.5,
    kind: index % 9 === 0 ? 'door' : index % 7 === 0 ? 'chest' : index % 5 === 0 ? 'npc' : 'switch',
  }));
  return (
    <div style={{position: 'absolute', inset: 0, background: '#06080a', overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(120,160,120,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(120,160,120,0.06) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          transform: 'rotateX(0deg)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 160,
          top: 130,
          width: 1600,
          height: 800,
          background:
            'radial-gradient(ellipse at center, rgba(48,64,46,0.5) 0%, rgba(8,11,8,0.1) 70%)',
          border: '1px solid rgba(150,180,140,0.16)',
          overflow: 'hidden',
        }}
      >
        {Array.from({length: 15}, (_, row) =>
          Array.from({length: 26}, (_, col) => (
            <div
              key={`${row}-${col}`}
              style={{
                position: 'absolute',
                left: `${(col / 26) * 100}%`,
                top: `${(row / 15) * 100}%`,
                width: `${100 / 26}%`,
                height: `${100 / 15}%`,
                border: '1px solid rgba(140,170,130,0.06)',
                background:
                  (row < 2 || col < 2 || col > 23 || row > 12) && t > 2
                    ? 'rgba(80,70,50,0.18)'
                    : 'transparent',
              }}
            />
          )),
        )}
        {points.map((point, index) => {
          const show = t > point.at;
          const pulse = 0.7 + 0.3 * Math.sin((frame + index * 7) / 9);
          return show ? (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: point.x,
                top: point.y,
                width: point.kind === 'switch' ? 10 : 18,
                height: point.kind === 'switch' ? 10 : 18,
                background:
                  point.kind === 'door'
                    ? '#8f6238'
                    : point.kind === 'chest'
                      ? '#c79a4a'
                      : point.kind === 'npc'
                        ? '#7fa3c7'
                        : '#d9b25f',
                opacity: 0.35 + pulse * 0.55,
                boxShadow: '0 0 20px rgba(217,178,95,0.35)',
              }}
            />
          ) : null;
        })}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 26,
            height: 26,
            transform: 'translate(-50%,-50%)',
            border: '2px solid #f0e6d2',
            boxShadow: '0 0 30px rgba(240,230,210,0.4)',
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 130,
          top: 90,
          fontFamily: SANS,
          fontSize: 20,
          letterSpacing: 5,
          color: 'rgba(236,231,218,0.45)',
        }}
      >
        A WORLD OF SWITCHES / 72 EVENTS
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 260,
          background: 'linear-gradient(to top, rgba(6,8,10,1), rgba(6,8,10,0))',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#000',
          opacity: black,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <div style={{fontFamily: SERIF, fontWeight: 900, fontSize: 74, lineHeight: 1.5, color: C.cream}}>
          RPG Maker 没有让你写代码。
        </div>
        <div style={{marginTop: 26, fontFamily: SERIF, fontWeight: 600, fontSize: 42, color: 'rgba(236,231,218,0.7)', lineHeight: 1.6}}>
          它让你用「是」和「不是」，
          <br />
          去描述一整个世界。
        </div>
        <div style={{marginTop: 54, width: 22, height: 50, background: C.red, opacity: Math.floor(frame / 15) % 2 === 0 ? 0.8 : 0.1}} />
      </div>
    </div>
  );
};
