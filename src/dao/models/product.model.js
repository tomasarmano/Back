const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
  stock: Number,
  thumbnails: [String]
});

module.exports = mongoose.model('Product', productSchema);