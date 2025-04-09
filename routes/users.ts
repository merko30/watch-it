import express from 'express'
const router = express.Router()

// const upload = require("../config/multer");

import {
  register,
  login,
  getUser,
  changeAvatar,
  sendResetPasswordMail,
  resetPassword,
  verifyResetCode,
  updateUser
} from '../controllers/users'

router.post('/register', register)

router.post('/login', login)

router.route('/user').get(getUser).put(updateUser)

router.post('/forgot', sendResetPasswordMail)

router.put('/verify/:code', verifyResetCode)

router.put('/reset', resetPassword)

router.put('/email', updateUser)

router.put(
  '/avatar',
  // upload.single("avatar"),
  changeAvatar
)

export default router
