const { productModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const showAllProducts = async () => {
  const listProducts = await productModel.showAllProducts();
  return { type: null, message: listProducts };
};

const showProductById = async (id) => {
  const error = schema.validateId(id);
  if (error.type) return error;
  const product = await productModel.showProductById(id);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: product };
};

module.exports = {
  showAllProducts,
  showProductById,
};
