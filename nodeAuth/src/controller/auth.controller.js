const userModel = require('../models/auth.model');
const jwt = require('jsonwebtoken');


const JWT_SECRET = process.env.JWT_SECRET;

async function registerUser(req, res) {
    const { username, email, password } = req.body;

    const isUserEmailExist = await userModel.findOne({email});

    if(isUserEmailExist){
        res.status(409).json({
            message: "user with this email already exist."
        })
    }

    const user = await userModel.create({
        username, email, password
    });

    const token = jwt.sign(
        {
            id: user._id
        },
        JWT_SECRET  
    );

    res.cookie('token', token);

    res.status(201).json({
        message: "user Created successfully",
        user
    });
}

module.exports = { registerUser };