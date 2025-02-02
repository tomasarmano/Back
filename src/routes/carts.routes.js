import express from 'express';
import { addProductToCart, removeProductFromCart, updateProductQuantityInCart, removeAllProductsFromCart } from '../dao/managers/cartManager.js';

const router = express.Router();

router.put('/carts/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const updatedCart = await addProductToCart(cid, pid, quantity);
    res.json({ status: 'success', payload: updatedCart });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

router.delete('/carts/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;

  try {
    const updatedCart = await removeProductFromCart(cid, pid);
    res.json({ status: 'success', payload: updatedCart });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

router.put('/carts/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const updatedCart = await updateProductQuantityInCart(cid, pid, quantity);
    res.json({ status: 'success', payload: updatedCart });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

router.delete('/carts/:cid', async (req, res) => {
  const { cid } = req.params;

  try {
    const updatedCart = await removeAllProductsFromCart(cid);
    res.json({ status: 'success', payload: updatedCart });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

export default router;


