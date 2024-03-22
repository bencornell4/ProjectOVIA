require('dotenv').config();
const express = require('express');
const router = express.Router();

function fortniteRequests(username)
{
    fetch(`https://fortnite-api.com/v2/stats/br/v2/?name=${username}`, {headers: {"Authorization":  process.env.FORTNITE_SECRET}})
        .then(response => response.json())
        .then(data => {
            //data -> stats -> all -> overall -> kd
            return data.data;
        })
        .catch(error => {
            console.error("Error fetching fortnite data: ", error);
        });
}

router.get('/:username', async(req, res) => {
    try {
        const { username } = req.params;
        const fortniteData = await fortniteRequests(username);
        res.json(fortniteData);
    } catch (err) {
        console.error(err.message);
        res.status(err.code).send(err);
    }
});

module.exports = router;