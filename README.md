# SmartPark Payroll Management System

## Overview

**SmartPark** is a company located in Rubavu District, Western Province of Rwanda, offering multiple car-related services. The organization previously relied on a manual, paper-based system to manage employee records and payroll, which resulted in inefficiencies, errors, and difficulties in reporting.

This project introduces a **web-based Payroll Management System** designed to digitize HR and payroll operations, improve accuracy, and support timely report generation.

---

## Problem Statement

The existing manual system caused several challenges:

* Slow payroll processing and frequent human errors
* Difficulty tracking employee salary payments
* Poor record management and data loss risks
* Inefficient generation of monthly payroll and HR reports

---

## Proposed Solution

The SmartPark Payroll Management System is a web-based application that:

* Digitally manages employee and department records
* Automates payroll calculations
* Stores payroll data securely in a database
* Generates accurate and timely payroll reports

---

## System Features

* Employee management (add, update, view employee records)
* Department management
* Payroll processing (gross salary, deductions, net salary)
* Monthly payroll reports
* Secure and centralized data storage

---

## System Users

* **Human Resource (HR) Officer**: Manages employees, departments, and payroll
* **System Administrator**: Manages system configuration and access

---

## Task Requirements



### Task 1: Entity Relationship Diagram (ERD)

The ERD design must:

* Use the provided attributes
* Clearly identify primary keys and foreign keys
* Show relationships between entities

---

## Entities and Attributes

### Employee

* Employee Number (Primary Key)
* First Name
* Last Name
* Address
* Position
* Telephone
* Gender
* Hired Date
* Department Code (Foreign Key)

### Department

* Department Code (Primary Key)
* Department Name

### Payroll

* Payroll ID (Primary Key)
* Employee Number (Foreign Key)
* Gross Salary
* Total Deduction
* Net Salary
* Month of Payment

---

## Relationships

* One **Department** can have many **Employees**
* One **Employee** can have many **Payroll** records

---

## Expected Outcomes

* Reduced payroll processing time
* Improved data accuracy and consistency
* Easy tracking of employee payments
* Efficient generation of monthly payroll reports

---

## Technologies (Suggested)

* Frontend: HTML, CSS, JavaScript
* Backend: PHP
* Database: MySQL
* Server: Apache (XAMPP)

---

## Conclusion

The SmartPark Payroll Management System modernizes HR and payroll operations by replacing manual processes with a reliable digital solution. This system improves efficiency, accuracy, and decision-making while supporting the company’s growth.
