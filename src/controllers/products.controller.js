const productService = require("../services/productService");

const getProducts = (req, res) => {
  const limit = req.query.limit;
  const products = productService.getAllProducts(limit);
  res.json(products);
};

const getProductById = (req, res) => {
  const productId = req.params.pid;
  const product = productService.getProductById(productId);
  if (!product)
    return res.status(404).json({ message: "Producto no encontrado" });
  res.json(product);
};

const addProduct = (req, res) => {
  const newProduct = req.body;
  const addedProduct = productService.addProduct(newProduct);
  res.status(201).json(addedProduct);
};

const updateProduct = (req, res) => {
  const productId = req.params.pid;
  const updatedProduct = req.body;
  const result = productService.updateProduct(productId, updatedProduct);
  if (!result)
    return res.status(404).json({ message: "Producto no encontrado" });
  res.json(result);
};

const deleteProduct = (req, res) => {
  const productId = req.params.pid;
  const result = productService.deleteProduct(productId);
  if (!result)
    return res.status(404).json({ message: "Producto no encontrado" });
  res.json({ message: "Producto eliminado con éxito" });
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
