const xss = require('xss');

// Middleware to sanitize input
const sanitizeInput = (req, res, next) => {
    try {
        if (req.body) {
            req.body = sanitizeObject(req.body);
        }
        if (req.query) {
            req.query = sanitizeObject(req.query);
        }
        if (req.params) {
            req.params = sanitizeObject(req.params);
        }
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid input detected' });
    }
};

// Recursively sanitize object properties
const sanitizeObject = (obj) => {
    if (typeof obj === 'string') {
        return xss(obj);
    } else if (typeof obj === 'object' && obj !== null) {
        for (const key in obj) {
            obj[key] = sanitizeObject(obj[key]);
        }
    }
    return obj;
};

module.exports = sanitizeInput;
