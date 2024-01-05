const express = require('express');
const ProductManager = require('./ProductManager');

const productRouter = express.Router();
const products = new ProductManager('productos.json'); // Ajusta el nombre del archivo según tu configuración

productRouter.get('/', async (req, res) => {
    try {
        await products.loadProducts();

        const limit = req.query.limit;
        const result = limit ? products.getProducts().slice(0, limit) : products.getProducts();

        res.json({ products: result });
    } catch (error) {
        res.status(500).json({ error: 'Error al cargar los productos' });
    }
});

productRouter.get('/:pid', async (req, res) => {
    try {
        await products.loadProducts();

        const pid = parseInt(req.params.pid);
        const product = products.getProductById(pid);

        if (product) {
            res.json({ product });
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al cargar los productos' });
    }
});

productRouter.post('/', async (req, res) => {
    try {
        await products.loadProducts();

        const newProduct = {
            id: products.getProducts().length + 1,
            ...req.body,
            status: true,
        };

        products.getProducts().push(newProduct);
        await products.saveProducts();

        res.json({ message: 'Producto agregado', product: newProduct });
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el producto' });
    }
});

productRouter.put('/:pid', async (req, res) => {
    try {
        await products.loadProducts();

        const pid = parseInt(req.params.pid);
        const productIndex = products.getProducts().findIndex(prod => prod.id === pid);

        if (productIndex !== -1) {
            products.getProducts()[productIndex] = {
                ...products.getProducts()[productIndex],
                ...req.body,
                id: pid, // No se debe actualizar el ID
            };

            await products.saveProducts();
            res.json({ message: 'Producto actualizado', product: products.getProducts()[productIndex] });
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
});

productRouter.delete('/:pid', async (req, res) => {
    try {
        await products.loadProducts();

        const pid = parseInt(req.params.pid);
        const updatedProducts = products.getProducts().filter(prod => prod.id !== pid);

        if (updatedProducts.length < products.getProducts().length) {
            products.getProducts() = updatedProducts;
            await products.saveProducts();
            res.json({ message: 'Producto eliminado' });
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});

module.exports = productRouter;