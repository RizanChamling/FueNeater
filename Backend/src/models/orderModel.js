const db = require('../config/db');

const Order = {
  createOrder: (orderData, callback) => {
    const { user_id, total_amount, status } = orderData;
    const query = 'INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, ?)';
    db.query(query, [user_id, total_amount, status || 'pending'], (err, results) => {
      callback(err, results);
    });
  },

  addOrderItem: (itemData, callback) => {
    const { order_id, product_id, quantity, custom_dimensions, selected_material, selected_color, subtotal } = itemData;
    const query = 'INSERT INTO order_items (order_id, product_id, quantity, custom_dimensions, selected_material, selected_color, subtotal) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [order_id, product_id, quantity, custom_dimensions, selected_material, selected_color, subtotal], (err, results) => {
      callback(err, results);
    });
  },

  getOrdersByUserId: (userId, callback) => {
    const query = 'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC';
    db.query(query, [userId], (err, results) => {
      callback(err, results);
    });
  },

  getOrderById: (orderId, callback) => {
    const query = 'SELECT * FROM orders WHERE id = ?';
    db.query(query, [orderId], (err, orderResults) => {
      if (err) return callback(err);
      if (orderResults.length === 0) return callback(null, null);

      const order = orderResults[0];
      
      // Fetch items for this order
      const itemsQuery = `
        SELECT oi.*, p.name as product_name, p.image_url 
        FROM order_items oi 
        JOIN products p ON oi.product_id = p.id 
        WHERE oi.order_id = ?
      `;
      db.query(itemsQuery, [orderId], (err, itemsResults) => {
        if (err) return callback(err);
        order.items = itemsResults;
        callback(null, order);
      });
    });
  }
};

module.exports = Order;
