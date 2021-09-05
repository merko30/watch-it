const nodemailer = require("nodemailer");

const { SMTP_USER, SMTP_PASSWORD, SMTP_PORT, SMTP_HOST } = process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: SMTP_USER, // generated ethereal user
    pass: SMTP_PASSWORD, // generated ethereal password
  },
});

module.exports = transporter;
