const Section = require('../db/models/models').Section;

const sectionServices = {
  // Create a new section
  createSection: async (sectionData) => {
    try {
      const section = new Section(sectionData);
      return await section.save();
    } catch (error) {
      throw error;
    }
  },

  // Retrieve a section by ID
  getSectionById: async (sectionId) => {
    try {
      return await Section.findById(sectionId).populate('lectures');
    } catch (error) {
      throw error;
    }
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
  updateSectionById: async (sectionId, updateData) => {
    try {
      return await Section.findByIdAndUpdate(sectionId, updateData, {
        new: true,
      });
    } catch (error) {
      throw error;
    }
  },

  // Delete a section by ID
  deleteSectionById: async (sectionId) => {
    try {
      return await Section.findByIdAndDelete(sectionId);
    } catch (error) {
      throw error;
    }
  },

  // Add a lecture to a section
  addLectureToSection: async (sectionId, lectureId) => {
    try {
      return await Section.findByIdAndUpdate(
        sectionId,
        { $push: { lectures: lectureId } },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  },

  // Remove a lecture from a section
  removeLectureFromSection: async (sectionId, lectureId) => {
    try {
      return await Section.findByIdAndUpdate(
        sectionId,
        { $pull: { lectures: lectureId } },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  },
};

module.exports = sectionServices;
