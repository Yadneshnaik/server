const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, { timestamps: true }); // This will add createdAt and updatedAt fields

const About = mongoose.model('About', aboutSchema);

module.exports = About;
