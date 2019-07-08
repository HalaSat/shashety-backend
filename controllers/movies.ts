import { FavouriteMovie } from '../models/movies'
import { Request, Response } from 'express'

export const addFavourite = async (req: Request, res: Response) => {
  const movieBody = (req as any).value.body
  const { id: userId } = (req as any).decoded

  const movieId = `${movieBody.id}-${userId}`

  const foundMovies = await FavouriteMovie.find({ movieId })

  if (foundMovies) {
    await FavouriteMovie.deleteMany({ movieId })
  }

  const newMovie = new FavouriteMovie({ movieId, userId, ...movieBody })
  await newMovie.save()

  res.status(201).json({
    ...newMovie.toJSON(),
    success: true,
    message: `Added "${movieBody.title}" to favourites`
  })
}

export const removeFavourite = async (req: Request, res: Response) => {
  const { id } = (req as any).value.body
  const { id: userId } = (req as any).decoded

  const movie = await FavouriteMovie.deleteMany({
    id,
    userId
  })

  res.json(movie)
}

export const getUserFavourites = async (req: Request, res: Response) => {
  const { id: userId } = (req as any).decoded

  const movies = await FavouriteMovie.find({ userId })

  res.json(movies)
}
