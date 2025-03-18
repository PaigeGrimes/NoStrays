// models/Animal.js
const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
    name: String,
    species: String,
    // Add additional fields if needed (e.g., caretakerId, healthStatus)
});

module.exports = mongoose.model('Animal', AnimalSchema);
