const express = require('express');
const { saleController } = require('../controllers');

const router = express.Router();

router.get(
  '/',
  saleController.showAllSales,
);

router.get(
  '/:id',
  saleController.showSalesById,
);

router.post(
  '/',
  saleController.createNewSale,
);

router.delete(
  '/:id',
  saleController.deleteSale,
);

module.exports = router;
