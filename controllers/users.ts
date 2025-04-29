import bcrypt from 'bcryptjs'
import { eq, or } from 'drizzle-orm'
import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'

import { db } from '../db'
import { users } from '../db/schema'
import { uploadImage } from '../config/s3'

import transporter from '../config/nodemailer'

const generateSixDigitNumber = (): number => {
  const number = Math.floor(Math.pow(10, 6) * Math.random())

  return number.toString().length < 6 ? generateSixDigitNumber() : number
}

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  return hashedPassword
}

const register: RequestHandler = async (req, res, next) => {
  if (!req.body) {
    res.status(400).json({ message: 'No body provided' })
  }

  try {
    const { password, ...data } = req.body

    const hashedPassword = await hashPassword(password)

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, data.email))

    if (existingUser.length) {
      res.status(400).json({ message: 'User already exists' })
    }

    const user = await db
      .insert(users)
      .values({
        ...data,
        password: hashedPassword
      })
      .returning()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userData } = user[0]

    res.json({
      user: { ...userData },
      message: 'User created successfully'
    })
  } catch (error) {
    next(error)
  }
}

const login: RequestHandler = async (req, res, next) => {
  try {
    const { emailOrUsername, password } = req.body
    const [user] = await db
      .select()
      .from(users)
      .where(
        or(
          eq(users.email, emailOrUsername),
          eq(users.username, emailOrUsername)
        )
      )

    if (user) {
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        res.status(401).json({ message: 'Wrong credentials' })
      } else {
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!)
        res.json({
          token
        })
      }
    } else {
      res.status(401).json({ message: 'Wrong credentials' })
    }
  } catch (error) {
    next(error)
  }
}

const getUser: RequestHandler = async (req, res, next) => {
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, req.auth!.userId))

    if (!user) {
      res.status(404).json({ message: 'User not found' })
    }

    res.json({ user })
  } catch (error) {
    next(error)
  }
}

const updateUser: RequestHandler = async (req, res, next) => {
  try {
    let data = { ...req.body }

    if ('password' in data && 'newPassword' in data) {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, req.auth!.userId))

      if (!user) {
        res.status(404).json({ message: 'User not found' })
        return
      }

      const match = await bcrypt.compare(data.password, user.password)

      if (!match) {
        res.status(401).json({ message: 'Your current password is incorrect' })
        return
      }

      const hashedPassword = await hashPassword(data.newPassword)
      data = {
        password: hashedPassword
      }
    }

    const [user] = await db
      .update(users)
      .set(data)
      .where(eq(users.id, req.auth!.userId))
      .returning()

    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    res.status(200).json({
      user,
      message: 'Your account has been updated'
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const changeAvatar: RequestHandler = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'No file provided' })
      return
    }

    const uploaded = await uploadImage(
      `avatars/${req.auth!.userId}/${req.file.originalname}`,
      req.file.buffer
    )
    if (!uploaded) {
      res.status(500).json({ message: 'Error uploading image' })
      return
    }
    const [user] = await db
      .update(users)
      .set({
        avatar: uploaded
      })
      .where(eq(users.id, req.auth!.userId))
      .returning()

    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    res.status(200).json({
      user,
      message: 'Your avatar has been updated'
    })
  } catch (error) {
    next(error)
  }
}

const sendResetPasswordMail: RequestHandler = async (req, res) => {
  const { email } = req.body

  // style email
  const mailOptions = (token: number) => ({
    from: 'Watch it',
    to: req.body.email,
    subject: 'Reset your password',
    text: 'Here is a link to reset your password',
    html: `<div style="text-align:center;">
    <h1 style="font-family:'Tahoma', sans-serif;">Here is your code</h1>
  <div style='display:inline-block;background-color:lightgray;padding:10px;'>
    <h1 style="padding:10px;background-color:white;font-family:'Tahoma',sans-serif;">${token}</h1>
    <p style="font-family:'Tahoma', sans-serif;">This code is valid for 10 minutes</p>
  </div>
    </div>`
  })

  try {
    const [user] = await db.select().from(users).where(eq(users.email, email))
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    const token = generateSixDigitNumber()
    const now = new Date()
    const expires = now.getTime() + 10 * 60 * 1000 // 10 minutes

    await db
      .update(users)
      .set({
        resetPasswordToken: token.toString(),
        resetPasswordExpires: expires.toString()
      })
      .where(eq(users.id, user.id))
      .returning()

    await transporter.sendMail(mailOptions(token))
    res.json({
      email,
      message: 'The mail has been sent. Check your inbox!',
      code: token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error sending email' })
  }
}

const verifyResetCode: RequestHandler = async (req, res) => {
  try {
    const { code } = req.params
    const { email } = req.body
    const [user] = await db.select().from(users).where(eq(users.email, email))
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }
    const now = new Date()
    const expires = parseInt(user.resetPasswordExpires!)
    const token = parseInt(user.resetPasswordToken!)
    if (now.getTime() > expires) {
      res.status(400).json({ message: 'Code expired' })
      return
    }
    if (token !== parseInt(code)) {
      res.status(400).json({ message: 'Code is incorrect' })
      return
    }
    res.json({ message: 'Code is correct' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error verifying code' })
  }
}

const resetPassword: RequestHandler = async (req, res) => {
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, req.body.email))
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }
    const hashedPassword = await hashPassword(req.body.password)
    const [updatedUser] = await db
      .update(users)
      .set({
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null
      })
      .where(eq(users.id, user.id))
      .returning()

    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' })
      return
    }
    res.status(200).json({
      updatedUser,
      message: 'Your password has been reset'
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error resetting password' })
  }
}

export {
  register,
  login,
  getUser,
  changeAvatar,
  sendResetPasswordMail,
  resetPassword,
  verifyResetCode,
  updateUser
}
