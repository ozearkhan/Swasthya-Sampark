require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const { errorHandler } = require('./middleware/errorHandler');
const symptomRoutes = require('./routes/symptoms');
const logger = require('./config/logger');
const { connectDB } = require('./config/database');
const geminiAPI = require('./services/geminiAPI');
const cors = require("cors");
const path = require('path');


const app = express();

// Middleware
app.use(cors());
app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; connect-src 'self' ws: wss:;"
    );
    next();
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/symptoms', symptomRoutes);

// Error handling
app.use(errorHandler);


// Database connection
connectDB();

// Check Gemini API health every 5 minutes
setInterval(async () => {
    const isHealthy = await geminiAPI.checkApiHealth();
    if (!isHealthy) {
        logger.warn('Gemini API is not accessible');
    }
}, 5 * 60 * 1000);

module.exports = app;