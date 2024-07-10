const multer = require('multer');
const path = require('node:path');

const createDirectory = require('../utils/createDirectory');
const { error } = require('node:console');

const MAX_FILES_UPLOAD_COUNT = 6; //1-> lectures video, 5-> subtitles
const MAX_SIZE_OF_EACH_FILE = 1024 * 1024 * 150; //150 MB limit size

// TODO: Allow only specfied extensions
const allowedFiles = [
  'video/mp4',
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'file') {
    // console.log('Filter Type: ', file.mimetype);
    if (file.mimetype in allowedFiles) cb(null, true);

    cb(null, false);
  }
  if (file.fieldname === 'subtitles') {
    // 'application/x-subrip' -> .srt
    if (file.mimetype === 'application/x-subrip') cb(null, true);
    else cb(null, false);
  }
};

// TODO: Handle Size limit error

// Configure multer for folder upload
function multerStorageEngine() {
  return multer.diskStorage({
    destination: async function (req, file, cb) {
      const courseId = req.body.courseId;
      const sectionId = req.body.sectionId;
      const sectionPath = path.join(`${courseId}`, `${sectionId}`, 'temp');
      const createdDirectory = await createDirectory(sectionPath); // Create directory named [courseId] if not exists already

      // TODO: Transcoding and Segmentation
      // console.log('File: ', file);
      cb(null, createdDirectory);

      // cb(null, `media/${courseId}/${sectionId}/temp/`); //createdDirectory
    },
    filename: function (req, file, cb) {
      // Use the original file name
      cb(null, file.originalname);
    },
    fileFilter: fileFilter,
  });
}

// function uploadLectureFiles() {
//   const upload = multer({
//     storage: multerStorageEngine(),
//     // limits: { fileSize: MAX_SIZE_OF_EACH_FILE, files: MAX_FILES_UPLOAD_COUNT },
//     onError: function (err, next) {
//       console.log('error.......occur:- ', err);
//       next(err);
//     },
//   });

//   // return upload.array('files', MAX_FILES_UPLOAD_COUNT);
//   upload.fields([
//     {
//       name: 'video',
//       maxCount: 1,
//     },
//     {
//       name: 'subtitles',
//       maxCount: 5,
//     },
//   ]);

// module.exports = uploadLectureFiles;

// ------------------------ NEW WAY -----------------------//

const upload = multer({
  storage: multerStorageEngine(),
  // limits: { fileSize: MAX_SIZE_OF_EACH_FILE, files: MAX_FILES_UPLOAD_COUNT },
  onError: function (err, next) {
    // console.log('error.......occur:- ', err);
    next(err);
  },
}).fields([
  {
    name: 'file',
    maxCount: 1,
  },
  {
    name: 'subtitles',
    maxCount: 5,
  },
]);

module.exports = function (req, res, next) {
  upload(req, res, function (err) {
    // TODO: Handle NotAllowed file types upload
    if (err && err.code === 'ENOENT') {
      res.status(500).send('File or directory not found.');
      next(err);
    } else if (err instanceof TypeError) {
      res.status(500).send('File or directory not found. - type');
      next(err);
    } else if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.log('Multer Error: ', err);
      next(err);
    } else if (err) {
      // An unknown error occurred when uploading.
      console.log('Unknown Error: ', typeof err);
      next(err);
    }
    // Everything went fine.
    next();
  });
};
