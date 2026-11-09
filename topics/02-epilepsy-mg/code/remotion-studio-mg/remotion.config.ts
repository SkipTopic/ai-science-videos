import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setCodec('h264');
Config.setCrf(18);
Config.setAudioBitrate('192k');
Config.setOverwriteOutput(true);

// node_modules 是共享 junction；默认 webpack 缓存会往 RPG Maker 工程里写约 200 MB。
Config.setCachingEnabled(false);
