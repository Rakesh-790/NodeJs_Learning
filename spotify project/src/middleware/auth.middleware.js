const jwt = require('jsonwebtoken');
const { default: AppError } = require('../utils/AppError');
const { verifyRefreshToken } = require('../utils/jwt');

async function authArtistCheck(req, res, next) {
    const token = req.cookies.accessToken;

    if (!token) {
        throw new AppError('unauthorize', 401);
    };

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.decoded = decoded;

        if (decoded.role !== "artist") {
            throw new AppError("You don't have access to create album or music", 403);
        }

        next();

    } catch (error) {
        console.log(error);
        throw new AppError('unauthorize', 401);
    }

}

async function authCheck(req, res, next) {
    const token = req.cookies.accessToken;

    if (!token) {
        throw new AppError('unauthorize', 401);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        };

        next();

    } catch (error) {
        console.log(error);
        throw new AppError('unauthorize', 401);
    }
};

module.exports = {authArtistCheck, authCheck};