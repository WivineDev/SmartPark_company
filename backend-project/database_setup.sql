CREATE DATABASE IF NOT EXISTS EPMS;
USE EPMS;

-- Department Table
CREATE TABLE IF NOT EXISTS Department (
  departmentCode VARCHAR(10) PRIMARY KEY,
  departmentName VARCHAR(50) NOT NULL,
  grossSalary DECIMAL(10,2) DEFAULT 0.00,
  totalDeduction DECIMAL(10,2) DEFAULT 0.00
);

-- Employee Table
CREATE TABLE IF NOT EXISTS Employee (
  employeeNumber VARCHAR(20) PRIMARY KEY,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  position VARCHAR(50) NOT NULL,
  address VARCHAR(100),
  telephone VARCHAR(15),
  gender ENUM('Male','Female') NOT NULL,
  hiredDate DATE NOT NULL,
  departmentCode VARCHAR(10),
  FOREIGN KEY (departmentCode) REFERENCES Department(departmentCode)
);

-- Salary Table
CREATE TABLE IF NOT EXISTS Salary (
  salaryId INT AUTO_INCREMENT PRIMARY KEY,
  employeeNumber VARCHAR(20),
  grossSalary DECIMAL(10,2) NOT NULL,
  totalDeduction DECIMAL(10,2) NOT NULL,
  netSalary DECIMAL(10,2) GENERATED ALWAYS AS (grossSalary - totalDeduction) STORED,
  month VARCHAR(20) NOT NULL,
  FOREIGN KEY (employeeNumber) REFERENCES Employee(employeeNumber) ON DELETE CASCADE
);

-- User Table (Authentication)
CREATE TABLE IF NOT EXISTS User (
  userId INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Insert Initial User (Optional, password needs to be hashed)
-- INSERT INTO User (username, password) VALUES ('admin', 'hashed_password_here');
