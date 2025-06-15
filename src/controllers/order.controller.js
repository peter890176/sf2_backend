const Order = require('../models/order.model');
const Product = require('../models/product.model');
const User = require('../models/user.model');

// @desc    Get logged in user's orders
// @route   GET /api/orders
// @access  Private
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({
      status: 'success',
      data: { orders },
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Server Error' });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'username email');

    if (!order) {
      return res.status(404).json({ status: 'error', message: 'Order not found' });
    }

    // Ensure the order belongs to the logged-in user
    if (order.user._id.toString() !== req.user.id) {
      return res.status(401).json({ status: 'error', message: 'Not authorized' });
    }

    res.status(200).json({
      status: 'success',
      data: { order },
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Server Error' });
  }
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
  const { orderItems, shippingAddress } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ status: 'error', message: 'No order items' });
  }

  try {
    let totalAmount = 0;
    const items = [];

    for (const item of orderItems) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ status: 'error', message: `Product not found: ${item.productId}` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ status: 'error', message: `Not enough stock for ${product.name}. Only ${product.stock} left.` });
      }

      const itemPrice = product.price * item.quantity;
      totalAmount += itemPrice;

      items.push({
        product: product._id,
        name: product.title,
        quantity: item.quantity,
        price: product.price,
        imageUrl: product.imageUrl,
      });

      product.stock -= item.quantity;
      await product.save();
    }

    const order = new Order({
      user: req.user.id,
      items,
      totalAmount,
      shippingAddress,
    });

    const createdOrder = await order.save();
    res.status(201).json({
      status: 'success',
      data: { order: createdOrder },
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: `Server Error: ${error.message}` });
  }
}; 