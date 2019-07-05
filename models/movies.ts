import mongoose, { Schema } from 'mongoose'

const movieSchema = new Schema({
  movieId: {
    type: String,
    unique: true,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  userId: {
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

export const FavouriteMovie = mongoose.model('Favourite', movieSchema)
export const RecentMovie = mongoose.model('Recent', movieSchema)
