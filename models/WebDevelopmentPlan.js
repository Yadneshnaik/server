const mongoose = require('mongoose');

// Define the schema for the Web Development Plan
const WebDevelopmentPlanSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    features: [String],
    whatIsFree: [String]
});

// Create the model
const WebDevelopmentPlan = mongoose.model('WebDevelopmentPlan', WebDevelopmentPlanSchema);

module.exports = WebDevelopmentPlan;
