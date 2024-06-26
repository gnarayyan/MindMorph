const multer = require('multer');

const createDirectory = require('../utils/createDirectory');

// const MAX_FILES_UPLOAD_COUNT = 2; //titleVideo, courseThumbnail
// const MAX_SIZE_OF_EACH_FILE = 1024 * 1024 * 150; //150 MB limit size

// TODO: Allow only specfied extensions
const allowedVideoTypes = ['video/mp4'];
const allowedImageTypes = [
  'image/jpeg',
  'image/png',
  'image/jpg',
  'image/webp',
];
const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'titleVideo') {
    if (file.mimetype in allowedVideoTypes) cb(null, true);

    cb(null, false);
  }
  if (file.fieldname === 'courseThumbnail') {
    if (file.mimetype in allowedImageTypes) cb(null, true);
    else cb(null, false);
  }
};

// TODO: Handle Size limit error

// Configure multer for folder upload
function multerStorageEngine() {
  return multer.diskStorage({
    destination: async function (req, file, cb) {
      const courseId = req.body.courseId;
      const createdDirectory = await createDirectory(courseId); // Create directory named [courseId] if not exists already

      cb(null, createdDirectory);
    },
    filename: function (req, file, cb) {
      // Use the original file name
      cb(null, file.originalname);
    },
    // fileFilter: fileFilter,
  });
}

const upload = multer({
  storage: multerStorageEngine(),
  // limits: { fileSize: MAX_SIZE_OF_EACH_FILE, files: MAX_FILES_UPLOAD_COUNT },
  onError: function (err, next) {
    next(err);
  },
}).fields([
  {
    name: 'titleVideo',
    maxCount: 1,
  },
  {
    name: 'courseThumbnail',
    maxCount: 1,
  },
]);

module.exports = upload;

// function (req, res, next) {
//   upload(req, res, function (err) {
//     // TODO: Handle NotAllowed file types upload
//     if (err && err.code === 'ENOENT') {
//       res.status(500).send('File or directory not found.');
//       next(err);
//     } else if (err instanceof TypeError) {
//       res.status(500).send('File or directory not found. - type');
//       next(err);
//     } else if (err instanceof multer.MulterError) {
//       // A Multer error occurred when uploading.
//       console.log('Multer Error: ', err);
//       next(err);
//     } else if (err) {
//       // An unknown error occurred when uploading.
//       console.log('Unknown Error: ', typeof err);
//       next(err);
//     }
//     // Everything went fine.
//     next();
//   });
// };
