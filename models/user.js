const mongoose = require("mongoose");
var schema = mongoose.Schema;
const bcrypt = require("bcrypt");

var userSchema = new schema({
    name: { type: String },
    email: { type: String, unique: true, required: true },
    avatar: { type: String },
    password: { type: String, required: true },
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
