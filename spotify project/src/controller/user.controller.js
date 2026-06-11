const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { default: AppError } = require('../utils/AppError');
const { default: catchAsync } = require('../utils/catchAsync');
const paginate = require('../utils/paginate');


const registerUser = catchAsync(
    async (req, res) => {
        const { username, email, password, role = "user" } = req.body;

        const isUserExist = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        });

        if (isUserExist) {
            throw new AppError(
                'User Already exist',
                409
            );
        };

        const hashPassword = await bcrypt.hash(password, 12);

        const user = await userModel.create({
            username,
            email,
            password: hashPassword,
            role
        });

        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET);

        res.cookie('token', token);

        res.status(201).json({
            message: 'user created successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    }
);


const loginUser = catchAsync(
    async (req, res) => {
        const { identifier, password } = req.body;

        const user = await userModel.findOne({
            $or: [
                { username : identifier},
                { email : identifier}
            ]
        });

        if (!user) {
            throw new AppError(
                'Invalid Credentials',
                401
            );
        };

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new AppError(
                'Invalid Credentials',
                401
            );
        };

        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET);

        res.cookie("token", token);

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                username: user.username,
                email: user.email,
                role: user.role
            }
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