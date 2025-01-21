const { body, validationResult } = require('express-validator');

// Validate messages input
const validateMessage = [
    body('content')
        .trim()
        .notEmpty().withMessage('Message content is required')
        .isLength({ max: 500 }).withMessage('Message is too long'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

// Validate response pairs input with comma-separated keywords
const validateResponse = [
    body('keywords')
        .trim()
        .notEmpty().withMessage('Keywords are required')
        .custom((keywords) => {
            const keywordArray = keywords.split(',').map((k) => k.trim());
            if (keywordArray.length === 0 || keywordArray.some((k) => k === '')) {
                throw new Error('All keywords must be non-empty strings');
            }
            return true;
        }),
    body('response')
        .trim()
        .notEmpty().withMessage('Response text is required')
        .isLength({ max: 500 }).withMessage('Response is too long'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = { validateMessage, validateResponse };
