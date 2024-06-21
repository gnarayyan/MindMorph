const multer = require('multer');
const path = require('node:path');

const createDirectory = require('../utils/createDirectory');

const MAX_FILES_UPLOAD_COUNT = 100; //30-> lectures videos, 30-> subtitles, 30-> attachemnts, 10-> Extra
const MAX_SIZE_OF_EACH_FILE = 1024 * 1024 * 100; //100 MB limit size

// TODO: Allow only specfied extensions

// Configure multer for folder upload
function multerStorageEngine() {
  return multer.diskStorage({
    destination: async function (req, file, cb) {
      const courseId = req.body.courseId;
      const sectionId = req.body.sectionId;
      const sectionPath = path.join(`${courseId}`, `${sectionId}`);
      const createdDirectory = await createDirectory(sectionPath); // Create directory named [courseId] if not exists already

      cb(null, createdDirectory);
    },
    filename: function (req, file, cb) {
      // Use the original file name
      cb(null, file.originalname);
    },
  });
}

function uploadSectionFiles() {
  const upload = multer({
    storage: multerStorageEngine(),
    // limits: { fileSize: MAX_SIZE_OF_EACH_FILE, files: MAX_FILES_UPLOAD_COUNT },
  });

  return upload.array('files', MAX_FILES_UPLOAD_COUNT);
}

module.exports = uploadSectionFiles;
