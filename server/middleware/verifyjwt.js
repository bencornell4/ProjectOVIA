const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
    const secretKey = process.env.JWT_SECRET;
    token = req.cookies['user-auth-token'];
    if (!token) {
        return res.json(false);
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        return res.json(false);
    }
}

module.exports = verifyToken;