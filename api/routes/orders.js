const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

// Import the book MongoDB Schema
const Order = require('../models/orders');
const Product = require('../models/books');

// List all available orders
router.get('/', (req, res, next) => {
  Order.find()
       .select("_id product quantity")
       .exec()
       .then(docs => {
         res.status(200).json({
             count: docs.length,
             order: docs.map(doc => {
               return {
                 orderid: doc._id,
                 productid: doc.product,
                 quantity: doc.quantity,
                 request: {
                   type: 'GET',
                   url: req.protocol + '://'+ req.hostname + ':' + req.socket.localPort + req.originalUrl + '/' + doc._id
                 }
               }
             })
         });
       })
       .catch(err => {
          res.status(500).json({
              error: err
          })
       });
});

// Place new Order
router.post('/', (req, res, next) => {

console.log(req.body);

  // Check if the given product actualy exists
  Product.findById(req.body.productId)
         .then(product => {

           const order = new Order({
               _id: new mongoose.Types.ObjectId(),
               product: req.body.productId,
               quantity: req.body.quantity
           })

           order.save()
               .then(result => {
                 console.log('Order successfully placed: '+result);
                 res.status(201).json({
                   message: "Order placed",
                   createdOrder: {
                     _id: result._id,
                     product: result.product,
                     quantity: result.quantity,
                     request: {
                       type: 'GET',
                       url: req.protocol + '://'+ req.host + ':' + req.socket.localPort + req.originalUrl + '/' + result.id
                     }
                   }
                 });
               })
               .catch(err => {
                 res.status(500).json({
                    message: "Error placing order",
                    error: err
                 });
               });

         })
         .catch(err => {
           res.status(500).json({
              message: "Product not found",
              error: err
           });
         });
});

// Get information about a specific order
router.get('/:orderId', (req, res, next) => {
  const id = req.params.orderId;

  Order.findById(id)
       .select("_id product quantity")
       .exec()
       .then(doc => {
         if (doc) {
           // Get the product name to present
           Product.findById(doc.product)
                  .select("name")
                  .exec()
                  .then(prod => {
                    if (prod) {
                      res.status(200).json({
                        orderid: id,
                        productid: doc.product,
                        name: prod.name,
                        quantity: doc.quantity
                      });
                    } else {
                      res.status(200).json({
                        orderid: id,
                        productid: doc.product,
                        quantity: doc.quantity
                      });
                    }
                  })
                  .catch();


         } else {
           res.status(404).json({
             message: "Order not found"
           });
         }
       })
       .catch(err => {
         res.status(500).json({
           error: err
         });
       });
});

// Change an Order
router.patch('/:orderId', (req, res, next) => {
  const id = req.params.orderId;
  const updateOps = {};
  for ( const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  };

  Order.update({ _id: id}, { $set: updateOps })
       .exec()
       .then(result => {
         res.status(200).json({
           message: "Order updated",
           request: {
             type: 'GET',
             url: req.protocol + '://'+ req.hostname + ':' + req.socket.localPort + req.originalUrl
           }
         });
       })
       .catch(err => {
         res.status(500).json({
           error: err
         });
       });
});

router.delete('/:orderId', (req, res, next) => {
  const id = req.params.orderId;
  Order.remove({ _id: id})
       .exec()
       .then(result => {
         res.status(200).json({
           message: "Order deleted",
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
