const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = 3000;

// GET endpoint
app.get('/', (req, res) => {
    res.send('Hello World! Hasif');
});

// POST endpoint to handle client input
app.post('/send-message', (req, res) => {
    const { message } = req.body;
    
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }
    
    const response = `Server received: "${message}"`;
    res.json({ success: true, response });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});