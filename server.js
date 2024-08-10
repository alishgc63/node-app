// server.js
const express = require('express');
const path = require('path');
const app = express();
const db = require('./db');

let adminControl = 'random'; // Default to 'random'

// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Route for serving admin.html
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin', 'admin.html'));
});

// API routes
app.post('/check', async (req, res) => {
    let win;

    if (adminControl === 'random') {
        win = Math.random() >= 0.5; // Randomly decide win or lose
    } else {
        win = adminControl === 'win';
    }

    // Log the outcome to the database
    try {
        await db.query('INSERT INTO game_logs (outcome, timestamp) VALUES (?, NOW())', [win ? 'win' : 'lose']);
    } catch (err) {
        console.error('Database error:', err);
    }

    res.json({ win });
});

app.post('/admin', async (req, res) => {
    adminControl = req.body.mode;
    res.status(200).send();
});

app.get('/admin/current', (req, res) => {
    res.json({ mode: adminControl });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
