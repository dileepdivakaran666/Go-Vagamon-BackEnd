const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
  resort: { type: mongoose.Schema.Types.ObjectId, ref: "Resort", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, trim: true }, // Optional review comment
}, { timestamps: true });

module.exports = mongoose.model("Rating", ratingSchema);
