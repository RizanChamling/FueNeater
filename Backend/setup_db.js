const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_NAME || 'Furneater',
  multipleStatements: true
});

const sqlPath = path.join(__dirname, 'src', 'config', 'schema.sql');
const sql = fs.readFileSync(sqlPath, 'utf8');

connection.connect((err) => {
  if (err) {
    console.error('Connection failed:', err.message);
    process.exit(1);
  }
  console.log('Connected to MySQL via script. Executing schema...');
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Schema execution failed:', err.message);
    } else {
      console.log('Database successfully initialized from database_schema.sql');
    }
    connection.end();
  });
});
