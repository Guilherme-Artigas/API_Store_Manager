const express = require('express');
const { saleController } = require('../controllers');

const router = express.Router();

router.post(
  '/',
  saleController.createNewSale,
);

module.exports = router;
