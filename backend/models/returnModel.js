// models/ReturnRequest.js
const mongoose = require('mongoose');

// Define Return Request Schema
const returnRequestSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    orderId: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    reason: { type: String, required: true },
    deliveredDate: { type: Date, required: true },
    phoneNumber: { type: String, required: true },
    image: { type: String, required: true } // URL to the uploaded image
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Create a virtual property 'id' that is a string representation of the _id
returnRequestSchema.virtual('id').get(function () {
    return this._id.toString();
});

const ReturnRequest = mongoose.model('ReturnRequest', returnRequestSchema);

module.exports = ReturnRequest;
