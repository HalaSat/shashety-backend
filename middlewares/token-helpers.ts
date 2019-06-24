import { verify } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader =
    req.headers['authorization'] || req.headers['x-access-token']

  const token =
    authorizationHeader &&
    authorizationHeader.toString().startsWith('Bearer ') &&
    authorizationHeader.slice(7, authorizationHeader.length)

  if (token) {
    verify(
      token.toString(),
      process.env.JWT_SECRET || 'secret',
      (err, decoded) => {
        if (err) {
          return res
            .status(400)
            .json({ success: false, message: 'Token is not valid' })
        }
        ;(req as any).decoded = decoded
        next()
      }
    )
  } else {
    res.status(400).json({
      success: false,
      message: 'Auth token is not supplied'
    })
  }
}
