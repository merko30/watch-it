var express = require("express");
var router = express.Router();

var users = require("./users");
var book = require("./books");

router.use("/auth", users);
router.use("/books", book);

module.exports = router;
