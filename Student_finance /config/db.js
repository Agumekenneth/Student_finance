const mysql = require('mysql2/promise');
require('dotenv').config();

// Create the database pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 10 // Set a reasonable queue limit
});

db.getConnection()
  .then(connection => {
    console.log('Connected to database: student_finance_Tracker');
    connection.release();
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });

module.exports = db;