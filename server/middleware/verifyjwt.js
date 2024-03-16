const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
    const secretKey = process.env.JWT_SECRET;
    token = req.cookies['user-auth-token'];
    if (!token) {
        return res.status(401).json({ message: 'Not authorized: no token'});
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
}

module.exports = verifyToken;