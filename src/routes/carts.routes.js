const express = require("express");
const router = express.Router();
const {
  createCart,
  getCartById,
  addProductToCart,
  deleteProductFromCart,
  updateCart,
  updateProductQuantityInCart,
  clearCart,
} = require("../controllers/carts.controller");

router.post("/", createCart);
router.get("/:cid", getCartById);
router.post("/:cid/product/:pid", addProductToCart);
router.delete("/:cid/product/:pid", deleteProductFromCart);
router.put("/:cid", updateCart);
router.put("/:cid/product/:pid", updateProductQuantityInCart);
router.delete("/:cid", clearCart);

router.get('/carts/:cid', getCartById); 
router.post('/add-to-cart/:pid', addProductToCart);

module.exports = router;
