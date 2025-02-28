const ratingService = require("../Services/ratingService");

// Add or update a rating
exports.rateResort = async (req, res) => {
  try {
    const { resortId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id;
    const username = req.user.username;

    const userRating = await ratingService.addOrUpdateRating(userId,username, resortId, rating, comment);
    
    res.status(200).json({ message: "Rating submitted successfully", rating: userRating });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get ratings for a resort
exports.getResortRatings = async (req, res) => {
  try {
    const { resortId } = req.params;
    const ratings = await ratingService.getRatingsForResort(resortId);
    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
