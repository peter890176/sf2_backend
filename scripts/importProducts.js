const axios = require('axios');
const mongoose = require('mongoose');
const Product = require('../src/models/product.model');
require('dotenv').config();

async function importProducts() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB Atlas');

        await Product.deleteMany({});
        console.log('Cleared existing products');

        const response = await axios.get('https://dummyjson.com/products');
        const products = response.data.products;

        const productDocs = products.map(p => ({
            title: p.title,
            description: p.description,
            price: p.price,
            imageUrl: p.thumbnail,
            stock: p.stock,
            brand: p.brand,
            images: p.images,
            rating: p.rating,
            discountPercentage: p.discountPercentage,
            category: p.category,
            dummyId: p.id.toString(),
        }));

        await Product.insertMany(productDocs);
        console.log(`Successfully imported ${products.length} products.`);

    } catch (error) {
        console.error('Error importing products:', error.message);
    } finally {
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
    }
}

importProducts(); 