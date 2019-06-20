const router = require('express-promise-router')()

const usersController = require('../controllers/users')
const {
  validateBody,
  signUpSchema,
  signInSchema
} = require('../middlewares/schema-helpers')
const { checkToken } = require('../middlewares/token-helpers')

router.route('/signup').post(validateBody(signUpSchema), usersController.signUp)

router.route('/signin').post(validateBody(signInSchema), usersController.signIn)

router.route('/secret').get(checkToken, usersController.secret)

module.exports = router
