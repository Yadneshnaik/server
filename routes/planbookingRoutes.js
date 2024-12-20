const express = require('express');
const PlanBooking = require('../models/PlanBooking');

const router = express.Router();

// POST /api/bookings - Create a new booking
router.post('/', async (req, res) => {
    try {
        const { name, email, selectedPlan } = req.body;

        // Validation
        if (!name || !email || !selectedPlan) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create a new plan booking
        const newPlanBooking = new PlanBooking({
            name,
            email,
            selectedPlan,
        });

        await newPlanBooking.save();
        res.status(201).json({ message: 'Plan booking successful', booking: newPlanBooking });
    } catch (error) {
        console.error('Error creating plan booking:', error);
        res.status(500).json({ error: 'An error occurred. Please try again.' });
    }
});

module.exports = router;
