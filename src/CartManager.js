const Cart = require('../models/CartModel');

class CartManager {
    async loadCarts() {
        try {
            this.carts = await Cart.find();
        } catch (error) {
            this.carts = [];
        }
    }

    async saveCarts() {
        try {
            // Verificamos si hay carritos para guardar
            if (this.carts && this.carts.length > 0) {
                // Recorremos cada carrito y lo guardamos en la base de datos
                await Promise.all(this.carts.map(async (cart) => {
                    // Buscamos el carrito en la base de datos por su ID
                    const existingCart = await Cart.findById(cart._id);
                    
                    // Si existe, actualizamos el carrito con los nuevos productos
                    if (existingCart) {
                        existingCart.products = cart.products;
                        await existingCart.save();
                    } else {
                        // Si no existe, creamos un nuevo carrito en la base de datos
                        await Cart.create(cart);
                    }
                }));
            }
        } catch (error) {
            console.error('Error al guardar los carritos:', error);
        }
    }

    async getCarts() {
        try {
            return await Cart.find();
        } catch (error) {
            return [];
        }
    }

    async getCartById(cid) {
        try {
            return await Cart.findById(cid);
        } catch (error) {
            return null;
        }
    }

    async updateCart(cartId, products) {
        try {
            const cart = await Cart.findById(cartId);
            if (cart) {
                cart.products = products;
                await cart.save();
                return cart;
            }
            return null;
        } catch (error) {
            console.error('Error al actualizar el carrito:', error);
            return null;
        }
    }

    async addProductToCart(cartId, product) {
        try {
            const cart = await Cart.findById(cartId);
            if (cart) {
                cart.products.push(product);
                await cart.save();
                return cart;
            }
            return null;
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
            return null;
        }
    }

    async removeProductFromCart(cartId, productId) {
        try {
            const cart = await Cart.findById(cartId);
            if (cart) {
                cart.products = cart.products.filter(product => product._id.toString() !== productId);
                await cart.save();
                return cart;
            }
            return null;
        } catch (error) {
            console.error('Error al eliminar producto del carrito:', error);
            return null;
        }
    }

    async removeAllProductsFromCart(cartId) {
        try {
            const cart = await Cart.findById(cartId);
            if (cart) {
                cart.products = [];
                await cart.save();
                return cart;
            }
            return null;
        } catch (error) {
            console.error('Error al eliminar todos los productos del carrito:', error);
            return null;
        }
    }
}

module.exports = CartManager;