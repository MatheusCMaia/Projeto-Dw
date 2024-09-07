import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { tickets } from './data/tickets.js';

class HttpError extends Error {
  constructor(message, code = 400) {
    super(message);
    this.code = code;
  }
}

const router = express.Router();

router.post('/tickets', (req, res) => {
  const { titulo, descricao, prioridade, status, dataCriacao } = req.body;

  if (!titulo || !descricao || !prioridade || !status || !dataCriacao) {
    throw new HttpError('Error when passing parameters');
  }

  const id = uuidv4();

  const newTicket = { id, titulo, descricao, prioridade, status, dataCriacao };

  tickets.push(newTicket);

  res.status(201).json(newTicket);
});

router.get('/tickets', (req, res) => {
  const where = req.query;

  if (where) {
    const field = Object.keys(where)[0];

    const value = where[field];

    const filteredtickets = tickets.filter((ticket) =>
      ticket[field] instanceof String
        ? ticket[field].toLowerCase().includes(value.toLowerCase())
        : ticket[field] === value
    );

    return res.json(filteredtickets);
  }

  return res.json(tickets);
});

router.get('/tickets/:id', (req, res) => {
  const { id } = req.params;

  const index = tickets.findIndex((ticket) => ticket.id === id);

  if (!tickets[index]) {
    throw new HttpError('Unable to read a ticket');
  }

  return res.json(tickets[index]);
});

router.put('/tickets/:id', (req, res) => {
  const { titulo, descricao, prioridade, status, dataCriacao } = req.body;

  const { id } = req.params;

  if (!titulo || !descricao || !prioridade || !status || !dataCriacao) {
    throw new HttpError('Error when passing parameters');
  }

  const newTicket = { id, titulo, descricao, prioridade, status, dataCriacao };

  const index = tickets.findIndex((ticket) => ticket.id === id);

  if (!tickets[index]) {
    throw new HttpError('Unable to update a ticket');
  }

  tickets[index] = newTicket;

  return res.json(newTicket);
});

router.delete('/tickets/:id', (req, res) => {
  const { id } = req.params;

  const index = tickets.findIndex((ticket) => ticket.id === id);

  if (!tickets[index]) {
    throw new HttpError('Unable to delete a ticket');
  }

  tickets.splice(index, 1);

  return res.send(204);
});

// 404 handler
router.use((req, res, next) => {
  return res.status(404).json({ message: 'Content not found!' });
});

// Error handler
router.use((err, req, res, next) => {
  // console.error(err.message);
  console.error(err.stack);

  if (err instanceof HttpError) {
    return res.status(err.code).json({ message: err.message });
  }

  // next(err);
  return res.status(500).json({ message: 'Something broke!' });
});

export default router;
