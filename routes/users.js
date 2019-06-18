const router = require('express-promise-router')()

const usersController = require('../controllers/users')
const { schema, validateBody } = require('../utils')

router.route('/signup').post(validateBody(schema), usersController.signUp)

router.route('/signin').post(usersController.signIn)

router.route('/secret').get(usersController.secret)

module.exports = router
