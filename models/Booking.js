const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    service: { type: String, required: true }, // Reference to the service being booked
});

module.exports = mongoose.model('Booking', BookingSchema);
