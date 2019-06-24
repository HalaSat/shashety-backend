import { Request, Response } from 'express'
import JWT from 'jsonwebtoken'

import { User } from '../models/users'
import { Document } from 'mongoose'

const signToken = (user: Document) =>
  JWT.sign(
    { id: (user as any).id, username: (user as any).username },
    process.env.JWT_SECRET || 'secret',
    {
      issuer: 'http://halasat.net'
    }
  )

export const signUp = async (req: Request, res: Response) => {
  const { name, username, email, password } = (req as any).value.body

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
}
export const signIn = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  const { username, password } = (req as any).value.body

  const user = await User.findOne({ username })

  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: 'No user found with this username' })
  }

  if ((user as any).password == password) {
    const token = signToken(user)
    res.json({ success: true, message: 'Logged in successfully', token })
  } else {
    res
      .status(403)
      .json({ success: false, message: 'Incorrect username or password' })
  }
}
