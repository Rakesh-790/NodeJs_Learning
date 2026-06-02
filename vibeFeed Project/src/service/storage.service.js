const {ImageKit} = require('@imagekit/nodejs');
require('dotenv').config();
const IMAGEKIT_PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY;

const imageKit = new ImageKit({
    privateKey: IMAGEKIT_PRIVATE_KEY,
});

const uploadImage = async (buffer) => {
    const response = await imageKit.files.upload({
        file: buffer.toString('base64'),
        fileName: `image-${Date.now()}.jpg`,
    });
    return response;
};

module.exports = uploadImage;