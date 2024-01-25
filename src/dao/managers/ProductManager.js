const ProductModel = require('../models/ProductModel');

class ProductManager {
  async addProduct(productData) {
    try {
      const newProduct = new ProductModel(productData);
      const savedProduct = await newProduct.save();
      return savedProduct;
    } catch (error) {
      throw new Error('Error adding product');
    }
  }

  async getProducts() {
    try {
      const products = await ProductModel.find();
      return products;
    } catch (error) {
      throw new Error('Error getting products');
    }
  }

  async getProductById(productId) {
    try {
      const product = await ProductModel.findById(productId);
      return product;
    } catch (error) {
      throw new Error('Error getting product by ID');
    }
  }

}

module.exports = ProductManager;
