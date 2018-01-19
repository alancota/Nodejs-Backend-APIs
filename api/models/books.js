const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the MongoDB Schema
const bookSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
});

module.exports = mongoose.model('books', bookSchema);
