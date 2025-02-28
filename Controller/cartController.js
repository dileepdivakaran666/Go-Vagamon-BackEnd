const cartService = require('../Services/cartService')

const addToCart = async (req, res) => {
    try {
        const { resortId } = req.body;
        const userId = req.user.id; // Extracted from JWT
        await cartService.addToCart(userId, resortId);
        res.status(200).json({ message: "Item added to cart" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await cartService.getCart(userId);
    
        if (!cart) {
            return res.status(200).json({ message: "Cart is empty", resorts: [] });
        }

        const allCart = cart.map((item)=>({
            ...item._doc,
            photos: item.photos[0]=`${process.env.BASE_URL}/uploads/${item.photos[0]}`
        }))

        res.status(200).json(allCart || { message: "Cart is empty" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { resortId } = req.params;
        const userId = req.user.id;
        const cart = await cartService.removeFromCart(userId, resortId);
        res.status(200).json({ message: "Item removed from cart", cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;
        await cartService.clearCart(userId);
        res.status(200).json({ message: "Cart cleared successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addToCart, getCart, removeFromCart, clearCart };
