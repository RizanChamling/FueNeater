const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../config/authMiddleware');

// Public utility route
router.post('/esewa-signature', orderController.generateSignature);

// Apply protection to all order routes
router.use(authMiddleware);

router.post('/checkout', orderController.checkout);
router.get('/', orderController.getUserOrders);
router.get('/:id', orderController.getOrderDetails);

module.exports = router;
