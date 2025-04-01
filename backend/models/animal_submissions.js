const mongoose = require('mongoose');

const animalSubmissionSchema = new mongoose.Schema({
    name: String,
    ID: String,
    color: String,
    species: String,
    submittedAt: {
        type: Date,
        default: Date.now
    },
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['pending', 'rejected'],
        default: 'pending'
    },
});

module.exports = mongoose.model('AnimalSubmission', animalSubmissionSchema);
