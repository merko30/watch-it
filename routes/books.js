const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  getAllBooks,
  createOrUpdate,
  remove,
  checkBook,
} = require("../controllers/books");

router.get("/", passport.authenticate("jwt", { session: false }), getAllBooks);

router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  createOrUpdate
);

router.get(
  "/exists/:id",
  passport.authenticate("jwt", { session: false }),
  checkBook
);

router.delete("/:id", passport.authenticate("jwt", { session: false }), remove);

module.exports = router;
