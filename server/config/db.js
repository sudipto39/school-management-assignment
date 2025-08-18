// const mysql = require("mysql2/promise");

// console.log("Connecting to MySQL with the following credentials:");
// console.log("HOST:", process.env.DB_HOST);
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 100,
//   queueLimit: 0,
// });

// module.exports.query = async ({ query, values }) => {
//   try {
//     let res = await pool.execute(query, values);
//     return res[0];
//   } catch (err) {
//     console.error("Query failed:", err);
//     throw err;
//   }
// };

const mysql = require("mysql2/promise");

console.log("Connecting to MySQL with the following credentials:");
console.log("HOST:", process.env.DB_HOST);

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0,
});

// Export both pool and helper function
module.exports = {
  pool,
  query: async ({ query, values }) => {
    try {
      const [rows] = await pool.execute(query, values);
      return rows;
    } catch (err) {
      console.error("Query failed:", err);
      throw err;
    }
  },
};
