const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  let user = new User({
    name,
    email,
    password
  });

  if (req.file) {
    user.avatar = req.file.filename;
  }

  try {
    await user.save();
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        throw new Error("Wrong password");
      } else {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.json({
          token
        });
      }
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id }, { password: 0 });
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

const changeAvatar = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id }, { password: 0 });
    if (user) {
      user.avatar = req.file.filename;
    }
    await user.save();
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

const socialLogin = async (req,res,next) => {
  
}

module.exports = {
  register,
  login,
  getUser,
  changeAvatar,
  socialLogin
};
