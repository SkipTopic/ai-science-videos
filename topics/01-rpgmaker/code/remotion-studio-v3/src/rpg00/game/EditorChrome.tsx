import React from 'react';
import {fade, sec} from '../theme';
import {useCurrentFrame} from 'remotion';

const PANEL = '#d2cec1';
const PANEL_DARK = '#b4afa2';
const PANEL_LIGHT = '#e9e5d8';
const INK = '#202020';
const BEVEL_TOP = 'inset 2px 2px 0 #f3efe3, inset -2px -2px 0 #8f8a7d';
const BEVEL_IN = 'inset 2px 2px 0 #8f8a7d, inset -2px -2px 0 #f3efe3';

const TileIcon: React.FC<{kind: string}> = ({kind}) => {
  const common = {
    width: 48,
    height: 48,
    viewBox: '0 0 16 16',
    shapeRendering: 'crispEdges' as const,
  };
  if (kind === 'wall') {
    return (
      <svg {...common}>
        <rect width="16" height="16" fill="#4a4036" />
        <rect width="16" height="3" fill="#74624f" />
        <rect x="0" y="8" width="16" height="1" fill="#2c241e" />
        <rect x="7" y="3" width="1" height="5" fill="#2c241e" />
        <rect x="3" y="9" width="1" height="7" fill="#2c241e" />
      </svg>
    );
  }
  if (kind === 'grass') {
    return (
      <svg {...common}>
        <rect width="16" height="16" fill="#2b3a2b" />
        <rect x="2" y="10" width="1" height="4" fill="#4d7b4f" />
        <rect x="5" y="8" width="1" height="6" fill="#5b8e5a" />
        <rect x="9" y="10" width="1" height="4" fill="#4d7b4f" />
        <rect x="12" y="7" width="1" height="7" fill="#5b8e5a" />
      </svg>
    );
  }
  if (kind === 'water') {
    return (
      <svg {...common}>
        <rect width="16" height="16" fill="#24506b" />
        <rect x="2" y="5" width="5" height="1" fill="#4e8cae" />
        <rect x="8" y="9" width="6" height="1" fill="#4e8cae" />
        <rect x="4" y="12" width="4" height="1" fill="#3b7796" />
      </svg>
    );
  }
  if (kind === 'flower') {
    return (
      <svg {...common}>
        <rect width="16" height="16" fill="#2b3a2b" />
        <rect x="7" y="8" width="1" height="5" fill="#4d7b4f" />
        <rect x="6" y="6" width="3" height="2" fill="#c7b06a" />
        <rect x="7" y="6" width="1" height="1" fill="#f0dda0" />
      </svg>
    );
  }
  if (kind === 'door') {
    return (
      <svg {...common}>
        <rect width="16" height="16" fill="#2b2f31" />
        <rect x="3" y="2" width="10" height="14" fill="#6b4a2b" />
        <rect x="4" y="3" width="8" height="13" fill="#8a6238" />
        <rect x="10" y="8" width="1" height="1" fill="#e0c26a" />
      </svg>
    );
  }
  if (kind === 'chest') {
    return (
      <svg {...common}>
        <rect width="16" height="16" fill="#2b2f31" />
        <rect x="2" y="6" width="12" height="8" fill="#6b4a2b" />
        <rect x="2" y="5" width="12" height="4" fill="#8a6238" />
        <rect x="7" y="8" width="2" height="3" fill="#d9b25f" />
      </svg>
    );
  }
  if (kind === 'torch') {
    return (
      <svg {...common}>
        <rect width="16" height="16" fill="#3a332b" />
        <rect x="7" y="8" width="2" height="6" fill="#5c3a1f" />
        <rect x="6" y="3" width="4" height="5" fill="#e08a32" />
        <rect x="7" y="2" width="2" height="4" fill="#ffd37a" />
      </svg>
    );
  }
  if (kind === 'tree') {
    return (
      <svg {...common}>
        <rect width="16" height="16" fill="#243027" />
        <rect x="7" y="9" width="2" height="6" fill="#4a3320" />
        <rect x="3" y="3" width="10" height="8" fill="#2f5a38" />
        <rect x="5" y="2" width="6" height="3" fill="#3f7045" />
      </svg>
    );
  }
  if (kind === 'rock') {
    return (
      <svg {...common}>
        <rect width="16" height="16" fill="#25292b" />
        <rect x="3" y="6" width="10" height="7" fill="#5b5b57" />
        <rect x="5" y="4" width="6" height="4" fill="#76746d" />
        <rect x="8" y="8" width="3" height="2" fill="#474743" />
      </svg>
    );
  }
  if (kind === 'path') {
    return (
      <svg {...common}>
        <rect width="16" height="16" fill="#3a382f" />
        <rect x="2" y="7" width="4" height="2" fill="#5a5547" />
        <rect x="9" y="3" width="5" height="2" fill="#5a5547" />
        <rect x="6" y="12" width="6" height="2" fill="#4e4a3e" />
      </svg>
    );
  }
  if (kind === 'fence') {
    return (
      <svg {...common}>
        <rect width="16" height="16" fill="#2b3a2b" />
        <rect x="2" y="6" width="12" height="2" fill="#8a6238" />
        <rect x="2" y="10" width="12" height="2" fill="#8a6238" />
        <rect x="4" y="4" width="2" height="11" fill="#6b4a2b" />
        <rect x="10" y="4" width="2" height="11" fill="#6b4a2b" />
      </svg>
    );
  }
  if (kind === 'roof') {
    return (
      <svg {...common}>
        <rect width="16" height="16" fill="#542f2a" />
        <rect x="0" y="4" width="16" height="2" fill="#7c453a" />
        <rect x="0" y="9" width="16" height="2" fill="#7c453a" />
        <rect x="5" y="0" width="1" height="16" fill="#40231f" />
        <rect x="12" y="0" width="1" height="16" fill="#40231f" />
      </svg>
    );
  }
  if (kind === 'window') {
    return (
      <svg {...common}>
        <rect width="16" height="16" fill="#4a4036" />
        <rect x="3" y="3" width="10" height="10" fill="#6d8fa5" />
        <rect x="7" y="3" width="1" height="10" fill="#3a4a58" />
        <rect x="3" y="7" width="10" height="1" fill="#3a4a58" />
      </svg>
    );
  }
  if (kind === 'carpet') {
    return (
      <svg {...common}>
        <rect width="16" height="16" fill="#6b2f35" />
        <rect x="2" y="2" width="12" height="12" fill="none" stroke="#9b4a4f" strokeWidth="1" />
        <rect x="7" y="7" width="2" height="2" fill="#c7a45c" />
      </svg>
    );
  }
  if (kind === 'stairs') {
    return (
      <svg {...common}>
        <rect width="16" height="16" fill="#3a382f" />
        <rect x="2" y="2" width="12" height="3" fill="#6d685c" />
        <rect x="2" y="6" width="12" height="3" fill="#5e594e" />
        <rect x="2" y="10" width="12" height="3" fill="#4e4a42" />
      </svg>
    );
  }
  if (kind === 'bridge') {
    return (
      <svg {...common}>
        <rect width="16" height="16" fill="#24506b" />
        <rect x="0" y="4" width="16" height="8" fill="#8a6238" />
        <rect x="3" y="4" width="1" height="8" fill="#5c3f24" />
        <rect x="8" y="4" width="1" height="8" fill="#5c3f24" />
        <rect x="12" y="4" width="1" height="8" fill="#5c3f24" />
      </svg>
    );
  }
  if (kind === 'sign') {
    return (
      <svg {...common}>
        <rect width="16" height="16" fill="#2b3a2b" />
        <rect x="7" y="8" width="2" height="7" fill="#5c3f24" />
        <rect x="3" y="3" width="10" height="6" fill="#c9b78d" />
        <rect x="5" y="5" width="6" height="1" fill="#5c3f24" />
      </svg>
    );
  }
  if (kind === 'bush') {
    return (
      <svg {...common}>
        <rect width="16" height="16" fill="#2b3a2b" />
        <rect x="3" y="7" width="10" height="7" fill="#355e3b" />
        <rect x="5" y="5" width="6" height="4" fill="#437a49" />
      </svg>
    );
  }
  if (kind === 'sand') {
    return (
      <svg {...common}>
        <rect width="16" height="16" fill="#6b5f3f" />
        <rect x="2" y="4" width="2" height="1" fill="#8a7a52" />
        <rect x="8" y="8" width="3" height="1" fill="#8a7a52" />
        <rect x="5" y="12" width="2" height="1" fill="#7d6e48" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect width="16" height="16" fill="#25292b" />
      <rect x="3" y="3" width="10" height="10" fill="#3a3f42" />
    </svg>
  );
};

const TILE_KINDS = [
  'grass',
  'wall',
  'path',
  'water',
  'tree',
  'door',
  'chest',
  'torch',
  'flower',
  'rock',
  'fence',
  'roof',
  'window',
  'carpet',
  'stairs',
  'bridge',
  'sign',
  'bush',
  'sand',
  'floor',
  'grass',
  'wall',
  'path',
  'water',
  'tree',
  'door',
  'chest',
  'torch',
  'flower',
  'rock',
  'fence',
  'roof',
  'window',
  'carpet',
  'stairs',
  'bridge',
  'sign',
  'bush',
  'sand',
  'floor',
  'grass',
  'wall',
];

const TreeRow: React.FC<{
  depth: number;
  label: string;
  active?: boolean;
  bullet?: string;
}> = ({depth, label, active, bullet}) => (
  <div
    style={{
      height: 30,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      paddingLeft: 12 + depth * 18,
      background: active ? '#274d9e' : 'transparent',
      color: active ? '#ffffff' : INK,
      fontSize: 17,
      fontFamily: '"Noto Sans SC", sans-serif',
      whiteSpace: 'nowrap',
    }}
  >
    <span
      style={{
        width: 10,
        color: active ? '#dbe6ff' : '#5a5548',
        fontSize: 12,
      }}
    >
      {bullet ?? ''}
    </span>
    <span>{label}</span>
  </div>
);

export const EditorChrome: React.FC<{staticMode?: boolean}> = ({staticMode = false}) => {
  const frame = useCurrentFrame();
  const opacity = staticMode ? 1 : fade(frame, 39.5, 43.5);
  const lift = staticMode ? 0 : (1 - opacity) * 18;
  const highlight = !staticMode && frame >= sec(50.2) && frame <= sec(52.6);
  const cursorOn = Math.floor(frame / 18) % 2 === 0;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity,
        transform: `translateY(${lift}px)`,
        fontFamily: '"Noto Sans SC", sans-serif',
      }}
    >
      <div style={{position: 'absolute', inset: 0, background: '#15181e'}} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 24,
          top: 20,
          width: 1872,
          height: 1044,
          background: PANEL,
          borderTop: '2px solid #f3efe3',
          borderLeft: '2px solid #f3efe3',
          borderRight: '2px solid #8f8a7d',
          borderBottom: '2px solid #8f8a7d',
          boxShadow: '0 20px 60px rgba(0,0,0,0.55)',
        }}
      >
        {/* 标题栏 */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            height: 38,
            background: '#163b8f',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 14,
            fontSize: 18,
            letterSpacing: 1,
          }}
        >
          RPG Maker 2000 - 地图001
          <div style={{flex: 1}} />
          {['—', '□', '×'].map((symbol) => (
            <div
              key={symbol}
              style={{
                width: 26,
                height: 24,
                marginRight: 6,
                background: PANEL,
                color: INK,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                borderTop: '2px solid #f3efe3',
                borderLeft: '2px solid #f3efe3',
                borderRight: '2px solid #8f8a7d',
                borderBottom: '2px solid #8f8a7d',
              }}
            >
              {symbol}
            </div>
          ))}
        </div>

        {/* 菜单栏 */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 38,
            right: 0,
            height: 34,
            display: 'flex',
            alignItems: 'center',
            gap: 26,
            paddingLeft: 16,
            fontSize: 17,
            borderBottom: '1px solid #a8a395',
          }}
        >
          {['文件', '编辑', '视图', '插入', '工具', '游戏', '帮助'].map(
            (item) => (
              <span key={item}>{item}</span>
            ),
          )}
        </div>

        {/* 工具栏 */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 72,
            right: 0,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            paddingLeft: 12,
            background: '#ddD9cc',
            borderBottom: '1px solid #a8a395',
          }}
        >
          {['新', '开', '存', '撤', '播', '格'].map((label, index) => (
            <div
              key={label}
              style={{
                width: 34,
                height: 30,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 15,
                color: index === 4 ? '#7a2f2f' : INK,
                background: PANEL,
                borderTop: '2px solid #f3efe3',
                borderLeft: '2px solid #f3efe3',
                borderRight: '2px solid #8f8a7d',
                borderBottom: '2px solid #8f8a7d',
              }}
            >
              {label}
            </div>
          ))}
          <div style={{width: 20}} />
          <div style={{fontSize: 15, color: '#4a463c'}}>地图 001 · 20 × 15 · 缩放 300%</div>
        </div>

        {/* 左：地图树 */}
        <div
          style={{
            position: 'absolute',
            left: 8,
            top: 124,
            width: 424,
            height: 880,
            background: PANEL,
            boxShadow: BEVEL_IN,
          }}
        >
          <div
            style={{
              height: 30,
              background: '#8f8a7d',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 10,
              fontSize: 16,
            }}
          >
            地图树
          </div>
          <div style={{paddingTop: 6}}>
            <TreeRow depth={0} label="项目1" bullet="▾" />
            <TreeRow depth={1} label="地图" bullet="▾" />
            <TreeRow depth={2} label="地图001  (20×15)" active bullet="▸" />
            <TreeRow depth={2} label="地图002" bullet="▸" />
            <TreeRow depth={1} label="事件" bullet="▾" />
            <TreeRow depth={2} label="001  小鲸鱼" bullet="•" />
            <TreeRow depth={2} label="002  宝箱" bullet="•" />
            <TreeRow depth={2} label="003  门" bullet="•" />
            <TreeRow depth={1} label="开关" bullet="▾" />
            <TreeRow depth={2} label="0001  钥匙" bullet="•" />
            <TreeRow depth={2} label="0002  见到小鲸鱼" bullet="•" />
            <TreeRow depth={1} label="变量" bullet="▸" />
            <TreeRow depth={1} label="公共事件" bullet="▸" />
            <TreeRow depth={1} label="图块组" bullet="▸" />
          </div>
          <div
            style={{
              position: 'absolute',
              left: 14,
              right: 14,
              bottom: 14,
              height: 150,
              background: '#25292d',
              border: '2px solid #8f8a7d',
              padding: 12,
              color: '#b9c3ca',
              fontSize: 14,
              lineHeight: 1.7,
            }}
          >
            <div style={{color: '#e8dfc8'}}>地图属性</div>
            <div>宽 20 · 高 15</div>
            <div>图块 16 × 16 px</div>
            <div>背景音乐：无</div>
            <div>遇敌：无</div>
          </div>
        </div>

        {/* 右：图块素材 */}
        <div
          style={{
            position: 'absolute',
            left: 1440,
            top: 124,
            width: 424,
            height: 880,
            background: PANEL,
            boxShadow: BEVEL_IN,
          }}
        >
          <div
            style={{
              height: 30,
              background: '#8f8a7d',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 10,
              fontSize: 16,
            }}
          >
            图块素材
          </div>
          <div style={{padding: 12}}>
            <div
              style={{
                background: '#2b2f33',
                padding: 8,
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 48px)',
                gap: 6,
                border: '2px solid #8f8a7d',
              }}
            >
              {TILE_KINDS.map((kind, index) => (
                <div
                  key={`${kind}-${index}`}
                  style={{
                    position: 'relative',
                    width: 48,
                    height: 48,
                    outline:
                      index === 0 ? '3px solid #d33a3a' : '1px solid #1a1c1f',
                    outlineOffset: index === 0 ? -1 : 0,
                  }}
                >
                  <TileIcon kind={kind} />
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 12,
                fontSize: 15,
                color: '#3a362e',
                lineHeight: 1.7,
              }}
            >
              <div>图块组：野外</div>
              <div>选中：草地</div>
              <div>通行：可通行</div>
            </div>
            <div
              style={{
                marginTop: 12,
                height: 160,
                background: '#2b2f33',
                border: '2px solid #8f8a7d',
                color: '#b9c3ca',
                fontSize: 14,
                padding: 10,
                lineHeight: 1.7,
              }}
            >
              <div style={{color: '#e8dfc8'}}>图层</div>
              <div>▸ 下层 1</div>
              <div>▸ 下层 2</div>
              <div>▸ 上层 1</div>
              <div>▸ 上层 2</div>
            </div>
          </div>
        </div>

        {/* 下：事件 / 开关 */}
        <div
          style={{
            position: 'absolute',
            left: 440,
            top: 872,
            width: 992,
            height: 150,
            background: PANEL,
            boxShadow: BEVEL_IN,
            display: 'flex',
          }}
        >
          <div style={{width: 492, borderRight: '1px solid #8f8a7d'}}>
            <div
              style={{
                height: 28,
                display: 'flex',
                alignItems: 'flex-end',
                paddingLeft: 8,
                gap: 2,
              }}
            >
              {['地图', '事件', '开关'].map((tab) => (
                <div
                  key={tab}
                  style={{
                    padding: '3px 14px',
                    fontSize: 15,
                    background: tab === '事件' ? PANEL : PANEL_DARK,
                    borderTop:
                      tab === '事件'
                        ? '2px solid #f3efe3'
                        : '2px solid #c9c5b8',
                    borderLeft:
                      tab === '事件'
                        ? '2px solid #f3efe3'
                        : '2px solid #c9c5b8',
                    borderRight: '2px solid #8f8a7d',
                  }}
                >
                  {tab}
                </div>
              ))}
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 150px 120px 1fr',
                fontSize: 15,
                color: '#3a362e',
                padding: '4px 10px',
                gap: 4,
                borderBottom: '1px solid #a8a395',
              }}
            >
              <span>ID</span>
              <span>名称</span>
              <span>触发</span>
              <span>条件</span>
            </div>
            {[
              ['001', '小鲸鱼', '并行处理', '开关 0002'],
              ['002', '宝箱', '决定键', '开关 0003'],
              ['003', '门', '玩家接触', '开关 0001'],
            ].map((row, index) => (
              <div
                key={row[0]}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '60px 150px 120px 1fr',
                  fontSize: 15,
                  padding: '3px 10px',
                  gap: 4,
                  background:
                    index === 0 && highlight ? '#b9cdf2' : 'transparent',
                  color: '#1f1f1f',
                }}
              >
                {row.map((cell) => (
                  <span key={cell}>{cell}</span>
                ))}
              </div>
            ))}
          </div>
          <div style={{flex: 1}}>
            <div
              style={{
                height: 28,
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 12,
                fontSize: 15,
                color: '#3a362e',
                borderBottom: '1px solid #a8a395',
              }}
            >
              开关
            </div>
            {[
              ['0001', '钥匙', 'OFF'],
              ['0002', '见到小鲸鱼', 'ON'],
              ['0003', '宝箱', 'ON'],
            ].map((row) => (
              <div
                key={row[0]}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '64px 1fr 56px',
                  fontSize: 15,
                  padding: '3px 12px',
                  color: '#1f1f1f',
                }}
              >
                {row.map((cell) => (
                  <span key={cell}>{cell}</span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 状态栏 */}
        <div
          style={{
            position: 'absolute',
            left: 8,
            right: 8,
            bottom: 4,
            height: 28,
            background: PANEL,
            boxShadow: BEVEL_IN,
            display: 'flex',
            alignItems: 'center',
            gap: 26,
            paddingLeft: 12,
            fontSize: 14,
            color: '#3a362e',
          }}
        >
          <span>图块 16×16 px</span>
          <span>光标 (15, 4)</span>
          <span>缩放 300%</span>
          <span>开关 3</span>
          <div style={{flex: 1}} />
          <span style={{paddingRight: 12}}>{cursorOn ? '就绪' : ''}</span>
        </div>
      </div>
    </div>
  );
};
