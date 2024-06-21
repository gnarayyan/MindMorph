const Joi = require('joi');

const courseValidationSchema = Joi.object({
  courseId: Joi.number().required(), // Same ID as in PostgresDB for Course Model
  title: Joi.string().required(),
  description: Joi.string().required(),
  objective: Joi.string().required(),
  requirement: Joi.string().required(),
  sections: Joi.array().items(Joi.string().hex().length(24)), // Assuming MongoDB ObjectIds for sections
  titleVideoLink: Joi.string().required(), // Joi.string().uri().required()
});

module.exports = courseValidationSchema;
