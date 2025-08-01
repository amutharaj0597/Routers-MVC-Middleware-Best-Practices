const express = require('express');
const app = express();
const PORT = 3000;

const ticketRoutes = require('./routes/ticketRoutes');

app.use(express.json());
app.use('/tickets', ticketRoutes);

// 404 Route handler
app.use((req, res) => {
  res.status(404).json({ message: '404 Not Found' });
});

app.listen(PORT, () => {
  console.log(`Ticketing System running at http://localhost:${PORT}`);
});
