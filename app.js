const express = require('express');
const ipfilter = require('express-ipfilter').IpFilter;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const delay = require('express-delay');

// Whitelist the following IPs
var ips = ['34.213.86.33'];

const app = express();

// The following line adds latency to the transaction
// 2000 == 2 seconds
// 5000 == 5 seconds
// 15000 = 15 seconds

//app.use(delay(5000));

// ES6 Promises
mongoose.Promise = global.Promise;

const bookRoutes = require('./api/routes/books');
const orderRoutes = require('./api/routes/orders');
const newdemoRoutes = require('./api/routes/newdemo');

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
  console.log("Mongo DB Connected");
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

// Allow traffic only from the IPs with the variable
app.use(ipfilter(ips, {mode: 'allow'}));

// Routes
app.use('/books', bookRoutes);
app.use('/orders', orderRoutes);
app.use('/newdemo', newdemoRoutes);

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
