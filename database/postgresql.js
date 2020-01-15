const { Pool } = require('pg');
const pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
    host: process.env.PGHOST,
    ssl: true
});

module.exports = {
    query: q => {
        const start = Date.now();
        return pool.query(q)
            .then(res => {
                const duration = Date.now() - start;
                console.log('executed query', { query: q, duration, rows: res.rowCount });
                return res.rows;
            }).catch(error => {
                console.log(error);
                throw new Error(error);
            });
    },
    pool() {
        return pool;
    }
}