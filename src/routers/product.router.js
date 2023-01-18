const express = require('express');
const { productController } = require('../controllers');

const router = express.Router();

router.get(
  '/',
  productController.showAllProducts,
);

router.get(
  '/:id',
  productController.showProductById,
);

router.post(
  '/',
  productController.createProduct,
);

router.put(
  '/:id',
  productController.updateProduct,
);

module.exports = router;
