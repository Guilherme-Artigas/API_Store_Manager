const Joi = require('joi');

const VALID_PRODUCT_QUANTITY = Joi.number().integer().min(1).required();

const idSchema = Joi.number().integer().min(1).required();
const newProduct = Joi.object({ name: Joi.string().min(5).required() });
const newSale = Joi.array().items(Joi.object({
  productId: VALID_PRODUCT_QUANTITY,
  quantity: VALID_PRODUCT_QUANTITY,
}));

module.exports = {
  idSchema,
  newProduct,
  newSale,
};
