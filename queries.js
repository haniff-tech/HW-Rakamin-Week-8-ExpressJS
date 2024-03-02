//pg = node-postgres

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'dvdrental',
    password: '992811',
    port: 5432,
})

module.exports = pool
