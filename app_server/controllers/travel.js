// Import the Node.js file system module to read external files
const fs = require('fs');

// Read the trips.json file and convert it from JSON text into a JavaScript object
// This allows us to use the trip data dynamically in our application
const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

/* GET travel view */
// This controller function renders the travel page and passes data to the view
const travel = (req, res) => {
    res.render('travel', { 
        title: 'Travlr Getaways', // Page title
        trips // Pass the trips data to the Handlebars template
    });
};

// Export the controller so it can be used in the route file
module.exports = {
    travel
};