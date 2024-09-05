const logger = require('../config/logger');

exports.errorHandler = (err, req, res, next) => {
    logger.error(err.stack);

    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || 'Server Error'
    });
};