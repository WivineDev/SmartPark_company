const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function initDb() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            multipleStatements: true
        });

        const sql = fs.readFileSync(path.join(__dirname, '../../database_setup.sql'), 'utf8');

        console.log('Running SQL setup...');
        await connection.query(sql);
        console.log('Database initialized successfully');
        await connection.end();
    } catch (error) {
        console.error('Error initializing database:', error);
        process.exit(1);
    }
}

initDb();
