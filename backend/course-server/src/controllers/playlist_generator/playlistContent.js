const masterPlaylistContent = (resolutions, languages) => {
  let content = '#EXTM3U\n\n';

  if (languages.length > 0) {
    const mediaLines = languages.map(
      (language) =>
        `#EXT-X-MEDIA:TYPE=SUBTITLES,GROUP-ID="subs",NAME="${language}",DEFAULT=YES,AUTOSELECT=YES,FORCED=NO,LANGUAGE="${language}",URI="${language}.m3u8"`
    );
    content += mediaLines.join('\n');
  }

  let bandwidth = 150000;

  const resolutionData = {
    240: '426x240',
    360: '640x360',
    480: '854x480',
    720: '1280x720',
    1080: '1920x1080',
  };
  const streamInfoLines = resolutions.map((resolution) => {
    bandwidth += 100000;
    const res = resolutionData[resolution];
    return `#EXT-X-STREAM-INF:BANDWIDTH=${bandwidth},RESOLUTION=${res},SUBTITLES="subs"\n${resolution}p.m3u8`;
  });

  content += '\n' + streamInfoLines.join('\n\n');
  return content;
};

const subtitlePlaylistContent = (language) => {
  return `#EXTM3U
#EXT-X-TARGETDURATION:887
#EXT-X-VERSION:3
#EXT-X-MEDIA-SEQUENCE:1
#EXT-X-PLAYLIST-TYPE:VOD
#EXTINF:887.0
${language}.vtt
#EXT-X-ENDLIST`;
};

module.exports = { masterPlaylistContent, subtitlePlaylistContent };
