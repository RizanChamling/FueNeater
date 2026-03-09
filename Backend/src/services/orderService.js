const Order = require('../models/orderModel');

const orderService = {
  processCheckout: (userId, orderData, callback) => {
    const { items, total_amount } = orderData;

    // 1. Create the main order record
    Order.createOrder({ user_id: userId, total_amount, status: 'pending' }, (err, result) => {
      if (err) return callback(err);
      
      const orderId = result.insertId;
      let itemsProcessed = 0;
      const errors = [];

      // 2. Add each item to the order_items table
      items.forEach(item => {
        const itemData = {
          order_id: orderId,
          product_id: item.product_id,
          quantity: item.quantity,
          custom_dimensions: item.custom_dimensions || null,
          selected_material: item.selected_material || null,
          selected_color: item.selected_color || null,
          subtotal: item.subtotal
        };

        Order.addOrderItem(itemData, (err) => {
          if (err) errors.push(err);
          itemsProcessed++;

          if (itemsProcessed === items.length) {
            if (errors.length > 0) return callback(errors[0]); // Return first error
            callback(null, { orderId, message: 'Order placed successfully' });
          }
        });
      });
    });
  },

  getUserOrders: (userId, callback) => {
    Order.getOrdersByUserId(userId, (err, orders) => {
      if (err) return callback(err);
      callback(null, orders);
    });
  },

  getOrderDetails: (orderId, callback) => {
    Order.getOrderById(orderId, (err, order) => {
      if (err) return callback(err);
      if (!order) return callback(new Error('Order not found'));
      callback(null, order);
    });
  }
};

module.exports = orderService;
