const fs = require('node:fs');

function moveFile(source, destination) {
  fs.rename(source, destination, (err) => {
    if (err) throw err;
    console.log('Move complete!');
  });
}

module.exports = moveFile;
