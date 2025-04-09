import bcrypt from "bcryptjs"
import { RequestHandler } from "express";

// const transporter = require("../config/nodemailer");


const generateSixDigitNumber = ():number => {
  let number = Math.floor(Math.pow(10, 6) * Math.random());

  return number.toString().length < 6 ? generateSixDigitNumber() : number;
};

const register:RequestHandler = async (req, res, next) => {
  // let user = new User(req.body);

  try {
    // await user.save();
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
};

const login:RequestHandler = async (req, res, next) => {
  try {
    const { emailOrUsername, password } = req.body;
    // const user = await User.findOne({
    //   $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    // });
    // if (user) {
    //   const match = await bcrypt.compare(password, user.password);
    //   if (!match) {
    //     throw new Error("Wrong password");
    //   } else {
    //     const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    //     res.json({
    //       token,
    //     });
    //   }
    // } else {
    //   throw new Error("User not found");
    // }
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
};

const getUser:RequestHandler = async (req, res, next) => {
  try {
    // const user = await User.findOne({ _id: req.user._id }, { password: 0 });
    res.json({ user:{} });
  } catch (error) {
    next(error);
  }
};

const updateUser:RequestHandler = async (req, res, next) => {
  try {
    // const user = await User.findByIdAndUpdate(req.user._id, req.body);
    res.json({ user:{}, message: "Your profile has been updated" });
  } catch (error) {
    next(error);
  }
};

const changeAvatar:RequestHandler = async (req, res, next) => {
  try {
    // const user = await User.findOne({ _id: req.user._id }, { password: 0 });
    // if (user) {
    //   user.avatar = req.file.filename;
    // }
    // await user.save();
    res.json({
      avatar: 'req.file.filename',
      message: "Your avatar has been updated",
    });
  } catch (error) {
    next(error);
  }
};

const sendResetPasswordMail:RequestHandler = async (req, res, next) => {
  const { email } = req.body;

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
      res.json({ email, message: "The mail has been sent. Check your inbox!" });
    // } else {
    //   throw new Error("User not found");
    // }
  // } catch (error) {
  //   next(error);
  // }
};

const verifyResetCode:RequestHandler = async (req, res, next) => {
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
  res.json({ message: "Well done. Set your new password" });
};

const resetPassword:RequestHandler = async (req, res, next) => {
  // try {
  //   const user = await User.findOne({ email: req.body.email });

  //   user.password = req.body.password;

  //   await user.save();

  //   res.json({ message: "Your password has been updated" });
  // } catch (error) {
  //   next(error);
  // }
  res.json({ message: "Your password has been updated" });
};

const updatePassword:RequestHandler = async (req, res, next) => {
  // try {
  //   const user = await User.findById(req.user._id);

  //   const validPassword = bcrypt.compareSync(req.body.password, user.password);

  //   if (validPassword) {
  //     user.password = req.body.newPassword;

  //     await user.save();

  //     res.json({ user, message: "Your account has been updated" });
  //   } else {
  //     throw new Error("Wrong old password");
  //   }
  // } catch (error) {
  //   next(error);
  // }
  res.json({ message: "Your account has been updated" });
};

export {
  register,
  login,
  getUser,
  changeAvatar,
  sendResetPasswordMail,
  resetPassword,
  verifyResetCode,
  updateUser,
  updatePassword,
};