import express from 'express';
import { getProducts } from '../dao/managers/productManager.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', { title: 'Bienvenido' }); 
});

router.get('/products', async (req, res) => {
  const { page, limit, sort, query } = req.query;
  const { products, totalPages, page: currentPage, hasPrevPage, hasNextPage } = await getProducts({ limit, page, sort, query });
  res.render('index', { 
    products, 
    totalPages, 
    page: currentPage, 
    hasPrevPage, 
    hasNextPage, 
    prevPage: currentPage - 1, 
    nextPage: currentPage + 1,
    limit, 
    sort, 
    query 
  });
});

router.get('/products/:pid', async (req, res) => {
  const productId = req.params.pid;
  const product = await getProductById(productId);
  if (product) {
    res.render('productDetail', { product });
  } else {
    res.status(404).send('Product not found');
  }
});


export default router;
