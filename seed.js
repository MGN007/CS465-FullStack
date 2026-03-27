const mongoose = require('mongoose');
const Trip = require('./app_server/models/travlr');
const trips = require('./data/trips.json');

const dbURI = 'mongodb://127.0.0.1/travlr';

async function seedDB() {
  try {
    await mongoose.connect(dbURI);
    console.log('Connected to MongoDB');

    await Trip.deleteMany({});
    console.log('Old data removed');

    await Trip.insertMany(trips);
    console.log('Data successfully loaded!');

    await mongoose.connection.close();
    console.log('Connection closed');
  } catch (err) {
    console.error('Error:', err);
  }
}

seedDB();