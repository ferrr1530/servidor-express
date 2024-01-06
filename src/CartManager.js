const fs = require('fs/promises');

class CartManager {
    constructor(filePath) {
        this.filePath = filePath;
        this.carts = [];
    }

    async loadCarts() {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            this.carts = JSON.parse(data);
        } catch (error) {
            this.carts = [];
        }
    }

    async saveCarts() {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(this.carts, null, 2));
        } catch (error) {
            console.error('Error al guardar los carritos:', error);
        }
    }

    getCarts() {
        return this.carts;
    }

    getCartById(cid) {
        return this.carts.find(cart => cart.id === cid);
    }
}

module.exports = CartManager;