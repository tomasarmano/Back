const Cart = require('../models/cart.model');

class CartManager {
  async getCartById(id) {
    return await Cart.findById(id).populate('products.product');
  }

  async createCart() {
    return await Cart.create({ products: [] });
  }

  async addProductToCart(cartId, productId, quantity) {
    const cart = await Cart.findById(cartId);
    const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
    
    if (productIndex >= 0) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    return await cart.save();
  }
}

module.exports = new CartManager();
