const express = require('express');
const router = express.Router();
const { getClient } = require('./getclient');
const bcrypt = require('bcrypt');
const cloudinary = require('./cloudinaryclient');

const uploadVideo = async (username, videoDescription) => {
    const client = await getClient();
    try {
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
        console.log("Video upload success: " + newVideo.rows[0].video_id);
        return newVideo.rows[0].video_id;
    } catch (err) {
        console.error(err.message);
        return "Server error";
    } finally {
        await client.end();
    }
}

function uploadCloudinary(videoFile, videoKey) 
{
    cloudinary.uploader.upload_stream({ resource_type: 'video', public_id: videoKey }, (error, result) => {
        if (error) {
            console.error('Error uploading to cloudinary: ', error);
        } else {
            console.log("Successful upload!");
        }
    }).end(videoFile.data);
}

router.post('/', async(req, res) => {
    const { username, videoDescription } = req.body;
    const videoFile = req.files.videoFile;
    try {
        const videoKey = await uploadVideo(username, videoDescription);
        res.json(username);
        uploadCloudinary(videoFile, videoKey);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err);
    }
});

module.exports = router;
