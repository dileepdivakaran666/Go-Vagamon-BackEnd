const Cart = require('../Model/cart');
const mongoose = require('mongoose')

const addToCart = async (userId, resortId) => {

    try{
        let cart = await Cart.findOne({ userId });

    if (!cart) {
        cart = new Cart({ userId, resorts: [resortId] });
    } else {
        if (!cart.resorts.includes(resortId)) {
            cart.resorts.push(resortId);
        }
    }

    await cart.save();
    return cart;
    }
    catch(err){
        return err
    }

    
};

const getCart = async (userId) => {
try{
    const cart = await Cart.findOne({ userId }).populate("resorts");
    return cart.resorts
}catch(err){
    return err
}
    
};

const removeFromCart = async (userId, resortId) => {
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new Error("Cart not found");

    const resortObjectId = new mongoose.Types.ObjectId(resortId.toString());
    cart.resorts = cart.resorts.filter(item => !item.equals(resortObjectId));
    await cart.save();
    return cart;
};

const clearCart = async (userId) => {
    return await Cart.findOneAndDelete({ userId });
};

module.exports = { addToCart, getCart, removeFromCart, clearCart };
