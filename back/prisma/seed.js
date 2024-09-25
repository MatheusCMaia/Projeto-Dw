import { PrismaClient } from '@prisma/client';
import Ticket from '../src/models/Ticket.js';
import User from '../src/models/Users.js';
 
const prisma = new PrismaClient();
 
async function main() {
  await User.create({
    name: 'admin',
    email: 'admin@admin.com',
    password: 'admin',
  });

  await Ticket.create({
    titulo: 'Problema 1',
    descricao: 'Descrição do problema 1',
    status: 'Pendente',
    
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
 