import { FavouriteMovie } from '../models/movies'
import { Request, Response } from 'express'

export const favourite = async (req: Request, res: Response) => {
  const movieBody = (req as any).value.body
  const { username } = (req as any).decoded

  const movieId = movieBody.id + '-' + movieBody.username

  const foundMovies = await FavouriteMovie.find({ movieId })

  if (foundMovies) {
    await FavouriteMovie.deleteMany({ movieId })
  }

  const newMovie = new FavouriteMovie({ movieId, ...movieBody })
  await newMovie.save()

  res.json({
    ...newMovie,
    success: true,
    message: `Added "${movieBody.title}" to favourites`
  })
}

export const getUserFavourites = async (req: Request, res: Response) => {
  const { username } = (req as any).decoded

  const myFavourites = await FavouriteMovie.find({ username })

  res.json(myFavourites)
}
