const mongoose = require('mongoose')

const movieSchema = require('./movie-schema')

const FavouriteMovie = mongoose.model('Favourite', movieSchema)

module.exports = FavouriteMovie
