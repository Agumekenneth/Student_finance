const db = require('../config/db');

exports.createBudget = async (req, res) => {
  const { category, limit_amount, month } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO budgets (user_id, category, limit_amount, month) VALUES (?, ?, ?, ?)',
      [req.user.id, category, limit_amount, month]
    );
    const [budget] = await db.execute('SELECT * FROM budgets WHERE id = ?', [result.insertId]);
    res.status(201).json(budget[0]);
  } catch (err) {
    res.status(400).json({ message: 'Invalid budget data or duplicate entry' });
  }
};

exports.getBudgets = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM budgets WHERE user_id = ? ORDER BY month DESC', [req.user.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching budgets' });
  }
};