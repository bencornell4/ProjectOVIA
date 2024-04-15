const express = require('express');
const router = express.Router();
const { getClient } = require('./getclient');
const cloudinary = require('./cloudinaryclient');
const verifyToken = require('./middleware/verifyjwt');
const http = require('http');

const getAssetSrc = async(assetKey) => {
    try {
        const assetUrl = await cloudinary.url(assetKey);
        const responseCode = (await fetch(assetUrl, {
            method: 'HEAD'
        })).ok;
        if (!responseCode) {
            throw new Error();
        }
        const d = new Date();
        console.log('Asset exists at:', assetUrl + '?dummy' + d.getTime());
        return assetUrl + '?dummy' + d.getTime();
    } catch (err) {
        console.log('Asset not retrieved:', err.message);
        return false;
    }
    
}

deleteAssetDB = async (assetKey, assetType) => {
    const client = await getClient();
    try {
        await client.query('BEGIN');
        //delete video from db
        const query = `
            DELETE FROM videos AS v
            WHERE v.video_id = $1
            RETURNING v.video_id;
        `;
        const deletedVideo = (await client.query(query, [assetKey])).rows;

        //delete video from cloudinary
        const result = await deleteAssetCloudinary(assetKey, assetType);

        await client.query('COMMIT');
        return result;
    } catch (err) {
        await client.query('ROLLBACK');
        console.log('Asset could not be deleted:', err.message);
        return false;
    }
}

const deleteAssetCloudinary = async(assetKey, assetType) => {
    try {
        const { result } = await cloudinary.uploader.destroy("videos/" + assetKey, {
            resource_type: assetType, 
            invalidate: true,
        });
        console.log("Asset deleted:", result);
        return result;
    } catch (err) {
        console.log('Error deleting asset:', err);
        throw err;
    }
}

//check if asset exists
router.get('/exists/:assetKey', async(req, res) => {
    try {
        const { assetKey } = req.params;
        const assetURL = await getAssetSrc(assetKey);
        res.json(assetURL);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error'});
    }
});

router.post('/delete', verifyToken, async(req, res) => {
    try {
        const { assetKey, assetType } = req.body;
        const result = deleteAssetDB(assetKey, assetType);
        res.json(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error'});
    }
});

module.exports = router;