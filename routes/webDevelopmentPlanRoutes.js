const express = require('express');
const router = express.Router();
const WebDevelopmentPlan = require('../models/WebDevelopmentPlan');

// Route to insert Web Development Plans into the database
router.post('/add', async (req, res) => {
    try {
        const { title, price, description, features, whatIsFree } = req.body;

        const newPlan = new WebDevelopmentPlan({
            title,
            price,
            description,
            features,
            whatIsFree
        });

        await newPlan.save();
        res.status(201).json({ message: 'Web Development Plan added successfully', plan: newPlan });
    } catch (error) {
        res.status(400).json({ error: 'Error adding the Web Development Plan' });
    }
});

// Route to fetch Web Development Plans from the database
router.get('/', async (req, res) => {
    try {
        const plans = await WebDevelopmentPlan.find();
        res.status(200).json(plans);
    } catch (error) {
        res.status(400).json({ error: 'Error fetching Web Development Plans' });
    }
});

module.exports = router;
