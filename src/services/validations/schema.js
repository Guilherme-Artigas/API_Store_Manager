const Joi = require('joi');

const VALID_PRODUCT = Joi.number().integer().min(1).required();

const idSchema = Joi.number().integer().min(1).required();
const newProduct = Joi.object({ name: Joi.string().min(5).required() });
const newSale = Joi.array().items(Joi.object({
  productId: VALID_PRODUCT,
  quantity: VALID_PRODUCT,
}));

module.exports = {
  idSchema,
  newProduct,
  newSale,
};
