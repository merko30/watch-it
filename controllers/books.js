const Book = require("../models/book");

const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find({ reader: req.user._id });
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
  console.log(req.params.id);
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

module.exports = {
  getAllBooks,
  createOrUpdate,
  checkBook,
  remove,
};
