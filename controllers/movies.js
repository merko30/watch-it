const fetch = require("node-fetch");

const Movie = require("../models/movie");

const getAll = async (req, res, next) => {
  console.log("in controller");
  let query = { user: req.user._id };

  query = { ...query, ...req.query };

  try {
    const books = await Movie.find(query);
    res.json({ books });
  } catch (error) {
    next(error);
  }
};

const createOrUpdate = async (req, res, next) => {
  console.log(req.body);
  try {
    const movie = await Movie.findOneAndUpdate(
      { id: req.body.id },
      { ...req.body, user: req.user._id },
      { upsert: true, new: true }
    );
    res.json({ movie });
  } catch (error) {
    next(error);
  }
};

const checkMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findOne({
      id: req.params.id,
      user: req.user._id,
    });
    if (movie) {
      res.json({ movieStatus: movie.status });
    } else {
      res.json({ movieStatus: null });
    }
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await Movie.findOneAndDelete({ id: req.params.id });
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
};

const getSingleMovie = async (req, res, next) => {
  try {
    const response = await fetch(
      `${process.env.TMDB_API_BASE_URL}/${req.params.id}?key=${process.env.TMDB_API_KEY}`,
      { method: "GET", mode: "no-cors" }
    );

    const volume = await response.json();

    res.json({ volume });
  } catch (error) {
    next(error);
  }
};

const search = async (req, res, next) => {
  try {
    const response = await fetch(
      `${process.env.TMDB_API_BASE_URL}/search/multi?query=${req.params.term}&api_key=${process.env.TMDB_API_KEY}`,
      { method: "GET", mode: "no-cors" }
    );

    const data = await response.json();

    console.log(data);

    res.json({ data });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  createOrUpdate,
  checkMovie,
  remove,
  search,
  getSingleMovie,
};
