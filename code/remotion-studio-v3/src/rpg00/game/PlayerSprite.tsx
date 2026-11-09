import React from 'react';

export type Direction = 'up' | 'down' | 'left' | 'right';

const OUTLINE = '#0e0d0c';
const HAIR = '#3a2a1e';
const HAIR_LIGHT = '#5a402b';
const SKIN = '#e3ae80';
const SKIN_DARK = '#c4885d';
const TUNIC = '#33569e';
const TUNIC_LIGHT = '#4a70bd';
const SCARF = '#b03e37';
const BOOT = '#2b211a';
const BELT = '#1c1713';

const Legs: React.FC<{step: number; side?: boolean}> = ({step, side}) => (
  <g>
    <rect x={4} y={13} width={3} height={step === 0 ? 3 : 2} fill={OUTLINE} />
    <rect
      x={4}
      y={13}
      width={2}
      height={step === 0 ? 2 : 1}
      fill={TUNIC}
    />
    <rect x={4} y={step === 0 ? 15 : 14} width={2} height={1} fill={BOOT} />
    <rect
      x={9}
      y={13}
      width={3}
      height={step === 0 ? 2 : 3}
      fill={OUTLINE}
    />
    <rect
      x={9}
      y={13}
      width={2}
      height={step === 0 ? 1 : 2}
      fill={TUNIC}
    />
    <rect x={9} y={step === 0 ? 14 : 15} width={2} height={1} fill={BOOT} />
    {side ? (
      <rect x={11} y={13} width={1} height={2} fill={BOOT} />
    ) : null}
  </g>
);

const Body: React.FC<{side?: boolean}> = ({side}) => (
  <g>
    <rect x={4} y={7} width={8} height={6} fill={OUTLINE} />
    <rect x={4} y={7} width={8} height={1} fill={SCARF} />
    <rect x={4} y={8} width={8} height={4} fill={TUNIC} />
    <rect x={5} y={8} width={2} height={3} fill={TUNIC_LIGHT} />
    <rect x={4} y={12} width={8} height={1} fill={BELT} />
    {side ? (
      <>
        <rect x={11} y={8} width={1} height={3} fill={SKIN_DARK} />
        <rect x={3} y={8} width={1} height={2} fill={TUNIC} />
      </>
    ) : (
      <>
        <rect x={3} y={8} width={1} height={3} fill={SKIN_DARK} />
        <rect x={12} y={8} width={1} height={3} fill={SKIN_DARK} />
      </>
    )}
  </g>
);

const FrontHead: React.FC = () => (
  <g>
    <rect x={4} y={2} width={8} height={6} fill={OUTLINE} />
    <rect x={5} y={2} width={6} height={2} fill={HAIR} />
    <rect x={4} y={3} width={1} height={3} fill={HAIR} />
    <rect x={11} y={3} width={1} height={3} fill={HAIR} />
    <rect x={5} y={4} width={6} height={3} fill={SKIN} />
    <rect x={5} y={4} width={6} height={1} fill={HAIR} />
    <rect x={6} y={5} width={1} height={1} fill={OUTLINE} />
    <rect x={9} y={5} width={1} height={1} fill={OUTLINE} />
    <rect x={6} y={6} width={1} height={1} fill={SKIN_DARK} />
    <rect x={9} y={6} width={1} height={1} fill={SKIN_DARK} />
    <rect x={7} y={6} width={2} height={1} fill={SKIN_DARK} />
  </g>
);

const SideHead: React.FC = () => (
  <g>
    <rect x={4} y={2} width={8} height={6} fill={OUTLINE} />
    <rect x={4} y={2} width={7} height={2} fill={HAIR} />
    <rect x={4} y={3} width={2} height={3} fill={HAIR} />
    <rect x={5} y={4} width={6} height={3} fill={SKIN} />
    <rect x={5} y={4} width={5} height={1} fill={HAIR} />
    <rect x={9} y={5} width={1} height={1} fill={OUTLINE} />
    <rect x={10} y={6} width={1} height={1} fill={SKIN_DARK} />
    <rect x={4} y={4} width={1} height={3} fill={HAIR_LIGHT} />
  </g>
);

const BackHead: React.FC = () => (
  <g>
    <rect x={4} y={2} width={8} height={6} fill={OUTLINE} />
    <rect x={4} y={2} width={8} height={5} fill={HAIR} />
    <rect x={5} y={3} width={2} height={1} fill={HAIR_LIGHT} />
    <rect x={9} y={5} width={1} height={1} fill={HAIR_LIGHT} />
    <rect x={6} y={7} width={4} height={1} fill={SKIN_DARK} />
  </g>
);

export const PlayerSprite: React.FC<{
  direction: Direction;
  step: number;
  opacity?: number;
}> = ({direction, step, opacity = 1}) => {
  const content =
    direction === 'up' ? (
      <g>
        <Legs step={step} />
        <Body />
        <BackHead />
      </g>
    ) : direction === 'down' ? (
      <g>
        <Legs step={step} />
        <Body />
        <FrontHead />
      </g>
    ) : (
      <g>
        <Legs step={step} side />
        <Body side />
        <SideHead />
      </g>
    );

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      style={{
        display: 'block',
        opacity,
        transform: direction === 'left' ? 'scaleX(-1)' : undefined,
      }}
    >
      {content}
    </svg>
  );
};
