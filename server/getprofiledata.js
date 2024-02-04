const express = require('express');
const router = express.Router();
const { getClient } = require('./getclient');

const getProf = async (username) => {
    const client = await getClient();
    try {
        const matchingUserId = (await client.query(
            "SELECT user_id FROM users WHERE username = $1",
            [username]
        )).rows;
        console.log(matchingUserId.length);
        if (matchingUserId.length === 0) {
            const error = new Error("User not found");
            error.code = 404;
            throw error;
        } else {
            const profileData = (await client.query(
                "SELECT * FROM profiles WHERE user_id = $1",
                [matchingUserId[0].user_id]
            ));
            console.log("Get profile result: " + profileData)
            return profileData;
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
        const profData = await getProf(username);
        res.json(profData);
    } catch (err) {
        console.error(err.message);
        res.status(err.code).send(err);
    }
});

module.exports = router;