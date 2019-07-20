import ExpressPromiseRouter from 'express-promise-router'

import {
  addFavourite,
  getUserFavourites,
  removeFavourite
} from '../controllers/movies'
import { checkToken } from '../middlewares/token-helpers'
import {
  movieSchema,
  validateBody,
  removeMovieSchema
} from '../middlewares/schema-helpers'

const router = ExpressPromiseRouter()

router
  .route('/favourites/add')
  .post(checkToken, validateBody(movieSchema), addFavourite)

router
  .route('/favourites/remove')
  .post(checkToken, validateBody(removeMovieSchema), removeFavourite)

router.route('/my-favourites').get(checkToken, getUserFavourites)

export default router
