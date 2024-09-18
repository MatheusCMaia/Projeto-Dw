import Database from '../database/database.js';
 
async function create({ titulo, descricao }) {
  const db = await Database.connect();
 
  const sql = `
      INSERT INTO
        ticket (titulo, descricao)
      VALUES
        (?, ?)
    `;
 
  const { lastID } = await db.run(sql, [titulo, descricao]);
 
  db.close();
 
  return await readById(lastID);
}
 
async function read(where) {
  const db = await Database.connect();
 
  if (where) {
    const field = Object.keys(where)[0];
 
    const value = where[field];
 
    const sql = `
      SELECT
          *
        FROM
          ticket
        WHERE
          ${field} LIKE CONCAT( '%',?,'%')
      `;
 
    const ticket = await db.all(sql, [value]);
 
    db.close();
 
    return ticket;
  }
 
  const sql = `
    SELECT
      *
    FROM
      ticket
  `;
 
  const ticket = await db.all(sql);
 
  db.close();
 
  return ticket;
}
 
async function readById(id) {
  const db = await Database.connect();
 
  const sql = `
      SELECT
          *
        FROM
          ticket
        WHERE
          id = ?
      `;
 
  const ticket = await db.get(sql, [id]);
 
  db.close();
 
  return ticket;
}
 
async function update({ id, titulo, descricao }) {
  const db = await Database.connect();
 
  const sql = `
      UPDATE
        hosts
      SET
        titulo = ?, descricao = ?
      WHERE
        id = ?
    `;
 
  const { changes } = await db.run(sql, [titulo, descricao, id]);
 
  db.close();
 
  if (changes === 1) {
    return readById(id);
  } else {
    throw new Error('Ticket not found');
  }
}
 
async function remove(id) {
  const db = await Database.connect();
 
  const sql = `
    DELETE FROM
      ticket
    WHERE
      id = ?
  `;
 
  const { changes } = await db.run(sql, [id]);
 
  db.close();
 
  if (changes === 1) {
    return true;
  } else {
    throw new Error('Ticket not found');
  }
}
 
export default { create, read, readById, update, remove };
 