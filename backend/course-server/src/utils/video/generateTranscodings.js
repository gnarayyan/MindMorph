const transcodeVideo = require('./helper/transcodeVideo.js');
const screenResolutions = require('./helper/constants.js');
// const makeDirectory = require('./helper/createFolders.js');

async function generateTranscodings(videoPath, outputChunksPath) {
  // Create All Folders for requested courseId
  // const coursesDirectory = 'media';
  // makeDirectories(coursesDirectory, courseId );
  // console.log('Received: ', videoPath, courseId, sectionId, lectureId);
  // const outputChunksPath = await makeDirectory(courseId, sectionId, lectureId);
  // console.log('Output Path: ', outputChunksPath);

  // Loop through all resolutions to generate Chunks
  for (const [resolution, scale] of Object.entries(screenResolutions)) {
    // TODO: manually set coursesDirectory
    // const outputChunksPath = `${coursesDirectory}/${courseId}/${resolution}/`;
    transcodeVideo(videoPath, scale, resolution, outputChunksPath);
  }

  console.log('Whole Transcoding Completed');
}

module.exports = generateTranscodings;
