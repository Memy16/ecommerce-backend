const cartService = require("../services/cartService");

const createCart = (req, res) => {
  const newCart = cartService.createCart();
  res.status(201).json(newCart);
};

const getCartById = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartService.getCartById(cartId);
    if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const result = await cartService.addProductToCart(cartId, productId);
    if (!result)
      return res.status(404).json({ message: "Carrito o producto no encontrado" });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProductFromCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const result = await cartService.deleteProductFromCart(cartId, productId);
    if (!result)
      return res.status(404).json({ message: "Carrito o producto no encontrado" });
    res.json({ message: "Producto eliminado del carrito con éxito" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const products = req.body.products;
    const result = await cartService.updateCart(cartId, products);
    if (!result) return res.status(404).json({ message: "Carrito no encontrado" });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProductQuantityInCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const { quantity } = req.body;
    const result = await cartService.updateProductQuantityInCart(cartId, productId, quantity);
    if (!result)
      return res.status(404).json({ message: "Carrito o producto no encontrado" });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const result = await cartService.clearCart(cartId);
    if (!result) return res.status(404).json({ message: "Carrito no encontrado" });
    res.json({ message: "Carrito limpiado con éxito" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCart,
  getCartById,
  addProductToCart,
  deleteProductFromCart,
  updateCart,
  updateProductQuantityInCart,
  clearCart,
};

