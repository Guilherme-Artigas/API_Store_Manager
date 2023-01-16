const { idSchema, newProduct } = require('./schema');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'UNPROCESSABLE_ENTITY', message: error.message };
  return { type: null, message: '' };
};

const validateNewProduct = (name) => {
  const { error } = newProduct.validate({ name });
  if (error) {
    const errorType = error.message.includes('required') ? 'BAD_REQUEST' : 'UNPROCESSABLE_ENTITY';
    return { type: errorType, message: error.message };
  }
  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateNewProduct,
};
