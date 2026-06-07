const jwt = require('jsonwebtoken');
const musicModel = require('../models/music.model');
const uploadFile = require('../service/storage.service');



async function createMusic(req, res) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    };

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "artist") {
            return res.status(403).json({ message: "Don't have access to create an Music." });
        }

        const { title } = req.body;
        const file = req.file;

        const result = await uploadFile(file.buffer.toString('base64'));

        const music = await musicModel.create({
            uri: result.url,
            title,
            artist: decoded.id
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
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    } z
};

module.exports = createMusic;