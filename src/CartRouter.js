const express = require('express');
const CartManager = require('./CartManager');

const cartRouter = express.Router();
const carts = new CartManager('carrito.json'); // Ajusta el nombre del archivo según tu configuración

cartRouter.post('/', async (req, res) => {
    try {
        await carts.loadCarts();

        const newCart = {
            id: carts.getCarts().length + 1,
            products: [],
        };

        carts.getCarts().push(newCart);
        await carts.saveCarts();

        res.json({ message: 'Carrito creado', cart: newCart });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el carrito' });
    }
});

cartRouter.get('/:cid', async (req, res) => {
    try {
        await carts.loadCarts();

        const cid = parseInt(req.params.cid);
        const cart = carts.getCartById(cid);

        if (cart) {
            res.json({ cart });
        } else {
            res.status(404).json({ error: 'Carrito no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al cargar el carrito' });
    }
});

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        await carts.loadCarts();

        const cid = parseInt(req.params.cid);
        const pid = parseInt(req.params.pid);

        const cartIndex = carts.getCarts().findIndex(cart => cart.id === cid);
        if (cartIndex !== -1) {
            const existingProductIndex = carts.getCarts()[cartIndex].products.findIndex(prod => prod.product === pid);

            if (existingProductIndex !== -1) {
                // Si el producto ya existe, incrementar la cantidad
                carts.getCarts()[cartIndex].products[existingProductIndex].quantity += 1;
            } else {
                // Si el producto no existe, agregarlo al carrito
                carts.getCarts()[cartIndex].products.push({ product: pid, quantity: 1 });
            }

            await carts.saveCarts();
            res.json({ message: 'Producto agregado al carrito', cart: carts.getCarts()[cartIndex] });
        } else {
            res.status(404).json({ error: 'Carrito no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el producto al carrito' });
    }
});

module.exports = cartRouter;