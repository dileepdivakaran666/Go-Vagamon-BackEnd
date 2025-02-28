const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    resorts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Resort" }] // Array of resort IDs
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);
