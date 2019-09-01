const mongoose = require("mongoose");
var schema = mongoose.Schema;

var bookSchema = new schema({
  title: String,
  authors: [String],
  status: {
    type: String,
    enum: ["wishlist", "reading", "read"]
  },
  bookId: String,
  // bookId is id from Google books API
  reader: String
});

module.exports = mongoose.model("Book", bookSchema);
