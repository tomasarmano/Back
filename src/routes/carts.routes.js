const express = require('express');
const router = express.Router();
const CartManager = require('../dao/managers/cartManager');

router.get('/:cid', async (req, res) => {
  const cart = await CartManager.getCartById(req.params.cid);
  res.json(cart);
});

router.post('/', async (req, res) => {
  const cart = await CartManager.createCart();
  res.json(cart);
});

router.post('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  const cart = await CartManager.addProductToCart(cid, pid, quantity);
  res.json(cart);
});

module.exports = router;
