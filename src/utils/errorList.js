const errorList = {
  BAD_REQUEST: 400,
  PRODUCT_NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
};

const mappedErrorList = (type) => errorList[type] || 500;

module.exports = {
  errorList,
  mappedErrorList,
};
