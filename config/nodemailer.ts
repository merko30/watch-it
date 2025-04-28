import nodemailer from 'nodemailer'

const { SMTP_USER, SMTP_PASSWORD, SMTP_PORT, SMTP_HOST } = process.env

if (!SMTP_USER || !SMTP_PASSWORD || !SMTP_PORT || !SMTP_HOST) {
  throw new Error('SMTP configuration is missing')
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: SMTP_USER, // generated ethereal user
    pass: SMTP_PASSWORD // generated ethereal password
  }
} as nodemailer.TransportOptions)

export default transporter
