const express = require('express');
const { saleController } = require('../controllers');

const router = express.Router();

router.post(
  '/',
  saleController.createNewSale,
);

router.get(
  '/',
  saleController.showAllSales,
);

router.get(
  '/:id',
  saleController.showSalesById,
);

module.exports = router;
