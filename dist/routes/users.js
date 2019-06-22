"use strict";
var router = require('express-promise-router')();
var usersController = require('../controllers/users');
var _a = require('../middlewares/schema-helpers'), validateBody = _a.validateBody, signUpSchema = _a.signUpSchema, signInSchema = _a.signInSchema;
router.route('/signup').post(validateBody(signUpSchema), usersController.signUp);
router.route('/signin').post(validateBody(signInSchema), usersController.signIn);
router.route('/:userId/favourites').get(function (req, res) {
    res.send(req.params);
});
module.exports = router;
