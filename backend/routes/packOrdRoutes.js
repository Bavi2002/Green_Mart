const express = require('express');
const router = express.Router();
const packingOrdersController = require('../controller/packOrdController');

router.get('/', packingOrdersController.getAllPackingOrders);
router.post('/', packingOrdersController.createPackingOrder);
router.put('/:id', packingOrdersController.updatePackingOrder);

module.exports = router;
