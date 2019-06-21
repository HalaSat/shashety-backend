const jwt = require('jsonwebtoken')

const User = require('../models/User')

const signToken = user =>
  jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
    issuer: 'http://halasat.net'
  })

module.exports = {
  signUp: async (req, res) => {
    const { name, username, email, password } = req.value.body

    const foundUserByEmail = await User.findOne({ email })
    if (foundUserByEmail) {
      return res.status(403).json({ error: 'Email is already in use' })
    }
    const foundUserByUsername = await User.findOne({ username })
    if (foundUserByUsername) {
      return res.status(403).json({ error: 'Username is already in use' })
    }

    const user = new User({ name, username, email, password })
    await user.save()

    // Create a token
    const token = signToken(user)

    res.json({
      user,
      token,
      success: true,
      message: 'Registered a new account successfully'
    })
  },
  signIn: async (req, res) => {
    const { username, password } = req.value.body

    const user = await User.findOne({ username })

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'No user found with this username' })
    }

    if (user.password == password) {
      const token = signToken(user)
      res.json({ success: true, message: 'Logged in successfully', token })
    } else {
      res
        .status(403)
        .json({ success: false, message: 'Incorrect username or password' })
    }
  }
}
