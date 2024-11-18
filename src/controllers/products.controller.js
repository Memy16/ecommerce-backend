const productService = require("../services/productService");

const getProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;
    const filters = query ? { $or: [{ category: query }, { status: query === 'true' }]} : {};
    const sortOption = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {};

    const products = await productService.getAllProducts({
      filters,
      limit: parseInt(limit, 10),
      page: parseInt(page, 10),
      sort: sortOption,

    });

    res.json({
      status: 'success',
      payload: products.docs,
      totalPages: products.totalPages,
      prevPage: products.hasPrevPage ? products.page - 1 : null,
      nextPage: products.hasNextPage ? products.page + 1 : null,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: products.hasPrevPage ? `/products?page=${products.page - 1}&limit=${limit}&sort=${sort}` : null,
      nextLink: products.hasNextPage ? `/products?page=${products.page + 1}&limit=${limit}&sort=${sort}` : null,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
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
