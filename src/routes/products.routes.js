const express = require('express');
const router = express.Router();
const ProductManager = require('../dao/managers/productManager');

router.get('/', async (req, res) => {
  const { limit = 10, page = 1, sort, query } = req.query;
  const options = { 
    limit: parseInt(limit), 
    page: parseInt(page), 
    sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {} 
  };

  const products = await ProductManager.getAll(query ? { category: query } : {}, options);
  res.json({ status: 'success', payload: products });
});

router.get('/:id', async (req, res) => {
  const product = await ProductManager.getById(req.params.id);
  res.json(product);
});

router.post('/', async (req, res) => {
  const product = await ProductManager.create(req.body);
  res.json(product);
});

module.exports = router;
