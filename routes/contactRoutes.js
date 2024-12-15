const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const contact = new Contact({ name, email, message });
        await contact.save();
        res.json({ message: 'Contact saved successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
