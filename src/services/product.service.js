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

const showProductByTerm = async (query) => {
  const listProducts = await productModel.showAllProducts();
  const newList = listProducts.filter((p) => p.name.includes(query));
  return { type: null, message: newList };
};

const createProduct = async (name) => {
  const error = schema.validateNewProduct(name);
  if (error.type) return error;
  const newProductId = await productModel.createProduct({ name });
  const newProduct = await productModel.showProductById(newProductId);
  return { type: null, message: newProduct };
};

const updateProduct = async (id, body) => {
  const error = schema.validateNewProduct(body.name);
  if (error.type) return error;
  const product = await productModel.showProductById(id);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  product.name = body.name;
  await productModel.updateProduct(product);
  return { type: null, message: product };
};

const deleteProduct = async (id) => {
  const product = await productModel.showProductById(id);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  await productModel.deleteProduct(id);
  return { type: null, message: '' };
};

module.exports = {
  showAllProducts,
  showProductById,
  showProductByTerm,
  createProduct,
  updateProduct,
  deleteProduct,
};
