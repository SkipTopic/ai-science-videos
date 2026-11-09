import React from 'react';
import {Composition} from 'remotion';
import {HelloRemotion} from './HelloRemotion';
import {RPGMaker00} from './rpg00/RPGMaker00';
import {getChapter} from './film/data';
import {Ch01} from './film/chapters/Ch01';
import {Ch02} from './film/chapters/Ch02';
import {Ch03} from './film/chapters/Ch03';
import {Ch04} from './film/chapters/Ch04';
import {Ch05} from './film/chapters/Ch05';
import {Ch06} from './film/chapters/Ch06';
import {Ch07} from './film/chapters/Ch07';
import {Ch08} from './film/chapters/Ch08';
import {Ch09} from './film/chapters/Ch09';

const chapterComposition = (
  id: string,
  component: React.FC,
): React.ReactElement => (
  <Composition
    id={id}
    component={component}
    durationInFrames={getChapter(id.slice(2)).frames}
    fps={30}
    width={1920}
    height={1080}
  />
);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HelloRemotion"
        component={HelloRemotion}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="RPGMaker00"
        component={RPGMaker00}
        durationInFrames={3150}
        fps={30}
        width={1920}
        height={1080}
      />
      {chapterComposition('Ch01', Ch01)}
      {chapterComposition('Ch02', Ch02)}
      {chapterComposition('Ch03', Ch03)}
      {chapterComposition('Ch04', Ch04)}
      {chapterComposition('Ch05', Ch05)}
      {chapterComposition('Ch06', Ch06)}
      {chapterComposition('Ch07', Ch07)}
      {chapterComposition('Ch08', Ch08)}
      {chapterComposition('Ch09', Ch09)}
    </>
  );
};
