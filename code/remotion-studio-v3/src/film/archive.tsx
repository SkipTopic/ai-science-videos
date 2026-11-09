import React from 'react';
import {interpolate} from 'remotion';
import {C, PIXEL, SANS, SERIF, clamp, hash} from './theme';
import {useSceneFrame} from './sceneClock';

const BEVEL = 'inset 2px 2px 0 #f3efe3, inset -2px -2px 0 #8f8a7d';

export const BrowserFrame: React.FC<{
  title?: string;
  url: string;
  children: React.ReactNode;
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  scale?: number;
  scroll?: number;
  pageHeight?: number;
  status?: string;
  dark?: boolean;
}> = ({
  title = 'Netscape Navigator',
  url,
  children,
  left = 140,
  top = 70,
  width = 1640,
  height = 940,
  scale = 1,
  scroll = 0,
  pageHeight,
  status = 'Document: Done',
  dark = false,
}) => {
  const frame = useSceneFrame();
  const cursorX = width * (0.52 + Math.sin(frame / 90) * 0.08);
  const cursorY = height * (0.58 + Math.cos(frame / 120) * 0.06);
  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width,
        height,
        transform: `scale(${scale})`,
        transformOrigin: '0 0',
        background: dark ? '#1f1f1f' : '#c9c5b8',
        border: '1px solid #5a564c',
        boxShadow: '0 30px 80px rgba(0,0,0,0.55)',
        fontFamily: SANS,
        color: '#1b1b1b',
      }}
    >
      <div
        style={{
          height: 36,
          background: 'linear-gradient(90deg,#102a6b,#3a5a9f)',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 14,
          color: '#ece7da',
          fontSize: 16,
          letterSpacing: 1,
        }}
      >
        <span style={{fontWeight: 700}}>{title}</span>
        <div style={{marginLeft: 'auto', display: 'flex', gap: 3, paddingRight: 6}}>
          {['_', '□', '×'].map((item) => (
            <div
              key={item}
              style={{
                width: 26,
                height: 24,
                background: '#c9c5b8',
                color: '#1b1b1b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 15,
                border: '1px solid #6b665a',
                boxShadow: BEVEL,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          gap: 26,
          padding: '5px 18px',
          fontSize: 14,
          background: '#d2cec1',
          borderBottom: '1px solid #8f8a7d',
        }}
      >
        {['ファイル', '編集', '表示', '移動', 'ブックマーク', 'ツール', 'ヘルプ'].map(
          (item) => (
            <span key={item} style={{opacity: 0.8}}>
              {item}
            </span>
          ),
        )}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '5px 10px',
          background: '#c9c5b8',
          borderBottom: '1px solid #8f8a7d',
        }}
      >
        {['戻る', '進む', '再読込', 'ホーム', '検索'].map((item) => (
          <div
            key={item}
            style={{
              minWidth: 58,
              padding: '4px 8px',
              textAlign: 'center',
              fontSize: 12,
              background: '#d8d4c7',
              border: '1px solid #8f8a7d',
              boxShadow: BEVEL,
            }}
          >
            {item}
          </div>
        ))}
        <div
          style={{
            flex: 1,
            marginLeft: 8,
            height: 26,
            background: '#f4f1e7',
            border: '1px solid #8f8a7d',
            boxShadow: 'inset 1px 1px 0 #6b665a',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 10,
            fontSize: 13,
            color: '#333',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {url}
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 8,
          right: 8,
          top: 112,
          bottom: 30,
          overflow: 'hidden',
          background: '#fff',
          border: '1px solid #6b665a',
        }}
      >
        <div
          style={{
            transform: `translateY(${-scroll}px)`,
            height: pageHeight,
            position: 'relative',
          }}
        >
          {children}
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 30,
          background: '#d2cec1',
          borderTop: '1px solid #8f8a7d',
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          fontSize: 12,
          color: '#3a3a3a',
        }}
      >
        <span style={{marginRight: 18}}>{status}</span>
        <span style={{opacity: 0.55}}>© ASCII / Enterbrain</span>
      </div>
      <svg
        width={22}
        height={28}
        viewBox="0 0 22 28"
        style={{
          position: 'absolute',
          left: cursorX,
          top: cursorY,
          filter: 'drop-shadow(0 3px 2px rgba(0,0,0,0.5))',
          pointerEvents: 'none',
        }}
      >
        <path d="M2 1 L2 21 L7 16 L11 25 L15 23 L11 14 L19 14 Z" fill="#f6f2e6" stroke="#111" strokeWidth="1.4" />
      </svg>
    </div>
  );
};

const japaneseHeadlines = [
  {
    title: 'So-net がマルチメディアグランプリ’97の受賞謝恩祝賀会を開催',
    gloss: 'So-net 获得多媒体大奖',
    meta: '1997.12.11 / ソニー',
  },
  {
    title: '沖電気が ISDN 端末装置用の TA 機能内蔵 DSU-LSI を開発',
    gloss: '冲电气开发 ISDN 芯片',
    meta: '1997.12.11 / 沖電気',
  },
  {
    title: 'IBM が年末懇親会を開催、北城社長「悲観はしていない」',
    gloss: 'IBM 开年末恳亲会',
    meta: '1997.12.11 / IBM',
  },
];

export const ASCII1997Page: React.FC<{
  highlight?: number;
  dim?: boolean;
}> = ({highlight = -1, dim = false}) => (
  <div
    style={{
      background: '#0c1b46',
      minHeight: 1600,
      color: '#e8edf8',
      fontFamily: SANS,
      padding: '28px 34px',
      boxSizing: 'border-box',
      filter: dim ? 'brightness(0.55)' : undefined,
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        borderBottom: '3px solid #6f8fd0',
        paddingBottom: 16,
      }}
    >
      <div>
        <div
          style={{
            fontFamily: PIXEL,
            fontSize: 30,
            letterSpacing: 4,
            color: '#f4f2e8',
          }}
        >
          ASCII
        </div>
        <div style={{fontSize: 12, letterSpacing: 4, color: '#9db4e8'}}>
          ASCII HOMEPAGE
        </div>
      </div>
      <div
        style={{
          marginLeft: 'auto',
          fontSize: 13,
          color: '#a9bce5',
          textAlign: 'right',
          lineHeight: 1.8,
        }}
      >
        1997 年 12 月 11 日（木）
        <br />
        What's New / 更新情報
      </div>
    </div>
    <div style={{display: 'flex', gap: 24, marginTop: 22}}>
      <div style={{width: 190, flexShrink: 0}}>
        {['ニュース', 'ASCII24', 'So-net', 'MIDI POT', 'Super ASCII', 'オンラインショップ', '教育事業'].map(
          (item, index) => (
            <div
              key={item}
              style={{
                padding: '7px 10px',
                marginBottom: 5,
                background: index === 0 ? '#203a78' : 'transparent',
                borderLeft: `3px solid ${index === 0 ? '#e8b95f' : '#34518f'}`,
                fontSize: 13,
                color: '#c3d2f0',
              }}
            >
              {item}
            </div>
          ),
        )}
        <div
          style={{
            marginTop: 22,
            padding: 12,
            border: '1px solid #34518f',
            fontSize: 11,
            lineHeight: 1.9,
            color: '#8fa8d8',
          }}
        >
          ASCII は、コンピュータと
          <br />
          コミュニケーションの
          <br />
          未来をつくります。
        </div>
      </div>
      <div style={{flex: 1}}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '9px 12px',
            background: '#132a61',
            border: '1px solid #36538f',
            fontSize: 13,
            color: '#c3d4f2',
          }}
        >
          <span style={{color: '#e8b95f'}}>■</span>
          TODAY'S HEADLINES
          <span style={{marginLeft: 'auto', fontSize: 11, opacity: 0.6}}>
            全 12 件
          </span>
        </div>
        {japaneseHeadlines.map((item, index) => {
          const active = highlight === index;
          return (
            <div
              key={item.title}
              style={{
                display: 'flex',
                gap: 16,
                padding: '16px 14px',
                borderBottom: '1px solid #253c70',
                background: active ? '#f0e7d2' : 'transparent',
                color: active ? '#152346' : '#dfe7f6',
                transition: undefined,
              }}
            >
              <div
                style={{
                  fontFamily: PIXEL,
                  fontSize: 11,
                  color: active ? '#b33a2f' : '#6f8fc9',
                  paddingTop: 3,
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </div>
              <div>
                <div style={{fontSize: 18, lineHeight: 1.7, fontWeight: active ? 700 : 400}}>
                  {item.title}
                </div>
                <div
                  style={{
                    marginTop: 4,
                    fontSize: 13,
                    color: active ? '#6f5a3a' : '#8fa4cf',
                  }}
                >
                  {item.gloss}
                </div>
              </div>
              <div
                style={{
                  marginLeft: 'auto',
                  fontSize: 11,
                  color: active ? '#8a7450' : '#6780b2',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.meta}
              </div>
            </div>
          );
        })}
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 18}}>
          {[
            ['MIDI POT', 'J-POP の MIDI データを 1 曲 50 円で配信中'],
            ['ASCII24', '毎日更新の PC ニュースサイト。本日 14 本。'],
            ['Cyber Patrol', '学校・家庭向けのコンテンツフィルタリング。'],
            ['学校 step up テキスト', '教育現場向けの教材シリーズ。'],
            ['Super ASCII', 'PC 用語のオンライン辞典。'],
            ['arcs', 'ASCII オンラインショッピング。'],
          ].map(([title, text]) => (
            <div
              key={title}
              style={{
                padding: '10px 12px',
                border: '1px solid #2d477e',
                background: '#0f2253',
                fontSize: 12,
                color: '#a9bfe8',
              }}
            >
              <div style={{color: '#e8b95f', fontWeight: 700, marginBottom: 4}}>{title}</div>
              {text}
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 22,
            padding: 14,
            border: '1px dashed #46619c',
            fontSize: 12,
            color: '#8ea6d3',
            lineHeight: 1.9,
          }}
        >
          本日の更新：ニュース 12 件 / 出演者募集 1 件 / 新製品情報 3 件
          <br />
          Copyright (C) 1997 ASCII Corporation. All rights reserved.
        </div>
      </div>
    </div>
  </div>
);

const enterbrainProducts = [
  {title: '2D 格闘ツクール 2nd', price: '12/5 発売', note: '格闘ゲーム制作'},
  {title: '恋愛シミュレーションツクール 2', price: '12/5 発売', note: '恋愛ゲーム制作'},
  {title: 'ツクール VALUE 6 タイトル', price: '各 3,800 円', note: '11/28 発売'},
  {title: '週刊ファミ通', price: '350 円', note: '毎週金曜日'},
  {title: 'ファミ通 PS2', price: '550 円', note: '隔週'},
  {title: '綾波育成計画 指導要綱', price: '11/19', note: '攻略本'},
];

export const Enterbrain2001Page: React.FC<{highlight?: number}> = ({highlight = -1}) => (
  <div
    style={{
      background: '#ece9df',
      minHeight: 1700,
      fontFamily: SANS,
      color: '#242424',
      fontSize: 13,
    }}
  >
    <div
      style={{
        background: '#1b2a4a',
        color: '#f0ede4',
        padding: '18px 26px',
        display: 'flex',
        alignItems: 'flex-end',
        gap: 20,
      }}
    >
      <div>
        <div style={{fontFamily: SERIF, fontSize: 34, fontWeight: 700, letterSpacing: 2}}>
          enterbrain
        </div>
        <div style={{fontSize: 11, letterSpacing: 4, opacity: 0.6}}>
          ENTERBRAIN, INC. / 2001.11.30
        </div>
      </div>
      <div style={{marginLeft: 'auto', display: 'flex', gap: 18, fontSize: 12, opacity: 0.75}}>
        <span>HOME</span>
        <span>PRODUCTS</span>
        <span>MAGAZINES</span>
        <span>EVENTS</span>
      </div>
    </div>
    <div style={{display: 'flex'}}>
      <div style={{width: 170, background: '#dcd8cc', padding: '16px 10px', minHeight: 1580}}>
        {['新製品', 'ツクール', 'ファミ通', '攻略本', '文庫', 'えんため大賞', '会社情報'].map(
          (item, index) => (
            <div
              key={item}
              style={{
                padding: '7px 9px',
                marginBottom: 4,
                background: index === 1 ? '#b33a2f' : 'transparent',
                color: index === 1 ? '#fff' : '#3a3a3a',
                fontSize: 12,
              }}
            >
              {item}
            </div>
          ),
        )}
      </div>
      <div style={{flex: 1, padding: 22}}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: '2px solid #2b2b2b',
            paddingBottom: 8,
            marginBottom: 14,
          }}
        >
          <span style={{fontSize: 18, fontWeight: 700}}>新製品情報 / NEW PRODUCTS</span>
          <span style={{fontSize: 11, color: '#666'}}>2001.11.30 更新</span>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12}}>
          {enterbrainProducts.map((product, index) => {
            const active = highlight === index;
            return (
              <div
                key={product.title}
                style={{
                  background: active ? '#f6e6c8' : '#f7f4ea',
                  border: `1px solid ${active ? '#b33a2f' : '#bdb8aa'}`,
                  padding: 10,
                  minHeight: 118,
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    height: 62,
                    background:
                      index < 3
                        ? 'linear-gradient(135deg,#343f55,#10151d)'
                        : 'linear-gradient(135deg,#c7b58f,#897552)',
                    marginBottom: 7,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#f0eadb',
                    fontFamily: PIXEL,
                    fontSize: 8,
                    letterSpacing: 1,
                  }}
                >
                  {index < 3 ? 'TSUKUURU' : 'FAMITSU'}
                </div>
                <div style={{fontSize: 12.5, fontWeight: 700, lineHeight: 1.45}}>
                  {product.title}
                </div>
                <div style={{fontSize: 11, color: '#8a3a30', marginTop: 2}}>{product.price}</div>
                <div style={{fontSize: 10, color: '#777', marginTop: 2}}>{product.note}</div>
              </div>
            );
          })}
        </div>
        <div
          style={{
            marginTop: 18,
            padding: 12,
            background: '#f7f4ea',
            border: '1px solid #c7c1b3',
            display: 'flex',
            gap: 18,
            alignItems: 'center',
          }}
        >
          <div style={{fontFamily: PIXEL, fontSize: 10, color: '#b33a2f'}}>PICK UP</div>
          <div style={{fontSize: 13}}>
            「第四回 エンターブレインえんため大賞」作品募集 / 締切 2002.1.31
          </div>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 14, marginTop: 18}}>
          <div style={{background: '#f7f4ea', border: '1px solid #c7c1b3', padding: 14}}>
            <div style={{fontWeight: 700, borderBottom: '1px solid #c7c1b3', paddingBottom: 6, marginBottom: 8}}>
              週刊ファミ通 / 最新号
            </div>
            <div style={{display: 'flex', gap: 12}}>
              <div
                style={{
                  width: 86,
                  height: 112,
                  background: 'linear-gradient(160deg,#c23a32,#6b1514)',
                  color: '#fff',
                  fontFamily: SERIF,
                  fontWeight: 700,
                  fontSize: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                週刊
                <br />
                ファミ通
              </div>
              <div style={{fontSize: 11.5, lineHeight: 1.9, color: '#444'}}>
                2001 年 12 月 7 日号
                <br />
                定価 350 円
                <br />
                特集：年末商戦の主役たち
                <br />
                PS2 / GBA / ゲームボーイアドバンス
              </div>
            </div>
          </div>
          <div style={{background: '#f7f4ea', border: '1px solid #c7c1b3', padding: 14, fontSize: 11.5, lineHeight: 1.9, color: '#444'}}>
            <div style={{fontWeight: 700, marginBottom: 6}}>INFORMATION</div>
            ・Fami 通 Xbox 2002.1.30 創刊
            <br />
            ・Famitsu Marketing Data Service
            <br />
            ・株式会社猿楽庁 資本参加
            <br />
            ・ツクールVALUE 6 タイトル 3,800 円
            <br />
            ・2D 格闘ツクール 2nd 12/5 発売
          </div>
        </div>
        <div style={{marginTop: 18, fontSize: 10.5, color: '#777', lineHeight: 2}}>
          掲載されている商品名・価格は 2001 年 11 月 30 日時点のものです。 / 画面は復元イメージです。
          <br />
          Copyright (C) 2001 Enterbrain, Inc. All rights reserved.
        </div>
      </div>
    </div>
  </div>
);

export const ForumPost2004: React.FC<{reveal?: number}> = ({reveal = 1}) => (
  <div
    style={{
      background: '#eef0e8',
      minHeight: 1400,
      fontFamily: SANS,
      fontSize: 14,
      color: '#222',
    }}
  >
    <div
      style={{
        background: '#3f5e42',
        color: '#eef3ea',
        padding: '18px 26px',
        display: 'flex',
        alignItems: 'center',
        gap: 18,
      }}
    >
      <div style={{fontFamily: SERIF, fontSize: 26, fontWeight: 700}}>
        夢日記 掲示板
      </div>
      <div style={{fontSize: 11, opacity: 0.65, letterSpacing: 1}}>
        DREAM DIARY / BBS
      </div>
      <div style={{marginLeft: 'auto', fontSize: 11, opacity: 0.6}}>
        2004.06.26 (SAT)
      </div>
    </div>
    <div style={{padding: '20px 28px', display: 'flex', gap: 24}}>
      <div style={{flex: 1}}>
        <div
          style={{
            border: '1px solid #b9beb0',
            background: '#f8f8f3',
            padding: 18,
          }}
        >
          <div style={{fontSize: 12, color: '#5d6b58', marginBottom: 10}}>
            投稿者：名無しさん / 2004-06-26 02:14
          </div>
          <div style={{fontSize: 22, fontWeight: 700, lineHeight: 1.5, color: '#1d2a1d'}}>
            新しいゲームをうｐしました
          </div>
          <div style={{marginTop: 12, fontSize: 14, lineHeight: 1.9, color: '#3a3a3a'}}>
            少し遊べるものができたので置いておきます。
            <br />
            よかったら遊んでみてください。
          </div>
          <div
            style={{
              marginTop: 18,
              border: '1px solid #a9b1a2',
              background: '#e9ece2',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <div
              style={{
                width: 38,
                height: 46,
                background: '#d8d5c8',
                border: '1px solid #8f8f84',
                position: 'relative',
              }}
            >
              <div style={{position: 'absolute', inset: 8, background: '#f8f5ea'}} />
              <div style={{position: 'absolute', left: 13, bottom: 6, width: 10, height: 12, background: '#8f8f84'}} />
            </div>
            <div>
              <div style={{fontWeight: 700, fontSize: 15}}>yumenikki.zip</div>
              <div style={{fontSize: 12, color: '#666', marginTop: 2}}>
                22.4 MB / ダウンロード 312
              </div>
            </div>
            <div
              style={{
                marginLeft: 'auto',
                padding: '6px 14px',
                background: '#4a6f4d',
                color: '#fff',
                fontSize: 12,
                opacity: reveal,
              }}
            >
              DOWNLOAD
            </div>
          </div>
          <div
            style={{
              marginTop: 14,
              height: 7,
              background: '#d5d8cc',
              border: '1px solid #aab0a3',
            }}
          >
            <div
              style={{
                width: `${Math.min(1, reveal) * 100}%`,
                height: '100%',
                background: '#5d7f5b',
              }}
            />
          </div>
          <div style={{marginTop: 6, fontSize: 11, color: '#6c7467'}}>
            {reveal >= 1 ? '解凍中… 100%' : `解凍中… ${Math.round(reveal * 100)}%`}
          </div>
        </div>
        {[
          ['>> 2', 'なにこれ、部屋から出られない', '2004-06-27 01:02'],
          ['>> 3', '効果を集めるのか……', '2004-06-28 22:10'],
          ['>> 4', 'BGM が怖い。でも消せない。', '2004-07-01 03:45'],
        ].map(([no, text, date]) => (
          <div
            key={no}
            style={{
              border: '1px solid #c5c9bd',
              borderTop: 'none',
              background: '#f2f3ed',
              padding: '12px 18px',
              fontSize: 13,
              color: '#3a3a3a',
            }}
          >
            <span style={{color: '#6b7b67', marginRight: 10}}>{no}</span>
            {text}
            <span style={{float: 'right', fontSize: 11, color: '#8a9086'}}>{date}</span>
          </div>
        ))}
      </div>
      <div style={{width: 260}}>
        <div style={{background: '#dde2d7', border: '1px solid #b9beb0', padding: 14, fontSize: 12, lineHeight: 1.9}}>
          <div style={{fontWeight: 700, marginBottom: 6}}>このスレッド</div>
          レス数 4
          <br />
          閲覧数 1,204
          <br />
          最終更新 2004-07-01
        </div>
        <div style={{marginTop: 12, background: '#f4f5ef', border: '1px solid #c5c9bd', padding: 14, fontSize: 12, lineHeight: 1.9, color: '#5a5a5a'}}>
          ルール
          <br />
          ・sage 推奨
          <br />
          ・ネタバレ禁止
          <br />
          ・再アップ禁止
        </div>
      </div>
    </div>
  </div>
);

export const Forum66RPG: React.FC<{scroll?: number}> = ({scroll = 0}) => (
  <div style={{background: '#e8eef4', minHeight: 1500, fontFamily: SANS, fontSize: 14}}>
    <div
      style={{
        background: 'linear-gradient(180deg,#1d446e,#102a48)',
        color: '#eaf2fa',
        padding: '16px 28px',
        display: 'flex',
        alignItems: 'center',
        gap: 20,
      }}
    >
      <div style={{fontFamily: SERIF, fontWeight: 900, fontSize: 34, letterSpacing: 1}}>
        66RPG
      </div>
      <div style={{fontSize: 12, letterSpacing: 3, opacity: 0.6}}>
        66RPG.COM / 中文 RPG 制作论坛
      </div>
      <div style={{marginLeft: 'auto', display: 'flex', gap: 18, fontSize: 12, opacity: 0.75}}>
        <span>论坛</span>
        <span>素材</span>
        <span>教程</span>
        <span>游戏</span>
      </div>
    </div>
    <div style={{display: 'flex', gap: 18, padding: '18px 26px'}}>
      <div style={{width: 190, flexShrink: 0}}>
        {['论坛首页', 'RPG Maker XP', 'RPG Maker 2003', '原创游戏发布', '素材分享', '新手提问', '版务'].map(
          (item, index) => (
            <div
              key={item}
              style={{
                padding: '8px 10px',
                marginBottom: 4,
                background: index === 0 ? '#2f5f8f' : '#d8e2ec',
                color: index === 0 ? '#fff' : '#26405a',
                fontSize: 12.5,
              }}
            >
              {item}
            </div>
          ),
        )}
        <div
          style={{
            marginTop: 16,
            padding: 12,
            background: '#f2f6fa',
            border: '1px solid #c3d2df',
            fontSize: 11,
            lineHeight: 1.9,
            color: '#5a6b7a',
          }}
        >
          今日发帖 128
          <br />
          会员 12,406
          <br />
          最高在线 1,204
        </div>
      </div>
      <div style={{flex: 1}}>
        <div
          style={{
            background: '#f7fafc',
            border: '1px solid #c3d2df',
            padding: '10px 14px',
            display: 'flex',
            fontSize: 12,
            color: '#5a6b7a',
            fontWeight: 700,
          }}
        >
          <span style={{flex: 1}}>版块 / 主题</span>
          <span style={{width: 110}}>作者</span>
          <span style={{width: 90}}>回复</span>
          <span style={{width: 130}}>最后发表</span>
        </div>
        {[
          ['【发布】黑暗圣剑传说 完整工程文件', '柳柳', '1,842', '2006-03-12'],
          ['[原创] 用 XP 做的一个小游戏，欢迎试玩', '星尘', '96', '2006-03-11'],
          ['[求助] 怎么让门只在拿到钥匙后打开？', '新手上路', '14', '2006-03-11'],
          ['[分享] 自己画的行走图，免费使用', '小画匠', '203', '2006-03-10'],
          ['[教程] 从零开始做一个村庄', '柳柳', '621', '2006-03-09'],
          ['[讨论] 大家第一个做完的游戏是什么？', '夜行', '77', '2006-03-09'],
          ['[发布] 黑暗圣剑传说 更新补丁 v1.2', '柳柳', '380', '2006-03-08'],
          ['[素材] 中式古建筑图块一组', '青瓦', '152', '2006-03-07'],
          ['[求助] 事件页里的开关是什么意思', '小北', '31', '2006-03-06'],
        ].map(([title, author, replies, date], index) => (
          <div
            key={title}
            style={{
              display: 'flex',
              padding: '11px 14px',
              border: '1px solid #d2dde7',
              borderTop: 'none',
              background: index % 2 === 0 ? '#fff' : '#f4f8fb',
              fontSize: 12.5,
              alignItems: 'center',
            }}
          >
            <span style={{flex: 1, color: index === 0 ? '#1d4f7a' : '#2d3f4f', fontWeight: index === 0 ? 700 : 400}}>
              {title}
            </span>
            <span style={{width: 110, color: '#6a7b8a'}}>{author}</span>
            <span style={{width: 90, color: '#6a7b8a'}}>{replies}</span>
            <span style={{width: 130, color: '#8a99a6', fontSize: 11}}>{date}</span>
          </div>
        ))}
        <div
          style={{
            marginTop: 16,
            background: '#f7fafc',
            border: '1px solid #c3d2df',
            padding: 16,
            fontSize: 12,
            color: '#5a6b7a',
            lineHeight: 1.9,
          }}
        >
          公告：本站以交流 RPG Maker 制作为主，禁止发布盗版商业素材。
          <br />
          <span style={{color: '#b33a2f'}}>置顶：</span>黑暗圣剑传说工程文件已开放下载，请勿用于商业用途。
        </div>
      </div>
    </div>
  </div>
);

export const GameStoreShelf: React.FC = () => (
  <div style={{position: 'absolute', inset: 0, background: '#171717', overflow: 'hidden'}}>
    <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 20%, rgba(255,214,140,0.16), rgba(10,10,10,0.95) 70%)'}} />
    {[210, 470, 730].map((top) => (
      <div key={top} style={{position: 'absolute', left: 120, right: 120, top, height: 16, background: '#2a2622', boxShadow: '0 12px 30px rgba(0,0,0,0.6)'}} />
    ))}
    {Array.from({length: 14}, (_, index) => {
      const row = index < 7 ? 0 : 1;
      const col = index % 7;
      return (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: 160 + col * 220,
            top: [70, 330, 590][row] + (index % 3) * 6,
            width: 170,
            height: 235,
            background: ['#1c2b44', '#3a1c22', '#1f3328', '#2b2438'][index % 4],
            border: '1px solid rgba(255,255,255,0.16)',
            boxShadow: '0 12px 20px rgba(0,0,0,0.45)',
            padding: 10,
            boxSizing: 'border-box',
          }}
        >
          <div style={{fontFamily: PIXEL, fontSize: 8, color: 'rgba(255,255,255,0.5)', letterSpacing: 1}}>
            PLAYSTATION
          </div>
          <div
            style={{
              marginTop: 22,
              fontFamily: SERIF,
              fontWeight: 900,
              fontSize: 22,
              lineHeight: 1.25,
              color: ['#e8dcc2', '#d8b0a0', '#c9d8c0', '#e0d0e8'][index % 4],
            }}
          >
            {['RPG MAKER', 'ARC THE LAD', 'WILD ARMS', 'BREATH OF FIRE', 'GRANDIA', 'LUNAR', 'SUIKODEN', 'VAGRANT', 'XENOGEARS', 'PARASITE EVE', 'CHRONO', 'FRONT MISSION', 'OGRE', 'TACTICS'][index]}
          </div>
          <div style={{position: 'absolute', left: 10, bottom: 12, fontFamily: SANS, fontSize: 10, color: 'rgba(255,255,255,0.35)'}}>
            {['2000', '1999', '1999', '1998', '1999', '1998', '1999', '2000', '1998', '1998', '1999', '1999', '1995', '1995'][index]}
          </div>
        </div>
      );
    })}
    <div
      style={{
        position: 'absolute',
        left: 880,
        top: 620,
        width: 220,
        height: 290,
        background: '#0e1a33',
        border: '3px solid #d9b25f',
        boxShadow: '0 0 60px rgba(217,178,95,0.25)',
        padding: 16,
        boxSizing: 'border-box',
        transform: 'rotate(-1.5deg)',
      }}
    >
      <div style={{fontFamily: PIXEL, fontSize: 8, color: '#d9b25f', letterSpacing: 1}}>PLAYSTATION</div>
      <div style={{marginTop: 18, fontFamily: SERIF, fontWeight: 900, fontSize: 40, color: '#e8e2d4', lineHeight: 1.15}}>
        RPG
        <br />
        MAKER
      </div>
      <div style={{marginTop: 12, fontFamily: SANS, fontSize: 12, color: 'rgba(236,231,218,0.55)', letterSpacing: 1}}>
        AGETEC / 2000.10.2
      </div>
      <div style={{position: 'absolute', left: 16, bottom: 16, right: 16, height: 70, background: 'linear-gradient(135deg,#314b6a,#0b1424)'}}>
        <div style={{position: 'absolute', left: 12, top: 12, width: 46, height: 46, border: '2px solid rgba(217,178,95,0.6)'}} />
        <div style={{position: 'absolute', left: 70, top: 16, fontFamily: SANS, fontSize: 11, color: 'rgba(236,231,218,0.55)', lineHeight: 1.6}}>
          北米初の公式版
          <br />
          PlayStation
        </div>
      </div>
    </div>
    <div style={{position: 'absolute', left: 80, top: 60, fontFamily: SANS, fontSize: 20, letterSpacing: 4, color: 'rgba(236,231,218,0.5)'}}>
      NORTH AMERICA / 2000
    </div>
    <div style={{position: 'absolute', left: 80, bottom: 50, fontFamily: SANS, fontSize: 18, letterSpacing: 2, color: 'rgba(236,231,218,0.35)'}}>
      游戏店货架 / 复原示意
    </div>
  </div>
);

export const CorporateTimeline: React.FC<{
  entries: {year: string; name: string}[];
  strikeStart?: number;
  startAt?: number;
  interval?: number;
}> = ({entries, strikeStart = 0.8, startAt = 0, interval = 0.32}) => {
  const frame = useSceneFrame();
  return (
    <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 260px'}}>
      {entries.map((entry, index) => {
        const enter = interpolate(frame / 30, [startAt + index * interval, startAt + index * interval + 0.4], [0, 1], clamp);
        const strike = interpolate(
          frame / 30,
          [strikeStart + index * interval, strikeStart + index * interval + 0.35],
          [0, 1],
          clamp,
        );
        return (
          <div
            key={`${entry.year}-${entry.name}`}
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 44,
              padding: '13px 0',
              borderBottom: '1px solid rgba(236,231,218,0.1)',
              opacity: enter,
              transform: `translateX(${(1 - enter) * -26}px)`,
              position: 'relative',
            }}
          >
            <div style={{fontFamily: PIXEL, fontSize: 18, color: C.redBright, width: 110}}>
              {entry.year}
            </div>
            <div style={{fontFamily: SERIF, fontWeight: 900, fontSize: 54, letterSpacing: 2, color: C.cream}}>
              {entry.name}
            </div>
            <div
              style={{
                position: 'absolute',
                left: 150,
                top: '52%',
                height: 4,
                width: `${strike * 70}%`,
                background: C.red,
                transformOrigin: 'left center',
                opacity: 0.82,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export const ResolutionFrames: React.FC<{
  index: number;
  progress: number;
}> = ({index, progress}) => {
  const specs = [
    {w: 320, h: 240, label: '1992 / DANTE 98', year: '320 × 240'},
    {w: 640, h: 480, label: '2004 / RPG MAKER XP', year: '640 × 480'},
    {w: 544, h: 416, label: '2011 / RPG MAKER VX ACE', year: '544 × 416'},
    {w: 816, h: 624, label: '2015 / RPG MAKER MV', year: '816 × 624'},
  ];
  const spec = specs[Math.min(index, specs.length - 1)];
  const scale = interpolate(progress, [0, 1], [0.92, 1], clamp);
  return (
    <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 80}}>
      <div
        style={{
          width: 900,
          height: 680,
          background: '#0b0d10',
          border: '16px solid #26282c',
          boxShadow: '0 0 0 2px rgba(236,231,218,0.12), 0 30px 70px rgba(0,0,0,0.6)',
          position: 'relative',
          transform: `scale(${scale})`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'repeating-linear-gradient(0deg, rgba(0,0,0,0.22) 0 1px, transparent 1px 5px)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            gridTemplateColumns: `repeat(${index <= 1 ? 8 : 12}, 1fr)`,
            gridTemplateRows: `repeat(${index <= 1 ? 6 : 9}, 1fr)`,
            background: '#29402c',
          }}
        >
          {Array.from({length: (index <= 1 ? 8 : 12) * (index <= 1 ? 6 : 9)}, (_, i) => (
            <div
              key={i}
              style={{
                background:
                  hash(i * 7 + index) > 0.72
                    ? '#34513a'
                    : hash(i * 13) > 0.82
                      ? '#586a3f'
                      : '#2c4732',
                border: '1px solid rgba(0,0,0,0.18)',
                position: 'relative',
              }}
            >
              {hash(i * 17) > 0.86 ? (
                <div style={{position: 'absolute', left: '40%', top: '35%', width: 4, height: 10, background: '#c7b06a'}} />
              ) : null}
            </div>
          ))}
        </div>
        <div
          style={{
            position: 'absolute',
            left: '46%',
            top: '48%',
            width: 20,
            height: 30,
            background: '#2d4a82',
            boxShadow: '0 0 0 2px #16233c',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 20,
            bottom: 18,
            fontFamily: SANS,
            fontSize: 18,
            letterSpacing: 2,
            color: 'rgba(236,231,218,0.55)',
            zIndex: 3,
          }}
        >
          {spec.label}
        </div>
        <div
          style={{
            position: 'absolute',
            right: 20,
            top: 16,
            fontFamily: PIXEL,
            fontSize: 12,
            color: 'rgba(236,231,218,0.65)',
            zIndex: 3,
          }}
        >
          {spec.year}
        </div>
      </div>
      <div style={{width: 420}}>
        <div style={{fontFamily: SANS, fontSize: 20, letterSpacing: 5, color: 'rgba(236,231,218,0.45)'}}>
          RESOLUTION
        </div>
        <div style={{marginTop: 10, fontFamily: PIXEL, fontSize: 36, lineHeight: 1.35, whiteSpace: 'nowrap', color: C.cream, letterSpacing: 1}}>
          {spec.year}
        </div>
        <div style={{marginTop: 24, fontFamily: SANS, fontSize: 22, lineHeight: 1.9, color: 'rgba(236,231,218,0.55)'}}>
          {index === 0
            ? '最低分辨率，也是最多人记得的分辨率。'
            : index === 1
              ? 'XP 把画布放大了一倍。'
              : index === 2
                ? '中间还有一版 544 × 416。'
                : '但记忆里的那个蓝头发骑士，还停在 320 × 240。'}
        </div>
      </div>
    </div>
  );
};

export const NetworkMap: React.FC = () => {
  const frame = useSceneFrame();
  const nodes = [
    {x: 350, y: 290, label: 'RUSSIA', sub: 'Don Miguel'},
    {x: 780, y: 220, label: 'JAPAN', sub: '2ch / 掲示板'},
    {x: 1230, y: 340, label: 'NORTH AMERICA', sub: 'forums'},
    {x: 980, y: 690, label: 'CHINA', sub: '66RPG'},
    {x: 540, y: 740, label: 'EUROPE', sub: 'mirrors'},
  ];
  return (
    <div style={{position: 'absolute', inset: 0, background: '#06080a', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(236,231,218,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(236,231,218,0.04) 1px, transparent 1px)', backgroundSize: '64px 64px', opacity: 0.7}} />
      <svg width="100%" height="100%" viewBox="0 0 1920 1080" style={{position: 'absolute', inset: 0}}>
        {nodes.map((a, i) =>
          nodes.slice(i + 1).map((b, j) => (
            <line
              key={`${i}-${j}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="rgba(122,160,190,0.18)"
              strokeWidth="1.5"
            />
          )),
        )}
        {nodes.map((node, index) => {
          const pulse = 0.5 + 0.5 * Math.sin(frame / 22 + index * 1.7);
          return (
            <g key={node.label}>
              <circle cx={node.x} cy={node.y} r={54 + pulse * 12} fill="none" stroke="rgba(122,160,190,0.22)" strokeWidth="1" />
              <circle cx={node.x} cy={node.y} r={8} fill="#9dbdd0" opacity={0.65 + pulse * 0.35} />
              <text x={node.x + 26} y={node.y - 8} fontFamily="monospace" fontSize="22" fill="#c6d6e0" letterSpacing="2">
                {node.label}
              </text>
              <text x={node.x + 26} y={node.y + 22} fontFamily="sans-serif" fontSize="16" fill="rgba(198,214,224,0.5)" letterSpacing="1">
                {node.sub}
              </text>
            </g>
          );
        })}
        {Array.from({length: 22}, (_, index) => {
          const a = nodes[index % nodes.length];
          const b = nodes[(index * 3 + 1) % nodes.length];
          const t = ((frame / 90 + index * 0.13) % 1);
          const x = a.x + (b.x - a.x) * t;
          const y = a.y + (b.y - a.y) * t;
          return <circle key={index} cx={x} cy={y} r={2.4} fill="#d9b25f" opacity={0.55} />;
        })}
      </svg>
      <div style={{position: 'absolute', left: 120, top: 110}}>
        <div style={{fontFamily: SANS, fontSize: 20, letterSpacing: 5, color: 'rgba(236,231,218,0.45)'}}>
          1990 — 2005 / THE COPYLEFT NETWORK
        </div>
        <div style={{marginTop: 16, fontFamily: SERIF, fontWeight: 900, fontSize: 70, letterSpacing: 3, color: C.cream}}>
          没有版权的人类共同体
        </div>
      </div>
      <div style={{position: 'absolute', right: 120, bottom: 90, fontFamily: SANS, fontSize: 18, color: 'rgba(236,231,218,0.35)', letterSpacing: 2, textAlign: 'right'}}>
        文件在论坛之间复制、镜像、传播
        <br />
        Don Miguel 的英文版 / 2000
      </div>
    </div>
  );
};

export const UniteStore: React.FC<{reveal?: number}> = ({reveal = 1}) => (
  <div style={{position: 'absolute', inset: 0, background: '#0d1117', overflow: 'hidden'}}>
    <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 30%, rgba(80,120,180,0.16), rgba(5,8,12,0.98) 70%)'}} />
    <div style={{position: 'absolute', left: 160, top: 90, width: 1600, height: 900, border: '1px solid rgba(236,231,218,0.14)'}}>
      <div style={{height: 54, background: '#161c24', display: 'flex', alignItems: 'center', padding: '0 24px', gap: 16}}>
        <div style={{fontFamily: PIXEL, fontSize: 11, color: '#9dbdd0', letterSpacing: 1}}>UNITY ASSET STORE</div>
        <div style={{marginLeft: 'auto', fontFamily: SANS, fontSize: 13, color: 'rgba(236,231,218,0.45)'}}>STORE / NEW RELEASES</div>
      </div>
      <div style={{display: 'flex', padding: 40, gap: 46}}>
        <div style={{width: 500, height: 620, background: 'linear-gradient(160deg,#1b2a3c,#0a1018)', border: '1px solid rgba(236,231,218,0.16)', position: 'relative'}}>
          <div style={{position: 'absolute', inset: 26, border: '1px solid rgba(157,189,208,0.25)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{fontFamily: SERIF, fontWeight: 900, fontSize: 64, color: '#e8e2d4', letterSpacing: 2}}>RPG MAKER</div>
            <div style={{fontFamily: SERIF, fontWeight: 900, fontSize: 104, color: '#d9b25f', marginTop: 6}}>UNITE</div>
            <div style={{fontFamily: PIXEL, fontSize: 12, color: '#8aa5b8', marginTop: 22, letterSpacing: 2}}>UNITY / 2023</div>
          </div>
        </div>
        <div style={{flex: 1, paddingTop: 12}}>
          <div style={{fontFamily: SANS, fontSize: 16, letterSpacing: 5, color: 'rgba(217,178,95,0.6)'}}>NEW RELEASE</div>
          <div style={{marginTop: 14, fontFamily: SERIF, fontWeight: 900, fontSize: 72, color: '#ece7da', lineHeight: 1.15}}>
            RPG Maker Unite
          </div>
          <div style={{marginTop: 18, fontFamily: SANS, fontSize: 19, color: 'rgba(236,231,218,0.5)', lineHeight: 1.8}}>
            把 RPG Maker 搬进 Unity。
            <br />
            Unity Asset Store / 2023
          </div>
          <div style={{display: 'flex', alignItems: 'flex-end', gap: 18, marginTop: 40}}>
            <div style={{fontFamily: PIXEL, fontSize: 44, color: '#e8e2d4'}}>$99.99</div>
            <div style={{fontFamily: SANS, fontSize: 15, color: 'rgba(236,231,218,0.35)', paddingBottom: 8}}>USD</div>
          </div>
          <div style={{marginTop: 28, display: 'flex', gap: 8}}>
            {[0, 1, 2, 3, 4].map((index) => (
              <div key={index} style={{fontFamily: PIXEL, fontSize: 24, color: 'rgba(236,231,218,0.16)'}}>★</div>
            ))}
            <div style={{marginLeft: 12, fontFamily: SANS, fontSize: 14, color: 'rgba(236,231,218,0.4)', paddingTop: 8}}>
              0 个五星评价
            </div>
          </div>
          <div style={{marginTop: 12, height: 1, background: 'rgba(236,231,218,0.12)'}} />
          <div style={{marginTop: 26, fontFamily: SANS, fontSize: 17, lineHeight: 2, color: 'rgba(236,231,218,0.5)'}}>
            上架第一天。
            <br />
            评价栏是空的。
            <br />
            它想长大。
          </div>
          <div
            style={{
              marginTop: 40,
              display: 'inline-flex',
              padding: '14px 34px',
              border: '1px solid rgba(217,178,95,0.5)',
              fontFamily: SANS,
              fontSize: 15,
              letterSpacing: 2,
              color: '#d9b25f',
              opacity: reveal,
            }}
          >
            VIEW IN ASSET STORE
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const SplitPanels: React.FC<{
  left: React.ReactNode;
  right: React.ReactNode;
  leftLabel: string;
  rightLabel: string;
  gap?: number;
}> = ({left, right, leftLabel, rightLabel, gap = 2}) => (
  <div style={{position: 'absolute', inset: 0, display: 'flex', background: '#050607'}}>
    <div style={{width: '50%', position: 'relative', overflow: 'hidden', borderRight: `${gap}px solid rgba(236,231,218,0.2)`}}>
      {left}
      <div
        style={{
          position: 'absolute',
          left: 34,
          top: 26,
          padding: '6px 12px',
          background: 'rgba(5,6,7,0.72)',
          border: '1px solid rgba(236,231,218,0.18)',
          fontFamily: SANS,
          fontSize: 15,
          letterSpacing: 3,
          color: 'rgba(236,231,218,0.7)',
        }}
      >
        {leftLabel}
      </div>
    </div>
    <div style={{width: '50%', position: 'relative', overflow: 'hidden'}}>
      {right}
      <div
        style={{
          position: 'absolute',
          right: 34,
          top: 26,
          padding: '6px 12px',
          background: 'rgba(5,6,7,0.72)',
          border: '1px solid rgba(236,231,218,0.18)',
          fontFamily: SANS,
          fontSize: 15,
          letterSpacing: 3,
          color: 'rgba(236,231,218,0.7)',
        }}
      >
        {rightLabel}
      </div>
    </div>
  </div>
);

export const StatementOverlay: React.FC<{
  kicker?: string;
  lines: string[];
  size?: number;
  align?: 'left' | 'center';
  color?: string;
  top?: number;
}> = ({kicker, lines, size = 68, align = 'center', color = C.cream, top = 0}) => {
  const frame = useSceneFrame();
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : 'flex-start',
        justifyContent: 'center',
        padding: align === 'center' ? '0 140px' : '0 0 0 150px',
        textAlign: align,
      }}
    >
      {kicker ? (
        <div
          style={{
            fontFamily: SANS,
            fontSize: 19,
            letterSpacing: 6,
            color: 'rgba(236,231,218,0.42)',
            marginBottom: 22,
            opacity: interpolate(frame / 30, [0, 0.6], [0, 1], clamp),
          }}
        >
          {kicker}
        </div>
      ) : null}
      {lines.map((line, index) => {
        const enter = interpolate(frame / 30, [index * 0.35, index * 0.35 + 0.6], [0, 1], clamp);
        return (
          <div
            key={line}
            style={{
              fontFamily: SERIF,
              fontWeight: 900,
              fontSize: size,
              lineHeight: 1.5,
              letterSpacing: 2,
              color,
              opacity: enter,
              transform: `translateY(${(1 - enter) * 18}px)`,
            }}
          >
            {line}
          </div>
        );
      })}
    </div>
  );
};
