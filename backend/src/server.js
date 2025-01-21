const app = require('./app');
const prisma = require('./config/db');

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    try {
        await prisma.$connect();
        console.log('Connected to the database.');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
});
