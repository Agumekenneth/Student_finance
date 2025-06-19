const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const register = async (req, res) => {
    const { email, password, first_name, last_name } = req.body;
    console.log('Register input:', { email, password, first_name, last_name });
  
    try {
      const password_hash = await bcrypt.hash(password, 12);
      console.log('Password hashed');
  
      const [result] = await db.execute(
        'INSERT INTO users (email, password_hash, first_name, last_name) VALUES (?, ?, ?, ?)',
        [email, password_hash, first_name, last_name]
      );
      console.log('Insert result:', result);
  
      const token = jwt.sign({ id: result.insertId, email }, JWT_SECRET);
      res.status(201).json({ token });
    } catch (err) {
      console.error('Register error:', err);  // 👈 log full error
      res.status(400).json({ message: 'Email already exists' });
    }
  };
  

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, email }, JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getProfile = async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT id, email, first_name, last_name, created_at FROM users WHERE id = ?',
      [req.user.id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
};

module.exports = {
  register,
  login,
  getProfile
};
