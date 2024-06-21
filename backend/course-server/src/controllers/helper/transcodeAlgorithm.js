const { spawn } = require('child_process');
const path = require('path');

const getVideoDuration = require('./videoDuration');

const resolutions = [1080, 720, 480, 240];

const transcodeVideo = async (videoPath, outputDir, res, req) => {
  const io = req.app.get('socket_io_object');
  const duration = await getVideoDuration(videoPath);
  console.log('Duration: ', duration);
  const totalFrames = Math.ceil(duration * 30); // Assume 30 FPS for estimation

  let completed = 0;
  let progress = {
    1080: { percent: 0, timeRemaining: '00:00:00' },
    720: { percent: 0, timeRemaining: '00:00:00' },
    480: { percent: 0, timeRemaining: '00:00:00' },
    240: { percent: 0, timeRemaining: '00:00:00' },
  };

  const tasks = resolutions.map((resolution) => {
    const outputFilePath = path.join(outputDir, `${resolution}p.m3u8`);
    const scaleFilter = `scale=w=trunc(oh*a/2)*2:h=${resolution}`;
    return { resolution, outputFilePath, scaleFilter };
  });

  tasks.forEach((task) => {
    const command = [
      '-i',
      videoPath,
      '-vf',
      task.scaleFilter,
      '-hls_time',
      '10',
      '-hls_playlist_type',
      'vod',
      task.outputFilePath,
      '-progress',
      'pipe:1',
    ];

    const ffmpeg = spawn('ffmpeg', command);

    let startTime = Date.now();

    ffmpeg.stdout.on('data', (data) => {
      const lines = data.toString().split('\n');
      lines.forEach((line) => {
        if (line.startsWith('frame=')) {
          const frameMatch = line.match(/frame=\s*(\d+)/);
          if (frameMatch) {
            const frame = parseInt(frameMatch[1]);
            const percent = ((frame / totalFrames) * 100).toFixed(2);
            const elapsed = (Date.now() - startTime) / 1000;
            const fps = frame / elapsed;
            let timeRemaining = (totalFrames - frame) / fps;
            if (
              isNaN(timeRemaining) ||
              !isFinite(timeRemaining) ||
              timeRemaining < 0
            ) {
              timeRemaining = 0;
            }
            const formattedTime = new Date(timeRemaining * 1000)
              .toISOString()
              .substr(11, 8);
            progress[task.resolution] = {
              percent,
              timeRemaining: formattedTime,
            };

            io.emit('progress', progress); // Emit progress to all connected clients
          }
        }
      });
    });

    // ffmpeg.stderr.on('data', (data) => {
    //   // console.error(`Error: ${data}`);
    // });

    ffmpeg.on('exit', (_code) => {
      completed += 1;
      if (completed === tasks.length) {
        const progressCompleted = {
          1080: { percent: 100, timeRemaining: '00:00:00' },
          720: { percent: 100, timeRemaining: '00:00:00' },
          480: { percent: 100, timeRemaining: '00:00:00' },
          240: { percent: 100, timeRemaining: '00:00:00' },
        };
        io.emit('progress', progressCompleted); // Emit final progress to all connected clients
        // res.send('Completed');
      }
    });
  });
};

module.exports = transcodeVideo;
