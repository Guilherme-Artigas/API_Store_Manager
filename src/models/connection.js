const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = mysql.createPool({
  port: process.env.MYSQLPORT || 3306,
  host: process.env.MYSQLHOST || 'localhost',
  user: process.env.MYSQLUSER || 'root',
  password: process.env.MYSQLPASSWORD || 'password',
  database: process.env.MYSQLDATABASE || 'StoreManager',
});

module.exports = connection;
