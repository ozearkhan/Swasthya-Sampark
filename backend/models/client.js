// models/client.js
const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    clientId: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Client', ClientSchema);