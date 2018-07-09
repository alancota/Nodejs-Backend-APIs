const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

// Import the book MongoDB Schema
const Order = require('../models/orders');
const Product = require('../models/books');

// Delete the orders
router.delete('/orders/', (req, res, next) => {
  Order.remove({})
       .exec()
       .then(result => {
         res.status(200).json({
           message: "Orders deleted",
           log: result
         })
       })
       .catch(err => {
         res.status(500).json({
           error: err
         })
       });
});

// Delete the books
router.delete('/books/', (req, res, next) => {
  Product.remove({})
       .exec()
       .then(result => {
         res.status(200).json({
           message: "Books deleted",
           log: result
         })
       })
       .catch(err => {
         res.status(500).json({
           error: err
         })
       });
});

module.exports = router;
