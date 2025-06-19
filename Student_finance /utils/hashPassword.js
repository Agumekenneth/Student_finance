const bcrypt = require('bcrypt');

module.exports = {
  hash: async (password) => await bcrypt.hash(password, 12),
  compare: async (password, hash) => await bcrypt.compare(password, hash)
};