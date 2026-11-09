import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {
  FPS,
  T,
  WALK_PATH,
  clamp,
  sec,
} from '../theme';
import {BattleLayer} from './Battle';
import {MazeMap} from './MazeMap';
import {PlayerSprite, Direction} from './PlayerSprite';
import {WhaleNpc} from './Whale';

const TILE_PX = 64;

const playerState = (frame: number) => {
  const start = sec(T.walkStart);
  const stepFrames = T.walkStep * FPS;
  const total = (WALK_PATH.length - 1) * stepFrames;
  const elapsed = Math.max(0, frame - start);
  const clamped = Math.min(elapsed, total);
  const index = Math.min(
    WALK_PATH.length - 2,
    Math.floor(clamped / stepFrames),
  );
  const phase = Math.min(1, (clamped - index * stepFrames) / stepFrames);
  const move = interpolate(phase, [0, 0.55], [0, 1], clamp);
  const from = WALK_PATH[index];
  const to = WALK_PATH[index + 1];
  const x = from[0] + (to[0] - from[0]) * move;
  const y = from[1] + (to[1] - from[1]) * move;
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const direction: Direction =
    dx > 0 ? 'right' : dx < 0 ? 'left' : dy > 0 ? 'down' : 'up';
  const moving = elapsed < total;
  const step = moving ? Math.floor(elapsed / (stepFrames / 2)) % 2 : 0;
  const bob = moving ? -Math.sin(phase * Math.PI) * 5 : 0;
  return {x, y, direction, step, bob};
};

export const GameScene: React.FC<{frame: number}> = ({frame}) => {
  const player = playerState(frame);
  const dim = Math.min(
    interpolate(frame, [sec(9.8), sec(10.5)], [0, 0.32], clamp),
    interpolate(frame, [sec(32.0), sec(34.5)], [1, 0], clamp),
  );
  const grayscale = interpolate(
    frame,
    [sec(26.0), sec(26.6), sec(30.8), sec(32.2), sec(43.5)],
    [0, 1, 1, 0, 0],
    clamp,
  );
  const brightness = interpolate(
    frame,
    [sec(26.0), sec(26.6), sec(30.8), sec(32.2), sec(43.5)],
    [1, 0.72, 0.72, 1, 1],
    clamp,
  );
  const shakeAmount =
    frame >= sec(T.slam) && frame < sec(23.4)
      ? interpolate(frame, [sec(T.slam), sec(23.4)], [22, 0], clamp)
      : 0;
  const shakeX = Math.sin(frame * 2.7) * shakeAmount;
  const shakeY = Math.cos(frame * 3.35) * shakeAmount;
  const flash =
    frame >= sec(T.slam) && frame < sec(T.slam + 0.18)
      ? interpolate(frame, [sec(T.slam), sec(T.slam + 0.18)], [0.8, 0], clamp)
      : 0;

  return (
    <div
      style={{
        position: 'absolute',
        width: 1280,
        height: 960,
        overflow: 'hidden',
        background: '#05070a',
        filter: `grayscale(${grayscale}) brightness(${brightness})`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translate(${shakeX}px, ${shakeY}px)`,
        }}
      >
        <div style={{position: 'absolute', inset: 0}}>
          <MazeMap frame={frame} />
        </div>

        <div
          style={{
            position: 'absolute',
            left: 16 * TILE_PX,
            top: 4 * TILE_PX + 18,
            width: 64,
            height: 64,
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 8,
              bottom: -2,
              width: 48,
              height: 14,
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.4)',
              filter: 'blur(2px)',
            }}
          />
          <WhaleNpc frame={frame} />
        </div>

        <div
          style={{
            position: 'absolute',
            left: player.x * TILE_PX,
            top: player.y * TILE_PX,
            width: 64,
            height: 64,
            transform: `translateY(${player.bob}px)`,
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 14,
              bottom: 2,
              width: 36,
              height: 11,
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.45)',
              filter: 'blur(1.5px)',
            }}
          />
          <PlayerSprite
            direction={player.direction}
            step={player.step}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `rgba(2,4,8,${dim})`,
          }}
        />

        <BattleLayer frame={frame} />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#fff7e8',
            opacity: flash,
            mixBlendMode: 'screen',
          }}
        />
      </div>
    </div>
  );
};
