const Movie = require('../models/FavouriteMovie')

module.exports = {
  favourite: async (req, res) => {
    const movieBody = req.value.body

    const foundMovie = Movie.findOne({ id: movieBody.id })

    if (foundMovie) {
      Movie.deleteMany({ id: movieBody.id })
    }

    const newMovie = new Movie(movieBody)

    await newMovie.save()
    res.json({ ...newMovie, success: true })
  }
}
