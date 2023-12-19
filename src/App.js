const express = require('express');
const ProductManager = require('./ProductManager');
const app = express();
const port = 3000;

const products = new ProductManager('productos.json');

app.get('/products', async (req, res) => {
    try {
        await products.loadProducts();

        const limit = req.query.limit;
        let result;

        if (limit) {
            result = products.getProducts().slice(0, limit);
        } else {
            result = products.getProducts();
        }

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

        if (typeof product === 'object') {
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