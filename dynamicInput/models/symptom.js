// models/symptom.js
const mongoose = require('mongoose');

const SymptomSchema = new mongoose.Schema({
    clientId: {
        type: String,
        required: true,
        ref: 'Client'
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    expanded: {
        type: mongoose.Schema.Types.Mixed,
        default: null,
    },
    selected: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('Symptom', SymptomSchema);