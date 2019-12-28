const { Pool } = require('pg');
const pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
    host: process.env.PGHOST,
    ssl: true
});

// TODO - Add db migrations .. https://db-migrate.readthedocs.io/en/latest/Getting%20Started/installation/

module.exports = {
    query: q => {
        const start = Date.now();
        return pool.query(q)
            .then(res => {
                const duration = Date.now() - start;
                console.log('executed query', { query: q, duration, rows: res.rowCount });
                return res.rows[0];
            }).catch(error => {
                console.log(error);
                throw new Error(error);
            });
    }
}