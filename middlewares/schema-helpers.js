const Joi = require('@hapi/joi')

// VALIDATORS
const nameValidator = Joi.string()
  .trim()
  .max(255)
  .required()
const emailValidator = Joi.string()
  .trim()
  .email()
  .required()
const usernameValidator = Joi.string()
  .max(255)
  .trim()
  .required()
const passwordValidator = Joi.string()
  .min(8)
  .required()

module.exports = {
  validateBody: schema => (req, res, next) => {
    const result = Joi.validate(req.body, schema)
    if (result.error) {
      return res.status(400).json(result.error)
    }

    if (!req.value) {
      req.value = {}
    }

    req.value.body = result.value
    next()
  },
  signUpSchema: Joi.object().keys({
    name: nameValidator,
    email: emailValidator,
    username: usernameValidator,
    password: passwordValidator
  }),
  signInSchema: Joi.object().keys({
    username: usernameValidator,
    password: passwordValidator
  })
}
