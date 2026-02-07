const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config(); // Load .env from CWD

async function seedUser() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        const username = 'admin';
        const password = 'password123';
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if user exists
        const [rows] = await connection.execute('SELECT * FROM User WHERE username = ?', [username]);
        if (rows.length > 0) {
            console.log('User admin already exists');
        } else {
            await connection.execute('INSERT INTO User (username, password) VALUES (?, ?)', [username, hashedPassword]);
            console.log('User admin created with password: password123');
        }

        await connection.end();
    } catch (error) {
        console.error('Error seeding user:', error);
    }
}

seedUser();
