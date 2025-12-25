const express = require('express');
const db = require('./src/config/db');

const app = express();
const PORT = 3002;

// Middleware to parse JSON (if you want to handle POST requests)
app.use(express.json());

// Test route to check DB connection
app.get('/', (res) => {
  db.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }
    res.send(`DB is working! Example query result: ${results[0].solution}`);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
