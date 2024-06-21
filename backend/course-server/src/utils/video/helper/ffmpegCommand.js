const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const deleteFile = require('../../deleteFile');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

function getFfmpegCommad(
  resolvedPath,
  scale,
  hlsBaseUrl,
  hlsSegmentFilename,
  hlsPlaylistPath
) {
  let totalTime;
  return (
    ffmpeg(resolvedPath, { timeout: 432000 })
      .addOption([
        '-profile:v baseline',
        '-vf',
        `scale=${scale}`,
        // '-acodec copy -threads 12',
        '-f segment',
        '-level 3.0',
        '-start_number 0',
        `-hls_base_url ${hlsBaseUrl}`,
        `-hls_segment_filename ${hlsSegmentFilename}`,
        '-hls_time 6',
        '-hls_list_size 0',
        // format
        '-f hls',
      ])
      .output(hlsPlaylistPath)
      .on('end', async (stdout, stderr) => {
        // return 'Transcoding succeeded !';
        console.log('Transcoding succeeded !       ', scale);
        if (scale === '1920:1080') {
          await deleteFile(resolvedPath);
        }
        //   process.exit(1);
      })
      .on('start', (commandLine) => {
        console.log('start', commandLine);
      })
      .on('codecData', (data) => {
        // HERE YOU GET THE TOTAL TIME
        totalTime = parseInt(data.duration.replace(/:/g, ''));
        console.log(
          'Input is ' + data.audio + ' audio ' + 'with ' + data.video + ' video'
        );
      })
      // .on('progress', function (progress) {
      //   // HERE IS THE CURRENT TIME
      //   const time = parseInt(progress.timemark.replace(/:/g, ''));

      //   // AND HERE IS THE CALCULATION
      //   const percent = Math.round((time / totalTime) * 100);
      //   console.log('Processing. Timemark: -> ' + progress.timemark + `            ${percent}%`);
      // })
      .on('stderr', function (stderrLine) {
        // do nothing
      })
      .on('error', function (err, stdout, stderr) {
        console.log('Cannot process video: ' + err.message);
        console.log('Stdout:\n' + stdout);
        console.log('Stderr:\n' + stderr);
      })
      .on('data', function (chunk) {
        console.log('ffmpeg just wrote ' + chunk.length + ' bytes');
      })
  );
}

module.exports = getFfmpegCommad;
