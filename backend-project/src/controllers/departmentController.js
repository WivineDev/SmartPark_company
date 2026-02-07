const Department = require('../models/Department');

exports.createDepartment = async (req, res) => {
    const { departmentCode, departmentName } = req.body;

    if (!departmentCode || !departmentName) {
        return res.status(400).json({ success: false, message: 'Missing fields' });
    }

    try {
        const existing = await Department.findByCode(departmentCode);
        if (existing) {
            return res.status(400).json({ success: false, message: 'Department code already exists' });
        }

        await Department.create({ departmentCode, departmentName });
        res.status(201).json({ success: true, message: 'Department created' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.findAll();
        res.json({ success: true, message: 'Operation successful', data: departments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.updateDepartment = async (req, res) => {
    try {
        const { code } = req.params;
        const { departmentName } = req.body;

        await Department.update(code, { departmentName });
        res.json({ success: true, message: 'Department updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.deleteDepartment = async (req, res) => {
    try {
        const { code } = req.params;
        // Ideally check if employees exist in this department first to prevent FK error or handle it in catch
        await Department.delete(code);
        res.json({ success: true, message: 'Department deleted' });
    } catch (error) {
        console.error(error);
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            return res.status(400).json({ success: false, message: 'Cannot delete: Department has employees' });
        }
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
