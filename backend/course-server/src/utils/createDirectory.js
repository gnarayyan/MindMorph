const fs = require('node:fs/promises');
const path = require('node:path');

async function createDirectory(courseId) {
  const folderPath = path.join('media', `${courseId}`);
  await fs.mkdir(folderPath, {
    recursive: true,
  });
  return folderPath;
}

module.exports = createDirectory;
