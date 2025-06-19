const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

module.exports = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  // For refresh token: jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });
};