const fs = require('node:fs');

function deleteFolder(folderPath) {
  fs.rm(folderPath, { recursive: true, force: true }, (err) => {
    if (err) {
      throw err;
    }
    console.log(`${folderPath} is deleted!`);
  });
}

module.exports = deleteFolder;
