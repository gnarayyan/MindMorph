const express = require('express');
const uploadLectureFiles = require('../middlewares/lecture.middleware');
const controller = require('../controllers/lecture.controller');
const router = express.Router();

// router.post('/', uploadLectureFiles(), controller.createLecture);
router.post('/', uploadLectureFiles, controller.createLecture);

// router.put('/', controller.updateSection);
// router.delete('/:sectionId', controller.deleteSection);
// router.get('/:sectionId', controller.getSection);
// router.get('/:courseId', controller.getAllSectionsOfACourse);

module.exports = router;
