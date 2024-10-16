const cartService = require("../services/cartService");

const createCart = (req, res) => {
  const newCart = cartService.createCart();
  res.status(201).json(newCart);
};

const getCartById = (req, res) => {
  const cartId = req.params.cid;
  const cart = cartService.getCartById(cartId);
  if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });
  res.json(cart);
};

const addProductToCart = (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const result = cartService.addProductToCart(cartId, productId);
  if (!result)
    return res
      .status(404)
      .json({ message: "Carrito o producto no encontrado" });
  res.json(result);
};

module.exports = {
  createCart,
  getCartById,
  addProductToCart,
};
