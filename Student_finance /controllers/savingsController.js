const db = require('../config/db');

exports.createSavings = async (req, res) => {
  const { account_name, total_amount, target_amount } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO savings (user_id, account_name, total_amount, target_amount) VALUES (?, ?, ?, ?)',
      [req.user.id, account_name, total_amount, target_amount]
    );
    const [savings] = await db.execute('SELECT * FROM savings WHERE id = ?', [result.insertId]);
    res.status(201).json(savings[0]);
  } catch (err) {
    res.status(400).json({ message: 'Invalid savings data' });
  }
};

exports.getSavings = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM savings WHERE user_id = ?', [req.user.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching savings' });
  }
};