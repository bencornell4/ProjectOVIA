const { Client } = require('pg');
require('dotenv').config();

(async () => {
    const client = new Client({
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DATABASE,
        ssl: false,
    });

    try {
        await client.connect();
        const res = await client.query('SELECT $1::text as connected', ['Connection to PostgreSQL successful!']);
        console.log(res.rows[0].connected);
    } catch (err) {
        console.error(err.message);
    } finally {
        await client.end();
    }
})();