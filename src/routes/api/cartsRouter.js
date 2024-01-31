const express = require('express');
const cartController = require('../../controllers/cartController');
const router = express.Router();

router.delete('/:cid/products/:pid', cartController.deleteProductFromCart);
router.put('/:cid', cartController.updateCart);
router.put('/:cid/products/:pid', cartController.updateProductQuantity);
router.delete('/:cid', cartController.deleteAllProductsFromCart);


module.exports = router;