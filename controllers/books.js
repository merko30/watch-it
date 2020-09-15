const fetch = require("node-fetch");
const xml2js = require("xml2js");

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
      `${process.env.GOODREADS_API_BASE_URL}/book/show/${req.params.id}?key=${process.env.GOODREADS_API_KEY}`,
      { method: "GET", mode: "no-cors" }
    );

    const xml = await response.text();

    xml2js.parseString(
      xml,
      { trim: true, explicitArray: false, ignoreAttrs: true },
      (err, data) => {
        if (err) {
          throw new Error("Something went wrong");
        }

        const response = data.GoodreadsResponse.book;
        Object.entries(response.authors).map((t) => {
          if (Array.isArray(t[1])) {
            response.authors = [...t[1]];
          } else {
            response.authors = [t[1]];
          }
        });
        res.json(response);
      }
    );
  } catch (error) {
    next(error);
  }
};

const search = async (req, res, next) => {
  try {
    const response = await fetch(
      `${process.env.GOODREADS_API_BASE_URL}/search/index.xml?&q=${req.params.term}&key=${process.env.GOODREADS_API_KEY}`,
      { method: "GET", mode: "no-cors" }
    );

    const xml = await response.text();

    xml2js.parseString(
      xml,
      { explicitArray: false, normalize: true, ignoreAttrs: true },
      (err, data) => {
        if (err) {
          throw new Error("Something went wrong");
        }
        const response = data.GoodreadsResponse.search.results.work.map(
          ({ best_book, ...rest }) => ({
            ...rest,
            ...best_book,
          })
        );

        res.json(response);
      }
    );
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
