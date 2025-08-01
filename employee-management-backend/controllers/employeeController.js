const employeeModel = require('../models/employeeModel');

// GET /employees
const getAllEmployees = (req, res) => {
  const employees = employeeModel.getAll();
  res.status(200).json(employees);
};

// POST /employees (admin only)
const addEmployee = (req, res) => {
  const { name, position, department, salary, status } = req.body;

  if (!name || !position || !department || !salary || !status) {
    return res.status(400).json({ message: 'All employee fields are required' });
  }

  const newEmployee = employeeModel.add({ name, position, department, salary, status });
  res.status(201).json({ message: 'Employee added', employee: newEmployee });
};

// PUT /employees/:id (admin, hr)
const updateEmployee = (req, res) => {
  const updated = employeeModel.update(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  res.status(200).json({ message: 'Employee updated', employee: updated });
};

// DELETE /employees/:id (admin only)
const deleteEmployee = (req, res) => {
  const deleted = employeeModel.delete(req.params.id);
  if (!deleted) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  res.status(200).json({ message: 'Employee deleted', employee: deleted });
};

module.exports = {
  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
