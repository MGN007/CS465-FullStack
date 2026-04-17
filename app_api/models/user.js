// Import mongoose so we can define a schema and model for users
const mongoose = require('mongoose');

// Import crypto so we can hash and salt passwords securely
const crypto = require('crypto');

// Import jsonwebtoken so we can generate JWTs for authenticated users
const jwt = require('jsonwebtoken');

// Define the schema for a user record in MongoDB
const userSchema = new mongoose.Schema({

  // Store the user's email address and require it to be unique
  email: {
    type: String,
    unique: true,
    required: true
  },

  // Store the user's display name and require it
  name: {
    type: String,
    required: true
  },

  // Store the hashed password value
  hash: String,

  // Store the salt used to create the hashed password
  salt: String
});

// Method to generate and store a salted password hash for the user
userSchema.methods.setPassword = function(password) {

  // Create a random 16-byte salt and convert it to a hex string
  this.salt = crypto.randomBytes(16).toString('hex');

  // Create the password hash using pbkdf2Sync and store it as a hex string
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

// Method to validate a password entered during login
userSchema.methods.validPassword = function(password) {

  // Hash the provided password using the stored salt
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');

  // Return true if the new hash matches the stored hash
  return this.hash === hash;
};

// Method to generate a JWT for the current user
userSchema.methods.generateJWT = function() {
    
  // Sign and return a JWT containing the user's id, email, and name
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// Create the User model using the users collection name
const User = mongoose.model('users', userSchema);

// Export the User model so it can be used in other files
module.exports = User;