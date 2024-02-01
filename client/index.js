// server/index.js
const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve the React app
app.use(express.static(path.join(__dirname, '/build')));

// Define your server-side routes or APIs here

// Catch-all route to serve the React app's HTML file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});