const express = require('express');
const Booking = require('../models/Booking');

const router = express.Router();

// Route to create a new booking
router.post('/', async (req, res) => {
    const { name, email, date, time, service } = req.body;

    if (!name || !email || !date || !time || !service) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Check if the slot is already booked for the same service
        const existingBooking = await Booking.findOne({ date, time, service });
        if (existingBooking) {
            return res
                .status(409)
                .json({ message: 'This slot is already booked. Please choose another slot.' });
        }

        const newBooking = new Booking({ name, email, date, time, service });
        await newBooking.save();

        res.status(201).json({ message: 'Booking successful', booking: newBooking });
    } catch (error) {
        res.status(500).json({ message: 'Error booking slot. Please try again.', error });
    }
});

module.exports = router;
