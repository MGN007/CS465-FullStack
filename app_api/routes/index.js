const express = require('express');
const router = express.Router();

// Import jsonwebtoken so we can verify JWTs for protected routes
const jwt = require('jsonwebtoken');

const tripsController = require('../controllers/trips');

// Import authentication controller for login and register
const authController = require('../controllers/auth');

// Middleware function to check and verify JWT before allowing access
function authenticateJWT(req, res, next) {

  // Get the Authorization header from the request
  const authHeader = req.headers['authorization'];

  // If no Authorization header is present, deny access
  if (authHeader == null) {
    return res.sendStatus(401);
  }

  // Split the header into parts: "Bearer token"
  const parts = authHeader.split(' ');

  // If the format is incorrect, deny access
  if (parts.length < 2) {
    return res.sendStatus(401);
  }

  // Extract the token portion from the header
  const token = parts[1];

  // If no token is found, deny access
  if (token == null) {
    return res.sendStatus(401);
  }

  // Verify the token using the secret key from .env
  jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {

    // If verification fails, deny access
    if (err) {
      return res.sendStatus(401);
    }

    // Attach decoded token data to request for use in controllers
    req.auth = verified;

    // Continue to the next function (the actual route)
    next();
  });
}

router.post('/register', authController.register);

// Route to log in a user
router.post('/login', authController.login);

// /api/trips
router
  .route('/trips')
  .get(tripsController.tripsList)

  // Protect POST so only authenticated users can add trips
  .post(authenticateJWT, tripsController.tripsAddTrip);


// /api/trips/:tripCode
router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)

  // Protect PUT so only authenticated users can update trips
  .put(authenticateJWT, tripsController.tripsUpdateTrip)

  // Protect DELETE so only authenticated users can delete trips
  .delete(authenticateJWT, tripsController.tripsDeleteTrip);

module.exports = router;