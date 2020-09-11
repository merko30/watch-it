const fetch = require("node-fetch");

const Book = require("../models/book");

const getAllBooks = async (req, res, next) => {
  let query = { reader: req.user._id };

  query = { ...query, ...req.query };

  try {
    const books = await Book.find(query);
    res.json({ books });
  } catch (error) {
    next(error);
  }
};

const createOrUpdate = async (req, res, next) => {
  try {
    const book = await Book.findOneAndUpdate(
      { bookId: req.body.bookId },
      { ...req.body, reader: req.user._id },
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
      bookId: req.params.id,
      reader: req.user._id,
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
    await Book.findOneAndDelete({ bookId: req.params.id });
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
};

const getSingleBook = async (req, res, next) => {
  try {
    const book = await (
      await fetch(
        `${process.env.GOOGLE_BOOKS_API_BASE_URL}/${req.params.id}?key=${process.env.GOOGLE_BOOKS_API_KEY}`,
        { method: "GET" }
      )
    ).json();
    res.json({ book });
  } catch (error) {
    next(error);
  }
};

const search = async (req, res, next) => {
  try {
    const response = await fetch(
      `${process.env.GOOGLE_BOOKS_API_BASE_URL}?key=${process.env.GOOGLE_BOOKS_API_KEY}&projection=full&q=${req.params.term}`,
      { method: "GET" }
    );

    if (response.status === 200) {
      const books = await response.json();
      res.json({ books });
    } else {
      throw new Error("Something went wrong");
    }
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
