const userModel = require('../models/user.model');
const { default: catchAsync } = require('../utils/catchAsync');
const {registerUser : registerUserService, loginUser : loginUserService, refreshAccessToken} = require('../service/auth.service');
const paginate = require('../utils/paginate');


const registerUser = catchAsync(
    async (req, res) => {
        
        const result = await registerUserService(req.body);

        res.cookie('accessToken', result.accessToken);

        res.cookie('refreshToken', result.refreshToken);

        res.status(201).json({
            message: 'user created successfully',
            user: result.user
        });
    }
);

const loginUser = catchAsync(
    async (req, res) => {

        const result = await loginUserService(req.body);

        res.cookie('accessToken', result.accessToken);
        
        res.cookie('refreshToken', result.refreshToken);

        res.status(200).json({
            message: "User logged in successfully",
            user: result.user
        });
    }
);

const logoutUser = catchAsync(
    async (req, res) => {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
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

const refreshToken = catchAsync(
    async (req, res) => {

        const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

        const { accessToken, refreshToken : newRefreshToken } = await refreshAccessToken(refreshToken);

        res.cookie("accessToken", 
            accessToken,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 15 * 60 * 1000
            }
        );

        res.cookie(
            "refreshToken",
            newRefreshToken,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 30* 24 * 60 * 60 * 1000
            }
        );

        return res.status(200).json({
            success : true,
            message: "Tokens are Refreshed"
        });
    }
);


module.exports = { registerUser, loginUser, logoutUser, getAllUser, refreshToken};