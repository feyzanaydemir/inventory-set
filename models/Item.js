const mongoose = require('mongoose');
const { format } = require('date-fns');

const Item = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  createdAt: { type: String },
});

Item.index({ userId: 1, createdAt: -1 });
Item.index({ userId: 1, name: 1 });
Item.index({ userId: 1, brand: 1 });

module.exports = mongoose.model('Item', Item);
