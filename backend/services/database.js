require('dotenv').config();
const mysql = require('mysql2');

console.log(process.env.DB_USERNAME);

const config = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USERNAME,
    password: "",
    database: "ccl2_learnlink"
})

config.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = {config};