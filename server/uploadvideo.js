const express = require('express');
const router = express.Router();
const { getClient } = require('./getclient');
const bcrypt = require('bcrypt');
const cloudinary = require('./cloudinaryclient');

const uploadVideo = async (username, videoDescription, videoFile) => {
    const client = await getClient();
    try {
        await client.query('BEGIN');
        const query = `
            SELECT
                u.user_id
            FROM
                users u
            WHERE
                u.username = $1;
        `;
        const userId = (await client.query(query, [username])).rows[0].user_id;
        const newVideo = await client.query(
            "INSERT INTO videos (description, user_id) VALUES ($1, $2) RETURNING *",
            [videoDescription, userId]
        );
        await uploadCloudinary(videoFile, newVideo.rows[0].video_id);
        console.log("Video upload success: " + newVideo.rows[0].video_id);
        await client.query('COMMIT');
        return true;
    } catch (err) {
        console.error(err.message);
        return "Server error";
    } finally {
        await client.end();
    }
}

const uploadCloudinary = async (videoFile, videoKey)  => {
    return new Promise ((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: 'video', public_id: videoKey }, (error, result) => {
            if (result) {
                resolve(result);
            } else {
                console.error('(Cloudinary) Error uploading: ', error);
                reject(error);
            }
        }).end(videoFile.data);
    });
}

router.post('/', async(req, res) => {
    const { username, videoDescription } = req.body;
    const videoFile = req.files.videoFile;
    try {
        const success = await uploadVideo(username, videoDescription, videoFile);
        res.json(success);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err);
    }
});

module.exports = router;
