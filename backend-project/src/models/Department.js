const db = require('../config/db');

class Department {
    static async create(data) {
        const { departmentCode, departmentName } = data;
        // grossSalary and totalDeduction default to 0
        const sql = 'INSERT INTO Department (departmentCode, departmentName) VALUES (?, ?)';
        await db.execute(sql, [departmentCode, departmentName]);
        return departmentCode;
    }

    static async findAll() {
        const [rows] = await db.execute('SELECT * FROM Department');
        return rows;
    }

    static async findByCode(code) {
        const [rows] = await db.execute('SELECT * FROM Department WHERE departmentCode = ?', [code]);
        return rows[0];
    }

    static async update(code, data) {
        const { departmentName } = data;
        const sql = 'UPDATE Department SET departmentName=? WHERE departmentCode=?';
        await db.execute(sql, [departmentName, code]);
        return code;
    }

    static async delete(code) {
        await db.execute('DELETE FROM Department WHERE departmentCode = ?', [code]);
        return true;
    }
}

module.exports = Department;
