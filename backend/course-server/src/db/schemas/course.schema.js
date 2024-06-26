const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseId: { type: Number, required: true, index: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  objective: { type: String, required: true },
  requirement: { type: String, required: true },
  sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }],
  titleVideoUrl: { type: String, required: true },
  courseThumbnailUrl: { type: String, required: true },
});

module.exports = courseSchema;
