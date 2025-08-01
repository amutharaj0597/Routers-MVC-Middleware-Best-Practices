const { readTodos, writeTodos } = require('../models/todoModel');

exports.getAllTodos = (req, res) => {
  try {
    const todos = readTodos();
    res.status(200).json(todos);
  } catch {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
};

exports.addTodo = (req, res) => {
  const { title, completed } = req.body;

  if (!title || typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const todos = readTodos();
  const newTodo = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 1,
    title,
    completed
  };

  todos.push(newTodo);
  writeTodos(todos);

  res.status(201).json(newTodo);
};

exports.updateTodo = (req, res) => {
  const id = parseInt(req.params.id);
  const { completed, title } = req.body;

  const todos = readTodos();
  const index = todos.findIndex(todo => todo.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  if (typeof completed === 'boolean') todos[index].completed = completed;
  if (title) todos[index].title = title;

  writeTodos(todos);
  res.status(200).json(todos[index]);
};

exports.deleteTodo = (req, res) => {
  const id = parseInt(req.params.id);
  let todos = readTodos();

  const index = todos.findIndex(todo => todo.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  const removed = todos.splice(index, 1);
  writeTodos(todos);

  res.status(200).json({ message: 'Todo deleted', todo: removed[0] });
};

exports.searchTodos = (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Query parameter q is required' });

  const todos = readTodos();
  const results = todos.filter(todo =>
    todo.title.toLowerCase().includes(q.toLowerCase())
  );

  res.status(200).json(results);
};
