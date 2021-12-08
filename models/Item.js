const mongoose = require('mongoose');
const { format } = require('date-fns');

const Item = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  createdAt: { type: String },
});

module.exports = mongoose.model('Item', Item);
