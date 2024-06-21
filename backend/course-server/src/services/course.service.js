const Course = require('../db/models/models').Course;

const courseServices = {
  // Create a new course
  createCourse: async (courseData) => {
    try {
      // Course.exists({courseId:courseData.courseId})
      const course = new Course(courseData);
      return await course.save();
    } catch (error) {
      // console.log('Error: ', error);
      if (error.code === 11000) throw 'Course exist with same "courseId"';
      // throw error;
    }
  },

  // Retrieve a course by ID
  getCourseById: async (courseId) => {
    try {
      return await Course.findOne({ courseId }).populate('sections');
    } catch (error) {
      throw error;
    }
  },

  // Retrieve all courses
  getAllCourses: async () => {
    try {
      return await Course.find({}).populate('sections');
    } catch (error) {
      throw error;
    }
  },

  // Update a course by ID
  updateCourseById: async (courseId, updateData) => {
    try {
      return await Course.findByIdAndUpdate(courseId, updateData, {
        new: true,
      });
    } catch (error) {
      throw error;
    }
  },

  // Update a course by ID
  updateCourseByCourseId: async (courseId, updateData) => {
    try {
      return await Course.findOneAndUpdate({ courseId: courseId }, updateData);
      // return await Course.findByIdAndUpdate(courseId, updateData, {
      //   new: true,
      // });
    } catch (error) {
      throw error;
    }
  },

  // Delete a course by ID
  deleteCourseById: async (courseId) => {
    try {
      return await Course.findOneAndDelete({ courseId });
    } catch (error) {
      throw error;
    }
  },

  // Add a section to a course
  addSectionToCourse: async (courseId, sectionId) => {
    try {
      return await Course.findOneAndUpdate(
        { courseId },
        { $push: { sections: sectionId } },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  },

  // Remove a section from a course
  removeSectionFromCourse: async (courseId, sectionId) => {
    try {
      return await Course.findByIdAndUpdate(
        courseId,
        { $pull: { sections: sectionId } },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  },
};

module.exports = courseServices;
