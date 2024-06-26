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
    return await Course.findOne({ courseId }).populate('sections');
  },

  // Retrieve all courses
  getAllCourses: async () => {
    return await Course.find({}).populate('sections');
  },

  // Update a course by ID
  updateCourseById: async (courseId, updateData) => {
    return await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });
  },

  // Update a course by ID
  updateCourseByCourseId: async (courseId, updateData) => {
    return await Course.findOneAndUpdate({ courseId: courseId }, updateData);
    // return await Course.findByIdAndUpdate(courseId, updateData, {
    //   new: true,
    // });
  },

  // Delete a course by ID
  deleteCourseById: async (courseId) => {
    return await Course.findOneAndDelete({ courseId });
  },

  // Add a section to a course
  addSectionToCourse: async (courseId, sectionId) => {
    return await Course.findOneAndUpdate(
      { courseId },
      { $push: { sections: sectionId } },
      { new: true }
    );
  },

  // Remove a section from a course
  removeSectionFromCourse: async (courseId, sectionId) => {
    return await Course.findByIdAndUpdate(
      courseId,
      { $pull: { sections: sectionId } },
      { new: true }
    );
  },
};

module.exports = courseServices;
