const express = require('express');
const router = express.Router();
const {
  getUserOrders,
  getOrderById,
  createOrder,
} = require('../controllers/order.controller');
const { protect } = require('../middlewares/auth.middleware');

// Apply the 'protect' middleware to all routes in this file
router.use(protect);

router.route('/')
  .get(getUserOrders)
  .post(createOrder);

router.route('/:id')
  .get(getOrderById);

module.exports = router; 