const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        minlength: [3, 'Username must be at least 3 characters long'],
        unique: [true, 'username is already taken']
    },
    email: {
        type: String,
        unique : [true, 'email is required']
    },
    password: {
        type: String,
        unique : [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    role: {
        type: String,
        enum: [ 'user', 'artist'],
        default: 'user'
    }
});

const userModel = mongoose.model('auth', userSchema);

module.exports = userModel;