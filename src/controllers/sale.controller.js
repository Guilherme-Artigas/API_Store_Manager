const { saleService } = require('../services');
const errorList = require('../utils/errorList');

const createNewSale = async (req, res) => {
  const sale = req.body;
  const { type, message } = await saleService.createNewSale(sale);
  if (type) return res.status(errorList.mappedErrorList(type)).json({ message });
  return res.status(201).json(message);
};

module.exports = {
  createNewSale,
};
