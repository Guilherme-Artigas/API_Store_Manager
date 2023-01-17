const { productModel, saleModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const createNewSale = async (sale) => {
  const error = schema.validateNewSale(sale);
  if (error.type) return error;
  const listProduct = await productModel.showAllProducts();
  let productDoesNotExist;
  sale.forEach((_saleProduct, i) => {
    if (!listProduct.some((p) => p.id === sale[i].productId)) {
      productDoesNotExist = true;
    }
  });
  if (productDoesNotExist) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  const newSaleId = await saleModel.createNewSale(sale);
  return { type: null, message: { id: newSaleId, itemsSold: sale } };
};

module.exports = {
  createNewSale,
};
