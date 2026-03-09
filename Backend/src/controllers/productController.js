const productService = require('../services/productService');

const productController = {
  getProducts: (req, res) => {
    const categoryId = req.query.category_id;
    productService.getProducts(categoryId, (err, products) => {
      if (err) return res.status(500).json({ message: 'Error fetching products', error: err.message });
      res.status(200).json(products);
    });
  },

  getProductDetails: (req, res) => {
    const { id } = req.params;
    productService.getProductDetails(id, (err, product) => {
      if (err) {
        const status = err.message === 'Product not found' ? 404 : 500;
        return res.status(status).json({ message: err.message });
      }
      res.status(200).json(product);
    });
  },

  getCategories: (req, res) => {
    productService.getCategories((err, categories) => {
      if (err) return res.status(500).json({ message: 'Error fetching categories', error: err.message });
      res.status(200).json(categories);
    });
  }
};

module.exports = productController;
