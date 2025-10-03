const DB_Pool = require("mysql2")
require('dotenv').config();

const createConnection = DB_Pool.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

module.exports = createConnection.promise()