import { PrismaClient } from '@prisma/client';
import Ticket from '../src/models/Ticket.js';
import Users from '../src/models/Users.js';
 
const prisma = new PrismaClient();
 
async function main() {
  await Users.create({
    email: 'admin@admin.com',
    password: 'admin',
    name: "admin"
  });

  await Ticket.create({
    titulo: 'Problema 1',
    descricao: 'Descricao do problema 1',
    userId: 1
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
 