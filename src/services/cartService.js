const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../data/carts.json");
const productService = require("./productService");

const readCartsFromFile = () => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

const writeCartsToFile = (carts) => {
  fs.writeFileSync(filePath, JSON.stringify(carts, null, 2), "utf-8");
};

const createCart = () => {
  const carts = readCartsFromFile();
  const newCart = {
    id: Date.now().toString(),
    products: [],
  };
  carts.push(newCart);
  writeCartsToFile(carts);
  return newCart;
};

const getCartById = (id) => {
  const carts = readCartsFromFile();
  return carts.find((cart) => cart.id === id);
};

const addProductToCart = (cartId, productId) => {
  const carts = readCartsFromFile();
  const cart = carts.find((cart) => cart.id === cartId);
  if (!cart) return null;

  const product = productService.getProductById(productId);
  if (!product) return null;

  const existingProductIndex = cart.products.findIndex(
    (p) => p.product === productId
  );
  if (existingProductIndex !== -1) {
    cart.products[existingProductIndex].quantity += 1;
  } else {
    cart.products.push({ product: productId, quantity: 1 });
  }

  writeCartsToFile(carts);
  return cart;
};

module.exports = {
  createCart,
  getCartById,
  addProductToCart,
};
