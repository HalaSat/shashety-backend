module.exports = {
  signUp: (req, res) => {
    res.send('usersController -> signUp')
  },
  signIn: (req, res) => {
    res.send('usersController -> signIn')
  },
  secret: (req, res) => {
    res.send('usersController -> secret')
  }
}
