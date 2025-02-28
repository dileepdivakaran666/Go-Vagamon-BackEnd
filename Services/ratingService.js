const Rating = require("../Model/rating");
const Resort = require("../Model/resort");

// Add or update a rating
exports.addOrUpdateRating = async (userId, username, resortId, rating, comment) => {
  if (rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  let userRating = await Rating.findOne({ user: userId, resort: resortId });

  if (userRating) {
    userRating.rating = rating;
    userRating.comment = comment;
  } else {
    userRating = new Rating({ user: userId,username, resort: resortId, rating, comment });
  }

  await userRating.save();

  // Recalculate average rating for the resort
  const ratings = await Rating.find({ resort: resortId });
  const totalRatings = ratings.length;
  const averageRating = ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings;
  await Resort.findByIdAndUpdate(resortId, { averageRating });

  return userRating;
};

// Get all ratings for a specific resort
exports.getRatingsForResort = async (resortId) => {
  return await Rating.find({ resort: resortId }).populate("user", "name");
};
