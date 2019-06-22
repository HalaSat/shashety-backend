"use strict";
var Schema = require('mongoose').Schema;
var movieSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    poster: String,
    category: String,
    year: String,
    rating: String,
    views: String
});
module.exports = movieSchema;
