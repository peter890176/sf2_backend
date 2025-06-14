const mongoose = require('mongoose');
const User = require('../src/models/user.model');
require('dotenv').config();

const adminDetails = {
    username: 'peter890176',
    email: 'peter890176@gmail.com',
    password: 'Peter890176',
    firstName: 'Peter',
    lastName: 'Li',
    phone: '+1 8888888888',
    role: 'admin'
};

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB Atlas');

        const existingUser = await User.findOne({
            $or: [{ email: adminDetails.email }, { username: adminDetails.username }]
        });

        if (existingUser) {
            console.log(`User with email ${adminDetails.email} or username ${adminDetails.username} already exists.`);
            if (existingUser.role !== 'admin') {
                existingUser.role = 'admin';
                await existingUser.save();
                console.log(`User ${existingUser.username} has been promoted to admin.`);
            }
            return;
        }

        console.log('Creating new admin user...');
        const newUser = new User(adminDetails);
        await newUser.save();
        console.log(`Successfully created admin user: ${newUser.username}`);

    } catch (error) {
        console.error('An error occurred:', error.message);
    } finally {
        await mongoose.connection.close();
        console.log('MongoDB connection closed.');
    }
};

createAdmin(); 