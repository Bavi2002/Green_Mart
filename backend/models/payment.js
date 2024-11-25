const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  paymentId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  telephone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  paymentMethod: { type: String, default: 'Not specified' },
  discount: { type: Number, default: 0 },
  packagingCharge: { type: Number, default: 0 },
  deliveryCharge: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
