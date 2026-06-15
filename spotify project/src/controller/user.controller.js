const userModel = require('../models/user.model');
const { default: catchAsync } = require('../utils/catchAsync');
const {registerUser : registerUserService, loginUser : loginUserService} = require('../service/auth.service');
const paginate = require('../utils/paginate');


const registerUser = catchAsync(
    async (req, res) => {
        
        const result = await registerUserService(req.body);

        res.cookie('token', result.accessToken);

        res.status(201).json({
            message: 'user created successfully',
            user: result.user
        });
    }
);

const loginUser = catchAsync(
    async (req, res) => {

        const result = await loginUserService(req.body);

        res.cookie("token", result.accessToken);

        res.status(200).json({
            message: "User logged in successfully",
            user: result.user
        });
    }
);

const logoutUser = catchAsync(
    async (req, res) => {
        res.clearCookie('token');
        res.status(200).json({ message: "User Logout successfully " });
    }
);

const getAllUser = catchAsync(
    async (req, res) => {
        const result = await paginate(
            userModel,
            {},
            req.query
        );

        return res.status(200).json({
            message: "all user fetch successfully",
            users: result.data,
            pagination: result.pagination
        });
    }
);


module.exports = { registerUser, loginUser, logoutUser, getAllUser};