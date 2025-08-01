// routes/ticketRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/ticketController');
const validate = require('../middlewares/dataCheckMiddleware');

// Routes
router.get('/', controller.getAllTickets);
router.get('/:id', controller.getTicketById);
router.post('/', validate, controller.createTicket);
router.put('/:id', controller.updateTicket);
router.delete('/:id', controller.deleteTicket);
router.patch('/:id/resolve', controller.resolveTicket);

module.exports = router;
