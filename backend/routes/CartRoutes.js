const express = require('express');
const router = express.Router();
const { checkoutCart } = require('../controller/CartController');
const { getCartDetails } = require('../controller/CartController');


// Route to handle checkout
router.post('/checkout', checkoutCart);
router.get('/cart/:userId', getCartDetails);

module.exports = router;
