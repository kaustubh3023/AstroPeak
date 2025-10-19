const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Serve static files from client directory
app.use(express.static(path.join(__dirname, 'client')));

// For React Router - serve index.html for all routes
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'client', 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('index.html not found');
  }
});

app.listen(port, 'localhost', () => {
  console.log(`
🚀 Your Astrology Website is running!
📍 Open: http://localhost:${port}
💡 To stop: Press Ctrl+C
  `);
});