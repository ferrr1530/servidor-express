const express = require('express');
const ProductManager = require('./ProductManager');
const app = express();
const port = 3000;

const products = new ProductManager('productos.json');

app.get('/products', async (req, res) => {
    try {
        await products.loadProducts();

        const limit = req.query.limit;
        const result = limit ? products.getProducts().slice(0, limit) : products.getProducts();

        res.json({ products: result });
    } catch (error) {
        res.status(500).json({ error: 'Error al cargar los productos' });
    }
});

app.get('/products/:pid', async (req, res) => {
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

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});