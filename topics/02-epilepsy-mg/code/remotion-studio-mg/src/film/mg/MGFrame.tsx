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
import {FilmChapter, FilmCue, SfxCue, allText} from '../data';
import {
  C,
  FPS,
  INK,
  INK_SOFT,
  PAPER,
  SANS,
  TONES,
  ToneName,
  clamp,
  easeOut,
  sec,
  springIn,
} from './theme';
import {PaperDots, Panel} from './mgKit';

const SAMPLE = allText;

let fontLoading: Promise<void> | null = null;

const loadFonts = () => {
  if (fontLoading) return fontLoading;
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
        ]);
        await document.fonts.ready;
      } catch (error) {
        console.warn('mg font load failed', error);
      }
      finish();
    };
    link.onerror = finish;
    document.head.appendChild(link);
    window.setTimeout(finish, 30000);
  });
  return fontLoading;
};

const MGFonts: React.FC = () => {
  const [handle] = useState(() => delayRender('Loading MG fonts'));
  useEffect(() => {
    loadFonts().then(() => continueRender(handle));
  }, [handle]);
  return null;
};

const Subtitles: React.FC<{chapter: FilmChapter}> = ({chapter}) => {
  const frame = useCurrentFrame();
  const time = frame / FPS;
  const cue = chapter.cues.reduce<FilmCue | undefined>(
    (current, item) => (time >= item.start && time < item.end ? item : current),
    undefined,
  );
  if (!cue) return null;
  const start = cue.start * FPS;
  const end = cue.end * FPS;
  const length = Math.max(1, end - start);
  const fadeFrames = Math.min(6, Math.floor(length / 3));
  const opacity = Math.min(
    interpolate(frame, [start, start + fadeFrames], [0, 1], clamp),
    interpolate(frame, [end - fadeFrames, end], [1, 0], clamp),
  );
  const fontSize = cue.text.length > 34 ? 34 : 38;
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 28,
        display: 'flex',
        justifyContent: 'center',
        opacity,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          maxWidth: 1580,
          padding: '12px 32px 13px',
          borderRadius: 18,
          background: 'rgba(255,253,247,0.95)',
          border: '1.5px solid rgba(28,43,58,0.11)',
          boxShadow: '0 8px 24px rgba(28,43,58,0.10)',
          fontFamily: SANS,
          fontWeight: 400,
          fontSize,
          lineHeight: 1.42,
          letterSpacing: 1.2,
          color: INK,
          textAlign: 'center',
        }}
      >
        {cue.text}
      </div>
    </div>
  );
};

const ChapterAudio: React.FC<{chapter: FilmChapter; sfx?: SfxCue[]}> = ({chapter, sfx = []}) => (
  <>
    {chapter.lines.map((line) => {
      const trimStart = line.trimStart ?? 0;
      const trimEnd = line.trimEnd ?? line.duration;
      const frames = Math.max(2, Math.ceil((trimEnd - trimStart) * FPS) + 2);
      return (
        <Sequence key={line.id} from={sec(line.start)} durationInFrames={frames}>
          <Audio
            src={staticFile(`audio/${line.file}`)}
            startFrom={Math.floor(trimStart * FPS)}
            endAt={Math.ceil(trimEnd * FPS)}
            volume={1}
          />
        </Sequence>
      );
    })}
    {sfx.map((cue, index) => (
      <Sequence key={`${cue.file}-${cue.at}-${index}`} from={sec(cue.at)} durationInFrames={10 * FPS}>
        <Audio src={staticFile(`audio/sfx/${cue.file}`)} volume={cue.volume ?? 0.25} />
      </Sequence>
    ))}
  </>
);

const Chrome: React.FC<{chapter: FilmChapter; accent: string}> = ({chapter, accent}) => {
  const frame = useCurrentFrame();
  const progress = Math.min(1, frame / Math.max(1, chapter.frames - 1));
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          right: 0,
          height: 56,
          background: 'rgba(251,246,234,0.94)',
          borderBottom: '1px solid rgba(28,43,58,0.08)',
          zIndex: 20,
        }}
      />
      <div style={{position: 'absolute', left: 0, top: 0, right: 0, height: 4, background: 'rgba(28,43,58,0.08)', zIndex: 21}}>
        <div style={{height: '100%', width: `${progress * 100}%`, background: accent, borderRadius: '0 2px 2px 0'}} />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 72,
          right: 72,
          top: 14,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: SANS,
          color: INK_SOFT,
          zIndex: 22,
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: 54,
              height: 30,
              padding: '0 10px',
              borderRadius: 8,
              background: accent,
              color: C.white,
              fontWeight: 700,
              fontSize: 17,
              letterSpacing: 1.5,
            }}
          >
            {chapter.id}
          </span>
          <span style={{fontSize: 19, fontWeight: 700, letterSpacing: 2}}>{chapter.title}</span>
        </div>
        <div style={{fontSize: 15, letterSpacing: 5, opacity: 0.5}}>EPILEPSY · 癫痫科普</div>
      </div>
    </>
  );
};

export const MGFrame: React.FC<{
  chapter: FilmChapter;
  accent?: string;
  children: React.ReactNode;
  sfx?: SfxCue[];
}> = ({chapter, accent = C.coral, children, sfx}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: PAPER, overflow: 'hidden'}}>
      <MGFonts />
      <PaperDots color={INK} size={1.6} gap={30} opacity={0.06} />
      <div
        style={{
          position: 'absolute',
          width: 520,
          height: 520,
          right: -220,
          top: -260,
          borderRadius: '50%',
          background: C.mustardSoft,
          opacity: 0.55,
          transform: `translateY(${Math.sin(frame * 0.012) * 8}px)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 380,
          height: 380,
          left: -190,
          bottom: -210,
          borderRadius: '50%',
          background: C.tealSoft,
          opacity: 0.6,
          transform: `translateY(${Math.cos(frame * 0.014) * 7}px)`,
        }}
      />
      {children}
      <Chrome chapter={chapter} accent={accent} />
      <Subtitles chapter={chapter} />
      <ChapterAudio chapter={chapter} sfx={sfx} />
    </AbsoluteFill>
  );
};

export const Scene: React.FC<{
  from: number;
  to: number;
  tone?: ToneName;
  bg?: string;
  full?: boolean;
  children: React.ReactNode;
  panelStyle?: React.CSSProperties;
}> = ({from, to, tone = 'cream', bg, full = false, children, panelStyle}) => {
  const frames = Math.max(2, sec(to) - sec(from));
  const t = TONES[tone];
  return (
    <Sequence from={sec(from)} durationInFrames={frames}>
      {full ? (
        <AbsoluteFill style={{background: bg ?? t.bg}}>{children}</AbsoluteFill>
      ) : (
        <>
          <Panel bg={bg ?? t.bg} style={panelStyle}>
            {children}
          </Panel>
        </>
      )}
    </Sequence>
  );
};

export const Content: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({children, style}) => (
  <div
    style={{
      position: 'absolute',
      left: 64,
      top: 64,
      width: 1648,
      height: 672,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Reveal: React.FC<{
  delay?: number;
  distance?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({delay = 0, distance = 34, children, style}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + 16], [0, 1], {...clamp, easing: easeOut});
  return (
    <div style={{opacity: p, transform: `translateY(${(1 - p) * distance}px)`, ...style}}>
      {children}
    </div>
  );
};

export const PopIn: React.FC<{
  delay?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({delay = 0, children, style}) => {
  const frame = useCurrentFrame();
  const s = springIn(frame, delay, 170, 13);
  return (
    <div
      style={{
        opacity: Math.min(1, s * 2.2),
        transform: `scale(${0.55 + s * 0.45})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const WipeIn: React.FC<{
  delay?: number;
  duration?: number;
  direction?: 'left' | 'right';
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({delay = 0, duration = 18, direction = 'left', children, style}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + duration], [0, 100], {...clamp, easing: easeOut});
  return (
    <div
      style={{
        clipPath: direction === 'left' ? `inset(0 ${100 - p}% 0 0)` : `inset(0 0 0 ${100 - p}%)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
