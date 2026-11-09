import React, {useEffect, useState} from 'react';
import {continueRender, delayRender, staticFile} from 'remotion';
import {LINES} from './data';

const SAMPLE =
  LINES.map((line) => line.text).join('') +
  '文件编辑视图插入工具游戏帮助地图树图块素材事件开关项目地图小鲸鱼宝箱门钥匙状态栏缩放光标新建工程梦想与世界东京秋叶原杂志附录软盘电脑特集复原示意年月日第章序章小鲸鱼出现了歪了歪头使用了拳击胜利盖姆欧巴游戏结束按回车继续';

let loading: Promise<void> | null = null;

const load = () => {
  if (loading) {
    return loading;
  }
  loading = new Promise<void>((resolve) => {
    let done = false;
    const finish = () => {
      if (done) {
        return;
      }
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
          document.fonts.load('900 64px "Noto Serif SC"', '梦想与世界年月日'),
          document.fonts.load(
            '400 28px "Press Start 2P"',
            '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ:/.-',
          ),
        ]);
        await document.fonts.ready;
      } catch (error) {
        console.warn('font load failed', error);
      }
      finish();
    };
    link.onerror = () => finish();
    document.head.appendChild(link);
    window.setTimeout(finish, 25000);
  });
  return loading;
};

export const FontLoader: React.FC = () => {
  const [handle] = useState(() => delayRender('Loading local fonts'));
  useEffect(() => {
    load().then(() => continueRender(handle));
  }, [handle]);
  return null;
};
