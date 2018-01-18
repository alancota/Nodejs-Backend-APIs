const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({message: 'Handling GET requests to /books'});
});

router.post('/', (req, res, next) => {

  const book = {
    name: req.body.name,
    price: req.body.price
  };

  res.status(201).json({message: 'Adding new book', status: 'success', createdBook: book});
});

router.get('/:bookId', (req, res, next) => {
  const id = req.params.bookId;
  if (id == 'special') {
    res.status(200).json({message: 'Special ID', id: id})
  } else {
    res.status(200).json({message: 'ID received'})
  }
});

router.patch('/:bookId', (req, res, next) => {
  const id = req.params.bookId;
  res.status(200).json({message: 'Product updated!', id: id})
});

router.delete('/:bookId', (req, res, next) => {
  const id = req.params.bookId;
  res.status(200).json({message: 'Product deleted!', id: id})
});

module.exports = router;
