const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

exports.register = async (req, res) => {
  const { email, password, first_name, last_name } = req.body;
  try {
    const password_hash = await bcrypt.hash(password, 12);
    const [result] = await db.execute(
      'INSERT INTO users (email, password_hash, first_name, last_name) VALUES (?, ?, ?, ?)',
      [email, password_hash, first_name, last_name]
    );
    const token = jwt.sign({ id: result.insertId, email }, JWT_SECRET);
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ message: 'Email already exists' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];
    if (!user || !await bcrypt.compare(password, user.password_hash)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, email }, JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT id, email, first_name, last_name, created_at FROM users WHERE id = ?', [req.user.id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
};