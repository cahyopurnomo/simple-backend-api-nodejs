const db = require('../config/db');


async function getAll() {
   return await db.query('SELECT * FROM users');
}

async function getUserById(id) {
   const result = await db.query('SELECT * FROM users WHERE id = ?', [id]);
   return result[0] || null;
}

async function create(data) {
   const result = await db.query(
      'INSERT INTO users (name, email) VALUES (?, ?)', [data.name, data.email]
   );

   return result.insertId;
}

async function update(id, data) {
   const result = await db.query(
      'UPDATE users SET name = ?, email = ? WHERE id = ?', [data.name, data.email, id]
   );
   return result.affectedRows;
}

async function remove(id) {
   const result = await db.query(
      'DELETE FROM users WHERE id = ?', [id]
   );
   return result.affectedRows;
}

async function isEmailTaken(email, excludeId = null) {
   const query = excludeId ? 'SELECT id FROM users where email = ? and id != ?' : 'SELECT id FROM users where email = ?';

   const params = excludeId ? [email, excludeId] : [email]
   const result = await db.query(query, params);
   return result.length > 0;
}

module.exports = {
   getAll,
   getUserById,
   create,
   update,
   remove,
   isEmailTaken
};