const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the MongoDB Schema
const bookSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    price: {type: Number, required: true}
});

module.exports = mongoose.model('books', bookSchema);
