const CartManager = require('../dao/managers/CartManager');

const cartController = {
  getCart: async (req, res) => {
    const { cid } = req.params;

    try {
      const cart = await CartManager.getCart(cid);
      res.status(200).json({ status: 'success', payload: cart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  },

  updateCart: async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;

    try {
      const updatedCart = await CartManager.updateCart(cid, products);
      res.status(200).json({ status: 'success', payload: updatedCart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  },

  updateProductQuantity: async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
      const updatedCart = await CartManager.updateProductQuantity(cid, pid, quantity);
      res.status(200).json({ status: 'success', payload: updatedCart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  },

  deleteProductFromCart: async (req, res) => {
    const { cid, pid } = req.params;

    try {
      const updatedCart = await CartManager.deleteProductFromCart(cid, pid);
      res.status(200).json({ status: 'success', payload: updatedCart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  },

  deleteCart: async (req, res) => {
    const { cid } = req.params;

    try {
      await CartManager.deleteCart(cid);
      res.status(200).json({ status: 'success', message: 'Cart deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  },
};

module.exports = cartController;