const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    classCode: {
        type: String,
        required: true,
        unique: true,
    },
    location: {
        type: String,
        required: true,
    },
    classTime: {
        type: String,
        required: true,
    },
    groupLink: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model('Class', classSchema);