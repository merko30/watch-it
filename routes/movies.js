const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  getAll,
  createOrUpdate,
  remove,
  checkMovie,
  search,
  getSingleMovie,
} = require("../controllers/movies");

router.get("/", passport.authenticate("jwt", { session: false }), getAll);

router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  createOrUpdate
);

router.get(
  "/exists/:id",
  passport.authenticate("jwt", { session: false }),
  checkMovie
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getSingleMovie
);

router.get(
  `/search/:term`,
  passport.authenticate("jwt", { session: false }),
  search
);

router.delete("/:id", passport.authenticate("jwt", { session: false }), remove);

module.exports = router;
