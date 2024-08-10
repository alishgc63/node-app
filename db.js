// db.js
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost', // Replace with your database host
    user: '', // Replace with your database username
    password: '', // Replace with your database password
    database: 'login_db' // Replace with your database name
});

const promisePool = pool.promise();

module.exports = promisePool;
