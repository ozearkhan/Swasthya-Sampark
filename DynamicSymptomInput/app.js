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
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/symptoms', symptomRoutes);

// New routes from health-ai
const chatRouter = require('./routes/chat');
const authRouter = require('./routes/auth');
const consultationRouter = require('./routes/consultation');
const imageToTextRouter = require('./routes/imageToText');

app.use('/api/chat', chatRouter);
app.use('/api/auth', authRouter);
app.use('/api/consultation', consultationRouter);
app.use('/api/image-to-text', imageToTextRouter);

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