const express = require('express');
const router = express.Router();
const About = require('../models/About'); // Assuming you have an About model

// GET request to fetch the "About Us" data
router.get('/', async (req, res) => {
    try {
        const aboutData = await About.findOne(); // Fetch one document (since it's usually a single About Us section)
        if (!aboutData) {
            return res.status(404).json({ message: 'About Us data not found' });
        }
        res.json(aboutData); // Send the fetched data as response
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST request to add/update the "About Us" data
router.post('/add', async (req, res) => {
    const { title, description } = req.body;

    try {
        const newAbout = new About({
            title,
            description,
        });

        // Save the new About Us data to the database
        const savedAbout = await newAbout.save();
        res.status(201).json(savedAbout); // Return saved data
    } catch (err) {
        res.status(500).json({ message: 'Failed to add About Us data', error: err.message });
    }
});

module.exports = router;
