const express = require('express');
const db = require('./src/config/db');

const app = express();
const PORT = 3002;

// Middleware to parse JSON
app.use(express.json());

// Import routes
const authRoutes = require('./src/routes/authRoutes');
const productRoutes = require('./src/routes/productRoutes');
const orderRoutes = require('./src/routes/orderRoutes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

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
