const express = require('express');
const router = express.Router();
const cloudinary = require('./cloudinaryclient');

const getAssetSrc = async(assetKey) => {
    try {
        const assetURL = (await cloudinary.api.resource(assetKey)).url;
        console.log('Asset retrieved:', assetURL);
        return assetURL;
    } catch (err) {
        console.log('Asset not retrieved:', err.message);
        return false;
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

module.exports = router;