const path = require('path');
const Pool = require('pg').Pool;
require('dotenv').config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PORT } = process.env;

const pool = new Pool({
    user: PGUSER,
    host: PGHOST,
    database: PGDATABASE,
    password: PGPASSWORD,
    port: PORT, // Default PostgreSQL port
});

pool.on('connect', () => {
    console.log('Connected to the database');
});

module.exports = pool;