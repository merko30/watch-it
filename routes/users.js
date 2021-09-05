const express = require("express");
const passport = require("passport");
const router = express.Router();

const User = require("../models/user");
const upload = require("../config/multer");

const {
  register,
  login,
  getUser,
  changeAvatar,
  sendResetPasswordMail,
  resetPassword,
  verifyResetCode,
  updateUser,
  updatePassword,
} = require("../controllers/users");

const userExist = async (req, res, next) => {
  const { username, email } = req.body;
  try {
    const count = await User.countDocuments({
      email,
    });
    const countByUsername = await User.countDocuments({
      username,
    });
    if (count) {
      throw new Error("Email is already taken");
    } else if (countByUsername) {
      throw new Error("Username is already taken");
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

router.post("/register", userExist, register);

router.post("/login", login);

router.post("/forgot", sendResetPasswordMail);

router.put("/verify/:code", verifyResetCode);

router.put("/reset", resetPassword);

router.put("/email", userExist, updateUser);

router.put(
  "/password",
  passport.authenticate("jwt", { session: false }),
  updatePassword
);

router.get("/user", passport.authenticate("jwt", { session: false }), getUser);

router.put(
  "/user",
  passport.authenticate("jwt", { session: false }),
  updateUser
);

router.put(
  "/avatar",
  passport.authenticate("jwt", { session: false }),
  upload.single("avatar"),
  changeAvatar
);

module.exports = router;
