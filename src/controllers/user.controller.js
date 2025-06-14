const User = require('../models/user.model');
const Address = require('../models/address.model');

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          createdAt: user.createdAt,
          lastLogin: user.lastLogin
        }
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName, phone },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone
        }
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get user addresses
exports.getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user.id });
    res.status(200).json({
      status: 'success',
      data: {
        addresses
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Add new address
exports.addAddress = async (req, res) => {
  try {
    const { addressLine, city, postalCode, state, isDefault } = req.body;
    
    const address = await Address.create({
      user: req.user.id,
      addressLine,
      city,
      postalCode,
      state,
      isDefault
    });

    res.status(201).json({
      status: 'success',
      data: {
        address
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Update address
exports.updateAddress = async (req, res) => {
  try {
    const { addressLine, city, postalCode, state, isDefault } = req.body;
    
    const address = await Address.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { addressLine, city, postalCode, state, isDefault },
      { new: true, runValidators: true }
    );

    if (!address) {
      return res.status(404).json({
        status: 'error',
        message: 'Address not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        address
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Delete address
exports.deleteAddress = async (req, res) => {
  try {
    const address = await Address.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!address) {
      return res.status(404).json({
        status: 'error',
        message: 'Address not found'
      });
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
}; 