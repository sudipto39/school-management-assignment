
const { query } = require("../config/db");

// Add a new school
exports.addSchool = async ({ name, address, latitude, longitude }) => {
  const sql = `INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`;
  const result = await query({ query: sql, values: [name, address, latitude, longitude] });
  return result.insertId || (result[0] && result[0].insertId);
};

// Fetch all schools
exports.getAllSchools = async () => {
  const sql = `SELECT * FROM schools`;
  const rows = await query({ query: sql, values: [] });
  return rows;
};
