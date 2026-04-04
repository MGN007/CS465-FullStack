// Old static JSON file access is no longer needed because
// trip data will now come from the API endpoint.
// const fs = require('fs');
// const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

// API endpoint for retrieving all trips
const tripsEndpoint = 'http://localhost:3000/api/trips';

// Options for the fetch request
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
};

/* GET travel view */
// This controller now gets trip data from the API instead of trips.json
const travel = async (req, res) => {
    try {
        // Call the API and wait for the response
        const response = await fetch(tripsEndpoint, options);

        // Convert the response into JSON
        let json = await response.json();

        // Default message for error or empty data conditions
        let message = null;

        // If the API response is not an array, show an API error
        if (!(json instanceof Array)) {
            message = 'API lookup error';
            json = [];
        }
        // If the response is an empty array, show a no data message
        else if (!json.length) {
            message = 'No trips exist in our database!';
        }

        // Render the travel page using data returned from the API
        res.render('travel', {
            title: 'Travlr Getaways',
            trips: json,
            message
        });
    } catch (err) {
        // Handle API communication errors
        res.status(500).send(err.message);
    }
};

// Export the controller so it can be used in the route file
module.exports = {
    travel
};