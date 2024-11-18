const Product = require("../models/Product.model");
const path = require("path");
const filePath = path.join(__dirname, "../data/products.json");

const readProductsFromFile = () => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

const writeProductsToFile = (products) => {
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2), "utf-8");
};

const getAllProducts = async (limit) => {
  try {
    const products = limit ? await Product.find().limit(limit) : await Product.find();
    return products;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw error;
  }
};

const getProductById = async (id) => {
  try {
    const product = await Product.findById(id);
    return product;
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    throw error;
  }
};

const addProduct = async (productData) => {
  try {
    const newProduct = new Product(productData); 
    await newProduct.save(); 
    return newProduct;
  } catch (error) {
    console.error("Error al agregar el producto:", error);
    throw error;
  }
};

const updateProduct = async (id, updatedData) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true }); 
    return updatedProduct;
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    throw error;
  }
};

const deleteProduct = async (id) => {
  try {
    const result = await Product.findByIdAndDelete(id);
    return result !== null; 
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw error;
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
