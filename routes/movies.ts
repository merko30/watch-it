
import express from "express";
const router = express.Router();

import  {
  getAll,
  createOrUpdate,
  remove,
  checkMovie,
  search,
  getSingleMovie,
} from "../controllers/movies";

router.get("/search/:term", search);

router.get("/", getAll);

router.put(
  "/",
  createOrUpdate
);

router.get(
  "/exists/:id",
  checkMovie
);

router.get(
  "/:type/:id",
  getSingleMovie
);

router.delete("/:id",  remove);

export default router;
