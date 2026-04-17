// Load environment variables from the .env file into process.env
require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');

// Import Passport for authentication handling
var passport = require('passport');

// Load the Passport configuration (strategy setup)
require('./app_api/config/passport');

// Connect to MongoDB
require('./app_api/models/db');

// Import route files
var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var travelRouter = require('./app_server/routes/travel');

// Import API routes
var apiRouter = require('./app_api/routes/index');

// Initialize Express app
var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));
app.set('view engine', 'hbs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Passport so it can handle authentication
app.use(passport.initialize());

// Cors fix
app.use(function(req, res, next) {
  // Allow Angular app running on port 4200 to talk to this backend
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Allow the headers Angular will send, including Authorization for JWTs
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  // Allow standard API request methods
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  // Handle browser preflight OPTIONS requests immediately
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// Disable Chashing to fix 404 error
app.disable('etag');

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);
app.use('/api', apiRouter);

// Catch 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;