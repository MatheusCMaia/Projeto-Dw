import Database from './database.js';
 
async function up() {
  const db = await Database.connect();
 
  const hostsSql = `
    CREATE TABLE tickets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo VARCHAR(100) NOT NULL,
      descricao VARCHAR(100) NOT NULL
    )
  `;
 
  await db.run(hostsSql);
 
  db.close();
}
 
async function down() {
  const db = await Database.connect();
 
  const ticketsSql = `
    DROP TABLE tickets
  `;
 
  await db.run(ticketsSql);
 
  db.close();
}
 
export default { up, down };
 