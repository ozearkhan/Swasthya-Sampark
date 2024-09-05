const mongoose = require('mongoose');
const logger = require('./logger');

exports.connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        logger.info('Connected to MongoDB');
    } catch (error) {
        logger.error('MongoDB connection error:', error);
        process.exit(1);
    }
};