const express = require('express');
const { productController } = require('../controllers');

const router = express.Router();

router.get(
  '/',
  productController.showAllProducts,
);

router.get(
  '/search',
  productController.showProductByTerm,
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

router.delete(
  '/:id',
  productController.deleteProduct,
);

module.exports = router;
