const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({message: 'Handling GET requests to /orders'});
});

router.post('/', (req, res, next) => {
  const order = {
    bookId: req.body.bookId,
    quantity: req.body.quantity
  };
  res.status(201).json({message: 'New order placed', status: 'success', order: order});
});

router.get('/:orderId', (req, res, next) => {
  res.status(200).json({message: 'Order details', id: req.params.orderId});
});

router.patch('/:orderId', (req, res, next) => {
  res.status(200).json({message: 'Change order', id: req.params.orderId});
});

router.delete('/:orderId', (req, res, next) => {
  res.status(200).json({message: 'Order Deleted', id: req.params.orderId});
});

module.exports = router;
