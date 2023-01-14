const errorList = {
  PRODUCT_NOT_FOUND: 404,
};

const mappedErrorList = (type) => errorList[type] || 500;

module.exports = {
  errorList,
  mappedErrorList,
};
