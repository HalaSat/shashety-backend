"use strict";
var Joi = require('@hapi/joi');
// VALIDATORS
var nameValidator = Joi.string()
    .trim()
    .max(255)
    .required();
var emailValidator = Joi.string()
    .trim()
    .email()
    .required();
var usernameValidator = Joi.string()
    .max(255)
    .trim()
    .required();
var passwordValidator = Joi.string()
    .min(8)
    .required();
module.exports = {
    validateBody: function (schema) { return function (req, res, next) {
        var result = Joi.validate(req.body, schema);
        if (result.error) {
            return res.status(400).json(result.error);
        }
        if (!req.value) {
            req.value = {};
        }
        req.value.body = result.value;
        next();
    }; },
    signUpSchema: Joi.object().keys({
        name: nameValidator,
        email: emailValidator,
        username: usernameValidator,
        password: passwordValidator
    }),
    signInSchema: Joi.object().keys({
        username: usernameValidator,
        password: passwordValidator
    }),
    movieSchema: Joi.object()
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
};
