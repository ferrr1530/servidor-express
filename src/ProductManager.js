const fs = require('fs').promises;

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.loadProducts();
    }

    async loadProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf8');
            this.products = JSON.parse(data) || [];
        } catch (error) {
            this.products = [];
        }
    }

    async saveProducts() {
        await fs.writeFile(this.path, JSON.stringify(this.products), 'utf8');
    }

    getProducts() {
        return this.products;
    }

    getProductById(pid) {
        const product = this.products.find(prod => prod.id === pid);
        return product || "Producto no encontrado";
    }
}

module.exports = ProductManager;