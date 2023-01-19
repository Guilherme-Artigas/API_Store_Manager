const { saleService } = require('../services');
const errorList = require('../utils/errorList');

const showAllSales = async (_req, res) => {
  const { message } = await saleService.showAllSales();
  return res.status(200).json(message);
};

const showSalesById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.showSalesById(id);
  if (type) return res.status(404).json({ message });
  return res.status(200).json(message);
};

const createNewSale = async (req, res) => {
  const sale = req.body;
  const { type, message } = await saleService.createNewSale(sale);
  if (type) return res.status(errorList.mappedErrorList(type)).json({ message });
  return res.status(201).json(message);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const { type, message } = await saleService.updateSale(id, body);
  if (type === 'SALE_NOT_FOUND') return res.status(404).json({ message });
  if (type) return res.status(errorList.mappedErrorList(type)).json({ message });
  return res.status(200).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.deleteSale(id);
  if (type) return res.status(404).json({ message });
  return res.status(204).json();
};

module.exports = {
  showAllSales,
  showSalesById,
  createNewSale,
  updateSale,
  deleteSale,
};
