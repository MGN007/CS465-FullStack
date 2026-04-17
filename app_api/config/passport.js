// Import Passport so we can configure authentication strategies
const passport = require('passport');

// Import the local strategy for username/password authentication
const LocalStrategy = require('passport-local').Strategy;

// Import mongoose so we can interact with MongoDB models
const mongoose = require('mongoose');

// Import the User model so we can look up users in the database
const User = require('../models/user');

// Configure Passport to use a local authentication strategy
passport.use(
  new LocalStrategy(
    {
      // Tell Passport to use email instead of username
      usernameField: 'email'
    },
    async (username, password, done) => {

      // Find the user in the database by email address
      const q = await User.findOne({ email: username }).exec();

      // If no user is found, return an authentication failure
      if (!q) {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }

      // If the password does not match, return an authentication failure
      if (!q.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }

      // If both email and password are correct, return the user object
      return done(null, q);
    }
  )
);