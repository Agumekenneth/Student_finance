const db = require('../config/db');

class Transaction {
  static async create({ user_id, description, amount, category, type, date }) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();
      const [result] = await connection.execute(
        'INSERT INTO transactions (user_id, description, amount, category, type, date) VALUES (?, ?, ?, ?, ?, ?)',
        [user_id, description, amount, category, type, date]
      );
      await connection.commit();
      const [transaction] = await connection.execute('SELECT * FROM transactions WHERE id = ?', [result.insertId]);
      return transaction[0];
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }

  static async findByUserId(userId) {
    const [rows] = await db.execute('SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC', [userId]);
    return rows;
  }
}

module.exports = Transaction;