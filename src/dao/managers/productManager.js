const Product = require('../models/product.model');

class ProductManager {
  async getAll(query = {}, options = {}) {
    return await Product.find(query)
      .limit(options.limit || 10)
      .skip((options.page - 1) * options.limit)
      .sort(options.sort);
  }

  async getById(id) {
    return await Product.findById(id);
  }

  async create(productData) {
    return await Product.create(productData);
  }

  async update(id, productData) {
    return await Product.findByIdAndUpdate(id, productData, { new: true });
  }

  async delete(id) {
    return await Product.findByIdAndDelete(id);
  }
}

module.exports = new ProductManager();
