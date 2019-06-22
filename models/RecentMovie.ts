import mongoose from 'mongoose'

const movieSchema = require('./movie-schema')

export default mongoose.model('Recent', movieSchema)
