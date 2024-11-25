const mongoose = require('mongoose');

const packingOrderSchema = new mongoose.Schema({
    pa_id: String,
    pro_id: String,
    o_id: String,
    quantity: Number,
    material: String,
    internalMeasurement: String,
    customColor: String,
    selectedPattern: String,
    customNote: String,
    deliverDate: String,
    status: String,
});

const PackingOrder = mongoose.model('PackingOrder', packingOrderSchema);

module.exports = PackingOrder;
