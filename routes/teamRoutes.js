const express = require('express');
const router = express.Router();
const Team = require('../models/Team');

// Route to insert a new team member into the database
router.post('/add', async (req, res) => {
    try {
        const { name, role, description, profileLink } = req.body;

        const newTeamMember = new Team({
            name,
            role,
            description,
            profileLink
        });

        await newTeamMember.save();
        res.status(201).json({ message: 'Team member added successfully', teamMember: newTeamMember });
    } catch (error) {
        res.status(400).json({ error: 'Error adding the team member' });
    }
});

// Route to fetch all team members from the database
router.get('/', async (req, res) => {
    try {
        const teamMembers = await Team.find();
        res.status(200).json(teamMembers);
    } catch (error) {
        res.status(400).json({ error: 'Error fetching team members' });
    }
});

module.exports = router;
