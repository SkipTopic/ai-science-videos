import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
} from 'remotion';
import {ChapterAudio} from './audio';
import {EditorCursor} from './EditorCursor';
import {FontLoader} from './fonts';
import {EditorChrome} from './game/EditorChrome';
import {GameScene} from './game/GameScene';
import {Montage} from './archive/Montage';
import {Magazine1988} from './archive/Magazine1988';
import {Timeline1977} from './archive/Timeline1977';
import {Tokyo1977} from './archive/Tokyo1977';
import {PixelFrame} from './PixelFrame';
import {Subtitles} from './subtitles';
import {Drift} from '../film/drift';
import {TitleCard} from './TitleCard';
import {
  GAME_PX_H,
  GAME_PX_W,
  clamp,
  easeInOut,
  sec,
} from './theme';

const EditorBorder: React.FC<{frame: number}> = ({frame}) => {
  const opacity = interpolate(
    frame,
    [sec(41.0), sec(44.0)],
    [0, 1],
    clamp,
  );
  if (opacity <= 0.001) {
    return null;
  }
  return (
    <div
      style={{
        position: 'absolute',
        left: 476,
        top: 146,
        width: 968,
        height: 728,
        border: '4px solid #8f8a7d',
        boxShadow:
          'inset 2px 2px 0 #f3efe3, inset -2px -2px 0 #8f8a7d, 0 0 0 1px #5a564c',
        opacity,
        pointerEvents: 'none',
        boxSizing: 'border-box',
      }}
    />
  );
};

const BlackOverlays: React.FC<{frame: number}> = ({frame}) => {
  const opening = interpolate(frame, [0, sec(1.35)], [1, 0], clamp);
  const gameOver = interpolate(
    frame,
    [sec(28.5), sec(28.8), sec(31.9), sec(32.7)],
    [0, 1, 1, 0],
    clamp,
  );
  const dip = (time: number) =>
    interpolate(
      frame,
      [sec(time - 0.14), sec(time), sec(time + 0.14)],
      [0, 1, 0],
      clamp,
    );
  const final = interpolate(frame, [sec(82.0), sec(82.8)], [0, 1], clamp);
  const opacity = Math.max(
    opening,
    gameOver,
    dip(54.5),
    dip(66.6),
    dip(71.0),
    final,
  );
  return (
    <AbsoluteFill
      style={{background: '#000', opacity, pointerEvents: 'none'}}
    />
  );
};

export const RPGMaker00: React.FC = () => {
  const frame = useCurrentFrame();
  const zooming = frame >= sec(32);
  const camT = zooming
    ? interpolate(frame, [sec(32), sec(44)], [0, 1], {
        ...clamp,
        easing: easeInOut,
      })
    : 0;
  const scale = zooming
    ? interpolate(camT, [0, 0.42, 0.66, 1], [2.0, 1, 1, 0.75], clamp)
    : 1;
  const camX = zooming
    ? interpolate(camT, [0, 0.42, 0.66, 1], [-100, 320, 320, 480], clamp)
    : 320;
  const camY = zooming
    ? interpolate(camT, [0, 0.42, 0.66, 1], [-420, 60, 60, 150], clamp)
    : 60;

  return (
    <AbsoluteFill style={{background: '#07080a'}}>
      <FontLoader />
      <Drift>

      <Sequence from={0} durationInFrames={sec(54.7)}>
        {frame >= sec(39.0) ? <EditorChrome /> : null}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: GAME_PX_W,
            height: GAME_PX_H,
            transform: `translate(${camX}px, ${camY}px) scale(${scale})`,
            transformOrigin: '0 0',
          }}
        >
          <GameScene frame={frame} />
        </div>
        <EditorBorder frame={frame} />
        <EditorCursor frame={frame} />
        <PixelFrame frame={frame} />
      </Sequence>

      <Sequence from={sec(54.5)} durationInFrames={sec(7.4)}>
        <Tokyo1977 />
      </Sequence>
      <Sequence from={sec(61.8)} durationInFrames={sec(5.0)}>
        <Magazine1988 />
      </Sequence>
      <Sequence from={sec(66.6)} durationInFrames={sec(4.6)}>
        <Timeline1977 />
      </Sequence>
      <Sequence from={sec(71.0)} durationInFrames={318}>
        <Montage />
      </Sequence>

      <BlackOverlays frame={frame} />

      <Sequence from={sec(82.8)} durationInFrames={sec(22.2)}>
        <TitleCard />
      </Sequence>

      </Drift>
      <Subtitles />
      <ChapterAudio />
    </AbsoluteFill>
  );
};
