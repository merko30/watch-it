const mongoose = require("mongoose");
var schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

var userSchema = new schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  avatar: { type: String },
  about: { type: String },
  resetPasswordToken: { type: String },
});

userSchema.pre("save", function (next) {
  var user = this;

  if (!user.isModified("password")) return next();

  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) throw err;
    user.password = hash;
    next();
  });
});

module.exports = mongoose.model("User", userSchema);
