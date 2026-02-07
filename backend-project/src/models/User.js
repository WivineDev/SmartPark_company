const db = require('../config/db');

class User {
    static async findByUsername(username) {
        const [rows] = await db.execute('SELECT * FROM User WHERE username = ?', [username]);
        return rows[0];
    }

    static async create(username, password) {
        const [result] = await db.execute('INSERT INTO User (username, password) VALUES (?, ?)', [username, password]);
        return result.insertId;
    }
}

module.exports = User;
