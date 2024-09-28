import prisma from '../database/database.js';
 
async function create({ titulo, descricao, userId }) {
  const createdTicket = await prisma.ticket.create({
    data: {
      titulo,
      descricao,
      user: {
        connect: { id: userId } }}});
 
  return createdTicket;
}
 
async function read(where) {
  if (where?.titulo) {
    where.titulo = {
      contains: where.titulo,
    };
  }
 
  const tickets = await prisma.ticket.findMany({ where });
 
  if (tickets.length === 1 && where) {
    return tickets[0];
  }
 
  return tickets;
}
 
async function readById(id) {
  const ticket = await prisma.ticket.findUnique({
    where: {
      id,
    },
  });

  return ticket;
}

async function readByUserId(id) {
  const tickets = await prisma.ticket.findMany({
    where: {
      userId: id
    }
  });

  return tickets;
}
 
async function update({ id, titulo, descricao }) {
  const updatedTicket = await prisma.ticket.update({
    where: {
      id,
    },
    data: { titulo, descricao },
  });
 
  return updatedTicket;
}
 
async function remove(id) {
  await prisma.ticket.delete({
    where: {
      id,
    },
  });
}
 
export default { create, read, readById, readByUserId, update, remove };
 