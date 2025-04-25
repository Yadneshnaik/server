const mongoose = require('mongoose');

const planBookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    selectedPlan: {
        type: String,
        required: true
    },
    bookedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('PlanBooking', planBookingSchema);
