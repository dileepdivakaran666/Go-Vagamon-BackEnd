const express = require("express");
const router = express.Router();
const { rateResort, getResortRatings } = require("../Controller/ratingController");
const { authMiddleware } = require("../Middleware/authMiddleware");

router.post("/:resortId/rate", authMiddleware, rateResort);
router.get("/:resortId", getResortRatings);

module.exports = router;
