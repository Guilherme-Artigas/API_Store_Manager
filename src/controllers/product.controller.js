const { productService } = require('../services');
const errorList = require('../utils/errorList');

const showAllProducts = async (_req, res) => {
  const { type, message } = await productService.showAllProducts();
  if (type) return res.status(errorList.mappedErrorList(type)).json(message);
  return res.status(200).json(message);
};

const showProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.showProductById(id);
  if (type) return res.status(errorList.mappedErrorList(type)).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  showAllProducts,
  showProductById,
};
