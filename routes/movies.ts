import ExpressPromiseRouter from 'express-promise-router'

import { favourite, getUserFavourites } from '../controllers/movies'

import { checkToken } from '../middlewares/token-helpers'
import { movieSchema, validateBody } from '../middlewares/schema-helpers'

const router = ExpressPromiseRouter()

router
  .route('/favourite')
  .post(checkToken, validateBody(movieSchema), favourite)

router.route('/my-favourites').get(checkToken, getUserFavourites)

export default router
