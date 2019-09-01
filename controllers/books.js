const Book = require("../models/book");

const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find({ reader: req.user._id });
    res.json({ books });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const { title, authors, status, bookId } = req.body;
  const book = new Book({
    title,
    authors,
    status,
    bookId,
    reader: req.user._id
  });
  try {
    await book.save();
    res.json({ book });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const book = await Book.findOne({ _id: req.params.id });
    book.status = req.body.status;
    await book.save();
    res.json(book);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await Book.findOneAndDelete({ _id: req.params.id });
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBooks,
  create,
  update,
  remove
};
