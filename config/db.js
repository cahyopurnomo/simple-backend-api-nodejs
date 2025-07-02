const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: process.env.DB_NAME,
   waitForConnections: true,
   connectionLimit: 10
});

async function query(sql, params = []) {
   const [rows] = await pool.execute(sql, params);
   return rows;
}

module.exports = { query, pool };