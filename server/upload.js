const express = require('express');
const router = express.Router();
const { getClient } = require('./getclient');
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
        const videoSrc = await uploadCloudinary(videoFile, newVideo.rows[0].video_id, 'video');
        console.log("Video upload success: " + newVideo.rows[0].video_id);
        await client.query('COMMIT');
        return videoSrc.url;
    } catch (err) {
        console.error(err.message);
        return false;
    } finally {
        await client.end();
    }
}

const uploadCloudinary = async (assetFile, assetKey, assetType)  => {
    return new Promise ((resolve) => {
        cloudinary.uploader.upload_stream({ resource_type: assetType, public_id: assetKey, }, (error, result) => {
            if (result) {
                console.log('(Cloudinary) Upload success');
                resolve(result.url);
            } else {
                console.error('(Cloudinary) Error uploading: ', error.message);
                resolve(false);
            }
        }).end(assetFile.data);
    });
}

router.post('/video', async(req, res) => {
    const { username, videoDescription } = req.body;
    const videoFile = req.files.videoFile;
    try {
        const videoSrc = await uploadVideo(username, videoDescription, videoFile);
        res.json(videoSrc);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err);
    }
});

router.post('/pfp', async(req, res) => {
    const { pfpKey } = req.body;
    const pfpFile = req.files.imageFile;
    try {
        const pfpSrc = await uploadCloudinary(pfpFile, 'pfp/' + pfpKey, 'image');
        res.json(pfpSrc);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err);
    }
})

module.exports = router;
