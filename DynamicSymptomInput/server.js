const app = require('./app');
const http = require('http');
const socketIo = require('socket.io');
const logger = require('./config/logger');
const symptomService = require('./services/symptomService');
const geminiAPI = require('./services/geminiAPI');
const cors = require('cors');
const corsConfig = require('./cors/corsConfig');
const chatRouter = require('./routes/chat');
const authRouter = require('./routes/auth');
const consultationRouter = require('./routes/consultation');
const imageToTextRouter = require('./routes/imageToText');
const { connectDB } = require('./config/database');
const express = require("express");

const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketIo(server);

const MAX_ITERATIONS = 7;

// Middleware
app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// app.use('/api/symptoms', symptomRoutes);
app.use('/api/chat', chatRouter);
app.use('/api/auth', authRouter);
app.use('/api/consultation', consultationRouter);
app.use('/api/image-to-text', imageToTextRouter);

// Database connection
connectDB();

// Check Gemini API health every 5 minutes
setInterval(async () => {
    const isHealthy = await geminiAPI.checkApiHealth();
    if (!isHealthy) {
        logger.warn('Gemini API is not accessible');
    }
}, 5 * 60 * 1000);

io.on('connection', async (socket) => {
    logger.info('New client connected');

    let currentIteration = 0;
    let collectedSymptoms = [];

    // Register new client and get clientId
    const clientId = await symptomService.registerClient();
    logger.info(`New client registered with ID: ${clientId}`);
    socket.emit('registered', { clientId });
    logger.info(`Sent 'registered' event with clientId: ${clientId}`);

    const processSymptom = async (symptom) => {
        try {
            // Add initial symptom
            const addResult = await symptomService.addInitialSymptom(clientId, symptom);
            collectedSymptoms.push(symptom);

            // Expand symptom
            const expandResult = await symptomService.expandSymptom(clientId, symptom);

            // Check if we should continue
            currentIteration++;
            const shouldContinue = currentIteration < MAX_ITERATIONS && collectedSymptoms.length < 5;

            socket.emit('symptomProcessed', {
                addedSymptom: addResult.data,
                expandedSymptoms: expandResult.data.expanded,
                currentIteration,
                collectedSymptoms,
                shouldContinue
            });

            if (!shouldContinue) {
                const finalResult = await symptomService.checkFurtherSymptoms(clientId);
                socket.emit('processComplete', finalResult);
            }
        } catch (error) {
            logger.error(`Error processing symptom: ${error.message}`, { stack: error.stack });
            socket.emit('error', error.message);
        }
    };

    socket.on('submitSymptom', processSymptom);

    socket.on('selectSymptoms', async (selectedSymptoms) => {
        try {
            await symptomService.selectSymptoms(clientId, selectedSymptoms);
            collectedSymptoms = [...new Set([...collectedSymptoms, ...selectedSymptoms])];
            processSymptom(selectedSymptoms[selectedSymptoms.length - 1]);
        } catch (error) {
            logger.error(`Error selecting symptoms: ${error.message}`, { stack: error.stack });
            socket.emit('error', error.message);
        }
    });

    socket.on('resetProcess', () => {
        currentIteration = 0;
        collectedSymptoms = [];
        logger.info(`Process reset for client ${clientId}`);
        socket.emit('processReset');
    });

    socket.on('disconnect', () => {
        logger.info('Client disconnected');
    });
});

server.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});