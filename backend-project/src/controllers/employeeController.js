const Employee = require('../models/Employee');
const Department = require('../models/Department');

exports.createEmployee = async (req, res) => {
    try {
        const { employeeNumber, firstName, lastName, position, address, telephone, gender, hiredDate, departmentCode } = req.body;

        // Validation
        if (!employeeNumber || !firstName || !lastName || !departmentCode) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Check Department
        const dept = await Department.findByCode(departmentCode);
        if (!dept) {
            return res.status(400).json({ success: false, message: 'Invalid department code' });
        }

        // Check Existing Employee
        const existing = await Employee.findById(employeeNumber);
        if (existing) {
            return res.status(400).json({ success: false, message: 'Employee number already exists' });
        }

        await Employee.create(req.body);
        res.status(201).json({ success: true, message: 'Employee created' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll();
        res.json({ success: true, message: 'Operation successful', data: employees });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, departmentCode } = req.body;

        // Check Department if updating
        if (departmentCode) {
            const dept = await Department.findByCode(departmentCode);
            if (!dept) {
                return res.status(400).json({ success: false, message: 'Invalid department code' });
            }
        }

        await Employee.update(id, req.body);
        res.json({ success: true, message: 'Employee updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        await Employee.delete(id);
        res.json({ success: true, message: 'Employee deleted' });
    } catch (error) {
        console.error(error);
        // Check for specific error codes (e.g., foreign key constraint) here if needed
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
