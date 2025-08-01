// models/employeeModel.js
let employees = [
  {
    id: 1,
    name: 'John Doe',
    position: 'Software Engineer',
    department: 'IT',
    salary: 80000,
    status: 'active',
  },
];

module.exports = {
  getAll: () => employees,
  add: (emp) => {
    emp.id = employees.length + 1;
    employees.push(emp);
    return emp;
  },
  update: (id, data) => {
    const index = employees.findIndex((e) => e.id === parseInt(id));
    if (index === -1) return null;
    employees[index] = { ...employees[index], ...data };
    return employees[index];
  },
  delete: (id) => {
    const index = employees.findIndex((e) => e.id === parseInt(id));
    if (index === -1) return null;
    return employees.splice(index, 1)[0];
  },
};
