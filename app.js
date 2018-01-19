const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// ES6 Promises
mongoose.Promise = global.Promise;

const bookRoutes = require('./api/routes/books');
const orderRoutes = require('./api/routes/orders');

// Log middleware
app.use(morgan('dev'));
// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost/demo');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected!!!");
});

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({
      methods: {
        allowed: 'PUT, POST, PATCH, DELETE, GET'
      }
    });
  }
  next();
});

// Routes
app.use('/books', bookRoutes);
app.use('/orders', orderRoutes);

// Not found errors handling
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Any other Error
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
