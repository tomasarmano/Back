import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';

export const addProductToCart = async (cartId, productId, quantity) => {
  const cart = await Cart.findById(cartId);
  const product = await Product.findById(productId);

  if (!cart || !product) {
    throw new Error('Cart or Product not found');
  }

  const existingProductIndex = cart.products.findIndex(p => p.product.toString() === productId);
  if (existingProductIndex !== -1) {
    cart.products[existingProductIndex].quantity += quantity;
  } else {
    cart.products.push({ product: productId, quantity });
  }

  await cart.save();
  return cart;
};

export const removeProductFromCart = async (cartId, productId) => {
  const cart = await Cart.findById(cartId);
  if (!cart) throw new Error('Cart not found');

  cart.products = cart.products.filter(product => product.product.toString() !== productId);
  await cart.save();

  return cart;
};

export const updateProductQuantityInCart = async (cartId, productId, quantity) => {
  const cart = await Cart.findById(cartId);
  if (!cart) throw new Error('Cart not found');

  const productIndex = cart.products.findIndex(product => product.product.toString() === productId);
  if (productIndex === -1) throw new Error('Product not found in cart');

  cart.products[productIndex].quantity = quantity;
  await cart.save();

  return cart;
};

export const removeAllProductsFromCart = async (cartId) => {
  const cart = await Cart.findById(cartId);
  if (!cart) throw new Error('Cart not found');

  cart.products = [];
  await cart.save();

  return cart;
};
