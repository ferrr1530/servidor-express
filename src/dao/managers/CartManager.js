const CartModel = require('../models/CartModel');

class CartManager {
  async addCart(cartData) {
    try {
      const newCart = new CartModel(cartData);
      const savedCart = await newCart.save();
      return savedCart;
    } catch (error) {
      throw new Error('Error adding cart');
    }
  }

  async getCartById(cartId) {
    try {
      const cart = await CartModel.findById(cartId);
      return cart;
    } catch (error) {
      throw new Error('Error getting cart by ID');
    }
  }

}

module.exports = CartManager;
