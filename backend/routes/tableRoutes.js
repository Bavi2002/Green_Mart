const express = require("express");
const { getOrderById, getAllOrders } = require("../controller/Order"); // Ensure correct path and naming

const router = express.Router();

// Route to get a specific order by ID
router.get("/orders/:id", getOrderById);

// Route to get all orders
router.get("/orders", getAllOrders);

module.exports = router;
