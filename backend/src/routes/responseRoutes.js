const express = require('express');
const { getResponses, addResponse, deleteResponse, updateResponse } = require('../controllers/responseController');
const { validateResponse } = require('../middlewares/validation');
const router = express.Router();

// Routes
router.get('/', getResponses);
router.post('/',validateResponse, addResponse);
router.delete('/:id', deleteResponse);
router.put('/:id',validateResponse, updateResponse);

module.exports = router;
