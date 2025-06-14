const axios = require('axios');
const mongoose = require('mongoose');
const User = require('../src/models/user.model');
const Address = require('../src/models/address.model');
require('dotenv').config();

async function clearAndImport() {
    try {
        // Connect to MongoDB Atlas
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB Atlas (ecommerce database)');

        // Clear existing data
        await User.deleteMany({});
        await Address.deleteMany({});
        console.log('Cleared existing data');

        // Fetch users from DummyJSON
        const response = await axios.get('https://dummyjson.com/users');
        const users = response.data.users;

        // Transform and import users
        for (const user of users) {
            // Create new user
            const newUser = new User({
                email: user.email,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone
            });

            const savedUser = await newUser.save();
            console.log(`Imported user: ${user.firstName} ${user.lastName}`);

            // Create address for user
            const address = new Address({
                user: savedUser._id,
                addressLine: user.address.address,
                city: user.address.city,
                postalCode: user.address.postalCode,
                state: user.address.state,
                isDefault: true
            });

            const savedAddress = await address.save();
            console.log('Created address:', savedAddress);
        }

        console.log('Import completed successfully');
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        // Close MongoDB connection
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
    }
}

// Run the clear and import
clearAndImport(); 