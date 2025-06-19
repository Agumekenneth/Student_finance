const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');

// ✅ Test route should come before any dynamic route
router.get('/test', (req, res) => {
  res.send('Budgets route works');
});

// Create a new budget
router.post('/', async (req, res) => {
  try {
    const { user_id, category, limit_amount, month } = req.body;
    if (!user_id || !category || !limit_amount || !month) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newBudget = await Budget.create({ user_id, category, limit_amount, month });
    res.status(201).json({ message: 'Budget created', data: newBudget });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create budget', details: err.message });
  }
});

// Get all budgets for a specific user
router.get('/:user_id', async (req, res) => {
  try {
    const userId = req.params.user_id;
    const budgets = await Budget.findByUserId(userId);
    res.status(200).json(budgets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch budgets', details: err.message });
  }
});

module.exports = router;
