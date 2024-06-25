const courseService = require('../services/course.service');
const courseValidator = require('../validation/course.validation');
const path = require('node:path');
const deleteFile = require('../utils/deleteFile');
const deleteFolder = require('../utils/deleteFolder');
// Create Course
const createCourse = async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: "Title video isn't uploaded." });
  }
  const data = { ...req.body, titleVideoLink: req.file.path };
  const { error, value } = courseValidator.validate(data);

  // If Joi validation fails, delete video file and send an error response
  if (error) {
    await deleteFile(value.titleVideoLink).catch(console.error);
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const newCourse = await courseService.createCourse(value);
    res.status(201).json(newCourse);
  } catch (error) {
    await deleteFile(value.titleVideoLink).catch(console.error);

    res.status(400).json({ message: error });
  }
};

// Update Course
const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const filePath = req.file.path;
    if (filePath) req.body.titleVideoLink = filePath;

    const preUpdatedCourse = await courseService.updateCourseByCourseId(
      courseId,
      req.body
    );
    await deleteFile(preUpdatedCourse.titleVideoLink);

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
      return res.status(200).json({ message: 'Course Fetched', course });
    res.status(400).json({ message: "Course doesn't exist" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch All Courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseById,
  getAllCourses,
};