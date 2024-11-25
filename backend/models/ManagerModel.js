const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
  {
    username: String,
    dili_address: String,
    dili_date: String,
    dili_status: String,
    dili_method: String,
    dili_cost: String,
    assignes_personal: String,
    notes: String,
  },
  {
    timestamps: true,
  }
);

const Manager = mongoose.model("Admin", adminSchema);
module.exports = Manager;
