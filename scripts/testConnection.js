require('dotenv').config();
const mongoose = require('mongoose');

async function testConnection() {
    try {
        console.log('Connecting to MongoDB Atlas...');
        console.log('Connection string:', process.env.MONGODB_URI.replace(/(mongodb\+srv:\/\/[^:]+:)[^@]+(@.*)/, '$1****$2'));
        
        await mongoose.connect(process.env.MONGODB_URI);
        
        console.log('Successfully connected to MongoDB Atlas!');
        console.log('Database name:', mongoose.connection.name);
        console.log('Host:', mongoose.connection.host);
        
        // Test database operations
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('\nExisting collections:');
        collections.forEach(collection => {
            console.log(`- ${collection.name}`);
        });
        
    } catch (error) {
        console.error('Connection error:', error.message);
    } finally {
        await mongoose.connection.close();
        console.log('\nDatabase connection closed');
    }
}

testConnection(); 