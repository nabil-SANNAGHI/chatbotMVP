const prisma = require('../config/db');

// Function to validate keywords
const validateKeywords = (keywords) => {
    const keywordList = keywords.split(',').map(keyword => keyword.trim());
    return keywordList.length >= 3;
};

// Get all response pairs from the database
exports.getResponses = async (req, res) => {
    try {
        const responses = await prisma.responsePair.findMany();
        res.json(responses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to fetch responses' });
    }
};

// Add a new response pair to the database
exports.addResponse = async (req, res) => {
    const { keywords, response } = req.body;

    // Validate keywords
    if (!validateKeywords(keywords)) {
        return res.status(400).json({ error: 'Keywords must contain at least 3 words' });
    }

    // Validate input
    if (!keywords || !response) {
        return res.status(400).json({ error: 'Keywords and response are required' });
    }


    // Add response to the database
    try {
        const newResponse = await prisma.responsePair.create({
            data: { keywords, response },
        });
        res.json(newResponse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to add response' });
    }
};


// Update an existing response pair in the database
exports.updateResponse = async (req, res) => {
    const { id } = req.params;
    const { keywords, response } = req.body;

    // Validate keywords
    if (!validateKeywords(keywords)) {
        return res.status(400).json({ error: 'Keywords must contain at least 3 words' });
    }

    // Validate input
    if (!keywords || !response) {
        return res.status(400).json({ error: 'Keywords and response are required' });
    }

    // Update response in the database
    try {
        const updatedResponse = await prisma.responsePair.update({
            where: { id: parseInt(id) },
            data: { keywords, response },
        });
        res.json(updatedResponse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to update response' });
    }
}

// Delete a response pair from the database
exports.deleteResponse = async (req, res) => {
    const { id } = req.params;

    // Delete response from the database
    try {
        await prisma.responsePair.delete({ where: { id: parseInt(id) } });
        res.json({ message: 'Response deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to delete response' });
    }
}

