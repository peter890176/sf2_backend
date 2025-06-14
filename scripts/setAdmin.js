const mongoose = require('mongoose');
const User = require('../src/models/user.model');
require('dotenv').config();

const userEmailToMakeAdmin = 'peter890176@gmail.com';

const setAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB Atlas');

        const user = await User.findOne({ email: userEmailToMakeAdmin });

        if (!user) {
            console.error(`Error: User with email ${userEmailToMakeAdmin} not found.`);
            await mongoose.connection.close();
            return;
        }

        if (user.role === 'admin') {
            console.log(`User ${user.username} (${user.email}) is already an admin.`);
        } else {
            user.role = 'admin';
            await user.save();
            console.log(`Successfully promoted user ${user.username} (${user.email}) to admin.`);
        }

    } catch (error) {
        console.error('An error occurred:', error.message);
    } finally {
        await mongoose.connection.close();
        console.log('MongoDB connection closed.');
    }
};

setAdmin(); 