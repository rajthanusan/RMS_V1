
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  person: { type: String, required: true },
  reservationDate: { type: String, required: true },
  time: { type: String, required: true },
  message: { type: String, required: false }
});

module.exports = mongoose.model('Booking', bookingSchema);
