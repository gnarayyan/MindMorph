const express = require('express');
const courseSectionUpload = require('../../controllers/course/upload.controller');
const uploadFilesMiddleware = require('../../middlewares/upload.middleware');
const router = express.Router();

router.post('/:courseId', uploadFilesMiddleware(), courseSectionUpload);

module.exports = router;
