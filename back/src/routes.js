import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import Ticket from './models/Ticket.js';
import User from './models/Users.js'

import { isAuthenticated } from './middleware/auth.js'

class HttpError extends Error {
  constructor(message, code = 400) {
    super(message);
    this.code = code;
  }
}

const router = express.Router();

router.post('/tickets', isAuthenticated, async (req, res) => {
  const { titulo, descricao } = req.body;
  const userId = req.userId;

  if (!titulo || !descricao) {
    throw new HttpError('Error when passing parameters', 400);
  }

  try {
    const createdTicket = await Ticket.create({ 
        titulo, 
        descricao,
        userId : userId
      }
    );

    return res.status(201).json(createdTicket);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to create a ticket', error: error.message });
  }
});

router.get('/user/tickets', isAuthenticated, async (req, res) => {
  const userId = req.userId; // Corrigido para req.userId

  try {
    const tickets = await Ticket.readByUserId(Number(userId));
    return res.json(tickets);
  } catch (error) {
    return res.status(400).json({ message: 'Unable to read tickets by user' });
  }
});

router.get('user/tickets', isAuthenticated, async (req, res) => {
  const { status } = req.query;

  try {
    if (status) {
      const filteredtickets = await Ticket.read({ status });
      
      return res.json(filteredtickets);
    }

    const tickets = await Ticket.read();
    
    return res.json(tickets);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to read tickets', error: error.message });
  }
});

router.get('/user/tickets/:id', isAuthenticated, async (req, res) => {
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

router.put('/tickets/:id', isAuthenticated, async (req, res) => {
  const { titulo, descricao, userId } = req.body;
  const { id } = req.params;

  if (!titulo || !descricao) {
    throw new HttpError('Error when passing parameters', 400);
  }

  try {
    const updatedTicket = await Ticket.update({
      where: { id },
      data: { titulo, descricao, userId }
    });

    return res.json(updatedTicket);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to update the ticket', error: error.message });
  }
});

router.delete('/tickets/:id', isAuthenticated, async (req, res) => {
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


//router.get('/tickets/', isAuthenticated, async (req, res) => {
  //const { titulo } = req.query;

  //try {
    //if (titulo) {
      //const filteredtickets = await Ticket.read({ titulo });
      
      //return res.json(filteredtickets);
    //}

    //const tickets = await Ticket.read();
    
    //return res.json(tickets);
  //} catch (error) {
    //return res.status(500).json({ message: 'Unable to read tickets', error: error.message });
  //}
//});

router.post('/users', async (req, res) => {
  const { name, email, password } = req.body;
 
  if (!name || !email || !password) {
    throw new HttpError('Error when passing parameters');
  }
 
  try {
    const createdUser = await User.create({ name, email, password });
 
    delete createdUser.password;
 
    res.status(201).json(createdUser);
  } catch (error) {
    if (
      error.message.toLowerCase().includes('unique') &&
      error.message.toLowerCase().includes('email')
    ) {
      throw new HttpError('Email already in use');
    }
 
    throw new HttpError('Unable to create a user');
  }
});

router.get('/users/me', isAuthenticated, async (req, res) => {
  try {
    const userId = req.userId;
 
    const user = await User.readById(userId);
 
    delete user.password;
 
    return res.json(user);
  } catch (error) {
    throw new HTTPError('Unable to find user', 400);
  }
});

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
 
    const { id: userId, password: hash } = await User.read({ email });
 
    const match = await bcrypt.compare(password, hash);
 
    if (match) {
      const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: 3600 } // 1h
      );
 
      return res.json({ auth: true, token });
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    res.status(401).json({ error: 'User not found' });
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
