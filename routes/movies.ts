const router = require('express-promise-router')()
const moviesController = require('../controllers/movies')

const { checkToken } = require('../middlewares/token-helpers')
const { validateBody, movieSchema } = require('../middlewares/schema-helpers')

router
  .route('/favourite')
  .post(checkToken, validateBody(movieSchema), moviesController.favourite)

export default router
