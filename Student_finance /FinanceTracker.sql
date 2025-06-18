CREATE DATABASE student_finance_Tracker;
USE student_finance_Tracker;


CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  description VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  category ENUM('food', 'textbooks', 'transportation', 'entertainment', 'accommodation', 'healthcare', 'clothing', 'miscellaneous', 'income') NOT NULL,
  type ENUM('income', 'expense') NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE budgets (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  category ENUM('food', 'textbooks', 'transportation', 'entertainment', 'accommodation', 'healthcare', 'clothing', 'miscellaneous') NOT NULL,
  limit_amount DECIMAL(10,2) NOT NULL,
  month VARCHAR(7) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_budget (user_id, category, month),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE savings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  account_name VARCHAR(100) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  target_amount DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);