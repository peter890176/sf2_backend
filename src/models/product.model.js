const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Product title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price must be a positive number'],
  },
  imageUrl: {
    type: String,
    required: [true, 'Product image URL is required'],
  },
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock must be a positive number'],
    default: 0,
  },
  brand: {
    type: String,
    default: 'Unknown Brand',
  },
  images: {
    type: [String],
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  discountPercentage: {
    type: Number,
    required: true,
    default: 0,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  dummyId: {
    type: String,
    required: [true, 'Dummy ID is required'],
  },
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product; 