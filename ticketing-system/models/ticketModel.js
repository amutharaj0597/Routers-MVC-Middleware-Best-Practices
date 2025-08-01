// models/ticketModel.js
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../db.json');

const readTickets = () => {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data || '[]');
};

const writeTickets = (tickets) => {
  fs.writeFileSync(filePath, JSON.stringify(tickets, null, 2));
};

module.exports = {
  getAll: () => readTickets(),
  getById: (id) => readTickets().find(ticket => ticket.id == id),
  create: (ticket) => {
    const tickets = readTickets();
    const newTicket = { id: Date.now(), ...ticket, status: 'pending' };
    tickets.push(newTicket);
    writeTickets(tickets);
    return newTicket;
  },
  update: (id, data) => {
    const tickets = readTickets();
    const index = tickets.findIndex(ticket => ticket.id == id);
    if (index === -1) return null;
    tickets[index] = { ...tickets[index], ...data };
    writeTickets(tickets);
    return tickets[index];
  },
  delete: (id) => {
    const tickets = readTickets();
    const index = tickets.findIndex(ticket => ticket.id == id);
    if (index === -1) return null;
    const removed = tickets.splice(index, 1)[0];
    writeTickets(tickets);
    return removed;
  },
  resolve: (id) => {
    const tickets = readTickets();
    const index = tickets.findIndex(ticket => ticket.id == id);
    if (index === -1) return null;
    tickets[index].status = 'resolved';
    writeTickets(tickets);
    return tickets[index];
  },
};
