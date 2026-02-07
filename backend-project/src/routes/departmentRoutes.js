const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, departmentController.createDepartment);
router.get('/', authMiddleware, departmentController.getAllDepartments);
router.put('/:code', authMiddleware, departmentController.updateDepartment);
router.delete('/:code', authMiddleware, departmentController.deleteDepartment);

module.exports = router;
