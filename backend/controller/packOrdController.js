const PackingOrder = require('../models/packOrdModel');

// Get all packing orders
exports.getAllPackingOrders = async (req, res) => {
    try {
        const orders = await PackingOrder.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Create a new packing order
exports.createPackingOrder = async (req, res) => {
    try {
        const order = new PackingOrder(req.body);
        await order.save();
        res.status(201).send(order);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Update packing order status
exports.updatePackingOrder = async (req, res) => {
    try {
        const { status } = req.body;
        const updatedOrder = await PackingOrder.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
