const mongoose = require('mongoose');
const Product = require('./src/models/Product.model');
const products = require('./src/data/products.json');
const connectDB = require('./db');

const seedProducts = async () => {
  try {
    await connectDB();
    await Product.deleteMany(); // Limpia la colección antes de agregar nuevos datos.
    await Product.insertMany(products);
    console.log('Productos agregados a MongoDB');
    process.exit();
  } catch (error) {
    console.error('Error al agregar productos:', error);
    process.exit(1);
  }
};

seedProducts();
