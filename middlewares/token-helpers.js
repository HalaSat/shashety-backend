const jwt = require('jsonwebtoken')

module.exports = {
  checkToken: (req, res, next) => {
    const authorizationHeader =
      req.headers['authorization'] || req.headers['x-access-token']

    const token =
      authorizationHeader &&
      authorizationHeader.startsWith('Bearer ') &&
      authorizationHeader.slice(7, authorizationHeader.length)

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res
            .status(400)
            .json({ success: false, message: 'Token is not valid' })
        }
        res.decoded = decoded
        next()
      })
    } else {
      res.status(400).json({
        success: false,
        message: 'Auth token is not supplied'
      })
    }
  }
}
