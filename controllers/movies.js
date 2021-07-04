const fetch = require("node-fetch");

const Book = require("../models/book");

const getAllBooks = async (req, res, next) => {
  let query = { user: req.user._id };

  query = { ...query, ...req.query };

  try {
    const books = await Book.find(query);
    res.json({ books });
  } catch (error) {
    next(error);
  }
};

const createOrUpdate = async (req, res, next) => {
  console.log(req.body);
  try {
    const book = await Book.findOneAndUpdate(
      { id: req.body.id },
      { ...req.body, user: req.user._id },
      { upsert: true, new: true }
    );
    res.json({ book });
  } catch (error) {
    next(error);
  }
};

const checkBook = async (req, res, next) => {
  try {
    const book = await Book.findOne({
      id: req.params.id,
      user: req.user._id,
    });
    if (book) {
      res.json({ bookStatus: book.status });
    } else {
      res.json({ bookStatus: null });
    }
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await Book.findOneAndDelete({ id: req.params.id });
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
};

const getSingleBook = async (req, res, next) => {
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
  getAllBooks,
  createOrUpdate,
  checkBook,
  remove,
  search,
  getSingleBook,
};
