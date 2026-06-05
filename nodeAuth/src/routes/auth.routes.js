const express = require('express');
const authController = require('../controller/auth.controller');

const router = express.Router();

router.post("/register", authController.registerUser);

router.get("/test", (req, res) => {
    console.log("cookies", req.cookies);

    res.json({
        message: "tesst routes",
        cookies: req.cookies
    })
});


module.exports = router;