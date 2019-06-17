const router = require('express-promise-router')()

const usersController = require('../controllers/users')

router.route('/signup').get(usersController.signUp)

router.route('/signin').get(usersController.signIn)

router.route('/secret').get(usersController.secret)

module.exports = router
