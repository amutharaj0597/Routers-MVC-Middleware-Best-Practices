const express = require('express');
const router = express.Router();

const {
  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');

const roleCheck = require('../middlewares/roleCheckMiddleware');

// GET /employees – Admin and HR
router.get('/', roleCheck('admin', 'hr'), getAllEmployees);

// POST /employees – Admin only
router.post('/', roleCheck('admin'), addEmployee);

// PUT /employees/:id – Admin and HR
router.put('/:id', roleCheck('admin', 'hr'), updateEmployee);

// DELETE /employees/:id – Admin only
router.delete('/:id', roleCheck('admin'), deleteEmployee);

module.exports = router;
