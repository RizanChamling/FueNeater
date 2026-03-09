const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../config/authMiddleware');
const adminMiddleware = require('../config/adminMiddleware');

// Protect all admin routes with BOTH auth and admin role check
router.use(authMiddleware, adminMiddleware);

// Order Management
router.get('/orders', adminController.getAllOrders);
router.put('/orders/:id/status', adminController.updateOrderStatus);

// Product Management
router.post('/products', adminController.addProduct);
router.put('/products/:id', adminController.updateProduct);
router.delete('/products/:id', adminController.deleteProduct);

module.exports = router;
