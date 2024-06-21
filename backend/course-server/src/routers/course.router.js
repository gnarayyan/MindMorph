const express = require('express');
const uploadFileMiddleware = require('../middlewares/course.middleware');
const controller = require('../controllers/course.controller');
const router = express.Router();

const COURSE_ID_IN_REQUEST_BODY = false;

router.post(
  '/',
  uploadFileMiddleware('titleVideoLink'),
  controller.createCourse
);
router.put(
  '/:courseId',
  uploadFileMiddleware('titleVideoLink', COURSE_ID_IN_REQUEST_BODY),
  controller.updateCourse
);
router.delete('/:id', controller.deleteCourse);
router.get('/:id', controller.getCourseById);
router.get('', controller.getAllCourses);

module.exports = router;
