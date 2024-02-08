const express = require('express');
const router = express.Router();
const { getClient } = require('./getclient');

const getProf = async (username) => {
    const client = await getClient();
    try {
        const query = `
            SELECT
                u.user_id,
                p.*
            FROM
                users u
            JOIN
                profiles p ON u.user_id = p.user_id
            WHERE
                u.username = $1;
        `;
        const profileData = (await client.query(query, [username])).rows;
        if (profileData.length === 0) {
            const error = new Error("User not found");
            error.code = 404;
            throw error;
        } else {
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