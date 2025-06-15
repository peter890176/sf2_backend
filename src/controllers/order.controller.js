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
  
  console.log('--- Creating New Order ---');
  console.log('Received orderItems:', JSON.stringify(orderItems, null, 2));
  console.log('Received shippingAddress:', JSON.stringify(shippingAddress, null, 2));

  if (!orderItems || orderItems.length === 0) {
    console.log('Validation failed: No order items.');
    return res.status(400).json({ status: 'error', message: 'No order items' });
  }

  try {
    let totalAmount = 0;
    const items = [];

    for (const item of orderItems) {
      console.log(`Processing item with productId: ${item.productId}`);
      const product = await Product.findById(item.productId);
      
      if (!product) {
        console.error(`Product not found for ID: ${item.productId}`);
        return res.status(404).json({ status: 'error', message: `Product not found: ${item.productId}` });
      }
      
      console.log(`Found product: ${product.title}, Price: ${product.price}, Stock: ${product.stock}`);

      if (product.stock < item.quantity) {
        console.log(`Stock check failed for ${product.title}.`);
        return res.status(400).json({ status: 'error', message: `Not enough stock for ${product.name}. Only ${product.stock} left.` });
      }

      // Calculate the final price for a single unit and round it to 2 decimal places immediately.
      const finalPrice = Math.round((product.price * (1 - product.discountPercentage / 100)) * 100) / 100;

      const itemTotalPrice = finalPrice * item.quantity;
      totalAmount += itemTotalPrice;
      console.log(`Item: ${product.title}, Rounded Unit Price: ${finalPrice}, Item Total: ${itemTotalPrice}, New totalAmount: ${totalAmount}`);

      items.push({
        product: product._id,
        name: product.title,
        quantity: item.quantity,
        price: product.price,
        discountPercentage: product.discountPercentage,
        finalPrice: finalPrice, // Use the rounded final price
        imageUrl: product.imageUrl,
      });

      product.stock -= item.quantity;
      await product.save();
    }

    // Although each item is rounded, we round the total as a final safeguard against any floating point representation issues.
    const roundedTotalAmount = Math.round(totalAmount * 100) / 100;
    console.log(`Final totalAmount before saving: ${totalAmount}, Rounded totalAmount: ${roundedTotalAmount}`);

    const order = new Order({
      user: req.user.id,
      items,
      totalAmount: roundedTotalAmount,
      shippingAddress,
    });

    const createdOrder = await order.save();
    console.log('--- Order Created Successfully ---');
    res.status(201).json({
      status: 'success',
      data: { order: createdOrder },
    });
  } catch (error) {
    console.error('--- Error During Order Creation ---');
    console.error(error);
    res.status(500).json({ status: 'error', message: `Server Error: ${error.message}` });
  }
}; 