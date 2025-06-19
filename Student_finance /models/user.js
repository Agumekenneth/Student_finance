const db = require('../config/db');

class User {
  static async create({ email, password_hash, first_name, last_name }) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();
      const [result] = await connection.execute(
        'INSERT INTO users (email, password_hash, first_name, last_name) VALUES (?, ?, ?, ?)',
        [email, password_hash, first_name, last_name]
      );
      await connection.commit();
      const [user] = await connection.execute('SELECT * FROM users WHERE id = ?', [result.insertId]);
      return user[0];
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }

  static async findByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT id, email, first_name, last_name, created_at FROM users WHERE id = ?', [id]);
    return rows[0];
  }
}

module.exports = User;