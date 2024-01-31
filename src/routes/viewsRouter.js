const express = require('express');
const viewsController = require('../controllers/viewsController');
const router = express.Router();

router.get('/products', viewsController.getProductsView);
router.get('/carts/:cid', viewsController.getCartView);


module.exports = router;