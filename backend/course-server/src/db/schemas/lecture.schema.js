const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  file: { type: String }, // required: true
  size: { type: Number, required: true }, // In KB
  subtitles: [
    {
      language: { type: String, required: true },
      link: { type: String, required: true },
    },
  ],
  duration: { type: Number, required: true }, // In Seconds
  isAttachment: { type: Boolean, default: false },
  orderPriority: { type: Number, default: 0 },
});

module.exports = lectureSchema;
