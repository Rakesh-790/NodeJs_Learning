const musicModel = require('../models/music.model');
const uploadFile = require('../service/storage.service');
const albumModel = require('../models/album.model');
const { default: catchAsync } = require('../utils/catchAsync');
const { default: AppError } = require('../utils/AppError');


const createMusic = catchAsync(
    async (req, res) => {

        const { title } = req.body;
        const file = req.file;

        if(file == undefined){
            throw new AppError('Upload a music file', 400);
        }

        const result = await uploadFile(file.buffer.toString('base64'));

        const music = await musicModel.create({
            uri: result.url,
            title,
            artist: req.decoded.id
        });

        return res.status(201).json({
            message: "Music Created Successfully",
            music: {
                id: music._id,
                uri: music.uri,
                title: music.title,
                artist: music.artist
            }
        });
    }
);


const createAlbum = catchAsync(
    async (req, res) => {

        const { title, musics } = req.body;

        const album = await albumModel.create({
            title,
            artist: req.decoded.id,
            musics: musics
        });

        return res.status(201).json({
            message: "Album created successfully",
            album: {
                id: album._id,
                title: album.title,
                artist: album.artist,
                music: album.musics
            }
        });

    }
);



const getAllMusics = catchAsync(
    async (req, res) => {
        const allMusics = await musicModel.find().populate('artist', 'username');

        res.status(200).json({
            message: "All music fetched successfully",
            musics: allMusics
        });
    }
);


module.exports = { createMusic, createAlbum, getAllMusics };