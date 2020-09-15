const mongoose = require("mongoose");
var schema = mongoose.Schema;

var bookSchema = new schema({
  title: { type: String, required: true },
  authors: { type: [String], required: true },
  status: {
    required: true,
    type: String,
    enum: ["wishlist", "reading", "read"],
  },
  // ===== GOODREADS ID =====
  id: { required: true, type: String },
  // ===== GOODREADS ID =====
  user: { type: schema.Types.ObjectId, ref: "User" },
  thumbnail: String,
});

module.exports = mongoose.model("Book", bookSchema);
