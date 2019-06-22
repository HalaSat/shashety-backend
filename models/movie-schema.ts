import { Schema } from 'mongoose'

export default new Schema({
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
