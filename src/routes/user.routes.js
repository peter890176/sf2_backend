const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { protect } = require('../middlewares/auth.middleware');

// 用戶資料路由
router.get('/profile', protect, userController.getProfile);
router.put('/profile', protect, userController.updateProfile);

// 地址路由
router.get('/addresses', protect, userController.getAddresses);
router.post('/addresses', protect, userController.addAddress);
router.put('/addresses/:id', protect, userController.updateAddress);
router.delete('/addresses/:id', protect, userController.deleteAddress);

module.exports = router; 