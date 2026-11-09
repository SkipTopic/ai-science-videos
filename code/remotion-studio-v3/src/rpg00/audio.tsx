import React from 'react';
import {
  Audio,
  Sequence,
  interpolate,
  staticFile,
} from 'remotion';
import {LINES} from './data';
import {T, WALK_PATH, clamp, FPS, sec} from './theme';

const Sfx: React.FC<{at: number; file: string; volume?: number}> = ({
  at,
  file,
  volume = 0.5,
}) => (
  <Sequence from={sec(at)} durationInFrames={12 * FPS}>
    <Audio src={staticFile(`audio/sfx/${file}`)} volume={volume} />
  </Sequence>
);

const windVolume = (frame: number) =>
  interpolate(
    frame,
    [
      0,
      sec(6),
      sec(9),
      sec(32),
      sec(37),
      sec(44),
      sec(54),
      sec(81),
      sec(90),
      sec(T.end),
    ],
    [0.04, 0.16, 0.07, 0.05, 0.16, 0.09, 0.11, 0.16, 0.07, 0.0],
    clamp,
  );

export const ChapterAudio: React.FC = () => {
  const steps = WALK_PATH.length - 1;
  return (
    <>
      <Audio
        src={staticFile('audio/sfx/wind.wav')}
        volume={(frame) => windVolume(frame)}
      />

      {LINES.map((line) => (
        <Sequence
          key={line.id}
          from={sec(line.start)}
          durationInFrames={Math.ceil(line.duration * FPS) + 12}
        >
          <Audio src={staticFile(`audio/${line.file}`)} volume={1} />
        </Sequence>
      ))}

      {Array.from({length: steps}, (_, index) => (
        <Sfx
          key={`step-${index}`}
          at={T.walkStart + index * T.walkStep}
          file="footstep.wav"
          volume={index % 2 === 0 ? 0.22 : 0.16}
        />
      ))}

      <Sfx at={T.whalePop} file="dialog.wav" volume={0.55} />
      <Sfx at={T.slash} file="slash.wav" volume={0.55} />
      <Sfx at={T.damage5} file="damage5.wav" volume={0.4} />
      <Sfx at={T.whaleTilt} file="dialog.wav" volume={0.4} />
      <Sfx at={20.4} file="dialog.wav" volume={0.38} />
      <Sfx at={20.9} file="whoosh.wav" volume={0.5} />
      <Sfx at={T.slam} file="punch.wav" volume={0.95} />
      <Sfx at={T.gameOver} file="game_over.wav" volume={0.62} />
      <Sfx at={44.5} file="cursor.wav" volume={0.2} />
      <Sfx at={50.0} file="cursor.wav" volume={0.2} />
      <Sfx at={54.5} file="paper.wav" volume={0.25} />
      <Sfx at={T.magazine} file="paper.wav" volume={0.35} />
      <Sfx at={64.0} file="floppy.wav" volume={0.5} />
      {[67.0, 67.4, 67.8, 68.2, 68.6, 69.0].map((at, index) => (
        <Sfx
          key={`tick-${index}`}
          at={at}
          file="tick.wav"
          volume={0.18 + index * 0.015}
        />
      ))}
      <Sfx at={90.0} file="title_chime.wav" volume={0.8} />
    </>
  );
};
