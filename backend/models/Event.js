const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  eventDate: { type: Date, required: true },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
});

module.exports = mongoose.model('Event', eventSchema);
