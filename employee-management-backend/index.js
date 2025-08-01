const express = require('express');
const employeeRoutes = require('./routes/employeeRoutes');
const loggerMiddleware = require('./middlewares/loggerMiddleware');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(loggerMiddleware);

// Routes
app.use('/employees', employeeRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
