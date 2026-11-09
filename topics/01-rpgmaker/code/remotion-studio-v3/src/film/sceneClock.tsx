import React, {createContext, useContext} from 'react';
import {useCurrentFrame} from 'remotion';

// Scenes inside a Beat author their choreography against the v1 beat length.
// When a beat is compressed, the scene must run faster rather than lose its
// tail, so every scene reads its clock through this context.
const ScaleContext = createContext(1);

export const SceneClock: React.FC<{scale: number; children: React.ReactNode}> = ({
  scale,
  children,
}) =>
  scale === 1 ? (
    <>{children}</>
  ) : (
    <ScaleContext.Provider value={scale}>{children}</ScaleContext.Provider>
  );

export const useSceneFrame = (): number => {
  const frame = useCurrentFrame();
  const scale = useContext(ScaleContext);
  return scale === 1 ? frame : frame * scale;
};
