const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: [ // Changed from items to products
    {
      name: { type: String, required: true },
      description: { type: String },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true }, // Ensure this matches the frontend
      imageUrl: { type: String },
      totalAmount: { type: Number },
    }
  ],
  totalAmount: { type: Number, required: true },
  totalQuantity: { type: Number, required: true },
  couponCode: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
