const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();


router.post('/create', (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({
            message: "unauthorize"
        });
    };

    try {
        jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        res.status(400).json({
            message: "invalid token"
        });
    };

    res.send('post created successfully');
})