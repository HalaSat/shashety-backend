import { Request, Response } from 'express'

import ExpressPromiseRouter from 'express-promise-router'

const usersController = require('../controllers/users')
import {
  validateBody,
  signUpSchema,
  signInSchema
} from '../middlewares/schema-helpers'

const router = ExpressPromiseRouter()

router.route('/signup').post(validateBody(signUpSchema), usersController.signUp)

router.route('/signin').post(validateBody(signInSchema), usersController.signIn)

router.route('/:userId/favourites').get((req: Request, res: Response) => {
  res.send(req.params)
})

export default router
