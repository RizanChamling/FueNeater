const orderService = require('../services/orderService');
const crypto = require('crypto');

const orderController = {
  generateSignature: (req, res) => {
    const { total_amount, transaction_uuid, product_code } = req.body;
    if (!total_amount || !transaction_uuid || !product_code) {
      return res.status(400).json({ message: 'Missing fields for signature generation' });
    }
    const secretKey = '8gBm/:&EnhH.1/q'; 
    const message = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    const hash = crypto.createHmac('sha256', secretKey).update(message).digest('base64');
    res.status(200).json({ signature: hash });
  },

  checkout: (req, res) => {
    const userId = req.user.id; // From authMiddleware
    const orderData = req.body;

    if (!orderData.items || !orderData.total_amount) {
      return res.status(400).json({ message: 'Order items and total amount are required' });
    }

    orderService.processCheckout(userId, orderData, (err, result) => {
      if (err) return res.status(500).json({ message: 'Error processing order', error: err.message });
      res.status(201).json(result);
    });
  },

  getUserOrders: (req, res) => {
    const userId = req.user.id;
    orderService.getUserOrders(userId, (err, orders) => {
      if (err) return res.status(500).json({ message: 'Error fetching orders', error: err.message });
      res.status(200).json(orders);
    });
  },

  getOrderDetails: (req, res) => {
    const { id } = req.params;
    orderService.getOrderDetails(id, (err, order) => {
      if (err) {
        const status = err.message === 'Order not found' ? 404 : 500;
        return res.status(status).json({ message: err.message });
      }
      
      // Safety check: Ensure the user owns this order or is admin
      if (order.user_id !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
      }

      res.status(200).json(order);
    });
  }
};

module.exports = orderController;
