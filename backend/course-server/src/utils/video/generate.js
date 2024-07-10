const generateTranscodings = require('./generateTranscodings');

const videoPath = './test.mp4';
const courseId = 9;
const sectionId = 'section';
const lectureId = 'lecture';

const coursesDirectory = './courses';

async function run() {
  await generateTranscodings(
    videoPath,
    courseId,
    sectionId,
    lectureId,
    coursesDirectory
  );
}

// run();
