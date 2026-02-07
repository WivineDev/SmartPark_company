const db = require('../config/db');

class Employee {
    static async create(data) {
        const { employeeNumber, firstName, lastName, position, address, telephone, gender, hiredDate, departmentCode } = data;
        const sql = `INSERT INTO Employee (employeeNumber, firstName, lastName, position, address, telephone, gender, hiredDate, departmentCode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        await db.execute(sql, [employeeNumber, firstName, lastName, position, address, telephone, gender, hiredDate, departmentCode]);
        return employeeNumber;
    }

    static async findAll() {
        const [rows] = await db.execute('SELECT * FROM Employee');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.execute('SELECT * FROM Employee WHERE employeeNumber = ?', [id]);
        return rows[0];
    }

    static async count() {
        const [rows] = await db.execute('SELECT COUNT(*) as count FROM Employee');
        return rows[0].count;
    }

    static async update(id, data) {
        const { firstName, lastName, position, address, telephone, gender, hiredDate, departmentCode } = data;
        const sql = `UPDATE Employee SET firstName=?, lastName=?, position=?, address=?, telephone=?, gender=?, hiredDate=?, departmentCode=? WHERE employeeNumber=?`;
        await db.execute(sql, [firstName, lastName, position, address, telephone, gender, hiredDate, departmentCode, id]);
        return id;
    }

    static async delete(id) {
        await db.execute('DELETE FROM Employee WHERE employeeNumber = ?', [id]);
        return true;
    }
}

module.exports = Employee;
