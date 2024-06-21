const fs = require('node:fs/promises');
const path = require('node:path');

// import { mkdir } from 'node:fs/promises';
// import { join } from 'node:path';
// import screenResolutions from './constants.mjs';

// import  resolutions = require('./constants.mjs');

// async function makeDirectories(coursesDirectory, courseId) {
//     const folderNames = Object.keys(screenResolutions);
//     for (let index = 0; index < folderNames.length; index++) {
//         const folder = folderNames[index];
//         const projectFolder = join(coursesDirectory, `${courseId}`, folder);
//         const dirCreation = await mkdir(projectFolder, { recursive: true });

//         console.log(dirCreation);
//     }
// }

// makeDirectories(2).catch(console.error);

// makeDirectories(5);

async function makeDirectory(courseId, sectionId, lectureId) {
  const lectureDirectoryPath = path.join(
    'media',
    `${courseId}`,
    `${sectionId}`,
    `${lectureId}`
  );
  console.log('Path for new Folder: ', lectureDirectoryPath);
  const dirCreation = await fs.mkdir(lectureDirectoryPath, { recursive: true });

  console.log(dirCreation);
  return path.join(dirCreation, sectionId, lectureId);
}

// async function run() {
//   const folder = await makeDirectory('course9', 'section', 'lecture');
//   console.log('Folder: ', folder);
// }

// run();
// export default  makeDirectories;
module.exports = makeDirectory;
