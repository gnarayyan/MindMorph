const courseService = require('../services/course.service');
const validator = require('../validation/course.validation');
const path = require('node:path');
const deleteFile = require('../utils/deleteFile');
const deleteFolder = require('../utils/deleteFolder');
// Create Course
const createCourse = async (req, res) => {
  if (!req.files.titleVideo) {
    return res.status(400).send({ message: "Title video isn't uploaded." });
  }
  if (!req.files.courseThumbnail) {
    return res
      .status(400)
      .send({ message: "Course Thumbnail isn't uploaded." });
  }
  const data = {
    ...req.body,
    titleVideoUrl: req.files.titleVideo[0].path,
    courseThumbnailUrl: req.files.courseThumbnail[0].path,
  };
  const { error, value } = validator.courseValidationSchema.validate(data);

  // If Joi validation fails, delete video file and send an error response
  if (error) {
    await deleteFile(value.titleVideoUrl).catch(console.error);
    await deleteFile(value.courseThumbnailUrl).catch(console.error);
    return res.status(400).json({ message: error.details[0].message });
  }

  // Save to DB
  try {
    const newCourse = await courseService.createCourse(value);
    res.status(201).json({ message: 'Course Created' });
  } catch (error) {
    await deleteFile(value.titleVideoUrl).catch(console.error);
    await deleteFile(value.courseThumbnailUrl).catch(console.error);

    res.status(400).json({ message: 'Failed to Create Course', error: error });
  }
};

// Update Course
const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const titleVideoUrl = req.files.titleVideo.path;
    const courseThumbnailUrl = req.files.courseThumbnail.path;

    if (titleVideoUrl) req.body.titleVideoUrl = titleVideoUrl;
    if (courseThumbnailUrl) req.body.courseThumbnailUrl = courseThumbnailUrl;

    const preUpdatedCourse = await courseService.updateCourseByCourseId(
      courseId,
      req.body
    );

    if (titleVideoUrl) await deleteFile(preUpdatedCourse.titleVideoUrl);
    if (courseThumbnailUrl)
      await deleteFile(preUpdatedCourse.courseThumbnailUrl);

    res.status(200).json({ message: 'Course has been updated' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Course
const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await courseService.deleteCourseById(courseId);

    const folderPath = path.join('media', `${course.courseId}`);
    await deleteFolder(folderPath);

    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Course by ID
const getCourseById = async (req, res) => {
  try {
    const course = await courseService.getCourseById(req.params.id);
    if (course)
      return res.status(200).json(course );
    res.status(400).json({ message: "Course doesn't exist" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch All Courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Route to get courses by list of course IDs
const getAllCoursesByCoursesIdsArray = async (req, res) => {
  const { error, value } = validator.coursesByCoursesIdsArray.validate(
    req.body
  );

  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const courses = await courseService.getCoursesByCoursesIds(value.courseIds);
    res.status(200).send(courses);
  } catch (err) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseById,
  getAllCourses,
  getAllCoursesByCoursesIdsArray,
};
