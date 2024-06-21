const multer = require('multer');

// Set up multer with a file size limit
const upload = multer({
  dest: './public/uploads/',
  limits: {
    fileSize: 0.5 * 1024 * 1024, // Limit file size to 0.5 MB
  },
}).single('upl');

app.post('/', function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      if (err.code === 'LIMIT_FILE_SIZE') {
        console.log('File too large');
        // Handle the error here. For example, you might return a specific HTTP status code:
        res.status(413).send('File too large');
      }
    } else if (err) {
      // An unknown error occurred when uploading.
      console.log(err);
    }

    // Everything went fine, continue with your logic here...
    res.end('Your new avatar is uploaded');
  });
});
