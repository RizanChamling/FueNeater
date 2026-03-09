const Product = require('../models/productModel');

const productService = {
  getProducts: (categoryId, callback) => {
    Product.getAllProducts(categoryId, (err, products) => {
      if (err) return callback(err);
      callback(null, products);
    });
  },

  getProductDetails: (id, callback) => {
    Product.getProductById(id, (err, product) => {
      if (err) return callback(err);
      if (!product) return callback(new Error('Product not found'));
      callback(null, product);
    });
  },

  getCategories: (callback) => {
    Product.getAllCategories((err, categories) => {
      if (err) return callback(err);
      callback(null, categories);
    });
  }
};

module.exports = productService;
