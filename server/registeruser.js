const express = require('express');
const router = express.Router();
const { getClient } = require('./getclient');
const bcrypt = require('bcrypt');

const registerUser = async (username, password) => {
    const client = await getClient();
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const newUser = await client.query(
            "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
            [username, hashedPassword]
        );
        console.log("new user success: " + newUser.rows[0]);
        return newUser.rows[0];
    } catch (err) {
        console.error(err.message);
        return "Server error";
    } finally {
        await client.end();
    }
}

router.post('/', async(req, res) => {
    const { username, password } = req.body;
    try {
        const newUser = await registerUser(username, password);
        res.json(newUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err);
    }
});

module.exports = router;
