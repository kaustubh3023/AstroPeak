const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, 'client')));

// For any other route, serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

app.listen(port, 'localhost', () => {
  console.log(`Server running at http://localhost:${port}`);
});