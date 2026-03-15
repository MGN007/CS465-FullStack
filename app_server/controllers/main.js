// Controller function for the home page
// This function renders the index view when the route is requested

/* GET home page */
const index = (req, res) => {
    res.render('index', { title: 'Travlr Getaways' });
};

// Export the controller so it can be used in the route file
module.exports = {
    index
};