const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db'); // ✅ Import the database connection
const budgetsRoutes = require('./routes/budgets');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/budgets', budgetsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  res.status(500).json({ message: 'Internal server error' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
