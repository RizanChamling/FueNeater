const db = require('../config/db');
const Product = require('../models/productModel');

const adminController = {
  // Order Management
  getAllOrders: (req, res) => {
    const query = `
      SELECT o.*, u.username, u.email 
      FROM orders o 
      JOIN users u ON o.user_id = u.id 
      ORDER BY o.created_at DESC
    `;
    db.query(query, (err, results) => {
      if (err) return res.status(500).json({ message: 'Error fetching orders', error: err.message });
      res.status(200).json(results);
    });
  },

  updateOrderStatus: (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status) return res.status(400).json({ message: 'Status is required' });

    const query = 'UPDATE orders SET status = ? WHERE id = ?';
    db.query(query, [status, id], (err, result) => {
      if (err) return res.status(500).json({ message: 'Error updating order', error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Order not found' });
      res.status(200).json({ message: 'Order status updated successfully' });
    });
  },

  // Product Management
  addProduct: (req, res) => {
    const { name, description, base_price, category_id, image_url, stock } = req.body;
    
    if (!name || !base_price) return res.status(400).json({ message: 'Name and price are required' });

    const query = 'INSERT INTO products (name, description, base_price, category_id, image_url, stock) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [name, description, base_price, category_id, image_url, stock || 0], (err, result) => {
      if (err) return res.status(500).json({ message: 'Error adding product', error: err.message });
      res.status(201).json({ message: 'Product added successfully', productId: result.insertId });
    });
  },

  updateProduct: (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    
    // Dynamically build update query
    let query = 'UPDATE products SET ';
    const params = [];
    const sets = [];

    Object.keys(updates).forEach(key => {
      if (['name', 'description', 'base_price', 'category_id', 'image_url', 'stock'].includes(key)) {
        sets.push(`${key} = ?`);
        params.push(updates[key]);
      }
    });

    if (sets.length === 0) return res.status(400).json({ message: 'No valid update fields provided' });

    query += sets.join(', ') + ' WHERE id = ?';
    params.push(id);

    db.query(query, params, (err, result) => {
      if (err) return res.status(500).json({ message: 'Error updating product', error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Product not found' });
      res.status(200).json({ message: 'Product updated successfully' });
    });
  },

  deleteProduct: (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM products WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) return res.status(500).json({ message: 'Error deleting product', error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Product not found' });
      res.status(200).json({ message: 'Product deleted successfully' });
    });
  }
};

module.exports = adminController;
