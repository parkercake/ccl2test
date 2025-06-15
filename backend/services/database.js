require('dotenv').config();
const mysql = require('mysql2');

console.log(process.env.DB_USERNAME);

const config = mysql.createConnection({
    host: 'atp.fhstp.ac.at',
    port: 8007,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "cc241066"
})

config.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = {config};