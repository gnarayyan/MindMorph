const mongoose = require('mongoose');

const schemas = require('../schemas');

const Lecture = mongoose.model('Lecture', schemas.lecture);
const Section = mongoose.model('Section', schemas.section);
const Course = mongoose.model('Course', schemas.course);

module.exports = { Lecture, Section, Course };
