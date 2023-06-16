const mysql = require("mysql2")
require("dotenv").config();

const connection = new mysql.createConnection({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST
});

module.exports = connection