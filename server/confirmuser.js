const express = require('express');
const router = express.Router();
const { getClient } = require('./getclient');

const confirmUser = async (username) => {
    const client = await getClient();
    try {
        const matchingUser = (await client.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        )).rows;
        if (matchingUser.length === 0) {
            const error = new Error("User not found");
            error.code = 404;
            throw error;
        } else {
            console.log("User exists");
            return true;
        }
    } catch (err) {
        return err.message;
    } finally {
        await client.end();
    }
}

router.get('/:username', async(req, res) => {
    try {
        const { username } = req.params;
        const isMatch = await confirmUser(username);
        res.json(isMatch);
    } catch (err) {
        console.error(err.message);
        res.status(err.code).send(err);
    }
});

module.exports = router;
