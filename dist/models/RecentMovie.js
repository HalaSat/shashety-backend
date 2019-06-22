"use strict";
var mongoose = require('mongoose');
var movieSchema = require('./movie-schema');
var RecentMovie = mongoose.model('Recent', movieSchema);
module.exports = RecentMovie;
