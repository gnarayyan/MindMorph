const Joi = require('joi');

const courseValidationSchema = Joi.object({
  courseId: Joi.number().required(), // Same ID as in PostgresDB for Course Model
  title: Joi.string().required(),
  description: Joi.string().required(),
  objective: Joi.string().required(),
  requirement: Joi.string().required(),
  sections: Joi.array().items(Joi.string().hex().length(24)), // Assuming MongoDB ObjectIds for sections
  titleVideoUrl: Joi.string().required(), // Joi.string().uri().required()
  courseThumbnailUrl: Joi.string().required(),
});

const coursesByCoursesIdsArray = Joi.object({
  courseIds: Joi.array().items(Joi.number()).min(1),
});
// 22,
// 24,
// 25
module.exports = { courseValidationSchema, coursesByCoursesIdsArray };
