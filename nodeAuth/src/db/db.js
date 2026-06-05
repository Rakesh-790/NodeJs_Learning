const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

const connectDb = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('DB connected successfully');
    } catch (error) {
        console.error('Failed to connect to DB', error);
    }
};

module.exports = connectDb;