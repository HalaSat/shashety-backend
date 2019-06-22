import mongoose from 'mongoose'

import movieSchema from './movie-schema'

export default mongoose.model('Favourite', movieSchema)
