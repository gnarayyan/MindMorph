const fs = require('node:fs/promises');
async function deleteFile(filePath) {
  await fs.unlink(filePath);
  console.log('File Deleted');
}

module.exports = deleteFile;
