const express = require('express');
const router = express.Router();
const { getClient } = require('./getclient');
const verifyToken = require('./middleware/verifyjwt');

const getChunk__main = async (chunkSize) => {
    const client = await getClient();
    try {
        const query = `
            SELECT
                v.video_id,
                v.upload_date,
                v.description,
                u.username,
                p.full_name,
                p.pfp_key
            FROM
                videos v
            JOIN
                users u ON v.user_id = u.user_id
            JOIN
                profiles p ON v.user_id = p.user_id
            ORDER BY
                v.upload_date DESC
            LIMIT $1
        `;
        const chunk = (await client.query(query, [chunkSize])).rows;
        console.log("Chunks gathered: " + chunk.length);
        return chunk;
    } catch (err) {
        console.error(err.message);
        return false;
    } finally {
        await client.end();
    }
}

const getChunk__following = async (chunkSize, username) => {
    const client = await getClient();
    try {
        const query = `
            WITH ActiveUser AS (
                SELECT user_id FROM users WHERE username = $1
            )
            SELECT
                v.video_id,
                v.upload_date,
                v.description,
                u.username,
                p.full_name,
                p.pfp_key
            FROM
                videos v
            JOIN
                users u ON v.user_id = u.user_id
            JOIN
                profiles p ON v.user_id = p.user_id
            JOIN
                follows f ON v.user_id = f.followee_id
            WHERE
                f.follower_id = SELECT (user_id FROM ActiveUser)
            ORDER BY
                v.upload_date DESC
            LIMIT $2
        `;
        const chunk = (await client.query(query, [chunkSize, username])).rows;
        console.log("Chunks gathered: " + chunk.length);
        return chunk;
    } catch (err) {
        console.error(err.message);
        return false;
    } finally {
        await client.end();
    }
}

const getChunk__profile = async (chunkSize, username) => {
    const client = await getClient();
    try {
        const query = `
            SELECT
                v.video_id,
                v.upload_date,
                v.description,
                u.username,
                p.full_name,
                p.pfp_key
            FROM
                videos v
            JOIN
                users u ON v.user_id = u.user_id
            JOIN
                profiles p ON v.user_id = p.user_id
            WHERE
                u.username = $2
            ORDER BY
                v.upload_date DESC
            LIMIT $1
        `;
        const chunk = (await client.query(query, [chunkSize, username])).rows;
        console.log("Chunks gathered: " + chunk.length);
        return chunk;
    } catch (err) {
        console.error(err.message);
        return false;
    } finally {
        await client.end();
    }
}

router.post('/following', verifyToken, async(req, res) => {
    const { chunkSize, username } = req.body;
    try {
        const chunk = await getChunk__following(chunkSize, username);
        res.json(chunk);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err);
    }
});

router.post('/main', async(req, res) => {
    const { chunkSize } = req.body;
    try {
        const chunk = await getChunk__main(chunkSize);
        res.json(chunk);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err);
    }
});

router.post('/profile', async(req, res) => {
    const { chunkSize, username } = req.body;
    try {
        const chunk = await getChunk__profile(chunkSize, username);
        res.json(chunk);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err);
    }
});

module.exports = router;