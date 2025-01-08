const Product = require("../models/Product.model");

const getAllProducts = async () => { 
  try { 
    const products = await Product.find({}); 
    return products;  
  } catch (error) { 
    console.error("Error al obtener productos:", error); 
    throw error;  
    } 
  }; 
  
  module.exports = { 
    getAllProducts, 
  };

  const getAllProductsPaginated = async (limit = 10, page = 1, sort = null, query = {}) => { 
    try { 
      const options = { 
        limit: parseInt(limit), 
        skip: (parseInt(page) - 1) * parseInt(limit), 
      };

    if (sort) {
      options.sort = { price: sort === 'asc' ? 1 : -1 };
    }

    const products = await Product.find(query, null, options);
    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);

    return {
      status: 'success',
      payload: products,
      totalPages: totalPages,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
      page: parseInt(page),
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      prevLink: page > 1 ? `/api/products?limit=${limit}&page=${page - 1}&sort=${sort}&query=${JSON.stringify(query)}` : null,
      nextLink: page < totalPages ? `/api/products?limit=${limit}&page=${page + 1}&sort=${sort}&query=${JSON.stringify(query)}` : null
    };
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return { status: 'error', message: error.message };
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
