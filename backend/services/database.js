require('dotenv').config();
const mysql = require('mysql2/promise');

// Optional debug
console.log("DB user:", process.env.DB_USERNAME);

const pool = mysql.createPool({
    host: 'atp.fhstp.ac.at',
    port: 8007,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'cc241066',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = { pool };