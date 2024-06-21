const path = require('path');
const getFfmpegCommad = require('./ffmpegCommand');

function transcodeVideo(videoPath, scale, resolution, outputChunksPath) {
  const resolvedPath = path.resolve(videoPath);
  // const videoTitle = path.basename(resolvedPath,path.extname(resolvedPath));

  // get command to execute ffmpeg
  // const hlsBaseUrl = `${resolution}/`;
  const hlsBaseUrl = './';

  // const  hlsSegmentFilename = `${outputChunksPath}/${videoTitle}_%03d.ts`;
  const hlsSegmentFilename = `${outputChunksPath}/${resolution}_%03d.ts`;

  // const hlsPlaylistPath = `${outputChunksPath}/output.m3u8`;
  const hlsPlaylistPath = path.join(outputChunksPath, `${resolution}.m3u8`);

  const ffmpegCommand = getFfmpegCommad(
    resolvedPath,
    scale,
    hlsBaseUrl,
    hlsSegmentFilename,
    hlsPlaylistPath
  );

  ffmpegCommand.run();
}

module.exports = transcodeVideo;
