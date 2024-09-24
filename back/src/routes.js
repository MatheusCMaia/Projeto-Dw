import express from 'express';
import Ticket from './models/Ticket.js';

class HttpError extends Error {
  constructor(message, code = 400) {
    super(message);
    this.code = code;
  }
}

const router = express.Router();

// Criação de tickets
router.post('/tickets', async (req, res) => {
  const { titulo, descricao } = req.body;

  if (!titulo || !descricao) {
    throw new HttpError('Error when passing parameters', 400);
  }

  try {
    const createdTicket = await Ticket.create({
      data: { 
        titulo, 
        descricao, 
        prioridade: 'Em Análise', 
        status: 'Pendente'
      }
    });

    return res.status(201).json(createdTicket);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to create a ticket', error: error.message });
  }
});

// Leitura de tickets
router.get('/tickets', async (req, res) => {
  const { titulo } = req.query;

  try {
    if (titulo) {
      const filteredtickets = await Ticket.findMany({
        where: { titulo: { contains: titulo } }
      });

      return res.json(filteredtickets);
    }

    const tickets = await Ticket.findMany();
    return res.json(tickets);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to read tickets', error: error.message });
  }
});

// Leitura de um ticket específico
router.get('/tickets/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const ticket = await Ticket.findUnique({
      where: { id }
    });

    if (!ticket) {
      throw new HttpError('Ticket not found', 404);
    }

    return res.json(ticket);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to read the ticket', error: error.message });
  }
});

// Atualização de um ticket
router.put('/tickets/:id', async (req, res) => {
  const { titulo, descricao } = req.body;
  const { id } = req.params;

  if (!titulo || !descricao) {
    throw new HttpError('Error when passing parameters', 400);
  }

  try {
    const updatedTicket = await Ticket.update({
      where: { id },
      data: { titulo, descricao }
    });

    return res.json(updatedTicket);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to update the ticket', error: error.message });
  }
});

// Deleção de um ticket
router.delete('/tickets/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Ticket.delete({
      where: { id }
    });

    return res.sendStatus(204); // Retorna status 204 (No Content)
  } catch (error) {
    return res.status(500).json({ message: 'Unable to delete the ticket', error: error.message });
  }
});

// 404 handler
router.use((req, res, next) => {
  return res.status(404).json({ message: 'Content not found!' });
});

// Error handler
router.use((err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof HttpError) {
    return res.status(err.code).json({ message: err.message });
  }

  return res.status(500).json({ message: 'Something broke!' });
});

export default router;
