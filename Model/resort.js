const mongoose = require('mongoose');

const ResortSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  photos: [{ type: String }], // Array of photo URLs
  videos: [{type: String}], //Array of vido Url
  amenities: [{ type: String }], // Array of amenities
  price: { type: Number, required: true }, // Price per night
  averageRating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Resort', ResortSchema);