const db = require('../config/db');

const Product = {
  getAllProducts: (categoryId, callback) => {
    let query = 'SELECT * FROM products';
    const params = [];
    
    if (categoryId) {
      query += ' WHERE category_id = ?';
      params.push(categoryId);
    }
    
    db.query(query, params, (err, results) => {
      callback(err, results);
    });
  },

  getProductById: (id, callback) => {
    const query = 'SELECT * FROM products WHERE id = ?';
    db.query(query, [id], (err, productResults) => {
      if (err) return callback(err);
      if (productResults.length === 0) return callback(null, null);

      const product = productResults[0];
      
      // Fetch customization options for this product
      const optionsQuery = 'SELECT * FROM customization_options WHERE product_id = ?';
      db.query(optionsQuery, [id], (err, optionsResults) => {
        if (err) return callback(err);
        product.customization_options = optionsResults;
        callback(null, product);
      });
    });
  },

  getAllCategories: (callback) => {
    const query = 'SELECT * FROM categories';
    db.query(query, (err, results) => {
      callback(err, results);
    });
  }
};

module.exports = Product;
