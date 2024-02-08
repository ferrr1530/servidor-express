const Product = require('../models/ProductModel');

const getAllProducts = async (options) => {
  const { limit = 10, page = 1, sort, query } = options;

  try {
    const filter = query ? { category: query } : {};
    const sortOptions = sort ? { price: sort === 'asc' ? 1 : -1 } : {};

    const products = await Product.find(filter)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    return products;
  } catch (error) {
    throw error;
  }
};


module.exports = {
  getAllProducts,

};