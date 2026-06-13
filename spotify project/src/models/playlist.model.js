const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    musics: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'music'
        }
    ],

    isPublic: {
        type: Boolean,
        default: false
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    createdAt: {
        timestamps: true
    }
});

const playlistModel = mongoose.model('playlist', playlistSchema);

module.exports = playlistModel;