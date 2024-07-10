const fs = require('fs');
const path = require('path');
const playlistContent = require('./playlistContent');

function saveAsFile(filename, content) {
  fs.writeFile(filename, content, (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log(`File ${filename} has been saved.`);
  });
}

const masterPlaylist = (filePath, resolutions, subtitleLanguages) => {
  const masterPlaylistContent = playlistContent.masterPlaylistContent(
    resolutions,
    subtitleLanguages
  );
  saveAsFile(path.join(filePath, 'playlist.m3u8'), masterPlaylistContent);
};

const subtitlePlaylist = (filePath, subtitleLanguages) => {
  if (subtitleLanguages.length == 0) return;
  subtitleLanguages.map((language) => {
    const subtitlePlaylistContent =
      playlistContent.subtitlePlaylistContent(language);
    saveAsFile(
      path.join(filePath, `${language}.m3u8`),
      subtitlePlaylistContent
    );
  });
};

module.exports = { masterPlaylist, subtitlePlaylist };

// playlistGenerator(
//   './static',
//   [240, 360, 480, 1080],
//   ['English', 'Hindi', 'Urdu']
// );
