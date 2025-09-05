const express = require('express');
const employeeRoutes = require('./routes/employeeRoutes');
const loggerMiddleware = require('./middlewares/loggerMiddleware');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(loggerMiddleware);

app.use('/employees', employeeRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
