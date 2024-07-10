const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

// Get video duration in seconds
async function videoDuration(videoPath) {
  const command = `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${videoPath}"`;

  try {
    const { stdout, stderr } = await exec(command);
    const duration = parseFloat(stdout);
    return duration;
  } catch (err) {
    return res.status(500).send('Error getting video duration.');
  }
}

module.exports = videoDuration;
