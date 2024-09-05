// services/symptomService.js
const Symptom = require('../models/symptom');
const Client = require('../models/client');
const geminiAPI = require('./geminiAPI');
const logger = require('../config/logger');
const { v4: uuidv4 } = require('uuid');

exports.registerClient = async () => {
    const clientId = uuidv4();
    await Client.create({ clientId });
    logger.info(`New client registered with ID: ${clientId}`);
    return clientId;
};

exports.addInitialSymptom = async (clientId, symptom) => {
    const newSymptom = await Symptom.create({ clientId, name: symptom });
    logger.info(`Initial symptom added for client ${clientId}: ${symptom}`);
    return { success: true, data: newSymptom };
};

exports.expandSymptom = async (clientId, symptom) => {
    const expandedSymptoms = await geminiAPI.expandSymptom(symptom);
    if (!expandedSymptoms) {
        throw new Error('Failed to expand symptom');
    }
    const updatedSymptom = await Symptom.findOneAndUpdate(
        { clientId, name: symptom },
        { expanded: expandedSymptoms },
        { new: true, upsert: true }
    );
    logger.info(`Symptom expanded successfully for client ${clientId}: ${symptom}`);
    return { success: true, data: updatedSymptom };
};

exports.selectSymptoms = async (clientId, selectedSymptoms) => {
    await Symptom.updateMany(
        { clientId, name: { $in: selectedSymptoms } },
        { selected: true }
    );
    logger.info(`Selected symptoms for client ${clientId}: ${selectedSymptoms.join(', ')}`);
    return { success: true, message: 'Symptoms selected successfully' };
};

exports.checkFurtherSymptoms = async (clientId) => {
    const selectedSymptomCount = await Symptom.countDocuments({ clientId, selected: true });
    const furtherSymptomsLikely = selectedSymptomCount < 5;
    logger.info(`Further symptoms likely for client ${clientId}: ${furtherSymptomsLikely}`);
    return { success: true, furtherSymptomsLikely, currentSymptomCount: selectedSymptomCount };
};

exports.getSymptomsByClientId = async (clientId) => {
    const symptoms = await Symptom.find({ clientId });
    logger.info(`Fetched symptoms for client ${clientId}`);
    return symptoms;
};