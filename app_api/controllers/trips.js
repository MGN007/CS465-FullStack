const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// GET all trips
const tripsList = async (req, res) => {
  const q = await Trip.find({}).exec();

  if (!q) {
    return res
      .status(404)
      .json({ message: 'No trips found' });
  } else {
    return res
      .status(200)
      .json(q);
  }
};

// GET one trip by code
const tripsFindByCode = async (req, res) => {
  const q = await Trip.find({ code: req.params.tripCode }).exec();

  if (!q || q.length === 0) {
    return res
      .status(404)
      .json({ message: 'Trip not found' });
  } else {
    return res
      .status(200)
      .json(q);
  }
};

// POST add trip
const tripsAddTrip = async (req, res) => {
  try {
    const newTrip = new Trip({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description
    });

    const q = await newTrip.save();

    return res
      .status(201)
      .json(q);
  } catch (err) {
    return res
      .status(400)
      .json(err);
  }
};

// PUT update trip
const tripsUpdateTrip = async (req, res) => {
  const q = await Trip.findOneAndUpdate(
    { code: req.params.tripCode },
    {
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description
    }
  ).exec();

  if (!q) {
    return res
      .status(404)
      .json({ message: 'Trip not updated' });
  } else {
    return res
      .status(201)
      .json(q);
  }
};

// DELETE trip
const tripsDeleteTrip = async (req, res) => {
  const q = await Trip.findOneAndDelete({ code: req.params.tripCode }).exec();

  if (!q) {
    return res
      .status(404)
      .json({ message: 'Trip not found' });
  } else {
    return res
      .status(200)
      .json({ message: 'Trip deleted successfully' });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip
};