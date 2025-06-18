// models/budget.js
const db = require('../config/db');

class Budget {
  /**
   * Create a new budget entry.
   * Uses a transaction to ensure atomicity.
   */
  static async create({ user_id, category, limit_amount, month }) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // Insert new budget
      const [insertResult] = await connection.execute(
        `INSERT INTO budgets (user_id, category, limit_amount, month)
         VALUES (?, ?, ?, ?)`,
        [user_id, category, limit_amount, month]
      );

      const budgetId = insertResult.insertId;

      // Fetch and return the inserted budget
      const [rows] = await connection.execute(
        `SELECT * FROM budgets WHERE id = ?`,
        [budgetId]
      );

      await connection.commit();
      return rows[0];
    } catch (error) {
      await connection.rollback();
      throw new Error(`Budget creation failed: ${error.message}`);
    } finally {
      connection.release();
    }
  }

  /**
   * Retrieve all budgets for a specific user, sorted by most recent month.
   */
  static async findByUserId(userId) {
    try {
      const [rows] = await db.execute(
        `SELECT * FROM budgets WHERE user_id = ? ORDER BY month DESC`,
        [userId]
      );
      return rows;
    } catch (error) {
      throw new Error(`Fetching budgets failed: ${error.message}`);
    }
  }

  /**
   * Optional: Retrieve a single budget by ID
   */
  static async findById(id) {
    try {
      const [rows] = await db.execute(
        `SELECT * FROM budgets WHERE id = ?`,
        [id]
      );
      return rows[0];
    } catch (error) {
      throw new Error(`Fetching budget by ID failed: ${error.message}`);
    }
  }

  /**
   * Optional: Delete a budget by ID
   */
  static async delete(id) {
    try {
      const [result] = await db.execute(
        `DELETE FROM budgets WHERE id = ?`,
        [id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Deleting budget failed: ${error.message}`);
    }
  }

  /**
   * Optional: Update a budget
   */
  static async update(id, { category, limit_amount, month }) {
    try {
      const [result] = await db.execute(
        `UPDATE budgets SET category = ?, limit_amount = ?, month = ? WHERE id = ?`,
        [category, limit_amount, month, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Updating budget failed: ${error.message}`);
    }
  }
}

module.exports = Budget;
