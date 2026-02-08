
const bcrypt = require('bcryptjs');
const db = require('../src/config/db');
const User = require('../src/models/User');

const createAdmin = async () => {
    const username = process.argv[2];
    const password = process.argv[3];

    if (!username || !password) {
        console.log('Usage: node scripts/create_admin.js <username> <password>');
        process.exit(1);
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(`Creating user: ${username} with password: ${password}`);
        
        // Check if user exists
        const existingUser = await User.findByUsername(username);
        if (existingUser) {
            console.log('User already exists. Updating password...');
             await db.execute('UPDATE User SET password = ? WHERE username = ?', [hashedPassword, username]);
             console.log('Password updated successfully.');
        } else {
             await User.create(username, hashedPassword);
             console.log('User created successfully.');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error creating user:', error);
        process.exit(1);
    }
};

createAdmin();
