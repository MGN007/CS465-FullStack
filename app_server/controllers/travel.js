// Controller function for the travel page
// This function renders the travel view when the route is requested

/* GET travel view */
const travel = (req, res) => {
    res.render('travel', { title: 'Travlr Getaways' });
};

// Export the controller so it can be used in the route file
module.exports = {
    travel
};