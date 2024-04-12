const { Client } = require('pg');
require('dotenv').config();

module.exports.getClient = async () => {
    const client = new Client({
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DATABASE,
        ssl: process.env.PG_SSLMODE === 'true',
    });
    try {
        await client.connect();
        console.log("Connection Successful");
        return client;
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}