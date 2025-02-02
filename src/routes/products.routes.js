import express from 'express';
import { getProducts, getProductById } from '../dao/managers/productManager.js';

const router = express.Router();

router.get('/products', async (req, res) => {
  const { page = 1, limit = 10, sort = 'asc', query = '' } = req.query;
  try {
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
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.get('/products/:pid', async (req, res) => {
  const productId = req.params.pid;
  try {
    const product = await getProductById(productId);
    if (product) {
      res.render('productDetail', { product });
    } else {
      res.status(404).json({ status: 'error', message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;
