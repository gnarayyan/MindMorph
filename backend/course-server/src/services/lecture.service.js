const Lecture = require('../db/models/models').Lecture;

const lectureServices = {
  // Create a new lecture
  createLecture: async (lectureData) => {
    try {
      const lecture = new Lecture(lectureData);
      return await lecture.save();
    } catch (error) {
      throw error;
    }
  },

  // Retrieve a lecture by ID
  getLectureById: async (lectureId) => {
    try {
      return await Lecture.findById(lectureId);
    } catch (error) {
      throw error;
    }
  },

  // Retrieve all lectures
  getAllLectures: async () => {
    try {
      return await Lecture.find({});
    } catch (error) {
      throw error;
    }
  },

  // Update a lecture by ID
  updateLectureById: async (lectureId, updateData) => {
    try {
      return await Lecture.findByIdAndUpdate(lectureId, updateData, {
        new: true,
      });
    } catch (error) {
      throw error;
    }
  },

  // Delete a lecture by ID
  deleteLectureById: async (lectureId) => {
    try {
      return await Lecture.findByIdAndDelete(lectureId);
    } catch (error) {
      throw error;
    }
  },

  // Find lectures by a specific field
  findLecturesByField: async (field, value) => {
    try {
      let query = {};
      query[field] = value;
      return await Lecture.find(query);
    } catch (error) {
      throw error;
    }
  },

  // Add a subtitle to a lecture
  addSubtitleToLecture: async (lectureId, subtitle) => {
    try {
      return await Lecture.findByIdAndUpdate(
        lectureId,
        { $push: { subtitles: subtitle } },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  },

  // Remove a subtitle from a lecture
  removeSubtitleFromLecture: async (lectureId, subtitleId) => {
    try {
      return await Lecture.findByIdAndUpdate(
        lectureId,
        { $pull: { subtitles: { _id: subtitleId } } },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  },
};

module.exports = lectureServices;
