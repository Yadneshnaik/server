const express = require('express');
const router = express.Router();
const PlanBooking = require('../models/PlanBooking');
const nodemailer = require('nodemailer');

// POST /api/planbookings
router.post('/', async (req, res) => {
    const { name, email, selectedPlan } = req.body;

    try {
        // Save booking to MongoDB
        const newBooking = new PlanBooking({ name, email, selectedPlan });
        await newBooking.save();

        // Send Email using Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Plan Booking Confirmation',
            html: `
                <h2>Thank you, ${name}!</h2>
                <p>You have successfully booked the <strong>${selectedPlan}</strong> plan.</p>
                <p>We'll contact you shortly.</p>
                <hr/>
                <p style="font-size:12px;">Infrenox Pvt Ltd.</p>
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Booking successful and email sent.' });
    } catch (error) {
        console.error('Booking Error:', error);
        res.status(500).json({ message: 'Failed to book plan or send email.' });
    }
});

module.exports = router;
