const mongoose = require('mongoose')

const movieSchema = require('./movie-schema')

const RecentMovie = mongoose.model('Recent', movieSchema)

module.exports = RecentMovie
