"use strict";
var mongoose = require('mongoose');
var movieSchema = require('./movie-schema');
var FavouriteMovie = mongoose.model('Favourite', movieSchema);
module.exports = FavouriteMovie;
