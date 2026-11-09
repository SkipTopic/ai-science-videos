import React from 'react';
import {Composition} from 'remotion';
import {getChapter} from './film/data';
import {Ch00} from './film/mg/Ch00';
import {Ch01} from './film/mg/Ch01';
import {Ch02} from './film/mg/Ch02';
import {Ch03} from './film/mg/Ch03';
import {Ch04} from './film/mg/Ch04';
import {Ch05} from './film/mg/Ch05';
import {Ch06} from './film/mg/Ch06';
import {Ch07} from './film/mg/Ch07';
import {Ch08} from './film/mg/Ch08';
import {Ch09} from './film/mg/Ch09';
import {MGStyleTest} from './lab/MGStyleTest';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="MGStyleTest"
      component={MGStyleTest}
      durationInFrames={960}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="Ch00"
      component={Ch00}
      durationInFrames={getChapter('00').frames}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="Ch01"
      component={Ch01}
      durationInFrames={getChapter('01').frames}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="Ch02"
      component={Ch02}
      durationInFrames={getChapter('02').frames}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="Ch03"
      component={Ch03}
      durationInFrames={getChapter('03').frames}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="Ch04"
      component={Ch04}
      durationInFrames={getChapter('04').frames}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="Ch05"
      component={Ch05}
      durationInFrames={getChapter('05').frames}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="Ch06"
      component={Ch06}
      durationInFrames={getChapter('06').frames}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="Ch07"
      component={Ch07}
      durationInFrames={getChapter('07').frames}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="Ch08"
      component={Ch08}
      durationInFrames={getChapter('08').frames}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="Ch09"
      component={Ch09}
      durationInFrames={getChapter('09').frames}
      fps={30}
      width={1920}
      height={1080}
    />
  </>
);
