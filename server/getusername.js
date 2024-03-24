const express = require('express');
const router = express.Router();
const verifyToken = require('./middleware/verifyjwt');

router.post('/', verifyToken, async(req, res) => {
    try {
        res.json(req.user.username);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err);
    }
})

module.exports = router;