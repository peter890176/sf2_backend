const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { protect } = require('../middlewares/auth.middleware');

// User profile routes
router.get('/profile', protect, userController.getProfile);
router.put('/profile', protect, userController.updateProfile);

// Address routes
router.get('/addresses', protect, userController.getAddresses);
router.post('/addresses', protect, userController.addAddress);
router.put('/addresses/:id', protect, userController.updateAddress);
router.delete('/addresses/:id', protect, userController.deleteAddress);

module.exports = router; 