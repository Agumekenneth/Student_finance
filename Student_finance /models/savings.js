const db = require('../config/db');

class Savings {
  static async create({ user_id, account_name, total_amount, target_amount }) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();
      const [result] = await connection.execute(
        'INSERT INTO savings (user_id, account_name, total_amount, target_amount) VALUES (?, ?, ?, ?)',
        [user_id, account_name, total_amount, target_amount]
      );
      await connection.commit();
      const [savings] = await connection.execute('SELECT * FROM savings WHERE id = ?', [result.insertId]);
      return savings[0];
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }

  static async findByUserId(userId) {
    const [rows] = await db.execute('SELECT * FROM savings WHERE user_id = ?', [userId]);
    return rows;
  }
}

module.exports = Savings;