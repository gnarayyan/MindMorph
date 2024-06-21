const Joi = require('joi');

const uploadSection = Joi.object({
  courseId: Joi.number().required(),
  sectionName: Joi.string().min(10).max(100).required(),
  orderPriority: Joi.number().default(0),
});

module.exports = uploadSection;
