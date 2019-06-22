import FavouriteMovie from '../models/FavouriteMovie'
import { Request, Response } from 'express'

export const favourite = async (req: Request, res: Response) => {
  const movieBody = (req as any).value.body

  const foundMovie = FavouriteMovie.findOne({ id: movieBody.id })

  if (foundMovie) {
    FavouriteMovie.deleteMany({ id: movieBody.id })
  }

  const newMovie = new FavouriteMovie(movieBody)

  await newMovie.save()
  res.json({ ...newMovie, success: true })
}
