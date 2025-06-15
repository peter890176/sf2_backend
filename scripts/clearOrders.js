const mongoose = require('mongoose');
const Order = require('../src/models/order.model');
require('dotenv').config();

const clearOrders = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB Atlas');

        const { deletedCount } = await Order.deleteMany({});
        console.log(`Successfully deleted ${deletedCount} orders.`);

    } catch (error) {
        console.error('An error occurred:', error.message);
    } finally {
        await mongoose.connection.close();
        console.log('MongoDB connection closed.');
    }
};

clearOrders(); 