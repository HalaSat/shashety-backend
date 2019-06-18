const jwt = require('jsonwebtoken')

const User = require('../models/users')

module.exports = {
  signUp: async (req, res) => {
    const { email, password } = req.value.body
    const foundUser = await User.findOne({ email })
    if (foundUser) {
      return res.status(403).json({ error: 'Email is already in use' })
    }

    const newUser = new User({ email, password })
    await newUser.save()

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET)

    // TODO: Return a token
    res.json({ token })
  },
  signIn: (req, res) => {
    res.send('usersController -> signIn')
  },
  secret: (req, res) => {
    res.send('usersController -> secret')
  }
}
