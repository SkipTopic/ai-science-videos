import React, {useEffect, useState} from 'react';
import {
  AbsoluteFill,
  Audio,
  Sequence,
  continueRender,
  delayRender,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import {FilmChapter, FilmCue, SfxCue, allText} from './data';
import {SceneClock} from './sceneClock';
import {Drift} from './drift';
import {C, FPS, PIXEL, SANS, clamp, localOpacity, sec} from './theme';
import {Grain, Vignette} from './components';

const EXTRA =
  '文件编辑视图插入工具游戏帮助地图树图块素材事件开关项目数据库角色技能道具敌人' +
  '新建工程保存读取测试运行确定取消条件分支循环中断注释标签公共事件战斗处理' +
  '移动路线等待显示文字显示图片播放音乐音效暂时消除本事件场所移动变量操作' +
  '東京秋葉原日本円雑誌付録月号昭和年株式会社発売元対応機種価格' +
  'ASCIIENTERBRAINKADOKAWAGOTCHAUNITYSWITCHPLAYSTATIONNINTENDO' +
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' +
  '，。！？；：、“”‘’（）《》【】—…·／\\%￥$+-=_#@&*';

const SAMPLE = `${allText}${EXTRA}`;

let fontLoading: Promise<void> | null = null;

const loadFonts = () => {
  if (fontLoading) {
    return fontLoading;
  }
  fontLoading = new Promise<void>((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      resolve();
    };
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = staticFile('fonts/fonts.css');
    link.onload = async () => {
      try {
        await Promise.all([
          document.fonts.load('400 28px "Noto Sans SC"', SAMPLE),
          document.fonts.load('700 28px "Noto Sans SC"', SAMPLE),
          document.fonts.load('600 28px "Noto Serif SC"', SAMPLE),
          document.fonts.load('900 64px "Noto Serif SC"', SAMPLE),
          document.fonts.load(
            '400 28px "Press Start 2P"',
            '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ:/.-$%',
          ),
        ]);
        await document.fonts.ready;
      } catch (error) {
        console.warn('film font load failed', error);
      }
      finish();
    };
    link.onerror = finish;
    document.head.appendChild(link);
    window.setTimeout(finish, 30000);
  });
  return fontLoading;
};

const FilmFonts: React.FC = () => {
  const [handle] = useState(() => delayRender('Loading film fonts'));
  useEffect(() => {
    loadFonts().then(() => continueRender(handle));
  }, [handle]);
  return null;
};

const Subtitles: React.FC<{chapter: FilmChapter}> = ({chapter}) => {
  const frame = useCurrentFrame();
  const time = frame / FPS;
  const cue = chapter.cues.find(
    (item: FilmCue) => time >= item.start && time < item.end,
  );
  if (!cue) {
    return null;
  }
  const start = cue.start * FPS;
  const end = cue.end * FPS;
  const length = Math.max(1, end - start);
  const fadeFrames = Math.min(5, Math.floor(length / 3));
  const opacity = Math.min(
    interpolate(frame, [start, start + fadeFrames], [0, 1], clamp),
    interpolate(frame, [end - fadeFrames, end], [1, 0], clamp),
  );
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 168,
          background:
            'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 48%, rgba(0,0,0,0) 100%)',
          opacity: opacity * 0.92,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 42,
          display: 'flex',
          justifyContent: 'center',
          opacity,
        }}
      >
        <div
          style={{
            maxWidth: 1640,
            fontFamily: SANS,
            fontWeight: 400,
            fontSize: 46,
            lineHeight: 1.34,
            letterSpacing: 1.5,
            color: '#ffffff',
            textAlign: 'center',
            textShadow: '0 2px 16px rgba(0,0,0,0.95)',
          }}
        >
          {cue.text}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Ambience: React.FC<{chapter: FilmChapter; mood: 'paper' | 'night' | 'mixed'}> = ({
  chapter,
  mood,
}) => {
  const base = mood === 'paper' ? 0.035 : mood === 'night' ? 0.052 : 0.044;
  return (
    <Audio
      loop
      src={staticFile('audio/sfx/wind.wav')}
      volume={(frame) => {
        const t = frame / FPS;
        const breathe = 0.82 + 0.18 * Math.sin(t * 0.11 + chapter.start * 0.01);
        return base * breathe;
      }}
    />
  );
};

const Sfx: React.FC<{cues: SfxCue[]}> = ({cues}) => (
  <>
    {cues.map((cue, index) => (
      <Sequence
        key={`${cue.file}-${cue.at}-${index}`}
        from={sec(cue.at)}
        durationInFrames={10 * FPS}
      >
        <Audio
          src={staticFile(`audio/sfx/${cue.file}`)}
          volume={cue.volume ?? 0.4}
        />
      </Sequence>
    ))}
  </>
);

export const ChapterAudio: React.FC<{
  chapter: FilmChapter;
  mood: 'paper' | 'night' | 'mixed';
  sfx?: SfxCue[];
}> = ({chapter, mood, sfx = []}) => (
  <>
    <Ambience chapter={chapter} mood={mood} />
    {chapter.lines.map((line) => {
      const trimStart = line.trimStart ?? 0;
      const trimEnd = line.trimEnd ?? line.duration;
      const frames = Math.max(2, Math.ceil((trimEnd - trimStart) * FPS) + 2);
      return (
        <Sequence
          key={line.id}
          from={sec(line.start)}
          durationInFrames={frames}
        >
          <Audio
            src={staticFile(`audio/${line.file}`)}
            startFrom={Math.floor(trimStart * FPS)}
            endAt={Math.ceil(trimEnd * FPS)}
            volume={1}
          />
        </Sequence>
      );
    })}
    <Sfx cues={sfx} />
  </>
);

const BeatInner: React.FC<{
  duration: number;
  fadeIn: number;
  fadeOut: number;
  cut?: boolean;
  children: React.ReactNode;
}> = ({duration, fadeIn, fadeOut, cut = false, children}) => {
  const frame = useCurrentFrame();
  const opacity = cut ? 1 : localOpacity(frame, duration, fadeIn, fadeOut);
  return (
    <AbsoluteFill style={{opacity, overflow: 'hidden'}}>{children}</AbsoluteFill>
  );
};

export const Beat: React.FC<{
  from: number;
  to: number;
  fadeIn?: number;
  fadeOut?: number;
  cut?: boolean;
  scale?: number;
  children: React.ReactNode;
}> = ({from, to, fadeIn = 0.45, fadeOut = 0.45, cut = false, scale = 1, children}) => {
  const frames = Math.max(2, sec(to) - sec(from));
  return (
    <Sequence from={sec(from)} durationInFrames={frames}>
      <BeatInner duration={frames} fadeIn={fadeIn} fadeOut={fadeOut} cut={cut}>
        <SceneClock scale={scale}>{children}</SceneClock>
      </BeatInner>
    </Sequence>
  );
};

export const ChapterFrame: React.FC<{
  chapter: FilmChapter;
  mood: 'paper' | 'night' | 'mixed';
  children: React.ReactNode;
  sfx?: SfxCue[];
  background?: string;
  vignette?: number;
}> = ({
  chapter,
  mood,
  children,
  sfx,
  background = C.night,
  vignette = 0.5,
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{background, overflow: 'hidden'}}>
      <FilmFonts />
      <Drift>{children}</Drift>
      <Grain frame={frame} dark={mood === 'paper'} />
      <Vignette strength={vignette} />
      <Subtitles chapter={chapter} />
      <ChapterAudio chapter={chapter} mood={mood} sfx={sfx} />
    </AbsoluteFill>
  );
};

export const ChapterStamp: React.FC<{
  chapter: FilmChapter;
  color?: string;
  dark?: boolean;
}> = ({chapter, dark = false}) => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const opacity =
    interpolate(t, [0, 0.6, 4.2, 5.2], [0, 1, 1, 0], clamp) * 0.72;
  return (
    <div
      style={{
        position: 'absolute',
        left: 64,
        top: 46,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        opacity,
        fontFamily: SANS,
        fontSize: 18,
        letterSpacing: 4,
        color: dark ? C.ink : C.cream,
      }}
    >
      <span
        style={{
          fontFamily: PIXEL,
          fontSize: 11,
          color: C.redBright,
          border: `1px solid ${dark ? 'rgba(28,26,22,0.3)' : 'rgba(236,231,218,0.3)'}`,
          padding: '6px 9px',
        }}
      >
        CH.{chapter.id}
      </span>
      <span style={{opacity: 0.65}}>{chapter.title}</span>
    </div>
  );
};
