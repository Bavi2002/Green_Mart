const mongoose = require("mongoose");

const deliveryPersonSchema = mongoose.Schema({
  name: String,
  contact_number: String,
  email: String,
  address: String,
  vehicle_type: String,
  vehicle_number: String,
  assigned_area: {
    type: [String],
    required: true,
  },
  current_status: {
    type: String,
    enum: ['Available', 'On Delivery', 'Unavailable'],
    default: 'Available',
  },
  deliveries_completed: Number,
  notes: String,
}, {
  timestamps: true,
});

const DeliveryPerson = mongoose.model("DeliveryPerson", deliveryPersonSchema);
module.exports = DeliveryPerson;
