const Joi = require('joi');

const create = Joi.object({
  courseId: Joi.number().required(),
  title: Joi.string().required(),
});

// const addSectionVideos = Joi.object({
//   courseId: Joi.number().required(),
//   sectionId: Joi.number().required(),
//   lectures: Joi.array().items(Joi.string().hex().length(24)),
//   orderPriority: Joi.number().integer(),
// });

const update = Joi.object({
  // courseId: Joi.number().required(),
  sectionId: Joi.string().required(),
  title: Joi.string(),
  // lectures: Joi.array().items(Joi.string().hex().length(24)),
  orderPriority: Joi.number().integer(),
}).min(2);

const sectionId = Joi.object({
  sectionId: Joi.string().required(),
});

module.exports = { create, update, sectionId };
