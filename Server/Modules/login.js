const express = require('express');
const router = express.Router();
const Register = require("../Model/RegistrationModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Define a static secret key for HMAC
const secretKey = "yourSecretKeyHere";

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token not provided' });
    }

    const tokenWithoutBearer = token.replace('Bearer ', '');

    jwt.verify(tokenWithoutBearer, secretKey, async (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                // Handle token expiration
            } else {
                return res.status(403).json({ message: 'Unauthorized: Invalid token' });
            }
        } else {
            req.userId = decoded.userId;
            next();
        }
    });
};

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Register.findOne({ email_address: email });

        if (!user) {
            return res.status(401).json({ message: 'Email not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        const { _id: userId, full_name } = user;

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // Sign the token using HMAC with the static secret key
        const token = jwt.sign({ userId }, secretKey, { expiresIn: "1d" });

        res.status(200).json({ token: token, ID: userId, name: full_name, Result: "Login Successful" });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/protected', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Access granted to protected route', userId: req.userId });
});

module.exports = router;
