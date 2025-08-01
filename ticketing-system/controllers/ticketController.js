// controllers/ticketController.js
const model = require('../models/ticketModel');

exports.getAllTickets = (req, res) => {
  res.json(model.getAll());
};

exports.getTicketById = (req, res) => {
  const ticket = model.getById(req.params.id);
  if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
  res.json(ticket);
};

exports.createTicket = (req, res) => {
  const newTicket = model.create(req.body);
  res.status(201).json(newTicket);
};

exports.updateTicket = (req, res) => {
  const updated = model.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Ticket not found' });
  res.json(updated);
};

exports.deleteTicket = (req, res) => {
  const deleted = model.delete(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Ticket not found' });
  res.json({ message: 'Ticket deleted', ticket: deleted });
};

exports.resolveTicket = (req, res) => {
  const resolved = model.resolve(req.params.id);
  if (!resolved) return res.status(404).json({ error: 'Ticket not found' });
  res.json({ message: 'Ticket resolved', ticket: resolved });
};
