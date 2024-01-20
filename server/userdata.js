const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const pool = require('../db');

router.post('/', async(req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const newUser = await pool.query(
            "INSERT INTO users (username, password) VALUE ($1, $2) RETURNING *",
            [username, hashedPassword]
        );
        res.json(newUser.rows[0]);
        console.log("new user success: " + newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
