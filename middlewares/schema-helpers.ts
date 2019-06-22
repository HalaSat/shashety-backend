import { Request, Response, NextFunction } from 'express'

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

export const validateBody = (schema: any) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = Joi.validate(req.body, schema)
  if (result.error) {
    return res.status(400).json(result.error)
  }

  if (!(req as any).value) {
    ;(req as any).value = {}
  }

  ;(req as any).value.body = result.value
  next()
}

// EXPORT SCHEMAS
export const signUpSchema = Joi.object().keys({
  name: nameValidator,
  email: emailValidator,
  username: usernameValidator,
  password: passwordValidator
})
export const signInSchema = Joi.object().keys({
  username: usernameValidator,
  password: passwordValidator
})
export const movieSchema = Joi.object()
  .keys({
    id: Joi.string().required(),
    username: Joi.string().required(),
    title: Joi.string().required(),
    poster: Joi.string(),
    category: Joi.string(),
    year: Joi.string(),
    rating: Joi.string(),
    views: Joi.string()
  })
  .unknown(true)
