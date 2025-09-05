const express = require('express');
const app = express();
const todoRoutes = require('./routes/todoRoutes');

app.use(express.json());
app.use('/todos', todoRoutes);

app.use((req, res) => {
  res.status(404).json({ error: '404 Not Found' });
});

app.listen(3000, () => {
  console.log('Server running on 3000');
});
