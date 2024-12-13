const express = require('express');
const { readFile, writeFile } = require('../utils/fileManager');
const router = express.Router();

const CARTS_FILE = 'carrito.json';
const PRODUCTS_FILE = 'productos.json';

router.post('/', (req, res) => {
    const carts = readFile(CARTS_FILE);
    const newCart = {
        id: carts.length ? carts[carts.length - 1].id + 1 : 1,
        products: [],
    };

    carts.push(newCart);
    writeFile(CARTS_FILE, carts);

    res.status(201).json(newCart);
});

router.get('/:cid', (req, res) => {
    const carts = readFile(CARTS_FILE);
    const cid = parseInt(req.params.cid, 10);
    const cart = carts.find((c) => c.id === cid);

    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    res.json(cart.products);
});

router.post('/:cid/product/:pid', (req, res) => {
    const carts = readFile(CARTS_FILE);
    const products = readFile(PRODUCTS_FILE);
    const cid = parseInt(req.params.cid, 10);
    const pid = parseInt(req.params.pid, 10);

    const cart = carts.find((c) => c.id === cid);
    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const productExists = products.some((p) => p.id === pid);
    if (!productExists) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const productInCart = cart.products.find((p) => p.product === pid);

    if (productInCart) {
        productInCart.quantity += 1;
    } else {
        cart.products.push({ product: pid, quantity: 1 });
    }

    writeFile(CARTS_FILE, carts);

    res.status(201).json(cart);
});

module.exports = router;
