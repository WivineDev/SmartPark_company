const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, employeeController.createEmployee);
router.get('/', authMiddleware, employeeController.getAllEmployees);
router.put('/:id', authMiddleware, employeeController.updateEmployee);
router.delete('/:id', authMiddleware, employeeController.deleteEmployee);

module.exports = router;
