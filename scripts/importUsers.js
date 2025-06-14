const axios = require('axios');
const mongoose = require('mongoose');
const User = require('../src/models/user.model');
require('dotenv').config();

async function importUsers() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Fetch users from DummyJSON
        const response = await axios.get('https://dummyjson.com/users');
        const users = response.data.users;

        // Transform and import users
        for (const user of users) {
            // Check if user already exists
            const existingUser = await User.findOne({ email: user.email });
            if (existingUser) {
                console.log(`User with email ${user.email} already exists, skipping...`);
                continue;
            }

            // Create address object
            const address = {
                addressLine: user.address.address,
                city: user.address.city,
                postalCode: user.address.postalCode,
                state: user.address.state,
                isDefault: true
            };

            console.log('Creating address:', address);

            // Create new user with address
            const newUser = new User({
                email: user.email,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                addresses: [address]
            });

            const savedUser = await newUser.save();
            console.log(`Imported user: ${user.firstName} ${user.lastName}`);
            console.log('User addresses:', savedUser.addresses);
        }

        console.log('Import completed successfully');
    } catch (error) {
        console.error('Error importing users:', error.message);
    } finally {
        // Close MongoDB connection
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
    }
}

// Run the import
importUsers(); 