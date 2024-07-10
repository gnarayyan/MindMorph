const fsp = require('node:fs/promises');

// By using COPYFILE_EXCL, the operation will fail if destination.txt exists.
async function copyFile(source, destination) {
  try {
    await fsp.copyFile(source, destination, fsp.constants.COPYFILE_EXCL);
    console.log('Playlist Copied');
  } catch (e) {
    console.error('The file could not be copied');
    console.error(e);
  }
}

// async function run() {
//   await copyFile(
//     'media/playlist.m3u8',
//     'media/11/testSection2/664269166339d1977e3964df/playlist.m3u8'
//   );
// }
// run();
module.exports = copyFile;
