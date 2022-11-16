const Joi = require("joi");

const Str = Joi.string();
const Num = Joi.number();
const Uri = Joi.string().uri();
const Email = Joi.string().email();
const Bool = Joi.boolean();
const IsoDate = Str.isoDate();
const Arr = Joi.array();

const userLoginSchema = Joi.object({
  email: Email.required(),
  password: Str.min(6).required(),
});

const userRegisterSchema = Joi.object({
  username: Str.min(4).required(),
  email: Email.required(),
  password: Str.min(6).required(),
});

const createVideoSchema = Joi.object({
  title: Str.min(6).required(),
  url: Uri.required()
});

const createCommentSchema = Joi.object({
  videoId: Str.required(),
  username: Str.required(),
  comment: Str.required()
})

const createStarSchema = Joi.object({
  userId: Str.required(),
  count: Num.min(0).required(),
  videoId: Str.required()
})

const validateAsync = async (schema, value) =>
  await schema.validateAsync(value);

const validate = (schema, value) => schema.validate(value);

module.exports = {
  Str,
  Num,
  Uri,
  Email,
  Bool,
  IsoDate,
  Arr,
  userLoginSchema,
  userRegisterSchema,
  createVideoSchema,
  createCommentSchema,
  createStarSchema,
  validateAsync,
  validate,
};
