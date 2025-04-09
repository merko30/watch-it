import express from "express";
const router = express.Router();

import users from "./users";
import movies from "./movies";

router.use("/auth", users);
router.use("/movies", movies);

export default router;
