import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', { title: 'Bienvenido' });
});

router.get('/products', (req, res) => {
  res.render('index', { title: 'Lista de Productos' });
});

router.get('/products/:pid', (req, res) => {
  res.render('productDetail', { title: 'Detalles del Producto' });
});

router.get('/carts/:cid', (req, res) => {
  res.render('cartDetail', { title: 'Carrito de Compras' });
});

export default router;
