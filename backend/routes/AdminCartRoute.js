const express =  require('express');
const router = express.Router();
const cartController = require('../controller/AdminCartController');

router.post('/checkout',cartController.posToCart);
router.get('/cart',cartController.getFromCart);

module.exports = router;