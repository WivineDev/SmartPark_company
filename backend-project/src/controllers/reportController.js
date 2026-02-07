const Salary = require('../models/Salary');

exports.getPayrollReport = async (req, res) => {
    const { month } = req.query;

    if (!month) {
        return res.status(400).json({ success: false, message: 'Month parameter is required' });
    }

    try {
        const reportData = await Salary.getPayrollReport(month);
        res.json({ success: true, message: 'Operation successful', data: reportData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
