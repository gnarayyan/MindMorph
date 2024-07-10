const multer = require('multer');
const createDirectory = require('../utils/createDirectory');

const MAX_FILES_UPLOAD_COUNT = 1; //20-> lectures, 20-> subtitles, 10-> attachemnts
const MAX_SIZE_OF_EACH_FILE = 1024 * 1024 * 100; //100 MB limit size

// TODO: Allow only specfied extensions

// Configure multer for folder upload
function multerStorageEngine(isCourseIdInBody) {
  // console.log('isCourseIdInBody: ', isCourseIdInBody);
  return multer.diskStorage({
    destination: async function (req, file, cb) {
      const courseId = isCourseIdInBody
        ? req.body.courseId
        : req.params.courseId;
      const createdDirectory = await createDirectory(courseId); // Create directory named [courseId] if not exists already

      cb(null, createdDirectory);
    },
    filename: function (req, file, cb) {
      console.log('File Names: ', file, '   --> ', file.filename);
      // Use the original file name
      cb(null, file.originalname);
    },
  });
}

function uploadFile(fieldNames, isCourseIdInBody = true) {
  const upload = multer({
    storage: multerStorageEngine(isCourseIdInBody),
    limits: { fileSize: MAX_SIZE_OF_EACH_FILE },
  });

  const uploadFields = [
    { titleVideo: 'titleVideo', maxCount: 1 },
    { courseThumbnail: 'courseThumbnail', maxCount: 1 },
  ];

  return upload.fields(uploadFields);
}

module.exports = uploadFile;
