const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  emaill: String,
  fnamee: String,
  lnamee: String,
  habitual_residence: {
    type: [String], // Array of strings
    required: true,
  },
  address: String,
  p_nbb: String,
  zipcode: String,
}, {
  timestamps: true
});

const ItemModel = mongoose.model("Customer", itemSchema);

module.exports = ItemModel;
