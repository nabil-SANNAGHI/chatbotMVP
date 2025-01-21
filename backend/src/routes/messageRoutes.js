const express = require('express');
const { handleMessage, getMessages } = require('../controllers/messageController');
const { validateMessage } = require('../middlewares/validation');
const router = express.Router();

// Routes 
router.post('/', validateMessage, handleMessage);
router.get('/', getMessages);

module.exports = router;