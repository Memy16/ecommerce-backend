const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../data/productos.json");

const readProductsFromFile = () => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

const writeProductsToFile = (products) => {
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2), "utf-8");
};

const getAllProducts = (limit) => {
  const products = readProductsFromFile();
  return limit ? products.slice(0, limit) : products;
};

const getProductById = (id) => {
  const products = readProductsFromFile();
  return products.find((product) => product.id === id);
};

const addProduct = (productData) => {
  const products = readProductsFromFile();
  const newProduct = {
    id: Date.now().toString(),
    ...productData,
    status: productData.status || true,
  };
  products.push(newProduct);
  writeProductsToFile(products);
  return newProduct;
};

const updateProduct = (id, updatedData) => {
  const products = readProductsFromFile();
  const productIndex = products.findIndex((product) => product.id === id);
  if (productIndex === -1) return null;
  products[productIndex] = { ...products[productIndex], ...updatedData };
  writeProductsToFile(products);
  return products[productIndex];
};

const deleteProduct = (id) => {
  const products = readProductsFromFile();
  const newProducts = products.filter((product) => product.id !== id);
  if (products.length === newProducts.length) return null;
  writeProductsToFile(newProducts);
  return true;
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
