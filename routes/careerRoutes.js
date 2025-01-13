const express = require('express');
const router = express.Router();
const multer = require('multer');
const Career = require('../models/Career');

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/resumes');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage: storage });

// Route to fetch all job positions
router.get('/', async (req, res) => {
    try {
        const jobs = await Career.find();
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to create a new job position
router.post('/', async (req, res) => {
    const { title, description, requirements, location } = req.body;
    const career = new Career({ title, description, requirements, location });

    try {
        const newCareer = await career.save();
        res.status(201).json(newCareer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route to apply for a job
router.post('/:id/apply', upload.single('resume'), async (req, res) => {
    const { id } = req.params;
    const { name, email, contact } = req.body;
    const resume = req.file ? req.file.path : null;

    if (!resume) {
        return res.status(400).json({ message: 'Resume upload is required.' });
    }

    try {
        const job = await Career.findById(id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found.' });
        }

        job.applications.push({ name, email, contact, resume });
        await job.save();
        res.status(201).json({ message: 'Application submitted successfully.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
