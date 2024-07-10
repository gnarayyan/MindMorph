const Joi = require('joi');

const course = Joi.object({
  courseCategoryId: Joi.number().required(),
  language: Joi.string().valid('English', 'Nepali', 'Hindi').required(),
  price: Joi.number().min(0).max(50000).required(),
  discountPercent: Joi.number().min(0).max(100),
  authorId: Joi.number().min(1).required(),
});

const updateCourse = Joi.object({
  id: Joi.number().required(),
  courseCategoryId: Joi.number(),
  language: Joi.string().valid('English', 'Nepali', 'Hindi'),
  price: Joi.number().min(0).max(50000),
  discountPercent: Joi.number().min(0).max(100),
}).min(2);

const deleteCourse = Joi.object({
  id: Joi.number().required(),
});

module.exports = { course, updateCourse, deleteCourse };
