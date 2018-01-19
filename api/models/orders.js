const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the MongoDB Schema
const orderSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'books'},
    quantity: {type: Number, default: 1},
    total: {type: Number, required: false}
});

module.exports = mongoose.model('orders', orderSchema);
