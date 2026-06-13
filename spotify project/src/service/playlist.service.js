const musicModel = require("../models/music.model");
const playlistModel = require("../models/playlist.model");
const { default: AppError } = require("../utils/AppError");

const createPlaylist = async (name, user) => {
    return await playlistModel.create({
        name,
        user
    });
};

const getMyPlaylists = async (user) => {
    return await playlistModel.find({ user })
        .sort({ createdAt: -1 });
};

const addMusicToPlaylist = async (playlistId, musicId, userId) => {
    const playlist = await playlistModel.findById(playlistId);

    if (!playlist) {
        throw new AppError('playlist not found', 404);
    }

    if (playlist.user.toString() !== userId) {
        throw new AppError("Unauthorized", 401);
    }

    const music = await musicModel.findById(musicId);

    if (!music) {
        throw new AppError('music not found', 404);
    }

    return await playlistModel.findByIdAndUpdate(
        playlistId,
        {
            $addToSet: {
                songs: songId
            }
        },

        {
            new: true
        }
    ).populate('musics');
};

const removeMusicsFromPlaylist = async (playlistId, musicId, userId) => {

    const playlist = await playlistModel.findById(playlistId);

    if (!playlist) {
        throw new AppError("Playlist not found", 404);
    }

    if (playlist.user.toString() !== userId) {
        throw new AppError("Unauthorized", 401);
    }

    return await playlistModel.findByIdAndUpdate(
        playlistId,
        {
            $pull: {
                music: musicId
            }
        },
        {
            new: true
        }
    ).populate("musics");
};

const deletePlaylist = async (playlistId, userId) => {
    const playlist = await playlistModel.findById(playlistId);

    if (!playlist) {
        throw new AppError("Playlist not found", 404);
    }

    if (playlist.user.toString() !== userId) {
        throw new AppError("Unauthorized", 401);
    }

    await playlistModel.findByIdAndDelete(playlistId);
};

module.exports = {createPlaylist, getMyPlaylists, addMusicToPlaylist, removeMusicsFromPlaylist, deletePlaylist};