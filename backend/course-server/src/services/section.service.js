const Section = require('../db/models/models').Section;
const Course = require('../db/models/models').Course;

const sectionServices = {
  // Create a new section
  createSection: async (sectionData) => {
    const section = new Section(sectionData);
    return await section.save();
  },
  // Retrieve a section by ID
  getSectionById: async (sectionId) =>
    await Section.findById(sectionId).populate('lectures'),
  getAllSectionsByCourseId: async (courseId) => {
    return await await Course.findOne({ courseId }).populate({
      path: 'sections',
      populate: {
        path: 'lectures',
        model: 'Lecture',
      },
    });
    // .populate('lectures');
  },

  // Retrieve all sections
  // getAllSections: async () => {
  //   try {
  //     return await Section.find({}).populate('lectures');
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  // Update a section by ID
  updateSectionById: async (sectionId, updateData) =>
    await Section.findByIdAndUpdate(sectionId, updateData, {
      new: true,
    }),

  // Delete a section by ID
  deleteSectionById: async (sectionId) =>
    await Section.findByIdAndDelete(sectionId),

  // Add a lecture to a section
  addLectureToSection: async (sectionId, lectureId) =>
    await Section.findByIdAndUpdate(
      sectionId,
      { $push: { lectures: lectureId } },
      { new: true }
    ),

  // Remove a lecture from a section
  removeLectureFromSection: async (sectionId, lectureId) =>
    await Section.findByIdAndUpdate(
      sectionId,
      { $pull: { lectures: lectureId } },
      { new: true }
    ),
};

module.exports = sectionServices;
