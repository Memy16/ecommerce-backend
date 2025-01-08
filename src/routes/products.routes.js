const express = require("express");
const router = express.Router();
const productService = require("../services/productService");

const getProducts = async (req, res) => {
  try {
    const { limit, page, sort, query } = req.query;
    const queryObject = query ? JSON.parse(query) : {};

    const productsData = await productService.getAllProducts(limit, page, sort, queryObject);

    res.json(productsData);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productService.getProductById(pid);

    if (!product) {
      return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    }

    res.json({ status: 'success', payload: product });
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = await productService.addProduct(productData);

    res.status(201).json({ status: 'success', payload: newProduct });
  } catch (error) {
    console.error("Error al agregar el producto:", error);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const updatedData = req.body;
    const updatedProduct = await productService.updateProduct(pid, updatedData);

    if (!updatedProduct) {
      return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    }

    res.json({ status: 'success', payload: updatedProduct });
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const result = await productService.deleteProduct(pid);

    if (!result) {
      return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    }

    res.json({ status: 'success', message: 'Producto eliminado' });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

router.get("/", getProducts);
router.get("/:pid", getProductById);
router.post("/", addProduct);
router.put("/:pid", updateProduct);
router.delete("/:pid", deleteProduct);

module.exports = router;
