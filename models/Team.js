const mongoose = require('mongoose');

// Define the schema for the Team
const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    profileLink: {
        type: String,
        required: true
    }
});

// Create the model
const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;
