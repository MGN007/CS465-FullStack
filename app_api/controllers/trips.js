const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// GET /api/trips - return all trip records
const tripsList = async (req, res) => {
  const q = await Trip.find({}).exec();

  if (!q) {
    return res
      .status(404)
      .json(q);
  } else {
    return res
      .status(200)
      .json(q);
  }
};

// GET /api/trips/:tripCode - return one trip by code
const tripsFindByCode = async (req, res) => {
  const q = await Trip.find({ code: req.params.tripCode }).exec();

  if (!q || q.length === 0) {
    return res
      .status(404)
      .json(q);
  } else {
    return res
      .status(200)
      .json(q);
  }
};

module.exports = {
  tripsList,
  tripsFindByCode
};