const userModel = require("../models/user.model");
const { default: AppError } = require("../utils/AppError");
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require("../utils/jwt");
const bcrypt = require('bcryptjs');


const registerUser = async ({
    username,
    email,
    password,
    role = 'user'
}) => {

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

    const accessToken = generateAccessToken(user);

    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;

    await user.save();

    return {
        accessToken,
        refreshToken,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    };
};

const loginUser = async ({
    identifier,
    password
}) => {

    const user = await userModel.findOne({
        $or: [
            { username: identifier },
            { email: identifier }
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

    const accessToken = generateAccessToken(user);

    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;

    await user.save();

    return {
        accessToken,
        refreshToken,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    };
};

const refreshAccessToken = async (refreshToken) => {

    if (!refreshToken) {
        throw new AppError("Refresh Token missing", 401);
    }

    let decoded;

    try {
        decoded = verifyRefreshToken(refreshToken);
    } catch (error) {
        throw new AppError("Invalid Refresh Token", 401);
    };

    const user = await userModel.findById(decoded.id);

    if (!user) {
        throw new AppError("User not Found", 404);
    }

    if (!user.refreshToken) {
        throw new AppError("Refresh Token not found", 401);
    }

    if (user.refreshToken !== refreshToken) {
        throw new AppError("Refresh Token mismatch", 401);
    }

    const newAccessToken = generateAccessToken(user);

    return {
        accessToken : newAccessToken
    };
};

module.exports = { registerUser, loginUser, refreshAccessToken };