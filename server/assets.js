const express = require('express');
const router = express.Router();
const { getClient } = require('./getclient');
const cloudinary = require('./cloudinaryclient');

//check if asset exists
router.get('/:assetSrc', async(req, res) => {
    try {
        const { assetId } = req.params;
        const exists = await checkAsset(assetSrc);
        res.json(profData);
    } catch (err) {
        console.error(err.message);
        res.status(err.code).send(err);
    }
});

module.exports = router;