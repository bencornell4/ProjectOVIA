const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { getClient } = require('./getclient');
const jwt = require('jsonwebtoken');
const verifyToken = require('./middleware/verifyjwt');
require('dotenv').config();

const registerUser = async (username, password) => {
    const client = await getClient();
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await client.query('BEGIN');
        const newUser = (await client.query(
            "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
            [username, hashedPassword]
        )).rows[0];
        const userId = newUser.user_id
        const newProfile = (await client.query(
            "INSERT INTO profiles (user_id) VALUES ($1) RETURNING *",
            [userId]
        )).rows[0];
        await client.query('COMMIT');
        console.log("new user success: " + newUser + " new profile success: " + newProfile);
        return "good";
    } catch (err) {
        await client.query('ROLLBACK');
        console.error(err.message);
        return "unavailable";
    } finally {
        await client.end();
    }
}

const loginUser = async (username, password) => {
    const client = await getClient();
    try {
        const matchingUser = (await client.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        )).rows;
        if (matchingUser.length === 0) {
            const error = new Error("User not found");
            error.code = 404;
            throw error;
        } else {
            isMatch = await bcrypt.compare(password, matchingUser[0].password);
            console.log("Login result : " + isMatch);
            return isMatch;
        }
    } catch (err) {
        console.error(err.message);
        return false;
    } finally {
        await client.end();
    }
}

function createUserJWT(res, username) {
    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign({username: username}, secretKey, { expiresIn: '24h' });
    //set token in cookie
    res.cookie('user-auth-token', token, {
        httpOnly: false,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
    });
    return token;
}

router.post('/register', async(req, res) => {
    const { username, password } = req.body;
    try {
        if (password.length > 7) {
            const newUserSuccess = await registerUser(username, password);
            if (newUserSuccess === "good") {
                token = createUserJWT(res, username);
            }
            res.json(newUserSuccess);
        } else {
            res.json("tooshort");
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err);
    }
});

router.post('/login', async(req, res) => {
    const { username, password } = req.body;
    try {
        //log in user
        const isMatch = await loginUser(username, password);
        //create jwt
        if (isMatch) {
            token = createUserJWT(res, username);
        }
        res.json(isMatch);
    } catch (err) {
        console.error(err.message);
        res.status(err.code).send(err);
    }
});

router.post('/signout', verifyToken, (req, res) => {
    try {
        res.clearCookie('user-auth-token');
        res.json({ message: 'Logged out successfully'});
    } catch (err) {
        console.error(err.message);
        res.status(err.code).send(err);
    }
});

module.exports = router;
