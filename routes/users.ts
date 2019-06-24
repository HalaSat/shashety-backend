import ExpressPromiseRouter from 'express-promise-router'

import { signUp, signIn } from '../controllers/users'
import {
  validateBody,
  signUpSchema,
  signInSchema
} from '../middlewares/schema-helpers'

const router = ExpressPromiseRouter()

router.route('/signup').post(validateBody(signUpSchema), signUp)

router.route('/signin').post(validateBody(signInSchema), signIn)

export default router
