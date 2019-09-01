const express = require("express");
const passport = require("passport");
const router = express.Router();

const { getAllBooks, create, update, remove } = require("../controllers/books");

router.get("/", passport.authenticate("jwt", { session: false }), getAllBooks);

router.post("/", passport.authenticate("jwt", { session: false }), create);

router.put("/:id", passport.authenticate("jwt", { session: false }), update);

router.delete("/:id", passport.authenticate("jwt", { session: false }), remove);

module.exports = router;
