const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    resume: { type: String, required: true }, // Store file path or name
});

const careerSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: String, required: true },
    location: { type: String, required: true },
    applications: [applicationSchema], // Embedded array for applications
});

module.exports = mongoose.model('Career', careerSchema);
