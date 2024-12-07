// dbConfig.js
const mysql = require('mysql2');

const dbConfig = {
  host: 'localhost', // Your MySQL server address (localhost or IP)
  user: 'root', // Your MySQL username (default is 'root')
  password: 'Greninja@2024', // Your MySQL password
  database: 'AlphaHospitalDB', // The database to connect to
  port: 3306, // Default MySQL port
};

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig);

module.exports = pool;
