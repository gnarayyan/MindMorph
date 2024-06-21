const multer = require('multer');
const createDirectory = require('../utils/createDirectory');

const MAX_FILES_UPLOAD_COUNT = 50; //20-> lectures, 20-> subtitles, 10-> attachemnts
const MAX_SIZE_OF_EACH_FILE = 1024 * 1024 * 100; //100 MB limit size

// TODO: Allow only specfied extensions

// Configure multer for folder upload
function multerStorageEngine() {
  return multer.diskStorage({
    destination: async function (req, file, cb) {
      const courseId = req.params.courseId;
      const createdDirectory = await createDirectory(courseId); // Create directory named [courseId] if not exists already

      cb(null, createdDirectory);
    },
    filename: function (req, file, cb) {
      // Use the original file name
      cb(null, file.originalname);
    },
  });
}

function uploadFilesTo(req, res, next) {
  const upload = multer({
    storage: multerStorageEngine(),
    limits: { fileSize: MAX_SIZE_OF_EACH_FILE, files: MAX_FILES_UPLOAD_COUNT },
  });

  return upload.array('files', MAX_FILES_UPLOAD_COUNT);
}

module.exports = uploadFilesTo;
