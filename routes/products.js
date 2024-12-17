import express from 'express';
import { readFile, writeFile } from '../utils/fileManager.js';

const router = express.Router();

const PRODUCTS_FILE = 'productos.json';

router.get('/', (req, res) => {
    const products = readFile(PRODUCTS_FILE);
    const limit = parseInt(req.query.limit, 10);

    if (limit && limit > 0) {
        return res.json(products.slice(0, limit));
    }

    res.json(products);
});

router.get('/:pid', (req, res) => {
    const products = readFile(PRODUCTS_FILE);
    const pid = parseInt(req.params.pid, 10);
    const product = products.find((p) => p.id === pid);

    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(product);
});

router.post('/', (req, res) => {
    const products = readFile(PRODUCTS_FILE);
    const { title, description, code, price, status = true, stock, category, thumbnails = [] } = req.body;

    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios, excepto thumbnails.' });
    }

    const newProduct = {
        id: products.length ? products[products.length - 1].id + 1 : 1,
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
    };

    products.push(newProduct);
    writeFile(PRODUCTS_FILE, products);

    res.status(201).json(newProduct);
});

router.put('/:pid', (req, res) => {
    const products = readFile(PRODUCTS_FILE);
    const pid = parseInt(req.params.pid, 10);
    const productIndex = products.findIndex((p) => p.id === pid);

    if (productIndex === -1) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const { id, ...updatedFields } = req.body; 
    products[productIndex] = {
        ...products[productIndex],
        ...updatedFields,
    };

    writeFile(PRODUCTS_FILE, products);

    res.json(products[productIndex]);
});

router.delete('/:pid', (req, res) => {
    const products = readFile(PRODUCTS_FILE);
    const pid = parseInt(req.params.pid, 10);
    const newProducts = products.filter((p) => p.id !== pid);

    if (newProducts.length === products.length) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    writeFile(PRODUCTS_FILE, newProducts);

    res.status(204).send();
});

export default router;