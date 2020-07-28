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
  socialLogin,
} = require("../controllers/users");

const userExist = async (req, res, next) => {
  try {
    const count = await User.count({
      email: req.body.email,
    });
    if (count > 0) {
      throw new Error("Email is already taken");
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

router.post("/register", upload.single("avatar"), userExist, register);

router.post("/login", login);

router.post("/social-login", socialLogin);

router.get(
  "/users/profile",
  passport.authenticate("jwt", { session: false }),
  getUser
);

router.patch(
  "/users/avatar",
  upload.single("avatar"),
  passport.authenticate("jwt", { session: false }),
  changeAvatar
);

module.exports = router;
