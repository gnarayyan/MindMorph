const Joi = require('joi');

const create = Joi.object({
  courseId: Joi.number().required(),
  sectionId: Joi.string().required(),
  title: Joi.string().required(),

  subtitles: Joi.array()
    .items(
      Joi.object({
        language: Joi.string().required(),
        link: Joi.string().required(), //TODO: validate string is a valid File path
      })
    )
    .when('isAttachment', {
      is: true,
      then: Joi.optional(),
      otherwise: Joi.required(),
    }),
  file: Joi.string(), //TODO: validate string is a valid File path
  size: Joi.number().required(),
  duration: Joi.number().positive().required(), // In Seconds
  isAttachment: Joi.boolean(),
  orderPriority: Joi.number().integer(),
});

module.exports = { create };
