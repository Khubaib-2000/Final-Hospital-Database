const sql = require('mssql');
const dbConfig = require('./dbConfig'); // Make sure this path is correct

sql.connect(dbConfig)
  .then(() => {
    console.log('Database connection successful!');
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });
