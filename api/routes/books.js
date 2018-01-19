const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

// Import the book MongoDB Schema
const Book = require('../models/books');

// GET - List all books
router.get('/', (req, res, next) => {
  // List all the books
  Book.find()
      .exec()
      .then(docs => {
        console.log("All available books: " + docs);
        res.status(200).json(docs);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });

});

// POST - Create a new book
router.post('/', (req, res, next) => {

  //Store the new book into the mongodb
  const book = new Book({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });

  // Add the new book to the database
  book.save()
      .then(result => {
        // Success
        console.log('Book successfully added to the DB: ' + result);
        res.status(201).json({message: 'Adding new book', status: 'success', createdBook: book});
      })
      .catch(err => {
        // Error
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
});

// GET details of a book using a bookID
router.get('/:bookId', (req, res, next) => {
  const id = req.params.bookId;

  Book.findById(id)
    .exec()
    .then(doc => {
      // Success
      // If the book has been found
      if (doc) {
        console.log("Book retrieved from database: " + doc);
        res.status(200).json(doc);
      } else {
        // Book not found
        res.status(404).json({ message: 'Item not found'});
      }

    })
    // Error
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });

});

// PATCH: update a specific book
router.patch('/:bookId', (req, res, next) => {
  const id = req.params.bookId;
  const updateOps = {};
  for ( const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  };

  Book.update({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        console.log(result);
        res.status(200).json({
          message: "Book updated!"
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });

});

// DELETE: delete a specific book
router.delete('/:bookId', (req, res, next) => {
  const id = req.params.bookId;
  Book.remove({_id: id})
          .exec()
          .then(result => {
            // Success
            console.log("Item "+ id + "deleted! - "+ result)
            res.status(200).json({message: 'Product deleted!', result: result})
          })
          .catch(err => {
            res.status(500).json({
              error: err
            })
          });

});

module.exports = router;
