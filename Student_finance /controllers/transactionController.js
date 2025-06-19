const db = require('../config/db');

exports.createTransaction = async (req, res) => {
  const { description, amount, category, type, date } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO transactions (user_id, description, amount, category, type, date) VALUES (?, ?, ?, ?, ?, ?)',
      [req.user.id, description, amount, category, type, date]
    );
    const [transaction] = await db.execute('SELECT * FROM transactions WHERE id = ?', [result.insertId]);
    res.status(201).json(transaction[0]);
  } catch (err) {
    res.status(400).json({ message: 'Invalid transaction data' });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC', [req.user.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching transactions' });
  }
};