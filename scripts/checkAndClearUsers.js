const mongoose = require('mongoose');
const User = require('../src/models/user.model');
require('dotenv').config();

async function checkAndClearUsers() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Check current users
        const users = await User.find({});
        console.log('Current users count:', users.length);
        console.log('Users:', users.map(user => ({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            addresses: user.addresses
        })));

        // Clear all users
        const result = await User.deleteMany({});
        console.log('Deleted users count:', result.deletedCount);

        // Verify deletion
        const remainingUsers = await User.find({});
        console.log('Remaining users count:', remainingUsers.length);

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        // Close MongoDB connection
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
    }
}

// Run the check and clear
checkAndClearUsers(); 