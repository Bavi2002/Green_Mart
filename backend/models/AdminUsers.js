const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  contactNo: String,
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('AdminUser', userSchema);
module.exports = User;
