const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI

async function connectDb() {
    await mongoose.connect(MONGODB_URI);

    console.log('connected to db succesfully');
}

module.exports = connectDb;