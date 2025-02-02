import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
  stock: Number,
  thumbnails: [String],
});

const Product = mongoose.model('Product', productSchema);
export default Product;
