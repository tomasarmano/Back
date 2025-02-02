const express = require('express');
const router = express.Router();

router.get('/products', (req, res) => {
  res.render('index', { title: 'Lista de Productos' });
});

router.get('/products/:pid', (req, res) => {
  res.render('productDetail', { title: 'Detalles del Producto' });
});

router.get('/carts/:cid', (req, res) => {
  res.render('cartDetail', { title: 'Carrito de Compras' });
});

module.exports = router;
