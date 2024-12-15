const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.post('/add', async (req, res) => {
    const { title, description, price } = req.body;

    try {
        const newService = new Service({ title, description });
        const savedService = await newService.save();
        res.status(201).json(savedService);
    } catch (err) {
        res.status(500).json({ message: 'Failed to add service', error: err.message });
    }
});

module.exports = router;
