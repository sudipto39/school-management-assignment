// models/schoolModel.js
const db = require("../config/db");

// Add a new school
exports.addSchool = async ({ name, address, latitude, longitude }) => {
  const sql = `INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`;
  const [result] = await db.execute(sql, [name, address, latitude, longitude]);
  return result.insertId;
};

// Fetch all schools
exports.getAllSchools = async () => {
  const sql = `SELECT * FROM schools`;
  const [rows] = await db.execute(sql);
  return rows;
};
