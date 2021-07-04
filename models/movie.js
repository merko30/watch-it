const mongoose = require("mongoose");
var schema = mongoose.Schema;

var movieSchema = new schema({
  title: { type: String, required: true },
  poster_path: { type: String, required: true },
  status: {
    required: true,
    type: String,
    enum: ["wishlist", "watching", "watched", "watch-again"],
  },
  // ===== TMDB MOVIE/SHOW ID =====
  id: { required: true, type: String },
  // ===== TMDB MOVIE/SHOW ID =====
  user: { type: schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Movie", movieSchema);
