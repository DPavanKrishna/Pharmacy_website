const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Request logger middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
});

// Serve static files (HTML, CSS, JS, SVGs, images) from root
app.use(express.static(path.join(__dirname)));

// Root fallback route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`\n🚀 A2Z Pharmacy Web App active at http://localhost:${PORT}\n`);
});
