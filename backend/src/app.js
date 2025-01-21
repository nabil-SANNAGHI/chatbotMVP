const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const messageRoutes = require('./routes/messageRoutes');
const responseRoutes = require('./routes/responseRoutes');
const sanitizeInput = require('./middlewares/xssMiddleware');

// Rate limit for API requests
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, 
    message: 'Too many requests, please try again later.',
});

// Create express app
const app = express();

// Middleware to parse incoming requests
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use('/api/',limiter);
app.use(bodyParser.json());
app.use(sanitizeInput);

// Routes
app.use('/api/message', messageRoutes);
app.use('/api/responses', responseRoutes);

module.exports = app;