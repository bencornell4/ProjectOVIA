const express = require('express');
const router = express.Router();
const { getClient } = require('./getclient');
const verifyToken = require('./middleware/verifyjwt');

const setProfData = async (username, type, text) => {
    const client = await getClient();
    try {
        const query = `
            WITH user_info AS (
                SELECT user_id
                FROM users
                WHERE username = $1
            )
            UPDATE profiles AS p
            SET ${type} = $2
            WHERE p.user_id = (SELECT user_id FROM user_info)
            RETURNING ${type};
        `;
        const profileData = (await client.query(query, [username, text])).rows;
        if (profileData.length === 0) {
            const error = new Error("User not found");
            error.code = 404;
            throw error;
        }
        console.log("Set profile result: " + profileData)
        return profileData;
    } catch (err) {
        return err.message;
    } finally {
        await client.end();
    }
}

router.post('/', verifyToken, async(req, res) => {
    try {
        const { username, type, text } = req.body;
        if (username === req.user.username) {
            const profData = await setProfData(username, type, text);
            res.json(profData);
        } else {
            console.error('Not authorized: wrong token');
            res.status(401).send({ message: 'Not authorized: wrong token'})
        }
    } catch (err) {
        console.error(err.message);
        res.status(err.code).send(err);
    }
});

module.exports = router;