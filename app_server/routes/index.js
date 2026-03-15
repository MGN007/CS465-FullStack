var express = require('express');
var router = express.Router();

// Import the main controller we created
const ctrlMain = require('../controllers/main');

/* GET home page. */
// This route now calls the controller instead of rendering directly
router.get('/', ctrlMain.index);

module.exports = router;
