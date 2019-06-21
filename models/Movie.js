const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = Schema({
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
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie
