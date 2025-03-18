// models/StrayReport.js
const mongoose = require('mongoose');

const StrayReportSchema = new mongoose.Schema({
    reporterUsername: String,  // The volunteer's username
    animalDescription: String, // e.g. "Small brown dog"
    location: String,          // e.g. "Main Street"
    notes: String,             // Any extra info
    reportedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('StrayReport', StrayReportSchema);
