import Product from '../models/product.js';

export const getProducts = async ({ limit = 10, page = 1, sort = 'asc', query = '' }) => {
  const filters = query ? { category: query } : {};  
  const sortOrder = sort === 'asc' ? 1 : -1;

  const products = await Product.find(filters)
    .sort({ price: sortOrder })
    .limit(Number(limit))  
    .skip((Number(page) - 1) * Number(limit));  
  const total = await Product.countDocuments(filters);

  return {
    products,
    totalPages: Math.ceil(total / limit),
    page: Number(page),
    hasPrevPage: Number(page) > 1,
    hasNextPage: Number(page) < Math.ceil(total / limit),
  };
};

export const getProductById = async (productId) => {
  const product = await Product.findById(productId);
  return product;
};
