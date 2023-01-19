const { productService } = require('../services');
const errorList = require('../utils/errorList');

const showAllProducts = async (_req, res) => {
  const { message } = await productService.showAllProducts();
  return res.status(200).json(message);
};

const showProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.showProductById(id);
  if (type) return res.status(errorList.mappedErrorList(type)).json({ message });
  return res.status(200).json(message);
};

const showProductByTerm = async (req, res) => {
  const { query: { q } } = req;
  const { message } = await productService.showProductByTerm(q);
  return res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productService.createProduct(name);
  if (type) return res.status(errorList.mappedErrorList(type)).json({ message });
  return res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const { type, message } = await productService.updateProduct(id, body);
  if (type) return res.status(errorList.mappedErrorList(type)).json({ message });
  return res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.deleteProduct(id);
  if (type) return res.status(errorList.mappedErrorList(type)).json({ message });
  return res.status(204).json();
};

module.exports = {
  showAllProducts,
  showProductById,
  showProductByTerm,
  createProduct,
  updateProduct,
  deleteProduct,
};
