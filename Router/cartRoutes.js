const express = require("express");
const router = express.Router();
const {addToCart, getCart, removeFromCart, clearCart} = require('../Controller/cartController')
const {authMiddleware} = require("../Middleware/authMiddleware"); // Ensure user is logged in

router.post("/add", authMiddleware, addToCart);
router.get("/", authMiddleware, getCart);
router.delete("/remove/:resortId", authMiddleware, removeFromCart);
router.delete("/clear", authMiddleware, clearCart);

module.exports = router;
