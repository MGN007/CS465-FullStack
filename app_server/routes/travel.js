// Import Express framework
var express = require('express');
var router = express.Router();

// Import the travel controller
var controller = require('../controllers/travel');

/* GET travel page */
// This route calls the travel controller to render the travel view
router.get('/', controller.travel);

// Export the router so it can be used by the main application
module.exports = router;