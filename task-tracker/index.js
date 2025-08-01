const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const tasksFile = path.join(__dirname, 'tasks.json');

app.use(express.json());

// 🔧 Utility: Read tasks from file
const readTasks = () => {
  const data = fs.readFileSync(tasksFile, 'utf8');
  return JSON.parse(data || '[]');
};

// 🔧 Utility: Write tasks to file
const writeTasks = (tasks) => {
  fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
};

// ✅ GET /tasks → Return all tasks
app.get('/tasks', (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

// ✅ GET /tasks/filter?tag=frontend → Filter by tag
app.get('/tasks/filter', (req, res) => {
  const { tag } = req.query;
  const tasks = readTasks();
  const filtered = tasks.filter(task => task.tag === tag);
  res.json(filtered);
});

// ✅ POST /tasks → Add new task
app.post('/tasks', (req, res) => {
  const { title, description, tag, priority, status } = req.body;

  if (!title || !description || !tag || !priority || !status) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const tasks = readTasks();
  const newTask = {
    id: Date.now(), // simple unique ID
    title,
    description,
    tag,
    priority,
    status
  };

  tasks.push(newTask);
  writeTasks(tasks);

  res.status(201).json({ message: 'Task created', task: newTask });
});

// ✅ PUT /tasks/:id → Update task
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const tasks = readTasks();
  const index = tasks.findIndex(task => task.id == id);

  if (index === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  tasks[index] = { ...tasks[index], ...req.body };
  writeTasks(tasks);

  res.json({ message: 'Task updated', task: tasks[index] });
});

// ✅ DELETE /tasks/:id → Delete task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const tasks = readTasks();
  const index = tasks.findIndex(task => task.id == id);

  if (index === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  const deleted = tasks.splice(index, 1);
  writeTasks(tasks);

  res.json({ message: 'Task deleted', task: deleted[0] });
});

// ❌ 404 for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Task Tracker API running at http://localhost:${PORT}`);
});
