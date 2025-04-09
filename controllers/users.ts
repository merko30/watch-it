import bcrypt from 'bcryptjs'
import { eq, or } from 'drizzle-orm'
import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'

import { db } from '../db'
import { users } from '../db/schema'

// const transporter = require("../config/nodemailer");

// const generateSixDigitNumber = (): number => {
//   const number = Math.floor(Math.pow(10, 6) * Math.random())

//   return number.toString().length < 6 ? generateSixDigitNumber() : number
// }

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
    const data = { ...req.body }

    if ('password' in data) {
      const hashedPassword = await hashPassword(data.password)
      data.password = hashedPassword
    }

    const [user] = await db
      .update(users)
      .set(data)
      .where(eq(users.id, req.auth!.userId))
      .returning()

    if (!user) {
      res.status(404).json({ message: 'User not found' })
    }

    res.json({
      user,
      message: 'Your account has been updated'
    })
  } catch (error) {
    next(error)
  }
}

const changeAvatar: RequestHandler = async (req, res, next) => {
  try {
    // const user = await User.findOne({ _id: req.user._id }, { password: 0 });
    // if (user) {
    //   user.avatar = req.file.filename;
    // }
    // await user.save();
    res.json({
      avatar: 'req.file.filename',
      message: 'Your avatar has been updated'
    })
  } catch (error) {
    next(error)
  }
}

const sendResetPasswordMail: RequestHandler = async (req, res) => {
  const { email } = req.body

  // var mailOptions = (token) => ({
  //   from: "Booker",
  //   to: req.body.email,
  //   subject: "Reset your password",
  //   text: "Here is a link to reset your password",
  //   html: `<div style="text-align:center;">
  //   <h1 style="font-family:'Tahoma', sans-serif;">Here is your code</h1>
  // <div style='display:inline-block;background-color:lightgray;padding:10px;'>
  //   <h1 style="padding:10px;background-color:white;font-family:'Tahoma',sans-serif;">${token}</h1>
  // </div>
  //   </div>`,
  // });

  // try {
  //   const user = await User.findOne({ email });
  //   if (user) {
  //     const token = generateSixDigitNumber();
  //     await transporter.sendMail(mailOptions(token));
  //     user.resetPasswordToken = token;
  //     await user.save();
  res.json({ email, message: 'The mail has been sent. Check your inbox!' })
  // } else {
  //   throw new Error("User not found");
  // }
  // } catch (error) {
  //   next(error);
  // }
}

const verifyResetCode: RequestHandler = async (req, res) => {
  // try {
  //   const user = await User.findOne({ email: req.body.email });

  //   if (user.resetPasswordToken !== req.params.code) {
  //     throw new Error("Wrong code or it's expired.");
  //   }

  //   user.resetPasswordToken = null;

  //   await user.save();

  //   res.json({ message: "Well done. Set your new password" });
  // } catch (error) {
  //   next(error);
  // }
  res.json({ message: 'Well done. Set your new password' })
}

const resetPassword: RequestHandler = async (req, res) => {
  // try {
  //   const user = await User.findOne({ email: req.body.email });

  //   user.password = req.body.password;

  //   await user.save();

  //   res.json({ message: "Your password has been updated" });
  // } catch (error) {
  //   next(error);
  // }
  res.json({ message: 'Your password has been updated' })
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
