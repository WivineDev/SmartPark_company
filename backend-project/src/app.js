const express = require('express');
const cors = require('cors');
const session = require('express-session');
const sessionConfig = require('./config/session');

const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const salaryRoutes = require('./routes/salaryRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Allow frontend
    credentials: true // Allow cookies
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/salaries', salaryRoutes);
app.use('/api/reports', reportRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

module.exports = app;
