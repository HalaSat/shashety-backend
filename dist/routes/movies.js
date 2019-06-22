"use strict";
var router = require('express-promise-router')();
var moviesController = require('../controllers/movies');
var checkToken = require('../middlewares/token-helpers').checkToken;
var _a = require('../middlewares/schema-helpers'), validateBody = _a.validateBody, movieSchema = _a.movieSchema;
router
    .route('/favourite')
    .post(checkToken, validateBody(movieSchema), moviesController.favourite);
module.exports = router;
