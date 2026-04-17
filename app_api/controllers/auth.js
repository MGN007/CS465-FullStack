// Import mongoose so we can access our models
const mongoose = require('mongoose');

// Import passport so we can use authentication strategies
const passport = require('passport');

// Get the User model from mongoose
const User = mongoose.model('users');


// =======================
// REGISTER FUNCTION
// =======================

// This function handles user registration
const register = async (req, res) => {

  // Check if required fields are missing
  if (!req.body.name || !req.body.email || !req.body.password) {

    // Return error if any field is missing
    return res.status(400).json({ message: 'All fields required' });
  }

  try {
    // Create a new user instance
    const user = new User();

    // Assign values from request body
    user.name = req.body.name;
    user.email = req.body.email;

    // Set password (this will hash it using your model method)
    user.setPassword(req.body.password);

    // Save the user to the database
    await user.save();

    // Generate JWT token
    const token = user.generateJWT();

    // Return the token to the client
    res.status(200).json({ token });

  } catch (err) {
    // Handle any errors during registration
    res.status(400).json(err);
  }
};


// =======================
// LOGIN FUNCTION
// =======================

// This function handles user login
const login = (req, res) => {

  // Check if email and password are provided
  if (!req.body.email || !req.body.password) {

    // Return error if missing fields
    return res.status(400).json({ message: 'All fields required' });
  }

  // Use Passport to authenticate user
  passport.authenticate('local', (err, user, info) => {

    // If there was an error, return it
    if (err) {
      return res.status(404).json(err);
    }

    // If user exists (valid login)
    if (user) {

      // Generate JWT token
      const token = user.generateJWT();

      // Return token to client
      return res.status(200).json({ token });

    } else {
      // If authentication failed, return message
      return res.status(401).json(info);
    }

  })(req, res);
};


// Export both functions so routes can use them
module.exports = {
  register,
  login
};