const prisma = require('../config/db');

// Function to clean and normalize text
const normalizeText = (text) => {
    return text.toLowerCase().replace(/[^\w\s,]/g, '').trim();
};

// Handle incoming messages
exports.handleMessage = async (req, res) => {
    const { content } = req.body;

    // Validate message content
    if (!content || content.trim() === '') {
        return res.status(400).json({ error: 'Message content is required' });
    }

    try {
        // Fetch all response pairs from the database
        const responsePairs = await prisma.responsePair.findMany();

        // Normalize user input
        const normalizedInput = normalizeText(content);

        // Search for phrase-based matches
        const matchedResponse = responsePairs.find(pair => {
            const keywordPhrases = pair.keywords.split(',').map(kw => normalizeText(kw.trim()));
            return keywordPhrases.some(phrase => normalizedInput.includes(phrase));
        });
        
        // If a response is found, save the user message and bot response to the database
        if (matchedResponse) {
            await prisma.message.create({ data: { content, sender: 'user' } });
            await prisma.message.create({ data: { content: matchedResponse.response, sender: 'bot' } });

            res.json({ response: matchedResponse.response });
        } else {
            res.json({ response: "Sorry, I don't understand your query." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// Get all messages from the database
exports.getMessages = async (req, res) => {
    try {
        const responses = await prisma.message.findMany({select: {content: true, sender: true}});
        res.json(responses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to fetch responses' });
    }
};

