const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        unique: true
    },
    password: String
});

const userModel = mongoose.model('user', authSchema);

module.exports= userModel;