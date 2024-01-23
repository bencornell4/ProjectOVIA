const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { getClient } = require('./getclient');

const loginUser = async (username, password) => {
    const client = await getClient();
    try {
        const hashedPassword = await bcrypt.hash(password, 10); 
        const matchingUser = (await client.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        )).rows;
        if (matchingUser.length === 0) {
            const error = new Error("User not found");
            error.code = 400;
            throw error;
        } else {
            isMatch = await bcrypt.compare(password, matchingUser[0].password);
            console.log("Login result : " + isMatch);
            return isMatch;
        }
    } catch (err) {
        return err.message;
    } finally {
        await client.end();
    }
}

router.post('/', async(req, res) => {
    const { username, password } = req.body;
    try {
        const isMatch = await loginUser(username, password);
        res.json(isMatch);
    } catch (err) {
        console.error(err.message);
        res.status(err.code).send(err);
    }
});

module.exports = router;
