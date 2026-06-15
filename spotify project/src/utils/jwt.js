const jwt = require('jsonwebtoken');

const generateAccessToken = (user) =>{
    return jwt.sign({
        id: user._id,
        role: user.role
    },
    process.env.JWT_SECRET,
        {
            expiresIn : '15m'
        }
    );
};

const generateRefreshToken = (user) =>{
    return jwt.sign({
        id: user._id
    },
    process.env.JWT_SECRET,
        {
            expiresIn : '7d'
        }
    );
};

const verifyRefreshToken = (refreshToken) => {
    return jwt.verify(
        refreshToken,
        process.env.JWT_SECRET
    );
};

module.exports = {generateAccessToken, generateRefreshToken, verifyRefreshToken};