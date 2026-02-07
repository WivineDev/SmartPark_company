const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const app = require('./app');
const db = require('./config/db');

const PORT = process.env.PORT || 5000;

// Test Database Connection
db.getConnection()
    .then(connection => {
        console.log('Database connected successfully');
        connection.release();
    })
    .catch(err => {
        console.error('Failed to connect to database:', err);
    });

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

server.on('error', (error) => {
    console.error('Server error:', error);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    // server.close(() => process.exit(1));
});
