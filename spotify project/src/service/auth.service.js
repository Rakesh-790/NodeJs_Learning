const userModel = require("../models/user.model");
const { default: AppError } = require("../utils/AppError");
const generateAccessToken = require("../utils/jwt");
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

    return {
        accessToken,
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

    return {
        accessToken,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    };
};

module.exports = {registerUser, loginUser};