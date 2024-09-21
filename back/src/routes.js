import express from 'express';
import Host from './models/Hosts.js';

class HttpError extends Error {
  constructor(message, code = 400) {
    super(message);
    this.code = code;
  }
}

const router = express.Router();

router.post('/tickets', (req, res) => {
  const { titulo, descricao } = req.body;

  if (!titulo || !descricao) {
    throw new HttpError('Error when passing parameters');
  }

  try {
    const createdTicket = await Ticket.create({ titulo, descricao });
 
    return res.status(201).json(createdTicket);
  } catch (error) {
    throw new HttpError('Unable to create a ticket');
  }
});

router.get('/tickets', async (req, res) => {
  const { titulo } = req.query;
 
  try {
    if (titulo) {
      const filteredtickets = await Ticket.read({ titulo });
 
      return res.json(filteredtickets);
    }

    const tickets = await Ticket.read();
 
    return res.json(Ticket);
  } catch (error) {
    throw new HttpError('Unable to read tickets');
  }
});

router.get('/tickets/:id', async (req, res) => {
  const { id } = req.params;
 
  try {
    const ticket = await Ticket.readById(id);
 
    if (ticket) {
      return res.json(ticket);
    } else {
      throw new HttpError('ticket not found');
    }
  } catch (error) {
    throw new HttpError('Unable to read a ticket');
  }
});

router.put('/tickets/:id', async (req, res) => {
  const { titulo, descricao } = req.body;
 
  const id = req.params.id;
 
  if (!titulo || !descricao) {
    throw new HttpError('Error when passing parameters');
  }
 
  try {
    const updatedticket = await Ticket.update({ id, titulo, descricao });
 
    return res.json(updatedticket);
  } catch (error) {
    throw new HttpError('Unable to update a ticket');
  }
});

router.delete('/tickets/:id', async (req, res) => {
  const { id } = req.params;
 
  try {
    await tickets.remove(id);
 
    return res.send(204);
  } catch (error) {
    throw new HttpError('Unable to delete a ticket');
  }
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
