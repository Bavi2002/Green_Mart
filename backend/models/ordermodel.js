const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: String,
  totalAmount: Number,
  items: Array, // Could be more specific if you want
  status: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Orders', orderSchema);
