import express from 'express';
import { getProducts, getProductById } from '../managers/productManager.js';

const router = express.Router();

router.get('/products', async (req, res) => {
  const { page = 1, limit = 10, sort = 'asc', query = '' } = req.query;

  const result = await getProducts({ limit, page, sort, query });

  res.json({
    status: 'success',
    payload: result.products,
    totalPages: result.totalPages,
    prevPage: result.page - 1,
    nextPage: result.page + 1,
    page: result.page,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage,
    prevLink: result.hasPrevPage ? `/products?page=${result.page - 1}&limit=${limit}&sort=${sort}&query=${query}` : null,
    nextLink: result.hasNextPage ? `/products?page=${result.page + 1}&limit=${limit}&sort=${sort}&query=${query}` : null,
  });
});

router.get('/products/:pid', async (req, res) => {
  const productId = req.params.pid;
  const product = await getProductById(productId);

  if (product) {
    res.render('productDetail', { product });
  } else {
    res.status(404).json({ status: 'error', message: 'Product not found' });
  }
});

export default router;
