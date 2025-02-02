import Product from '../models/product.model.js'; 

export const getProducts = async ({ limit = 10, page = 1, sort = 'asc', query = '' }) => {
  const filters = query ? { category: query } : {}; 
  const sortOrder = sort === 'asc' ? 1 : -1;

  try {
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
  } catch (error) {
    throw new Error('Error fetching products');
  }
};

export const getProductById = async (productId) => {
  try {
    const product = await Product.findById(productId);
    return product;
  } catch (error) {
    throw new Error('Product not found');
  }
};
