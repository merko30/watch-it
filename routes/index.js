var express = require("express");
var router = express.Router();

var users = require("./users");
var movies = require("./movies");

router.use("/auth", users);
router.use("/movies", movies);

module.exports = router;
