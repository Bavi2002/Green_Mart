// controllers/returnController.js
const ReturnRequest = require('../models/returnModel');

// Create a new return request
exports.createReturnRequest = async (req, res) => {
    try {
        const returnRequestData = new ReturnRequest({
            productName: req.body.productName,
            orderId: req.body.orderId,
            email: req.body.email,
            address: req.body.address,
            reason: req.body.reason,
            deliveredDate: new Date(req.body.deliveredDate),
            phoneNumber: req.body.phoneNumber,
            image: req.file ? `http://localhost:${process.env.PORT}/uploads/images/${req.file.filename}` : null
        });

        await returnRequestData.save();
        res.status(201).send({ id: returnRequestData.id, ...returnRequestData.toObject() });
    } catch (error) {
        console.error('Error saving return request:', error);
        res.status(400).send({ error: 'Failed to submit return request.' });
    }
};

// Get all return requests
exports.getAllReturns = async (req, res) => {
    try {
        const returnRequests = await ReturnRequest.find();
        res.json(returnRequests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching return requests', error });
    }
};

// Update a return request
exports.updateReturnRequest = async (req, res) => {
    try {
        const returnRequest = await ReturnRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!returnRequest) {
            return res.status(404).send();
        }
        res.status(200).send(returnRequest);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a return request
exports.deleteReturnRequest = async (req, res) => {
    try {
        const returnRequest = await ReturnRequest.findByIdAndDelete(req.params.id);
        if (!returnRequest) {
            return res.status(404).send({ message: 'Return request not found' });
        }
        res.status(200).send({ message: 'Return request deleted successfully' });
    } catch (error) {
        console.error('Error deleting return request:', error);
        res.status(500).send({ error: 'Failed to delete return request' });
    }
};
